import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function AssignmentsControls() {
    const navigate = useNavigate();

    const createNewAssignment = () => {
        navigate('NewAssignment');
    };

    return (
        <div id="wd-assignments-controls" className="d-flex justify-content-between align-items-center">
            <div className="d-flex">
                <div className="input-group me-2" style={{ width: "300px" }}>
                    <span className="input-group-text bg-white fs-3 rounded-0">
                        <CiSearch />
                    </span>
                    <input type="text" className="form-control border-start-0 rounded-0 text-start" placeholder="Search..." />
                </div>
            </div>
            <div className="d-flex">
                <button id="wd-collapse-all-btn" className="btn btn-lg me-1 btn-secondary">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Group
                </button>
                <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger"
                    onClick={createNewAssignment}>
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Assignment
                </button>
            </div>
        </div >
    );
}

