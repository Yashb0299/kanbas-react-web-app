import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function MultipleChoice(
    { que, questionsCopy, savedQuestions, quiz, setQuiz, setSavedQuestions, setQuestionsCopy }: { que: any, questionsCopy: any, savedQuestions: any, quiz: any, setQuiz: (qz: any) => void, setSavedQuestions: (ques: any) => void, setQuestionsCopy: (ques: any) => void }
) {
    const { questions } = useSelector((state: any) => state.questionsReducer);
    const [question, setQuestion] = useState<any>(que);
    const [choices, setChoices] = useState<any>(que.choices);
    const [correctChoices, setCorrectChoices] = useState<any>(que.correctChoice);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");

    const discardChanges = () => {
        if (question.isSaved) {
            setQuestionsCopy(savedQuestions.map((q: any) => {
                if (q.number === question.number) {
                    const prevQues = { ...q, editable: false }
                    setQuestion(prevQues);
                    return prevQues;
                }
                return q;
            }));
        } else {
            const originalQuestion = questions.find((ogQ: any) => ogQ.number === question.number);
            if (originalQuestion) {
                setQuestionsCopy(savedQuestions.map((q: any) => {
                    if (q.number === question.number) {
                        const ogQues = { ...originalQuestion, editable: false }
                        setQuestion(ogQues);
                        return ogQues;
                    }
                    return q;
                }));
            } else {
                setQuestionsCopy(questionsCopy.filter((q: any) => q.number !== question.number));
            }
        }
    };

    const saveChanges = () => {
        setQuestion((prevQuestion: any) => ({ ...prevQuestion, isSaved: true }));
        if (question.type === "True/False") {
            const qts = questionsCopy?.map((q: any) => {
                if (q.number === question.number) {
                    return { ...question, choices: [{ number: 1, choice: "True" }, { number: 2, choice: "False" }], editable: false, isSaved: true };
                } else {
                    return q;
                }
            })
            setQuestionsCopy(qts);
            setSavedQuestions(qts);
        } else {
            const qts = questionsCopy?.map((q: any) => {
                if (q.number === question.number) {
                    return { ...question, editable: false, isSaved: true };
                } else {
                    return q;
                }
            });
            setQuestionsCopy(qts);
            setSavedQuestions(qts);
        }
        setQuiz({ ...quiz, points: parseInt(quiz.points) + parseInt(question.points) });
    };

    const removeChoice = (option: any) => {
        setChoices((prevChoices: any) => {
            const newChoices = prevChoices.filter((opt: any) => opt.number !== option.number);
            setQuestion((prevQuestion: any) => ({ ...prevQuestion, choices: newChoices }));
            return newChoices;
        });
    };

    const updateCorrectChoice = (option: any) => {
        const updatedCorrectChoices = [option.number];
        setCorrectChoices(updatedCorrectChoices);
        setQuestion((prevQuestion: any) => ({ ...prevQuestion, correctChoice: updatedCorrectChoices }));
    };

    const updateOptionValue = (updatedOption: any) => {
        setChoices((prevChoices: any) => {
            const newChoices = prevChoices.map((option: any) =>
                option.number === updatedOption.number ? updatedOption : option
            );
            setQuestion((prevQuestion: any) => ({ ...prevQuestion, choices: newChoices }));
            return newChoices;
        });
    };

    const addAnswer = () => {
        setChoices((prevChoices: any) => {
            const newChoices = [...prevChoices, { number: prevChoices.length + 1, choice: "" }];
            setQuestion((prevQuestion: any) => ({ ...prevQuestion, choices: newChoices }));
            return newChoices;
        });
    };

    const updateQuestion = (updatedQuestion: any) => {
        setQuestion(updatedQuestion);
        const updatedQuestionsCopy = questionsCopy.map((q: any) =>
            q.number === updatedQuestion.number ? updatedQuestion : q
        );
        setQuestionsCopy(updatedQuestionsCopy);
    };

    return (
        <div id="wd-multiple-choice" className="mb-3">
            <div id="wd-quiz-question" className="d-flex">
                <input
                    type="text"
                    className="form-control w-25 m-1 float-start"
                    value={question?.title}
                    onChange={(e) => updateQuestion({ ...question, title: e.target.value })}
                />
                <select
                    className="form-select m-1 float-start w-25"
                    value={question.type}
                    onChange={(e) => updateQuestion({ ...question, type: e.target.value })}
                >
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="True/False">True/False</option>
                    <option value="Fill In the Blank">Fill In the Blank</option>
                </select>
                <div className="align-items-center">
                    <input
                        type="number"
                        className="form-control w-25 m-1 float-end"
                        value={question.points}
                        onChange={(e) => updateQuestion({ ...question, points: e.target.value })}
                    />
                    <span className="float-end mt-3">pts: </span>
                </div>
            </div>
            <hr className="mt-3 mb-3" />
            Enter your question and multiple answers, then select the one correct answer.
            <br /> <br />
            <h5 className="mb-3">Question:</h5>
            <textarea
                className="form-control m-2"
                rows={3}
                value={question.question}
                onChange={(e) => updateQuestion({ ...question, question: e.target.value })}
            ></textarea>
            <h5 className="mb-3 mt-3">Answers:</h5>
            <div id="wd-mcq-answers" className="ms-3">
                {choices &&
                    choices.map((option: any) => (
                        <div className="input-group mb-3" key={option.number}>
                            <span className="input-group-text">
                                <label className={`me-2 ${option === selectedAnswer || option.number === correctChoices[1] ? "text-success" : "text-normal"}`}>
                                    {option === selectedAnswer || option.number === correctChoices[0] ? "Correct Answer" : "Possible Answer"}
                                </label>
                                <input
                                    className="form-check-input mt-0"
                                    type="radio"
                                    name="mcq-answer"
                                    onChange={() => { updateCorrectChoice(option); setSelectedAnswer(option) }}
                                    checked={option.number === correctChoices[0]}
                                />
                            </span>
                            <textarea
                                className="form-control"
                                rows={1}
                                value={option.choice}
                                onChange={(e) => updateOptionValue({ ...option, choice: e.target.value })}
                            />
                            <button className="btn btn-danger" onClick={() => removeChoice(option)}><FaTrash /></button>
                        </div>
                    ))
                }
            </div>
            <div className="row justify-content-end">
                <button className="btn btn-warning col-sm-3" onClick={addAnswer}>Add Answer</button>
            </div>
            <div className="mt-3">
                <button className="btn btn-secondary mx-1" onClick={discardChanges}>Cancel</button>
                <button className="btn btn-danger mx-1" onClick={saveChanges}>Update Question</button>
            </div>
        </div>
    );
}
