import { useEffect, useMemo, useState } from "react";
import { FaBan } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { useLocation, useParams } from "react-router";
import QuizDetails from "./Details";
import QuizQuestions from "./Questions";
import { useSelector } from "react-redux";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const { pathname } = useLocation();

    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [quiz, setQuiz] = useState<any>(quizzes.find((quiz: any) => quiz._id === qid));
    const [showDetails, setShowDetails] = useState(true);

    const toggleTab = (tab: string) => () => {
        if (tab === "Details") {
            setShowDetails(true);
        }
        else if (tab === "Questions") {
            setShowDetails(false);
        }
        else {
            setShowDetails(true);
        }
    };

    const newQuiz = useMemo(() => ({
        title: "New Quiz",
        description: "New Quiz Description",
        course: cid,
        type: "Graded Quiz",
        points: 0,
        assignmentGroup: "QUIZZES",
        for: "Everyone",
        shuffleAnswers: true,
        timeLimit: true,
        timeAllowed: 20,
        isPublished: false,
        questions: [],
        accessCode: "",
        lockQuestionsAfterAnswering: false,
        multipleAttempts: false,
        totalAttempts: 1,
        oneQuestionAtATime: true,
        showCorrectAnswers: false,
        webcamRequired: false,
        available: new Date().toLocaleDateString(),
        until: new Date().toLocaleDateString(),
        due: new Date().toLocaleDateString()
    }), [cid]);

    useEffect(() => {
        if (pathname.includes("NewQuiz")) {
            setQuiz(newQuiz);
        }
    },
        [pathname, newQuiz]
    );

    return (
        <div id="wd-quiz-edit">
            <div id="wd-quiz-edit-header" className="d-block">
                <button id="wd-quiz-context" className="btn btn-secondary float-end" >
                    <HiDotsVertical className="align-middle" />
                </button>
                <span className="float-end mt-2">
                    <span className="me-3 align-middle fs-5">Points {quiz?.points}</span>
                    {quiz?.isPublished ? <span className="text-success me-3"><FaCircleCheck className="me-1" /><span className="align-middle">Published</span></span> : <span className="text-body-tertiary"><FaBan className="me-1" /><span className="align-middle me-3">Unpublished</span></span>}
                </span>
            </div><br />< br />
            <hr />
            <div id="wd-quiz-edit-body" className="d-block">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button className={`nav-link ${showDetails ? "active" : "text-danger"}`} onClick={toggleTab("Details")}>Details</button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${!showDetails ? "active" : "text-danger"}`} onClick={toggleTab("Questions")}>Questions</button>
                    </li>
                </ul>
            </div>
            {showDetails ?
                <div id="wd-quiz-edit-details" className="d-block">
                    <QuizDetails
                        quiz={quiz}
                        setQuiz={setQuiz} />
                </div>
                :
                <div id="wd-quiz-edit-questions" className="d-block">
                    <QuizQuestions
                        quiz={quiz}
                        setQuiz={setQuiz} />
                </div>
            }
        </div >
    );
}