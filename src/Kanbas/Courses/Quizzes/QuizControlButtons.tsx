import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { FaBan, FaCheckCircle, FaCopy, FaTrash } from "react-icons/fa";
import QuizDeleteModal from "./QuizDeleteModal";

export default function QuizControlButtons(
    { quiz, quizTitle, qid, deleteQuiz, updateQuizStatus }:
        { quiz: any, quizTitle: string, qid: string, deleteQuiz: (qid: string) => void, updateQuizStatus: (quiz: any) => void }
) {
    const { cid } = useParams();

    return (
        <>
            <div className="float-end d-flex align-items-center">
                {quiz.isPublished ?
                    <FaCheckCircle className="fs-5 mx-2 mb-1 text-success" />
                    :
                    <FaBan className="fs-5 mx-2 mb-1 text-danger" onClick={() => updateQuizStatus(quiz)} />
                }
                <IoEllipsisVertical className="fs-3 dropdown" data-bs-toggle="dropdown" />
                <ul className="dropdown-menu text-bg-light">
                    <li>
                        <Link id="wd-edit-quiz" className="dropdown-item" to={`/Kanbas/Courses/${cid}/Quizzes/${quiz?._id}/Edit`}>
                            <FaPencil className="me-2 text-primary" />
                            <span className="align-middle">Edit</span>
                        </Link>
                    </li>
                    <li className="dropdown-item" data-bs-toggle="modal" data-bs-target={`#wd-delete-quiz-dialog-${qid}`} >
                        <FaTrash className="me-2 text-danger" />
                        <span className="align-middle">Delete</span>
                    </li>
                    <li className="dropdown-item" onClick={() => updateQuizStatus(quiz)}>
                        {!quiz.isPublished && (<>
                            <span className="me-2 text-success"><FaCheckCircle /></span>
                            <span className="align-middle">Publish</span>
                        </>)}
                        {quiz.isPublished && (<>
                            <span className="me-2 text-danger"><FaBan /></span>
                            <span className="align-middle">Unpublish</span>
                        </>)}
                    </li>
                    <li className="dropdown-item">
                        <span className="me-2 text-primary"><FaCopy /></span>
                        <span className="align-middle">Copy</span>
                    </li>
                </ul>
                <QuizDeleteModal dialogTitle={`Delete quiz: ${quizTitle}`} quizId={qid} deleteQuiz={deleteQuiz} />
            </div >
        </>
    );
}