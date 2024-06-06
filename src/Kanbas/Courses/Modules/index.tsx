import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
export default function Modules() {
    const modulesData = [
        {
            week: "Week 1",
            lessons: [{ title: "LEARNING OBJECTIVES", content: ["Introduction to the course", "Learn what is Web Development"] },
                { title: "READING", content: ["Full Stack Developer - Chapter 1", "Full Stack Developer - Chapter 2"] },
                { title: "SLIDE", content: ["Intro to Web Development", "Creating a React App"] }]
        },
        {
            week: "Week 2",
            lessons: [{title: "LEARNING OBJECTIVES", content: ["CSS Styling, Bootstrap"]},
                {title: "READINGS", content: ["Full Stack Developer - Chapter 3"]},
                {title: "SLIDES", content: ["Intro to HTML"]},]
        },
        {
            week: "Week 3",
            lessons: [{title: "LEARNING OBJECTIVES", content: ["Ndoe", "Client/ Server"]}]
        },
        {
            week: "Week 4",
            lessons: [{title: "LEARNING OBJECTIVES", content: ["MongoDB", "Database"]}]
        },
        {
            week: "Week 5",
            lessons: [{title: "LEARNING OBJECTIVES", content: ["Third Party API", "Integrating with Napter"]}]
        }
    ];

    return (
        <div id="modulesContainer">
            <ModulesControls /><br /><br /><br /><br />
            <ul className="list-group rounded-0">
                {modulesData.map((module, index) => (
                    <li key={index} className="list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            {module.week}
                            <ModuleControlButtons />
                        </div>
                        <ul className="wd-lessons list-group rounded-0">
                            {module.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="wd-lesson list-group-item p-3 ps-1">
                                    <BsGripVertical className="me-2 fs-3" />
                                    {lesson.title}
                                    <LessonControlButtons />
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}