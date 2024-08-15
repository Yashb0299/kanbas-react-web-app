import { Link, useParams } from "react-router-dom";
import { GoTriangleDown } from "react-icons/go";
import { MdOutlineRocketLaunch } from "react-icons/md";
import ConvertDateToString from "../../Utilities/ConvertDateToString";
import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import { deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import { useEffect, useState } from "react";

export default function Quizzes() {
    const { cid } = useParams();
    const dispatch = useDispatch();

    const [quizError, setQuizError] = useState("");
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [isFaculty] = useState(currentUser?.role === "FACULTY");
    const [userScores, setUserScores] = useState<any[]>([]);

    const getDayOfYear = (date: Date): number => {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = (date.getTime() - start.getTime()) + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
        const oneDay = 1000 * 60 * 60 * 24;
        const day = Math.floor(diff / oneDay);
        return day;
    };

    const getQuizStatus = (quiz: any) => {
        const today = getDayOfYear(new Date());
        const quizAvailable = getDayOfYear(new Date(quiz.available));
        const quizUntil = getDayOfYear(new Date(quiz.until));

        if (today < quizAvailable) {
            return <>Not available until <span className="fw-normal"><ConvertDateToString dateString={quiz.available} isDue={false} /></span></>
        }
        else if ((today > quizAvailable) && (today <= quizUntil)) {
            return <>Available till <span className="fw-normal"><ConvertDateToString dateString={quiz.until} isDue={false} /></span></>;
        }
        else if (today > quizUntil) {
            return <>Closed</>;
        }
    };

    const removeQuiz = async (quizId: string) => {
        try {
            await client.deleteQuiz(quizId);
            dispatch(deleteQuiz(quizId));
        }
        catch (error: any) {
            setQuizError(error.response.data.message);
        }
    };

    const updateQuizStatus = async (quiz: any) => {
        try {
            const qz = { ...quiz, isPublished: !quiz.isPublished }
            await client.updateQuizById(quiz._id, qz);
            dispatch(updateQuiz(qz));
        }
        catch (err) {
            console.log(err);
        }
    };

    const publishAll = async () => {
        try {
            const updatePromises = quizzes.map(async (quiz: any) => {
                const qz = { ...quiz, isPublished: true };
                dispatch(updateQuiz(qz));
                return client.updateQuizById(quiz._id, qz);
            });
            await Promise.all(updatePromises);
        }
        catch (err: any) {
            setQuizError(err.response.data.message);
        }
    };

    const unpublishAll = async () => {
        try {
            const updatePromises = quizzes.map(async (quiz: any) => {
                const qz = { ...quiz, isPublished: false };
                dispatch(updateQuiz(qz));
                return client.updateQuizById(quiz._id, qz);
            });
            await Promise.all(updatePromises);
        }
        catch (err: any) {
            setQuizError(err.response.data.message);
        }
    };


    useEffect(() => {
        const fetchQuizzes = async () => {
            const quizzes = await client.findQuizzesForCourse(cid as string);
            const scores = await client.getUserQuizScores(currentUser._id);
            setUserScores(scores);
            dispatch(setQuizzes(quizzes));
        };
        fetchQuizzes();
    }, [cid, currentUser, userScores]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div id="wd-quizzes">
            {isFaculty &&
                <QuizzesControls
                    publishAll={() => publishAll()}
                    unpublishAll={() => unpublishAll()}
                />
            }
            <div id="wd-quizzes-title" className="px-2 pt-2 pb-2 bg-secondary mt-4">
                {quizError &&
                    <div id="wd-error-message" className="alert alert-danger mb-2 mt-2">
                        {quizError}
                    </div>}
                <h5 className="mt-2">
                    <GoTriangleDown className="me-1 fs-4" />
                    <span className="align-middle">Assignment Quizzes</span>
                </h5>
            </div>
            {isFaculty && quizzes?.length === 0 && <div className="alert alert-warning">No quizzes found. Click '+Quiz' to add a new quiz.</div>}
            <ul id="wd-quiz-list" className="list-group rounded-0 border-start border-3 border-success">
                {quizzes &&
                    quizzes?.map((quiz: any) => (
                        (isFaculty || quiz.isPublished) && (
                            <li key={quiz._id} id="wd-quiz-list-item" className="list-group-item p-3 ps-1 ">
                                <div className="d-flex align-items-start">
                                    <div className="mt-2">
                                        <MdOutlineRocketLaunch className="fs-4 text-success mx-2" />
                                    </div>
                                    <div id="wd-quiz-details" className="me-4 flex-grow-1">
                                        <div id="wd-quiz-link">
                                            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`} key={quiz._id}
                                                className="text-black fw-semibold link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                                {quiz?.title}
                                            </Link>
                                        </div>
                                        <div id="wd-quiz-details">
                                            <span className="fw-semibold">{getQuizStatus(quiz)}</span>&nbsp; | &nbsp;<span className="fw-semibold">Due</span> <ConvertDateToString dateString={quiz.due} isDue={true} />&nbsp; | &nbsp;{quiz.points} <span className="fw-semibold">pts</span>
                                            &nbsp; | &nbsp;{quiz?.questions?.length} <span className="fw-semibold">Questions</span>
                                            {!isFaculty && userScores?.length > 0 &&
                                                userScores.map((score: any) => (
                                                    score.quiz === quiz._id ? <>&nbsp; | &nbsp;<span className="fw-semibold">Score</span>: {score.score}</> : null
                                                ))
                                            }
                                        </div>
                                    </div>
                                    {isFaculty &&
                                        <span className="mt-1 align-middle">
                                            <QuizControlButtons
                                                quiz={quiz}
                                                quizTitle={quiz.title}
                                                qid={quiz._id}
                                                deleteQuiz={(qid: any) => removeQuiz(qid)}
                                                updateQuizStatus={(quiz: any) => updateQuizStatus(quiz)}
                                            />
                                        </span>
                                    }
                                </div>
                            </li>
                        )
                    ))
                }
            </ul>
        </div >
    );
}