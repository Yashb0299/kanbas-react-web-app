import { Link } from "react-router-dom";
import "./index.css";
import { useLocation } from "react-router";

export default function CoursesNavigation() {
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    const { pathname } = useLocation();
    return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
            {links?.map((link) => (
                <Link to={link} className={`list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}>
                    {link}
                </Link>
            ))}
        </div >
    );
}

