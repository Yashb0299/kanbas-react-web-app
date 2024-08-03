import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsChevronDown } from "react-icons/bs";
import { addAssignment, updateAssignment } from "./reducer";
import * as client from "./client";
import "./Assignments.css";

const formatDate = (date: string): string => {
  const [month, day] = date.split(" ");
  const monthMap: { [key: string]: string } = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  return `${monthMap[month]}/${day.padStart(2, "0")}/2024`;
};

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingAssignment = assignments.find(
    (a: any) => a._id === aid && a.course === cid
  );

  const [assignment, setAssignment] = useState(
    existingAssignment || {
      _id: aid,
      title: "",
      course: cid,
      availableDate: "Jan 1",
      dueDate: "Jan 7",
      availableUntil: "Jan 8",
      description: "",
      points: 100,
      assignmentGroup: "ASSIGNMENTS",
      displayGrade: "Percentage",
      submissionType: "Online",
    }
  );

  useEffect(() => {
    if (!existingAssignment && aid !== "new") {
      const fetchAssignment = async () => {
        const fetchedAssignment = await client.fetchAssignment(aid as string);
        if (fetchedAssignment) {
          setAssignment(fetchedAssignment);
        }
      };
      fetchAssignment();
    }
  }, [aid, existingAssignment]);

  const handleSave = async () => {
    if (aid === "new") {
      const newAssignment = await client.createAssignment(
        cid as string,
        assignment
      );
      dispatch(addAssignment(newAssignment));
    } else {
      await client.updateAssignment(assignment);
      dispatch(updateAssignment(assignment));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container mt-3">
      <div className="mb-3">
        <label htmlFor="wd-name">
          <b>Assignment Name</b>
        </label>
        <input
          id="wd-name"
          className="form-control"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="wd-description">
          <b>Description</b>
        </label>
        <textarea
          id="wd-description"
          className="form-control"
          value={assignment.description}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-points">
            <b>Points</b>
          </label>
          <input
            id="wd-points"
            className="form-control"
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({ ...assignment, points: e.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-assignment-group">
            <b>Assignment Group</b>
          </label>
          <div className="input-group">
            <select
              id="wd-assignment-group"
              className="form-control"
              value={assignment.assignmentGroup}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  assignmentGroup: e.target.value,
                })
              }
            >
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>DISCUSSIONS</option>
              <option>PROJECTS</option>
              <option>EXAMS</option>
            </select>
            <span className="input-group-text">
              <BsChevronDown />
            </span>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-display-grade">
            <b>Display Grade as</b>
          </label>
          <div className="input-group">
            <select
              id="wd-display-grade"
              className="form-control"
              value={assignment.displayGrade}
              onChange={(e) =>
                setAssignment({ ...assignment, displayGrade: e.target.value })
              }
            >
              <option>Percentage</option>
              <option>Complete/Incomplete</option>
              <option>Points</option>
              <option>Letter Grade</option>
              <option>GPA Scale</option>
            </select>
            <span className="input-group-text">
              <BsChevronDown />
            </span>
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-submission-type">
            <b>Submission Type</b>
          </label>
          <div className="input-group">
            <select
              id="wd-submission-type"
              className="form-control"
              value={assignment.submissionType}
              onChange={(e) =>
                setAssignment({ ...assignment, submissionType: e.target.value })
              }
            >
              <option>Online</option>
              <option>Offline</option>
            </select>
            <span className="input-group-text">
              <BsChevronDown />
            </span>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-due-date">
            <b>Due Date</b>
          </label>
          <input
            id="wd-due-date"
            className="form-control"
            type="text"
            value={assignment.dueDate}
            onChange={(e) =>
              setAssignment({ ...assignment, dueDate: e.target.value })
            }
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-available-from-date">
            <b>Available From</b>
          </label>
          <input
            id="wd-available-from-date"
            className="form-control"
            type="text"
            value={assignment.availableDate}
            onChange={(e) =>
              setAssignment({ ...assignment, availableDate: e.target.value })
            }
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="wd-available-until-date">
          <b>Available Until</b>
        </label>
        <input
          id="wd-available-until-date"
          className="form-control"
          type="text"
          value={assignment.availableUntil}
          onChange={(e) =>
            setAssignment({ ...assignment, availableUntil: e.target.value })
          }
        />
      </div>
      <div className="d-flex justify-content-end">
        <button onClick={handleCancel} className="btn btn-secondary me-2">
          Cancel
        </button>
        <button onClick={handleSave} className="btn btn-danger">
          Save
        </button>
      </div>
    </div>
  );
}
