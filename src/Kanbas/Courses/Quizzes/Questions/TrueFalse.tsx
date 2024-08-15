import { useState } from "react";
import { useSelector } from "react-redux";

export default function TrueFalse(
    { que, questionsCopy, savedQuestions, quiz, setQuiz, setSavedQuestions, setQuestionsCopy }: { que: any, questionsCopy: any, savedQuestions: any, quiz: any, setQuiz: (qz: any) => void, setSavedQuestions: (ques: any) => void, setQuestionsCopy: (ques: any) => void }
) {
    const { questions } = useSelector((state: any) => state.questionsReducer);
    const [question, setQuestion] = useState<any>(que);

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
        const qts = questionsCopy?.map((q: any) => {
            if (q.number === question.number) {
                return { ...question, choices: [{ number: 1, choice: "True" }, { number: 2, choice: "False" }], editable: false, isSaved: true };
            } else {
                return q;
            }
        });
        setQuestionsCopy(qts);
        setSavedQuestions(qts);
        setQuiz({ ...quiz, points: parseInt(quiz.points) + parseInt(question.points) });
    };

    const updateCorrectChoice = (option: any) => {
        setQuestion((prevQuestion: any) => ({ ...prevQuestion, correctChoices: [option.number] }));
    };

    const updateQuestion = (updatedQuestion: any) => {
        setQuestion(updatedQuestion);
        setQuestionsCopy(questionsCopy.map((q: any) => q.number === updatedQuestion.number ? updatedQuestion : q));
    };

    return (
        <div id="wd-true-false">
            <div id="wd-quiz-question" className="d-flex">
                <input type="text" className="form-control w-25 m-1 float-start" value={question?.title}
                    onChange={(e) => updateQuestion({ ...question, title: e.target.value })} />
                <select className="form-select m-1 float-start w-25" value={question.type}
                    onChange={(e) => updateQuestion({ ...question, type: e.target.value })} >
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="True/False">True/False</option>
                    <option value="Fill In the Blank">Fill In the Blank</option>
                </select>
                <div className="align-items-center">
                    <input type="number" className="form-control w-25 m-1 float-end" value={question.points}
                        onChange={(e) => updateQuestion({ ...question, points: e.target.value })} /><span className="float-end mt-3">pts: </span>
                </div>
            </div >
            <hr className="mt-3 mb-3" />
            Enter your question text, then select if True or False is the correct answer.
            <br /> <br />
            <h5 className="mb-3">Question:</h5>
            <textarea className="form-control m-2" rows={3} value={question.question} onChange={(e) => updateQuestion({ ...question, question: e.target.value })}></textarea>
            <h5 className="mb-3 mt-3">Answers:</h5>
            <div id="wd-tof-answers" className="ms-3">
                <div className="input-group mb-3 align-items-center">
                    <span className="input-group-text rounded-1">
                        <input className="form-check-input mt-0" type="radio" name="tf-answer" checked={question.correctChoices?.includes(1)} onChange={() => updateCorrectChoice({ number: 1 })} />
                    </span>
                    <span className="ms-2">True</span>
                </div>
                <div className="input-group mb-3 align-items-center">
                    <span className="input-group-text rounded-1">
                        <input className="form-check-input mt-0" type="radio" name="tf-answer" checked={question.correctChoices?.includes(2)} onChange={() => updateCorrectChoice({ number: 2 })} />
                    </span>
                    <span className="ms-2">False</span>
                </div>
            </div>
            <div className="mt-3">
                <button className="btn btn-secondary mx-1" onClick={discardChanges}>Cancel</button>
                <button className="btn btn-danger mx-1" onClick={saveChanges}>Update Question</button>
            </div>
        </div>
    );
}
