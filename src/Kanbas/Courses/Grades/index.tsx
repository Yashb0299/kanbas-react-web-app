import ModulesControls from "./ModulesControls"
export default function Grades() {
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
                <table className="table">
                    <thead>
                    <tr className="table-secondary">
                        <th>Student Name</th>
                        <th>A1 Setup<br />Out of 100</th>
                        <th>A2 HTML<br />Out of 100</th>
                        <th>A3 CSS<br />Out of 100</th>
                        <th>A4 BOOTSTRAP<br />Out of 100</th></tr>
                    </thead>
                    <tbody className="align-middle">
                    <tr className="table-gray">
                        <td>Jane Adams</td>
                        <td className="align-middle">100%</td>
                        <td>96.67%</td>
                        <td>92.81%</td>
                        <td>66.22%</td>
                    </tr>
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
            </div>

        </div>
    );
}