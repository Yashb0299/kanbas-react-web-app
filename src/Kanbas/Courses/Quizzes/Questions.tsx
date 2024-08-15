import { useEffect, useState } from "react";
import MultipleChoice from "./Questions/MultipleChoice";
import TrueFalse from "./Questions/TrueFalse";
import FillInTheBlanks from "./Questions/FillInTheBlanks";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "./Questions/reducer";
import { FaPencil, FaTrash } from "react-icons/fa6";

export default function QuizQuestions(
    { quiz, setQuiz }: { quiz: any, setQuiz: (qz: any) => void }
) {
    const dispatch = useDispatch();
    const { questions } = useSelector((state: any) => state.questionsReducer);
    const [savedQuestions, setSavedQuestions] = useState<any>(questions || []);
    const [questionsCopy, setQuestionsCopy] = useState<any>(questions || []);

    const createQuestion = () => {
        const newQuestion = {
            number: questionsCopy.length + 1,
            title: "New Question",
            question: "",
            type: "Multiple Choice",
            points: 0,
            choices: [],
            editable: true,
            correctChoice: [],
            isSaved: false
        };
        setQuestionsCopy([...questionsCopy, newQuestion]);
    }

    const removeQuestion = (question: any) => {
        const qts = questionsCopy.filter((q: any) => q.number !== question.number);
        setQuestionsCopy(qts);
        setSavedQuestions(qts);
        setQuiz({ ...quiz, points: quiz.points - question.points });
    };

    const editQuestion = (question: any) => {
        setQuestionsCopy((prevQuestions: any) =>
            prevQuestions.map((q: any) =>
                q.number === question.number ? { ...question, editable: true } : q
            )
        );
    };

    const cancelQuestions = () => {
        const qts = questions.map((q: any) => ({ ...q, editable: false }));
        setQuestionsCopy(qts);
        setSavedQuestions(qts);
    };

    const saveQuestions = () => {
        const qts = savedQuestions.map((q: any) => ({ ...q, editable: false }));
        dispatch(setQuestions(qts));
        setQuiz({ ...quiz, questions: qts });
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            dispatch(setQuestions(quiz?.questions));
        };
        fetchQuestions();
    }, [dispatch, quiz?.questions]);

    return (
        <div id="wd-quiz-questions">
            <div id="wd-add-quiz-question" className="d-flex justify-content-center mt-5 mb-3">
                <button className="btn btn-secondary rounded-1 px-4" onClick={createQuestion}>+ New Question</button>
            </div>
            <hr className="mt-2 mb-2" />
            {questionsCopy && questionsCopy.map((question: any, qIndex: any) => (
                <div key={question.number}>
                    {!question.editable ? (
                        <div className="card mt-4">
                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-primary me-2" onClick={() => editQuestion(question)}><FaPencil /></button>
                                    <span className="fw-semibold">Question {qIndex + 1}</span>
                                    <span className="ms-auto">{question.points} pts</span>
                                    <button className="btn btn-danger ms-1" onClick={() => removeQuestion(question)}><FaTrash /></button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="mt-3 mb-3">
                                    {question.question}
                                </div>
                                {question.type !== "Fill In the Blank" && question.choices?.map((option: any, index: number) => (
                                    <div key={index}>
                                        <hr className="mb-2" />
                                        <div className="d-flex mb-3 align-items-center">
                                            <input className="form-check-input mt-0" type="radio" name="answer" />
                                            <span className="ms-2">{option.choice}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {question.type === 'Multiple Choice' && (
                                <MultipleChoice
                                    quiz={quiz}
                                    que={question}
                                    setQuiz={setQuiz}
                                    questionsCopy={questionsCopy}
                                    savedQuestions={savedQuestions}
                                    setSavedQuestions={setSavedQuestions}
                                    setQuestionsCopy={setQuestionsCopy}
                                />
                            )}
                            {question.type === 'True/False' && (
                                <TrueFalse
                                    quiz={quiz}
                                    que={question}
                                    setQuiz={setQuiz}
                                    questionsCopy={questionsCopy}
                                    savedQuestions={savedQuestions}
                                    setSavedQuestions={setSavedQuestions}
                                    setQuestionsCopy={setQuestionsCopy}
                                />
                            )}
                            {question.type === 'Fill In the Blank' && (
                                <FillInTheBlanks
                                    quiz={quiz}
                                    que={question}
                                    setQuiz={setQuiz}
                                    questionsCopy={questionsCopy}
                                    savedQuestions={savedQuestions}
                                    setSavedQuestions={setSavedQuestions}
                                    setQuestionsCopy={setQuestionsCopy}
                                />
                            )}
                        </>
                    )}
                    <hr className="mt-3" />
                </div>
            ))}
            <div className="d-flex justify-content-center mt-3">
                <div className="mx-1">
                    <button className="btn btn-secondary mx-2" onClick={cancelQuestions}>Cancel</button>
                </div>
                <div className="mx-1">
                    <button className="btn btn-danger mx-2" onClick={saveQuestions}>Save</button>
                </div>
                <hr />
            </div>
        </div>
    );
}
