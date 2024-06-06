import Buttons from "./Buttons";
import { CiFilter } from "react-icons/ci";
import './style.css'
export default function Grades() {
    return (
        <div className="container mt-3">
            <div className="row mb-3">
                <div className="col-md-12 d-flex justify-content-end">
                    <Buttons />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    Student Names
                    <input type="text" className="form-control" placeholder="Search by Student Names" />
                </div>
                <div className="col-md-6">
                    Assignment Names
                    <input type="text" className="form-control" placeholder="Search by Assignment Names" />
                </div>
            </div>
            <div className="mb-4">
                <button className="btn btn-secondary btn-lg me-1" style={{ display: 'flex', alignItems: 'center' }}>
                    <CiFilter />
                    Filter
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Student Name</th>
                        <th className="uniform-cell">A1</th>
                        <th className="uniform-cell">A2</th>
                        <th className="uniform-cell">A3</th>
                        <th className="uniform-cell">A4</th>
                        <th className="uniform-cell">A5</th>
                        <th className="uniform-cell">A6</th>
                        <th className="uniform-cell">P1</th>
                        <th className="uniform-cell">X1</th>
                        <th className="uniform-cell">X2</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="text-red">Yash Bhuptani</td>
                        <td>90</td>
                        <td><input type="text" className="form-control" defaultValue="95"/></td>
                        <td>87</td>
                        <td><input type="text" className="form-control" defaultValue="92"/></td>
                        <td>85</td>
                        <td><input type="text" className="form-control" defaultValue="88"/></td>
                        <td>88</td>
                        <td><input type="text" className="form-control" defaultValue="90"/></td>
                        <td>85</td>
                    </tr>
                    <tr>
                        <td className="text-red">John Doe</td>
                        <td>90</td>
                        <td><input type="text" className="form-control" defaultValue="95"/></td>
                        <td>87</td>
                        <td><input type="text" className="form-control" defaultValue="92"/></td>
                        <td>63</td>
                        <td><input type="text" className="form-control" defaultValue="88"/></td>
                        <td>55</td>
                        <td><input type="text" className="form-control" defaultValue="90"/></td>
                        <td>85</td>
                    </tr>
                    <tr>
                        <td className="text-red">Jane Smith</td>
                        <td>100</td>
                        <td><input type="text" className="form-control" defaultValue="95"/></td>
                        <td>90</td>
                        <td><input type="text" className="form-control" defaultValue="92"/></td>
                        <td>85</td>
                        <td><input type="text" className="form-control" defaultValue="88"/></td>
                        <td>99</td>
                        <td><input type="text" className="form-control" defaultValue="90"/></td>
                        <td>85</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}