import React from "react";
import {
  FaFileImport,
  FaFileExport,
  FaCog,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { Table, InputGroup, FormControl, Button } from "react-bootstrap";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Grades() {
  const { cid } = useParams();
  const enrollments = db.enrollments.filter(
    (enrollment) => enrollment.course === cid
  );
  const assignments = db.assignments.filter(
    (assignment) => assignment.course === cid
  );
  const users = db.users;
  const grades = db.grades;

  const getStudentName = (studentId: string) => {
    const student = users.find((user) => user._id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : "";
  };

  const getGrade = (studentId: string, assignmentId: string) => {
    const grade = grades.find(
      (grade) =>
        grade.student === studentId && grade.assignment === assignmentId
    );
    return grade ? `${grade.grade}%` : "N/A";
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex">
          <div className="me-3">
            <label>
              <b>Student Names</b>
            </label>
            <InputGroup>
              <Button variant="outline-secondary">
                <FaSearch />
              </Button>
              <FormControl
                placeholder="Search Students"
                className="form-control"
              />
              <Button variant="outline-secondary">
                <FaChevronDown />
              </Button>
            </InputGroup>
          </div>
        </div>
        <div className="d-flex align-items-start">
          <div className="me-3">
            <label>
              <b>Assignment Names</b>
            </label>
            <InputGroup>
              <Button variant="outline-secondary">
                <FaSearch />
              </Button>
              <FormControl
                placeholder="Search Assignments"
                className="form-control"
              />
              <Button variant="outline-secondary">
                <FaChevronDown />
              </Button>
            </InputGroup>
          </div>
          <Button
            variant="outline-secondary"
            className="me-2 d-flex align-items-center"
          >
            <FaFileImport className="me-1" /> Import
          </Button>
          <Button
            variant="outline-secondary"
            className="me-2 d-flex align-items-center"
          >
            <FaFileExport className="me-1" /> Export
          </Button>
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center"
          >
            <FaCog />
          </Button>
        </div>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Student Name</th>
              {assignments.map((assignment) => (
                <th key={assignment._id}>
                  {assignment.title}
                  <br />
                  Out of 100
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.user}>
                <td className="text-danger">
                  {getStudentName(enrollment.user)}
                </td>
                {assignments.map((assignment) => (
                  <td key={assignment._id}>
                    {getGrade(enrollment.user, assignment._id)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
