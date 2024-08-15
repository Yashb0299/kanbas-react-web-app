import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import * as client from "../Courses/client";
import CourseEnrollModal from "./CourseEnrollModal";

export default function Dashboard() {
    const dispatch = useDispatch();

    const { courses } = useSelector((state: any) => state.coursesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [isFaculty, setIsFaculty] = useState(false);
    const [newEnrollment, setNewEnrollment] = useState(false);
    const [unenrolledCourses, setUnenrolledCourses] = useState<any>([]);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [error, setError] = useState("");

    const [course, setCourse] = useState<any>({
        name: "New Course",
        number: "CS",
        startDate: new Date(),
        endDate: new Date().setMonth(new Date().getMonth() + 3),
        image: "reactjs.jpg",
        description: "New Description",
        author: ""
    });

    const addNewCourse = async () => {
        try {
            const newCourse = await client.createCourse({ ...course, number: course?.number + currentUser._id + courses?.length + new Date().getTime(), author: currentUser._id });
            dispatch(addCourse(newCourse));
        }
        catch (e: any) {
            setError(e.message);
        }
    }

    const removeCourse = async (courseId: string) => {
        try {
            await client.deleteCourse(courseId);
            dispatch(deleteCourse(courseId));
        }
        catch (e: any) {
            setError(e.message);
        }
    };

    const updateCourseDetails = async () => {
        try {
            await client.updateCourse(course);
            dispatch(updateCourse(course));
        }
        catch (e: any) {
            setError(e.message);
        }
    };

    const fetchUnenrolledCourses = async () => {
        try {
            const unenrolledCourses = await client.fetchUnenrolledCourses(currentUser._id);
            setUnenrolledCourses(unenrolledCourses);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const addNewEnrollment = async () => {
        try {
            if (selectedCourse) {
                const response = await client.enrollCourse(selectedCourse._id, currentUser._id);
                if (response) {
                    dispatch(addCourse(selectedCourse));
                    setNewEnrollment(false);
                    setSelectedCourse(null); // Reset selected course after enrollment
                }
            } else {
                setError("Please select a course before enrolling.");
            }
        } catch (e: any) {
            setError(e.message);
        }
    };


    useEffect(() => {
        const fetchUserCourses = async () => {
            if (currentUser) {
                if (currentUser.role === "FACULTY") {
                    const authoredCourses = await client.fetchAuthoredCourses(currentUser._id);
                    dispatch(setCourses(authoredCourses));
                } else {
                    const enrolledCourses = await client.fetchEnrolledCourses(currentUser._id);
                    dispatch(setCourses(enrolledCourses));
                }
                setIsFaculty(currentUser.role === "FACULTY");
            }
        };
        fetchUserCourses();
    }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleCourseSelection = (e: any) => {
        const course = unenrolledCourses.find((course: any) => course._id === e.target.value);
        setSelectedCourse(course);
        setError("");
    };

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            {isFaculty ? (
                <>
                    <div id="wd-create-edit-course">
                        <h5>New Course
                            <button className="btn btn-primary float-end"
                                id="wd-add-new-course-click"
                                onClick={addNewCourse} >Add</button>
                            <button className="btn btn-warning float-end me-2"
                                onClick={updateCourseDetails} id="wd-update-course-click">
                                Update
                            </button>
                        </h5>
                        <br />
                    </div>
                    <input value={course.name} className="form-control mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                    <hr />
                    <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
                    <hr />
                    {error && <div className="alert alert-danger m-2">{error}</div>}
                </>
            ) : (
                <>
                    {!newEnrollment ? (
                        <div id="wd-enroll-course">
                            <button className="btn btn-danger" onClick={() => { setNewEnrollment(true); fetchUnenrolledCourses(); }}>Click here to enroll in a new course</button>
                            {error && <div className="alert alert-danger m-2">{error}</div>}
                        </div>
                    ) : (
                        <div id="wd-enroll-course">
                            <select className="form-select mb-2" value={selectedCourse?._id || ""} onChange={handleCourseSelection}>
                                <option value="">Select a course</option>
                                {unenrolledCourses.map((course: any) => (
                                    <option key={course._id} value={course._id}>{course.name}</option>
                                ))}
                            </select>
                            <button className="btn btn-primary me-1" disabled={!selectedCourse} onClick={() => setNewEnrollment(false)} data-bs-toggle="modal" data-bs-target={`#wd-enroll-course-dialog-${selectedCourse?._id}`}>Enroll</button>
                            <button className="btn btn-danger" onClick={() => setNewEnrollment(false)}>Cancel</button>
                        </div>
                    )}
                </>
            )}

            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course: any) => (
                        <div className="wd-dashboard-course col" key={course._id} style={{ width: "300px" }}>
                            <Link to={`/Kanbas/Courses/${course.number}/Home`} className="text-decoration-none">
                                <div className="card rounded-3 overflow-hidden h-100 d-flex flex-column">
                                    <img src={`/images/${course.image}`} height="160" alt={`${course.name}`} />
                                    <div className="card-body p-3">
                                        <span className="wd-dashboard-course-link" style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                            {course.name}
                                        </span>
                                        <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                                            {course.description}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-white p-3 border-0">
                                        <Link to={`/Kanbas/Courses/${course.number}/Home`} className="btn btn-primary">Go</Link>
                                        {isFaculty && (
                                            <>
                                                <button onClick={(event) => { event.preventDefault(); removeCourse(course._id); }} className="btn btn-danger float-end" id="wd-delete-course-click">Delete</button>
                                                <button id="wd-edit-course-click" onClick={(event) => { event.preventDefault(); setCourse(course); }} className="btn btn-warning me-2 float-end">Edit</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            {selectedCourse && (
                <CourseEnrollModal dialogTitle={`Enroll in Course: ${selectedCourse.name}`} course={selectedCourse} enrollCourse={addNewEnrollment} />
            )}
        </div>
    );
}
