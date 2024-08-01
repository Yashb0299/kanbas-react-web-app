import {useLocation, useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateAssignment} from "./reducer";
import * as client from "./client";

export default function AssignmentsEditor() {
    const {cid} = useParams();
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const router = useNavigate();

    const aid = pathname.split("/").pop();
    // const assignment = assignments.find(a => a._id === aid);

    const {assignments} = useSelector((state: any) => state.assignmentsReducer);
    const curAssignment = assignments.find((item: any) => item._id === aid);
    console.log(curAssignment)

    const [assignment, setAssignment] = useState({
        ...curAssignment
    });

    // setAssignment({...curAssignment})

    const handleChange = (e: any) => {
        const value = e.target.value;
        setAssignment({...assignment, [e.target.name]: value});
    };

    const saveModule = async (assignment: any) => {
        const status = await client.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
        router(`/Kanbas/Courses/${cid}/Assignments`);
    };

    const handleUpdateAssignment = () => {
        saveModule(assignment)
    }

    return (
        <div id="wd-assignments-editor">
            <div className="container">
                <div className="row input-group mb-2">
                    <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                    <input id="wd-name" className="form-control" name="title" value={assignment?.title}
                           onChange={handleChange}/>
                </div>

                <div className="row input-group mb-2">
                      <textarea id="wd-description" className="form-control" rows={10} cols={60} name="description"
                                onChange={handleChange}>
                            {assignment?.description}
                        </textarea>
                </div>

                <div className="row mb-2">
                    <div className="col-3">
                        <label htmlFor="wd-points" className="col-form-label float-end">Points</label>
                    </div>
                    <div className="col">
                        <input id="wd-points" type="number" className="form-control" name="points"
                               onChange={handleChange} value={assignment?.points}/>
                    </div>
                </div>

                {/*<div className="row mb-2">*/}
                {/*    <div className="col-3">*/}
                {/*        <label htmlFor="wd-group" className="col-form-label float-end">Assignment Group</label>*/}
                {/*    </div>*/}
                {/*    <div className="col">*/}
                {/*        <select id="wd-group" className="form-control">*/}
                {/*            <option value="">ASSIGNMENTS</option>*/}
                {/*        </select>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="row mb-2">*/}
                {/*    <div className="col-3">*/}
                {/*        <label htmlFor="wd-display-grade-as" className="col-form-label float-end">Display Grade*/}
                {/*            as</label>*/}
                {/*    </div>*/}
                {/*    <div className="col">*/}
                {/*        <select id="wd-display-grade-as" className="form-control">*/}
                {/*            <option value="">Percentage</option>*/}
                {/*        </select>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="row mb-2">*/}
                {/*    <div className="col-3">*/}
                {/*        <label htmlFor="wd-submission-type" className="col-form-label float-end">Submission Type</label>*/}
                {/*    </div>*/}
                {/*    <div className="col">*/}
                {/*        <div className="card">*/}
                {/*            <div className="card-body">*/}
                {/*                <div className="row">*/}
                {/*                    <select id="wd-submission-type" style={{width: '98%'}}*/}
                {/*                            className="form-control m-auto">*/}
                {/*                        <option selected value="online">Online</option>*/}
                {/*                    </select>*/}
                {/*                </div>*/}
                {/*                <div className="row mt-4">*/}
                {/*                    <label><b>Online Entry Options: </b></label>*/}
                {/*                </div>*/}
                {/*                <div className="row my-2 ms-1">*/}
                {/*                    <div className="form-check my-2 ">*/}
                {/*                        <input type="checkbox" name="text-entry" id="wd-text-entry"*/}
                {/*                               className="form-check-input"/>*/}
                {/*                        <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>*/}
                {/*                    </div>*/}
                {/*                    <div className="form-check my-2">*/}
                {/*                        <input type="checkbox" name="website-url" id="wd-website-url"*/}
                {/*                               className="form-check-input"/>*/}
                {/*                        <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>*/}
                {/*                    </div>*/}
                {/*                    <div className="form-check my-2">*/}
                {/*                        <input type="checkbox" name="media-recordings" id="wd-media-recordings"*/}
                {/*                               className="form-check-input"/>*/}
                {/*                        <label htmlFor="wd-media-recordings" className="form-check-label">Media*/}
                {/*                            Recordings</label>*/}
                {/*                    </div>*/}
                {/*                    <div className="form-check my-2">*/}
                {/*                        <input type="checkbox" name="student-annotation" id="wd-student-annotation"*/}
                {/*                               className="form-check-input"/>*/}
                {/*                        <label htmlFor="wd-student-annotation" className="form-check-label">Student*/}
                {/*                            Annotation</label>*/}
                {/*                    </div>*/}
                {/*                    <div className="form-check my-2">*/}
                {/*                        <input type="checkbox" name="file-upload" id="wd-file-upload"*/}
                {/*                               className="form-check-input"/>*/}
                {/*                        <label htmlFor="wd-file-upload" className="form-check-label">File*/}
                {/*                            Uploads</label>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}


                <div className="row mb-2">
                    <div className="col-3">
                        <label htmlFor="wd-assign" className="col-form-label float-end">Assign</label>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                {/*<div className="row">*/}
                                {/*    <label htmlFor="wd-assign-to" className="form-label"><b>Assign to</b></label>*/}
                                {/*    <div className="input-group">*/}
                                {/*        <button className="btn btn-light" style={{padding: '5px 10px'}}>Every one X</button>*/}
                                {/*        <input id="wd-assign-to" type="text" className="form-control"/>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="row mt-4">
                                    <label htmlFor="wd-due-date"><b>Due</b></label>
                                    <input id="wd-due-date" type="date" className="form-control"
                                           value={assignment?.due} onChange={handleChange} name="due"/>
                                </div>
                                <div className="row my-2">
                                    <div className="col">
                                        <label htmlFor="wd-available-from"><b>Available from</b></label>
                                        <input id="wd-available-from" type="date" className="form-control"
                                               value={assignment?.available} onChange={handleChange} name="available"/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="wd-available-until"><b>Until</b></label>
                                        <input id="wd-available-until" type="date" className="form-control"
                                               onChange={handleChange} name="until" value={assignment?.until}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <hr/>
                </div>

                <div className="mb-2">
                    <input type="button" className="btn btn-danger float-end ms-2" value="Save"
                           onClick={handleUpdateAssignment}/>
                    <Link key={'cancel'} to={`/Kanbas/Courses/${cid}/Assignments`}>
                        <input type="button" className="btn btn-secondary float-end" value="Cancel"/>
                    </Link>
                </div>

                <div className="row" style={{height: '30px', width: '100%'}}></div>
            </div>
        </div>
    )
}