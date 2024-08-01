import React from "react";
import {BsFillGearFill, BsFunnel} from "react-icons/bs";
import {BiImport} from "react-icons/bi";
import {LiaFileImportSolid} from "react-icons/lia";
import {assignments, enrollments, grades, users} from "../../Database"
import {useParams} from "react-router";

export default function Grades() {
    const {cid} = useParams();

    const student_ids = enrollments.filter((enrollment) => enrollment.course === cid);

    const students = student_ids.map((student_id) => users.find((user) => user._id === student_id.user));

    const assignments_list = assignments.filter((assignment) => assignment.course === cid);

    const grades_list = students.map((student) => {
        const student_grades = assignments_list.map((assignment) => {
            const grade = grades.find((grade) => grade.assignment === assignment._id && grade.student === student?._id);
            return grade ? grade.grade : "N/A"
        });
        return {
            ...student,
            grades: student_grades
        }
    });

    return (
        <div className="container">
            <button className="btn btn-secondary float-end">
                <BsFillGearFill className="fs-5"/>
            </button>
            <button className="btn btn-secondary float-end mx-2 dropdown-toggle">
                <BiImport className="me-2 fs-5"/>
                Export
            </button>
            <button className="btn btn-secondary float-end">
                <LiaFileImportSolid className="me-2 fs-5"/>
                Import
            </button>
            <br/>
            <div className="row mt-4">
                <div className="col">
                    <label htmlFor="wd-student-names" className="form-label"><b>Student Names</b></label>
                    <select id="wd-student-names" className="form-select">
                        <option selected>Search Students</option>
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="wd-assignment-names" className="form-label"><b>Assignment Names</b></label>
                    <select id="wd-assignment-names" className="form-select">
                        <option selected>Search Assignments</option>
                    </select>
                </div>
            </div>
            <div className="row my-3 row-cols-auto">
                <button className="btn btn-secondary ms-2">
                    <BsFunnel className="me-2"/>
                    Apply Filters
                </button>
            </div>
            <div className="row my-3">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle">
                        <thead>
                        <tr>
                            <th scope="col" className="fs-6 fw-normal" style={{width: "20%"}}>Student Name</th>
                            {
                                assignments_list && assignments_list.map((assignment) => (
                                    <th scope="col" className="fs-6 fw-normal text-center" style={{width: "20%"}}>
                                        {assignment.title}<br/>
                                        Out of {assignment.points}
                                    </th>
                                ))
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            grades_list && grades_list.map((student) => (
                                <tr>
                                    <th scope="row" className="text-danger">{student.firstName + " " + student.lastName}</th>
                                    {
                                        student.grades && student.grades.map((grade) => (
                                            <td className="text-center">{grade}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}