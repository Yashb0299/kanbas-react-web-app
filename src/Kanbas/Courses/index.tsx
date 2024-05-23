import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes } from "react-router";
export default function Courses() {
    return (
        <div id="wd-courses">
            <h2>Course 5010</h2>
            <hr />
            <table>
                <tbody>
                    <tr>
                        <td valign="top">
                            <CoursesNavigation />
                        </td>
                        <td valign="top">
                            <Routes>
                                <Route path="/" element={<Navigate to="Home" />} />
                                <Route path="Home" element={<Home/>} />
                                <Route path="Modules" element={<Modules/>} />
                                <Route path="Assignments" element={<Assignments/>} />
                                <Route path="Assignments/:id" element={<AssignmentEditor/>} />
                            </Routes>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}