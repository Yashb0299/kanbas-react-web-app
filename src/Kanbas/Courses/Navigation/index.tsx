import React from "react";
import "./index.css";
import {useLocation, useParams} from "react-router";
import {Link} from "react-router-dom";


export default function CoursesNavigation() {
    const {pathname} = useLocation();
    const { cid } = useParams();
    const active = 'active';
    const inactive = 'text-danger';
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades","People"];

    return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link key={link} to={`/Kanbas/Courses/${cid}/${link}`}
                      className={`list-group-item border border-0 ${pathname.includes(link) ? active : inactive}`}>
                    {link}
                </Link>
            ))}
        </div>
    );
}