import "./index.css"
import React, { ReactNode } from "react";
import { useParams} from "react-router";

export default function CoursesNavigation({a}:{a:ReactNode}) {
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades"];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let temp = false
    const { id } = useParams();
    console.log("in test id= " + id)
    return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">

            {
                links.map(x => (
                    <a id="wd-course-home-link"
                       href = {`#/Kanbas/Courses/${a}/${x}`}
                       className = {`list-group-item border border-0 ${x==="Home"? "active": "text-danger"}`}>
                        {x}</a>
                ))
            }
        </div>
    );
}