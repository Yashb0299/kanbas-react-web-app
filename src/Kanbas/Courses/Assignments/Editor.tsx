import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as client from "./client";

export default function AssignmentEditor() {
    const { aid, cid } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [updateError, setUpdateError] = useState(null);
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [assignment, setAssignment] = useState(assignments.find((assignment: any) => assignment._id === aid));
    const dispatch = useDispatch();

    const saveAssignmentUpdates = async (assignment: any) => {
        try {
            await client.updateAssignment(assignment);
            dispatch(updateAssignment(assignment));
        }
        catch (error: any) {
            setUpdateError(error.response.data.message);
        }
    };

    const createNewAssignment = async (assignment: any) => {
        const newAssignment = await client.createAssignment(cid as string, assignment);
        dispatch(addAssignment(newAssignment));
    };

    const newAssignment = useMemo(() => ({
        number: "A",
        title: "New Assignment",
        description: "New Assignment Description",
        course: cid,
        available: new Date().toLocaleDateString(),
        until: new Date().toLocaleDateString(),
        due: new Date().toLocaleDateString(),
        points: 100
    }), [cid]);

    const saveAssignment = () => {
        if (assignment !== undefined && assignment !== null) {
            if (assignments.filter((assignment: any) => assignment._id === aid).length === 0) {
                createNewAssignment({ ...newAssignment, number: assignment.number + (assignments.length + 1) });
            }
            else {
                saveAssignmentUpdates(assignment);
            }
        }
        navigateToAssignments();
    };

    const navigateToAssignments = () => {
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
    };

    useEffect(() => {
        if (pathname.includes("NewAssignment")) {
            setAssignment(newAssignment);
        }
    },
        [pathname, newAssignment]
    );
    return (
        <div id="wd-assignments-editor" >
            {updateError &&
                <div id="wd-error-message" className="alert alert-danger mb-2 mt-2">{updateError}</div>
            }
            <label htmlFor="wd-name" className="form-label">Assignment Name</label>
            <input id="wd-name" className="form-control mb-3" value={assignment?.title}
                onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
            <div>
                <textarea id="wd-description" className="form-control mb-3" style={{ height: "200px" }}
                    onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} >
                    {assignment?.description}
                </textarea>
            </div>

            <div className="d-block">
                <div className="mb-3 row">
                    <label htmlFor="wd-points" className="col-sm-4 col-form-label text-sm-end">
                        Points
                    </label>
                    <div className="col-sm-8 float-end">
                        <input id="wd-points" className="form-control" value={assignment?.points}
                            onChange={(e) => setAssignment({ ...assignment, points: e.target.value })} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="wd-group" className="col-sm-4 col-form-label text-sm-end">
                        Assignment Group
                    </label>
                    <div className="col-sm-8 float-end">
                        <select id="wd-group" className="form-select">
                            <option selected value="ASSIGNMENTS">
                                ASSIGNMENTS
                            </option>
                            <option value="QUIZZES">
                                QUIZZES
                            </option>
                            <option value="EXAMS">
                                EXAMS
                            </option>
                            <option value="PROJECT">
                                PROJECT
                            </option>
                        </select>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="wd-display-grade-as" className="col-sm-4 col-form-label text-sm-end">
                        Display Grade as
                    </label>
                    <div className="col-sm-8 float-end">
                        <select id="wd-display-grade-as" className="form-select">
                            <option selected value="PERCENTAGE">
                                Percentage
                            </option>
                            <option value="MARKS">
                                Marks
                            </option>
                            <option value="PERCENTILE">
                                Percentile
                            </option>
                            <option value="LETTER">
                                Letter
                            </option>
                        </select>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="wd-submission-type" className="col-sm-4 col-form-label text-sm-end">
                        Submission Type
                    </label>
                    <div className="col-sm-8 float-end">
                        <div className="border rounded-2 p-3">
                            <div>
                                <select id="wd-submission-type" className="form-select mb-3">
                                    <option selected value="ONLINE">
                                        Online
                                    </option>
                                    <option value="INPERSON">
                                        In Person
                                    </option>
                                    <option value="PRESENTATION">
                                        Presentation
                                    </option>
                                </select>
                            </div>
                            <div className="fw-bold mb-3 fs-6">
                                Online Entry Options
                            </div>
                            <div className="btn-group-vertical">
                                <div>
                                    <input type="checkbox" name="wd-online-entry" id="wd-text-entry" className="form-check-input" />
                                    <label htmlFor="wd-text-entry" className="form-label ps-2">Text Entry</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="wd-online-entry" id="wd-website-url" className="form-check-input" />
                                    <label htmlFor="wd-website-url" className="form-label ps-2">Website URL</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="wd-online-entry" id="wd-media-recordings" className="form-check-input" />
                                    <label htmlFor="wd-media-recordings" className="form-label ps-2">Media Recordings</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="wd-online-entry" id="wd-student-annotation" className="form-check-input" />
                                    <label htmlFor="wd-student-annotation" className="form-label ps-2">Student Annotation</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="wd-online-entry" id="wd-file-upload" className="form-check-input" />
                                    <label htmlFor="wd-file-upload" className="form-label ps-2">File Uploads</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3 row">
                <span className="col-sm-4 col-form-label text-sm-end">
                    Assign
                </span>
                <div className="col-sm-8 float-end">
                    <div className="border rounded-1 p-3">
                        <div className="mb-3">
                            <label htmlFor="wd-assign-to" className="form-label fw-bold fs-6">Assign to</label>
                            <input type="text" id="wd-assign-to" value={"Everyone"} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="wd-due-date" className="form-label fw-bold fs-6">Due</label>
                            <input type="date" value={assignment?.due?.split("T")[0]} id="wd-available-from" className="form-control"
                                onChange={(e) => setAssignment({ ...assignment, due: e.target.value })} />
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="wd-available-from" className="form-label fw-bold fs-6">Available from</label>
                                <input type="date" value={assignment?.available?.split("T")[0]} id="wd-available-from" className="form-control"
                                    onChange={(e) => setAssignment({ ...assignment, available: e.target.value })} />
                            </div>
                            <div className="col-6">
                                <label htmlFor="wd-available-until" className="form-label fw-bold fs-6">Until</label>
                                <input type="date" value={assignment?.until?.split("T")[0]} id="wd-available-from" className="form-control"
                                    onChange={(e) => setAssignment({ ...assignment, until: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <hr />
                <button id="wd-edit-save" className="float-end btn btn-danger mx-1" onClick={saveAssignment}>Save</button>
                <button id="wd-edit-cancel" className="float-end btn btn-secondary mx-1" onClick={navigateToAssignments}>Cancel</button>
            </div>
        </div>
    );
}

