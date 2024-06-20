import "./styles.css"
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons"
import ModulesControls from "./ModulesControls"
import { LuBook } from "react-icons/lu";
import { useParams } from "react-router";
import * as db from "../../Database"

export default function Assignments() {
    const { cid } = useParams()
    console.log("Assignment aid = " + cid)
    const assignments = db.assignments
    console.log("Assignments is:" + assignments)
    console.log(assignments)
    return (
        <div id="wd-assignments">
            <ModulesControls />
            <br /><br />
            <ul id="wd-modules1" className="list-group rounded-0 border" >
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-4 ps-1 bg-secondary">
                        <div className = "row">
                            <div className = "col-1">
                                <BsGripVertical className="me-2 fs-3 float-left" />
                            </div>
                            <div className = "col-7">
                                ASSIGNMENTS
                            </div>
                            <div className = "col-2 border-gray rounded-5">
                                40% of Total
                            </div>
                            <div className = "col-sm">
                                +
                            </div>
                            <div className = "col-sm">
                                <LessonControlButtons  />
                            </div>
                        </div>
                    </div>
                    <ul id="wd-assignment-list" className="wd-lessons list-group rounded-0">
                        {
                            assignments.filter((assignment)=>assignment.course===cid)
                                .map(assignment =>(
                                    <li className="wd-lesson list-group-item p-3 ps-1">
                                        <div className="row">
                                            <div className = "col-sm">
                                                <BsGripVertical className="me-2 fs-3 float-left" />
                                            </div>
                                            <div className = "col-sm">
                                                <LuBook className="float-left"/>
                                            </div>
                                            <div className = "col-9">
                                                {
                                                    <a className = "wd-assignment-link"
                                                       href={`#/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}`}>
                                                        {assignment._id}-{assignment.title}</a>
                                                }
                                                <p> <span style={{color:"red"}}>
	  						    Multiple Modules
	  						    </span> | <b> Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100pts</p>
                                            </div>
                                            <div className = "col-1">
                                                <LessonControlButtons  />
                                            </div>
                                        </div>
                                    </li>))
                        }
                    </ul>
                </li>
            </ul>
        </div>
    );
}
