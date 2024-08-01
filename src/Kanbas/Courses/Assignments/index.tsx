import AssignmentsControls from "./AssignmentsControls";
import {BsGripVertical} from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import {BiCaretDown, BiEdit} from "react-icons/bi";
import LessonControlButtons from "./LessionControlButtons";
import {useParams} from "react-router";
import {addAssignment, deleteAssignment, setAssignments, updateAssignment} from "./reducer";
import {useSelector, useDispatch} from "react-redux";
import * as client from "./client";
import {useEffect} from "react";

export default function Assignments() {
    const {cid} = useParams();

    const {assignments} = useSelector((state: any) => state.assignmentsReducer);
    const cidAssignments = assignments.filter((assignment: any) => assignment.course === cid);
    const dispatch = useDispatch();

    // console.log(assignments)

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        const assignments = await client.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };


    const removeAssignment = async (moduleId: string) => {
        await client.deleteAssignment(moduleId);
        dispatch(deleteAssignment(moduleId));
    };

    return (
        <div id="wd-assignments">
            <AssignmentsControls cid={cid!}/>
            <ul id="wd-assignment-list" className="list-group rounded-0 my-4">
                <div className="wd-title p-3 ps-2 bg-secondary mb-4">
                    <BsGripVertical className="me-2 fs-3"/>
                    <BiCaretDown className="me-2"/>
                    Assignments
                    <AssignmentControlButtons/>
                </div>

                {
                    cidAssignments && cidAssignments.map((item: any) => (
                        <li className="wd-assignment-list-item list-group-item p-3" style={{borderLeft: "4px solid green"}}>
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <BsGripVertical className="fs-4"/>
                                </div>
                                <div className="col-auto">
                                    <a className="wd-assignment-link text-dark link-underline link-underline-opacity-0"
                                       href={`#/Kanbas/Courses/${cid}/Assignments/${item._id}`}>
                                        <BiEdit className="text-success fs-4"/>
                                    </a>

                                </div>
                                <div className="col">
                                    <a className="wd-assignment-link text-dark link-underline link-underline-opacity-0"
                                       href={`#/Kanbas/Courses/${cid}/Assignments/${item._id}`}>
                                        <h5><b>{item.title}</b></h5>
                                    </a>
                                    <p>
                                        <span className="text-danger"> Multiple Modules </span>
                                        | <b>Available
                                        from</b> {item.available} | <b>Until</b> {item.until} | <b>Due</b> {item.due} | {item.points} pts
                                    </p>
                                </div>
                                <div className="col float-end">
                                    <LessonControlButtons assignmentId={item._id}
                                                          deleteAssignment={(assignmentId) => {
                                                              removeAssignment(assignmentId)
                                                          }}/>
                                </div>
                            </div>
                        </li>
                    ))

                }
            </ul>
        </div>
    );
}