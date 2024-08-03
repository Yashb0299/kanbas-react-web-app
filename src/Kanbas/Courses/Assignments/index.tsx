import { useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical, BsChevronDown } from "react-icons/bs";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FiFileText } from "react-icons/fi";
import "./Assignments.css";
import { setAssignments, deleteAssignment, updateAssignment } from "./reducer";
import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAssignments = useCallback(async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  }, [cid, dispatch]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const handleAddAssignment = () => {
    const newAssignmentId = "new"; // Use 'new' to indicate a new assignment
    navigate(`/Kanbas/Courses/${cid}/Assignments/${newAssignmentId}`);
  };

  const removeAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  const saveAssignment = async (assignment: any) => {
    await client.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  return (
    <div id="wd-assignments" className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="input-group" style={{ width: "300px" }}>
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            id="wd-search-assignment"
            className="form-control"
            placeholder="Search..."
          />
        </div>
        <div>
          <button className="btn btn-secondary me-2">
            <FaPlus className="me-1" /> Group
          </button>
          <button className="btn btn-danger" onClick={handleAddAssignment}>
            <FaPlus className="me-1" /> Assignment
          </button>
        </div>
      </div>
      <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <BsGripVertical className="me-2 fs-3" />
          <BsChevronDown className="me-2 fs-3" />
          <h3 id="wd-assignments-title" className="m-0">
            ASSIGNMENTS
          </h3>
        </div>
        <div className="d-flex align-items-center">
          <span
            className="badge bg-light text-dark me-2"
            style={{ borderRadius: "15px", padding: "0.5em 1em" }}
          >
            40% of Total
          </span>
          <button className="btn btn-secondary btn-sm">
            <FaPlus />
          </button>
          <IoEllipsisVertical className="ms-2 fs-5" />
        </div>
      </div>
      <ul id="wd-assignment-list" className="list-group rounded-0 mt-3">
        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <li
              className="wd-assignment-list-item list-group-item d-flex align-items-start mb-3 border position-relative"
              key={assignment._id}
            >
              <div
                className="border-start border-3 border-success position-absolute h-100"
                style={{ left: 0 }}
              ></div>
              <div className="d-flex align-items-center pe-2 me-2">
                <BsGripVertical className="me-2 fs-3" />
                <FiFileText className="fs-3" />
              </div>
              <div className="flex-fill">
                {!assignment.editing && (
                  <>
                    <a
                      className="wd-assignment-link fw-bold text-dark text-decoration-none"
                      href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </a>
                    <p className="mb-1">
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <span className="text-muted">Not available until</span>{" "}
                      {assignment.availableDate} at 12:00am
                    </p>
                    <p className="mb-1">
                      <span className="fw-bold">Due</span> {assignment.dueDate}{" "}
                      at 11:59pm | {assignment.points || 100} pts
                    </p>
                  </>
                )}
                {assignment.editing && (
                  <input
                    className="form-control w-50 d-inline-block"
                    onChange={(e) =>
                      saveAssignment({ ...assignment, title: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveAssignment({ ...assignment, editing: false });
                      }
                    }}
                    value={assignment.title}
                  />
                )}
              </div>
              <div className="icon-container">
                <button
                  onClick={() => removeAssignment(assignment._id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  <FaTrash className="text-danger" />
                </button>
                <GreenCheckmark />
              </div>
              <IoEllipsisVertical className="ms-2 fs-5" />
            </li>
          ))}
      </ul>
    </div>
  );
}
