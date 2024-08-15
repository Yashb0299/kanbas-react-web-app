import { FaPlus } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import GreenCheckmark from "../Modules/GreenCheckmark";
import CancelIcon from "../Modules/CancelIcon";

export default function QuizzesControls(
    { publishAll, unpublishAll }: { publishAll: () => void, unpublishAll: () => void }
) {
    const { cid } = useParams();
    const navigate = useNavigate();

    const addQuiz = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/NewQuiz`);
    };
    return (
        <>
            <div id="wd-quiz-controls">
                <button id="wd-quiz-context" className="btn btn-secondary float-end" data-bs-toggle="dropdown">
                    <HiDotsVertical className="align-middle" />
                </button>
                <button id="wd-quiz-add" className="btn btn-danger float-end me-1" onClick={addQuiz}>
                    <FaPlus /> <span className="align-middle">Quiz</span>
                </button>
                <input type="text" id="wd-quiz-search" className="form-control float-start w-50" placeholder="Search for Quiz" />
                <ul className="dropdown-menu">
                    <li>
                        <span id="wd-publish-all-modules-and-items-btn" className="dropdown-item" onClick={publishAll}>
                            <GreenCheckmark />
                            Publish all
                        </span>
                    </li>
                    <li>
                        <span id="wd-publish-all-modules-and-items-btn" className="dropdown-item" onClick={unpublishAll}>
                            <CancelIcon />
                            Unpublish all
                        </span>
                    </li>
                </ul>
            </div > <br /><br />
            <hr />
        </>
    );
}