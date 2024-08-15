import { useEffect, useState } from "react";
import ConvertDateToString from "../../Utilities/ConvertDateToString";
import { FaPencil } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import * as client from "./client";
import { FaRegQuestionCircle } from "react-icons/fa";
import RevealAnswersModal from "./RevealAnswersModal";

export default function Quiz() {
    const navigate = useNavigate();
    const { cid, qid } = useParams();

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [isFaculty] = useState(currentUser?.role === "FACULTY");
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [quiz, setQuiz] = useState<any>();
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);
    const [savedTime, setSavedTime] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [responseResult, setResponseResult] = useState<number[]>();
    const [finalScore, setFinalScore] = useState<number>(0);
    const [startQuiz, setStartQuiz] = useState<boolean>(false);
    const [hasAttempts, setHasAttempts] = useState<boolean>(false);

    const [currentResponse, setCurrentResponse] = useState<any[]>([]);
    const [prevResponse, setPrevResponse] = useState<any>();
    const [showAnswers, setShowAnswers] = useState<boolean>(false);

    const [startDate, setStartDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");

    const getStartDateTime = (): Date => {
        if (startDate && startTime) {
            const combinedDateTimeString = `${startDate}, ${startTime}`;
            const dateTime = new Date(combinedDateTimeString);
            if (!isNaN(dateTime.getTime())) {
                return dateTime;
            }
        }
        return new Date();
    };

    const getPrevResponseChoice = (question: any) => {
        const prevChoice = prevResponse?.responses.find((res: any) => res.question === question.number)?.response;
        return prevChoice;
    }

    const getPrevResponseCorrectness = (question: any) => {
        if (question.type === "Fill In the Blank") {
            const response = prevResponse?.responses.find((res: any) => res.question === question.number)?.response.toLowerCase();
            const correctAnswer = question.choices.map((choice: any) => choice.choice.toLowerCase());
            return correctAnswer.includes(response)
        }
        else {
            const response = prevResponse?.responses.find((res: any) => res.question === question.number)?.response;
            const correctAnswer = question.correctChoice;
            return correctAnswer.includes(response)
        }
    };

    const takeQuiz = () => {
        setStartDate(new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" }));
        setStartTime(new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true }));
        updateSavedTime();
        setStartQuiz(true);
        setCurrentResponse([]);
    };

    const updateSavedTime = () => {
        setSavedTime(new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true }));
    };

    const nextQuestion = () => {
        if (questionIndex < questions?.length - 1) {
            setQuestionIndex((prevIndex) => prevIndex + 1);
            setCurrentQuestion(questions[questionIndex + 1]);
        }
        updateSavedTime();
    };

    const prevQuestion = () => {
        if (questionIndex > 0) {
            setQuestionIndex((prevIndex) => prevIndex - 1);
            setCurrentQuestion(questions[questionIndex - 1]);
        }
        updateSavedTime();
    };

    const navigateToQuestion = (index: number) => {
        if (index >= 0 && index < questions?.length) {
            setQuestionIndex(index);
        }
        updateSavedTime();
    };

    const updateUserChoice = (question: any, answer: any) => {
        if (question.type === "Fill In the Blank") {
            setCurrentResponse((prev) => {
                const newResponse = prev.filter((res) => res.question !== question.number);
                return [...newResponse, { question: question.number, response: answer }];
            });
        }
        else {
            setCurrentResponse((prev) => {
                const newResponse = prev.filter((res) => res.question !== question.number);
                return [...newResponse, { question: question.number, response: answer?.number }];
            });
        }
        updateSavedTime();
    };

    const getMarkedChoice = (question: any, option: any) => {
        const response = currentResponse.find((res) => res.question === question.number);
        if (response && response.response === option.number) {
            return true;
        }
        return false;
    };

    const submitUserResponse = async (scoreObtained: number) => {
        const start = getStartDateTime();
        const end = new Date();
        const response = {
            quiz: qid,
            user: currentUser._id,
            responses: currentResponse,
            score: scoreObtained,
            submittedOn: new Date().toLocaleString(),
            attempts: prevResponse?.attempts + 1 || 1,
            timeTaken: ((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60)).toFixed(2)
        };
        if (prevResponse?.attempts > 0) {
            await client.updateUserResponse(qid as string, currentUser._id, response);
        }
        else {
            await client.createUserResponse(qid as string, currentUser._id, response);
        }
        console.log(prevResponse);
        if (prevResponse?.attempts + 1 < quiz.totalAttempts) {
            setHasAttempts(true);
        }
        else {
            setHasAttempts(false);
        }
    };

    const submitQuiz = () => {
        if (!isSubmitted) {
            setIsSubmitted(true);
            const newResponseResults = [...(responseResult || [])];
            const totalScore = quiz.questions?.reduce((acc: number, question: any) => {
                const response = currentResponse.find((res) => res.question === question.number);
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
            submitUserResponse(totalScore);
            setStartQuiz(false);
            setIsSubmitted(false);
            getPrevResponse(quiz);
            setQuestionIndex(0);
            setResponseResult(Array(quiz.questions?.length).fill(0));
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

    const getPrevResponse = async (qz: any) => {
        const response = await client.getPrevResponse(qz._id, currentUser._id);
        if (response) {
            setPrevResponse(response);
            if (response?.attempts < qz.totalAttempts) {
                setHasAttempts(true);
            }
            else {
                setHasAttempts(false);
                setShowAnswers(true);
            }
        }
        else {
            setHasAttempts(true);
        }
    };

    const revealAnswers = async () => {
        if (prevResponse?.attempts < quiz.totalAttempts) {
            await client.updateUserResponse(qid as string, currentUser._id, { ...prevResponse, attempts: quiz.totalAttempts });
            getPrevResponse(quiz);
            setShowAnswers(true);
        }
    };

    useEffect(() => {
        const qz = quizzes.find((quiz: any) => quiz._id === qid);
        if (qz) {
            setQuiz(qz);
            setQuestions(qz.questions || []);
            setCurrentQuestion(qz.questions?.[questionIndex] || null);
            getPrevResponse(qz);
            setShowAnswers(qz.showCorrectAnswers);
            if (!isSubmitted) {
                setResponseResult(Array(qz.questions?.length).fill(0));
            }
        }
        const startDateTime = getStartDateTime();
        if (startDateTime) {
            const targetTime = new Date(startDateTime.getTime() + parseInt(qz.timeAllowed) * 60 * 1000);
            const delay = targetTime.getTime() - new Date().getTime();

            if (delay > 0) {
                const timer = setTimeout(() => {
                    submitQuiz();
                }, delay);
                return () => clearTimeout(timer);
            } else {
                submitQuiz();
            }
        }
    }, [startDate, startTime] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(() => {
        const qz = quizzes.find((quiz: any) => quiz._id === qid);
        getPrevResponse(qz);
    }
        , [prevResponse, quizzes, qid] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return (
        <div id="wd-quiz-details">
            {quiz && (
                <>
                    {isFaculty &&
                        // Edit and Preview buttons for faculty
                        <>
                            <div id="wd-quiz-detail-buttons" className="row">
                                <div className="col-sm-6">
                                    <button className="btn btn-secondary float-end rounded-1" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`)}>Preview</button>
                                </div>
                                <div className="col-sm-6">
                                    <button className="btn btn-secondary float-start rounded-1" onClick={() => navigate(`/Kanbas/Courses/RS101/Quizzes/${qid}/Edit`)}><FaPencil className="me-2 text-secondary" />Edit</button>
                                </div>
                            </div>
                            <hr />
                        </>
                    }
                    <div className="fs-3 fw-semibold mb-3">{quiz?.title}</div>
                    {isFaculty && quiz &&
                        <>
                            <br />
                            <div className="d-block mb-5">
                                <div className="mb-3 row">
                                    <div className="col-sm-6 text-sm-end fw-semibold">
                                        Quiz Type
                                    </div>
                                    <div className="col-sm-6 float-end">
                                        {quiz.type}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-6 text-sm-end fw-semibold">
                                        Points
                                    </div>
                                    <div className="col-sm-6 float-end">
                                        {quiz.points}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-6 text-sm-end fw-semibold">
                                        Assignment Group
                                    </div>
                                    <div className="col-sm-6 float-end">
                                        {quiz.assignmentGroup}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-6 text-sm-end fw-semibold">
                                        Shuffle Answers
                                    </div>
                                    <div className="col-sm-6 float-end">
                                        {quiz.shuffleAnswers ? "Yes" : "No"}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-6 text-sm-end fw-semibold">
                                        Time Limit
                                    </div>
                                    <div className="col-sm-6 float-end">
                                        {quiz.timeAllowed} minutes
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-6 text-sm-end fw-semibold">
                                        Multiple Attempts
                                    </div>
                                    <div className="col-sm-6 float-end">
                                        {quiz.multipleAttempts ? "Yes" : "No"}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-6 text-sm-end fw-semibold">
                                        View Responses
                                    </div>
                                    <div className="col-sm-6 float-end">
                                        Always
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-6 text-sm-end fw-semibold">
                                        Show Correct Answers
                                    </div>
                                    <div className="col-sm-6 float-end">
                                        {quiz.showCorrectAnswers ? "Immediately" : "No"}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-6 text-sm-end fw-semibold">
                                        One Question at a Time
                                    </div>
                                    <div className="col-sm-6 float-end">
                                        {quiz.oneQuestionAtATime ? "Yes" : "No"}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-6 text-sm-end fw-semibold">
                                        Require Respondus Lockdown Browser
                                    </div>
                                    <div className="col-sm-6 float-end">
                                        {quiz.respondusBrowser ? "Yes" : "No"}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-6 text-sm-end fw-semibold">
                                        Required to View Quiz Results
                                    </div>
                                    <div className="col-sm-6 float-end">
                                        {quiz.requiredToViewResults ? "Yes" : "No"}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-6 text-sm-end fw-semibold">
                                        Webcam Required
                                    </div>
                                    <div className="col-sm-6 float-end">
                                        {quiz.webcamRequired ? "Yes" : "No"}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-sm-6 text-sm-end fw-semibold">
                                        Lock Questions After Answering
                                    </div>
                                    <div className="col-sm-6 float-end">
                                        {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {(!startQuiz) ? (
                        <>
                            {/* Quiz timeline details */}
                            <div className="wd-quiz-attributes mt-4 mb-4">
                                <hr />
                                <div className="row">
                                    <div className="col-md-3">
                                        <span className=" fw-semibold me-1">Due</span> <ConvertDateToString dateString={quiz.due} isDue={true} />
                                    </div>
                                    <div className="col-md-3">
                                        <span className=" fw-semibold me-1">For</span> {quiz?.for}
                                    </div>
                                    <div className="col-md-3">
                                        <span className=" fw-semibold me-1">Available From</span> <ConvertDateToString dateString={quiz.available} isDue={false} />
                                    </div>
                                    <div className="col-md-3">
                                        <span className=" fw-semibold me-1">Until</span> <ConvertDateToString dateString={quiz.until} isDue={false} />
                                    </div>
                                </div>
                                <hr />
                            </div>
                            {/* Button to attempt the quiz */}
                            {hasAttempts && !isFaculty && quiz?.questions?.length > 0 && (
                                <div id="wd-attempt-quiz" className="d-flex justify-content-center">
                                    <button className="btn btn-danger rounded-1 mb-3" onClick={takeQuiz}>Take the quiz</button>
                                    {!showAnswers && prevResponse?.attempts < quiz.totalAttempts &&
                                        <button className="btn btn-primary rounded-1 mb-3 ms-3" data-bs-toggle="modal" data-bs-target="#wd-reveal-answers-dialog">Reveal Answers</button>
                                    }
                                </div>
                            )}
                        </>
                    ) : (
                        !isFaculty && startQuiz &&
                        <>
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
                                                                        currentResponse.find((res: any) => res.question === currentQuestion.number)?.response || ''
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
                                                                                        currentResponse.find((res: any) => res.question === question.number)?.response || ''
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
                                    {!isSubmitted && (
                                        <div
                                            id="wd-submit-quiz"
                                            className="d-flex justify-content-end align-items-center mt-3 border border-secondary-subtle px-3 pb-3"
                                        >
                                            <span className="mt-3 mx-2">Quiz saved at {savedTime}</span>
                                            <button className="btn btn-danger mt-3" onClick={submitQuiz}>
                                                Submit Quiz
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="alert alert-warning mt-3">No questions found in this quiz.</div>
                                </>
                            )}
                        </>
                    )}
                    {!startQuiz && !isFaculty && prevResponse &&
                        (<>
                            <div id="wd-quiz-instructions" className="mt-5">
                                <h3 className="mb-2">Instructions</h3>
                                <hr className="my-3" />
                                <span className="d-block mb-3">{quiz.description}</span>
                                <hr className="my-3" />
                                <h4 className="mt-4 mb-2">Attempt History</h4>
                                <div className="wd-quiz-attributes mt-4 mb-5">
                                    <hr className="my-3" />
                                    <div className="row">
                                        <div className="col-md-3 fw-semibold">
                                        </div>
                                        <div className="col-md-3 fw-semibold">
                                            Attempt
                                        </div>
                                        <div className="col-md-3 fw-semibold">
                                            Time
                                        </div>
                                        <div className="col-md-3 fw-semibold">
                                            Score
                                        </div>
                                    </div>
                                    <hr className="my-3" />
                                    <div className="row mt-3">
                                        <div className="col-md-3">
                                            <span className="fw-semibold fs-6">LATEST</span>
                                        </div>
                                        <div className="col-md-3">
                                            {prevResponse?.attempts || 0}
                                        </div>
                                        <div className="col-md-3">
                                            {prevResponse.timeTaken} minutes
                                        </div>
                                        <div className="col-md-3">
                                            {prevResponse.score}
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div className="container-fluid">
                                {questions && (
                                    <>
                                        <ul className="list-group list-group-flush">
                                            {questions.map((question: any) => (
                                                <li className="list-group-item" key={question.number}>
                                                    <div className="card mt-4">
                                                        <div className={`card-header ${getPrevResponseCorrectness(question) ? 'bg-success bg-opacity-75' : 'bg-danger bg-opacity-75'}`}>
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
                                                                    <div key={option.number} className={`${showAnswers && question.correctChoice.includes(option.number) ? 'bg-success-subtle align-items-center' : getPrevResponseChoice(question) === option.number ? question.correctChoice.includes(option.number) ? 'bg-success-subtle align-items-center' : "bg-danger-subtle  align-items-center" : ""}}`}>
                                                                        <hr className="mb-2" />
                                                                        <div className="d-flex mb-3 align-items-center">
                                                                            < input
                                                                                className="form-check-input mt-0"
                                                                                type="radio"
                                                                                name={`answer-for-Q${question.number}`}
                                                                                key={`answer-for-Q${question.number}`}
                                                                                checked={getPrevResponseChoice(question) === option.number}
                                                                                disabled={true}
                                                                            />
                                                                            <span className="ms-2">{option.choice}</span>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <>
                                                                    <input
                                                                        type="text"
                                                                        className={`form-control mb-2 ${getPrevResponseCorrectness(question) ? 'bg-success bg-opacity-25' : 'bg-danger bg-opacity-25'}`}
                                                                        defaultValue={
                                                                            getPrevResponseChoice(question) || ''
                                                                        }
                                                                        disabled={true}
                                                                    />
                                                                    {showAnswers && (
                                                                        <>
                                                                            Correct Answers:
                                                                            {question.choices.map((choice: any) => (
                                                                                <>
                                                                                    <ul className="container-fluid list-group">
                                                                                        <li key={choice.number} className="list-group-item d-block m-1 bg-success-subtle">
                                                                                            {choice.choice}
                                                                                        </li>
                                                                                    </ul>
                                                                                </>
                                                                            ))}
                                                                        </>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </>
                        )
                    }
                </>
            )
            }
            <RevealAnswersModal revealAnswers={revealAnswers} />
        </div >
    )
};