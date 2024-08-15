import { CiFilter, CiSearch } from "react-icons/ci";
import GradeControls from "./GradeControls";
import * as db from "../../Database";
import { useParams } from "react-router";

export default function Grades() {
    const { cid } = useParams();
    const grades = db.grades;
    const assignments = db.assignments.filter((assignment) => assignment.course === cid);
    const enrollments = db.enrollments.filter((enrollment) => enrollment.course === cid);
    const users = db.users;

    return (
        <div id="wd-grade">
            <GradeControls /><br /><br /><br /><br />
            <div id="wd-grades-search-filters" className="row">
                <div className="col-sm-6 mb-3">
                    <label id="wd-student-name" htmlFor="student-name" className="form-label fw-semibold">
                        Student Names
                    </label>
                    <div className="input-group me-2">
                        <span className="input-group-text bg-white fs-3 rounded-start">
                            <CiSearch />
                        </span>
                        <input type="text" placeholder="Search Students" className="form-control border-start-0" />
                    </div>
                </div>
                <div className="col-sm-6 mb-3">
                    <label id="wd-assignment-name" htmlFor="assignment-name" className="form-label fw-semibold">
                        Assignment Names
                    </label>
                    <div className="input-group me-2">
                        <span className="input-group-text bg-white fs-3 rounded-start">
                            <CiSearch />
                        </span>
                        <input type="text" placeholder="Search Assignments" className="form-control border-start-0" />
                    </div>
                </div>
                <div id="wd-grades-apply-filter" className="mb-3">
                    <button id="wd-grade-filter-btn" className="btn btn-secondary">
                        <CiFilter className="fs-4 me-1" />
                        Apply Filters
                    </button>
                </div>
            </div>
            <div id="wd-grades-table" className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="align-middle" style={{ minWidth: '200px' }}>Student Name</th>
                            {assignments?.map((assignment) => (
                                <th className="align-middle text-center" style={{ minWidth: '200px' }}>{assignment?.title}<br />Out of {assignment.points}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments?.map((enrollment) => {
                            const user = users.find((user) => user._id === enrollment.user);
                            return (
                                <tr>
                                    <td className="text-danger">{user?.firstName} {user?.lastName}</td>
                                    {assignments?.map((assignment) => {
                                        const grade = grades.find((grade) =>
                                            grade.student === enrollment.user && grade.assignment === assignment.number);
                                        return (
                                            <td className="align-middle text-center">{grade?.grade}</td>
                                        );
                                    })}
                                </tr>);
                        })}
                    </tbody >
                </table>
            </div>
        </div>
    );
}