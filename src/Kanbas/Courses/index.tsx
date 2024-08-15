import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { RxHamburgerMenu } from "react-icons/rx";
import Grades from "./Grades";
import PeopleTable from "./People/Tables";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/Editor";
import Quiz from "./Quizzes/Quiz";
import QuizPreview from "./Quizzes/Preview";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FacultyAccess from "./FacultyAccess";

export default function Courses() {
    const { pathname } = useLocation();
    const { cid } = useParams();

    const { courses } = useSelector((state: any) => state.coursesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [course, setCourse] = useState<any>();


    useEffect(() => {
        const fetchCourseDetails = () => {
            if (currentUser) {
                const currentCourse = courses.find((course: any) => course.number === cid)
                setCourse(currentCourse);
            }
        };
        fetchCourseDetails();
    }, [courses, cid, currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div id="wd-courses">
            <div className="ps-1 d-flex">
                <h2 className="text-danger">
                    <RxHamburgerMenu className="me-5 mb-1 fs-1" />
                    {course && course.name} <span className="text-black"> &gt; {pathname.split("/")[4]}</span>
                </h2>
            </div>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>
                <div className="flex-fill p-5 container-fluid">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Piazza" element={<h1>Piazza</h1>} />
                        <Route path="Zoom" element={<h1>Zoom</h1>} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={
                            <FacultyAccess>
                                <AssignmentEditor />
                            </FacultyAccess>
                        } />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Quizzes/:qid" element={<Quiz />} />
                        <Route path="Quizzes/:qid/Edit" element={
                            <FacultyAccess>
                                <QuizEditor />
                            </FacultyAccess>} />
                        <Route path="Quizzes/:qid/Preview" element={
                            <FacultyAccess>
                                <QuizPreview />
                            </FacultyAccess>} />
                        <Route path="Quizzes/NewQuiz" element={
                            <FacultyAccess>
                                <QuizEditor />
                            </FacultyAccess>} />
                        <Route path="Grades" element={<Grades />} />
                        <Route path="People" element={<PeopleTable />} />
                        <Route path="People/:uid" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
