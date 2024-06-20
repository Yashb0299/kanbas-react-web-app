import ModulesControls from "./ModulesControls"
import * as db from "../../Database"

export default function Grades() {
    const grades = db.grades
    const users = db.users

    let a = "A101"
    let b = "A102"
    let c = "A201"
    let d = "A202"
    return (
        <div>
            <ModulesControls />
            <div className="row">
                <div className="col-6">
                    <label htmlFor="wd-available-from"> <b>Student Names</b> </label>
                    <div className="col-sm-10">
                        <select className = "form-select">
                            <option selected>&#128269; Search Students</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="wd-available-from"><b>Assignment Names</b> </label>
                    <div className="col-sm-10">
                        <select className = "form-select">
                            <option selected>&#128269; Search Assignment</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
            </div>
            <br />
            <button id="wd-all-good"  className = "btn btn-secondary btn-lg me-1 float-left"> Apply Filters </button>
            <div id="wd-css-styling-tables">
                {
                    <table className="table">
                        <thead>
                        <tr className="table-secondary">
                            <th>Student Name</th>
                            <th>Assignment {a}</th>
                            <th>Assignment {b}</th>
                            <th>Assignment {c}</th>
                            <th>Assignment {d}</th></tr>
                        </thead>
                        <tbody className="align-middle">
                        {grades.map((grade)=>(
                            <tr className="table-gray">
                                <td>{grade.student}</td>
                                {/* eslint-disable-next-line eqeqeq */}
                                <td className="align-middle">{a==grade.assignment?grade.grade:"---"}</td>
                                {/* eslint-disable-next-line eqeqeq */}
                                <td>{b==grade.assignment?grade.grade:"---"}</td>
                                {/* eslint-disable-next-line eqeqeq */}
                                <td>{c==grade.assignment?grade.grade:"---"}</td>
                                {/* eslint-disable-next-line eqeqeq */}
                                <td>{d==grade.assignment?grade.grade:"---"}</td>
                            </tr>)
                        )
                        }
                        <tr className="table-secondary">
                            <td>Christina Allen</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                        </tr>
                        <tr className="table-gray">
                            <td>Samreen Ansari</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                        </tr>
                        <tr className="table-secondary"> 
                            <td>Han Bao</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>88.08%</td>
                            <td>98.99%</td>
                        </tr>
                        <tr className="table-gray"> 
                            <td>Mahi Sai Srinivas Bobbili</td>
                            <td>100%</td>
                            <td>96.67%</td>
                            <td>98.37%</td>
                            <td>100%</td>
                        </tr>
                        <tr className="table-secondary">
                            <td>Siran Cao</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                            <td>100%</td>
                        </tr>
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}