import { useEffect, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { RiErrorWarningLine } from "react-icons/ri";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function QuizPreview() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);

    const [quiz, setQuiz] = useState<any>();
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);
    const [savedTime, setSavedTime] = useState<string>("");
    const [quizResponse, setQuizResponse] = useState<any[]>([]);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [responseResult, setResponseResult] = useState<number[]>();
    const [finalScore, setFinalScore] = useState<number>(0);

    const startDate = new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const startTime = new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });

    useEffect(() => {
        const qz = quizzes.find((quiz: any) => quiz._id === qid);
        if (qz) {
            setQuiz(qz);
            setQuestions(qz.questions || []);
            setCurrentQuestion(qz.questions?.[questionIndex] || null);
            setSavedTime(startTime);
            if (!isSubmitted) {
                setResponseResult(Array(qz.questions.length).fill(0));
            }
        }
    }, [quizzes, qid, questionIndex, startTime, isSubmitted]);


    const updateSavedTime = () => {
        setSavedTime(new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true }));
    };

    const nextQuestion = () => {
        if (questionIndex < questions.length - 1) {
            setQuestionIndex((prevIndex) => prevIndex + 1);
        }
        updateSavedTime();
    };

    const prevQuestion = () => {
        if (questionIndex > 0) {
            setQuestionIndex((prevIndex) => prevIndex - 1);
        }
        updateSavedTime();
    };

    const navigateToQuestion = (index: number) => {
        if (index >= 0 && index < questions.length) {
            setQuestionIndex(index);
        }
        updateSavedTime();
    };

    const navigateToEditScreen = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`);
    };

    const updateUserChoice = (question: any, answer: any) => {
        if (question.type === "Fill In the Blank") {
            setQuizResponse((prev) => {
                const newResponse = prev.filter((res) => res.question !== question.number);
                return [...newResponse, { question: question.number, response: answer }];
            });
        }
        else {
            setQuizResponse((prev) => {
                const newResponse = prev.filter((res) => res.question !== question.number);
                return [...newResponse, { question: question.number, response: answer?.number }];
            });
        }
        updateSavedTime();
    };

    const getMarkedChoice = (question: any, option: any) => {
        const response = quizResponse.find((res) => res.question === question.number);
        if (response && response.response === option.number) {
            return true;
        }
        return false;
    };

    const submitQuiz = () => {
        if (!isSubmitted) {
            setIsSubmitted(true);
            const newResponseResults = [...(responseResult || [])];
            const totalScore = quiz.questions?.reduce((acc: number, question: any) => {
                const response = quizResponse.find((res) => res.question === question.number);
                if (question.type === "Fill In the Blank") {
                    const correctAnswers = question.choices.map((choice: any) => choice.choice.toLowerCase());
                    if (correctAnswers?.includes(response?.response.toLowerCase())) {
                        newResponseResults[question.number - 1] = 1;
                        return acc + question.points;
                    }
                }
                else {
                    const correctChoice = question.correctChoice;
                    if (correctChoice?.includes(response?.response)) {
                        newResponseResults[question.number - 1] = 1;
                        return acc + question.points;
                    }
                }
                return acc;
            }, 0);
            setResponseResult(newResponseResults);
            setFinalScore(totalScore);
            updateSavedTime();
        }
    };


    const showQuestionResults = (question: number) => {
        const res = responseResult?.[question];
        if (isSubmitted && res === 0) {
            return 'bg-danger bg-opacity-75';
        }
        else if (isSubmitted && res === 1) {
            return 'bg-success bg-opacity-75';
        }
        return '';
    };

    return (
        <div id="wd-quiz-preview">
            {quiz && (
                <>
                    <h3 className="mt-2 mb-4">{quiz.title}</h3>
                    <div className="row">
                        <div className="col-12">
                            <span className="alert alert-danger pt-3 pb-3 mt-2 d-flex align-items-center justify-content-start">
                                <RiErrorWarningLine className="fs-4 me-1" />
                                This is a preview of the published version of the quiz
                            </span>
                        </div>
                    </div>
                    <br /><br />
                    <span className="mb-2 mt-3">
                        Started: {startDate} at {startTime}
                    </span>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="mt-3">Quiz Instructions</h3>
                        {isSubmitted && <h4 className="mt-3 fst-italic">Total Points: {finalScore}</h4>}
                    </div>
                    <hr className="mt-2 mb-2" />

                    {questions && questions?.length > 0 ? (
                        <>
                            {/* Quiz questions one at a time */}
                            {quiz?.oneQuestionAtATime ? (
                                <div className="container-fluid">
                                    {currentQuestion && (
                                        <>
                                            <div className="card mt-4">
                                                <div className={`card-header ${showQuestionResults(currentQuestion.number - 1)}`}>
                                                    <div className="d-flex">
                                                        <span className="fw-semibold">Question {questionIndex + 1}</span>
                                                        <span className="ms-auto">{currentQuestion.points} pts</span>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mt-3 mb-3">
                                                        {currentQuestion.question}
                                                    </div>
                                                    {currentQuestion.type !== "Fill In the Blank" ? (
                                                        currentQuestion.choices?.map((option: any) => (
                                                            <div key={option.number}>
                                                                <hr className="mb-2" />
                                                                <div className="d-flex mb-3 align-items-center">
                                                                    <input
                                                                        className="form-check-input mt-0"
                                                                        type="radio"
                                                                        name={`answer-for-Q${questionIndex}`}
                                                                        key={`answer-for-Q${questionIndex}`}
                                                                        checked={getMarkedChoice(currentQuestion, option)}
                                                                        onChange={() => updateUserChoice(currentQuestion, option)}
                                                                        disabled={isSubmitted}
                                                                    />
                                                                    <span className="ms-2">{option.choice}</span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter your answer"
                                                            onChange={(e) => updateUserChoice(currentQuestion, e.target.value)}
                                                            defaultValue={
                                                                quizResponse.find((res: any) => res.question === currentQuestion.number)?.response || ''
                                                            }
                                                            disabled={isSubmitted}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="d-flex mt-2">
                                                {questionIndex > 0 && (
                                                    <button
                                                        className="btn btn-secondary mt-3 me-auto"
                                                        onClick={prevQuestion}
                                                    >
                                                        <VscTriangleLeft className="me-1" /> Previous
                                                    </button>
                                                )}
                                                {questionIndex < questions?.length - 1 && (
                                                    <button
                                                        className="btn btn-secondary mt-3 ms-auto"
                                                        onClick={nextQuestion}
                                                    >
                                                        Next <VscTriangleRight className="ms-1" />
                                                    </button>
                                                )}
                                            </div>
                                            {quiz.questions?.length > 0 &&
                                                <div id="wd-question-navigator" className="mt-5">
                                                    <h4>Questions</h4>
                                                    <div className="ms-3">
                                                        {questions.map((question, index) => (
                                                            <div key={index} className="d-flex justify-content-start align-items-center">
                                                                <FaRegQuestionCircle className="text-secondary me-1" />
                                                                <div onClick={() => navigateToQuestion(index)} role="button">
                                                                    <span className={`me-2 text-danger ${questionIndex === index ? "fw-semibold" : ""}`}>Question {index + 1}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    )}
                                </div>
                            ) :
                                // Quiz questions all at once
                                (
                                    <div className="container-fluid">
                                        {questions && (
                                            <>
                                                <ul className="list-group list-group-flush">
                                                    {questions.map((question: any) => (
                                                        <li className="list-group-item" key={question.number}>
                                                            <div className="card mt-4">
                                                                <div className={`card-header ${showQuestionResults(question.number - 1)}`}>
                                                                    <div className="d-flex">
                                                                        <span className="fw-semibold">Question {question.number}</span>
                                                                        <span className="ms-auto">{question.points} pts</span>
                                                                    </div>
                                                                </div>
                                                                <div className="card-body">
                                                                    <div className="mt-3 mb-3">
                                                                        {question.question}
                                                                    </div>
                                                                    {question.type !== "Fill In the Blank" ? (
                                                                        question.choices?.map((option: any) => (
                                                                            <div key={option.number}>
                                                                                <hr className="mb-2" />
                                                                                <div className="d-flex mb-3 align-items-center">
                                                                                    <input
                                                                                        className="form-check-input mt-0"
                                                                                        type="radio"
                                                                                        name={`answer-for-Q${question.number}`}
                                                                                        key={`answer-for-Q${question.number}`}
                                                                                        checked={getMarkedChoice(question, option)}
                                                                                        onChange={() => updateUserChoice(question, option)}
                                                                                        disabled={isSubmitted}
                                                                                    />
                                                                                    <span className="ms-2">{option.choice}</span>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Enter your answer"
                                                                            onChange={(e) => updateUserChoice(question, e.target.value)}
                                                                            defaultValue={
                                                                                quizResponse.find((res: any) => res.question === question.number)?.response || ''
                                                                            }
                                                                            disabled={isSubmitted}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                )}
                            {/* Submit quiz button */}
                            <div
                                    id="wd-submit-quiz"
                                    className="d-flex justify-content-end align-items-center mt-3 border border-secondary-subtle px-3 pb-3"
                                >
                                    <span className="mt-3 mx-2">Quiz saved at {savedTime}</span>
                                    {isSubmitted && <button className="btn btn-warning mt-3 mx-1" onClick={() => { setIsSubmitted(false); }}>Reset</button>}
                                    <button className="btn btn-danger mt-3" onClick={submitQuiz}>
                                        Submit Quiz
                                    </button>
                                </div>
                        </>
                    ) : (
                        <>
                            <div className="alert alert-warning mt-3">No questions found in this quiz.</div>
                        </>
                    )}
                    <div id="wd-edit-quiz" className="row mx-1 mt-5">
                        <button className="btn btn-secondary mt-3 d-flex align-items-center justify-content-start p-2 rounded-1" onClick={navigateToEditScreen}><FaPencil className="mx-2 text-secondary" /> Keep Editing This Quiz</button>
                    </div>
                    {quiz.questions?.length > 0 &&
                        <div id="wd-question-navigator" className="mt-5">
                            <h4>Questions</h4>
                            <div className="ms-3">
                                {questions.map((question, index) => (
                                    <div key={index} className="d-flex justify-content-start align-items-center">
                                        <FaRegQuestionCircle className="text-secondary me-1" />
                                        <div onClick={() => navigateToQuestion(index)} role="button">
                                            <span className={`me-2 text-danger ${questionIndex === index ? "fw-semibold" : ""}`}>Question {index + 1}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </>
            )
            }
        </div >
    );
}
