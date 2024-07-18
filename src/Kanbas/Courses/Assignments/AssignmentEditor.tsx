import {useLocation, useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addAssignment, updateAssignment} from "./reducer";
import * as client from "./client";

export default function AssignmentEditor() {
    const dispatch = useDispatch();
    const router = useNavigate();
    const {cid} = useParams();
    const {pathname} = useLocation();
    const aid = pathname.split("/").pop();
    const [assignment, setAssignment] = useState({
        course: cid,
        title: '',
        description: '',
        points: 100,
        due: '',
        available: '',
        until: ''
    });
    const handleChange = (e: any) => {
        const value = e.target.value;
        setAssignment({...assignment, [e.target.name]: value});
    };
    const createAssignment = async (assignment: any) => {
        const newModule = await client.createAssignment(cid as string, assignment);
        dispatch(addAssignment(newModule));
        router(`/Kanbas/Courses/${cid}/Assignments`);
    };
    const handleAddAssignment = () => {
        createAssignment(assignment);
    }
    return (
        <div id="wd-assignments-editor">
            <div className="container">
                <div className="row input-group mb-2">
                    <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                    <input id="wd-name" className="form-control" name="title" value={assignment.title}
                           onChange={handleChange}/>
                </div>
                <div className="row input-group mb-2">
                      <textarea id="wd-description" className="form-control" rows={10} cols={60}
                                onChange={handleChange} name="description">
                            {assignment.description}
                        </textarea>
                </div>
                <div className="row mb-2">
                    <div className="col-3">
                        <label htmlFor="wd-points" className="col-form-label float-end">Points</label>
                    </div>
                    <div className="col">
                        <input id="wd-points" type="number" name="points" className="form-control"
                               onChange={handleChange}
                               value={assignment.points}/>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-3">
                        <label htmlFor="wd-assign" className="col-form-label float-end">Assign</label>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <div className="row mt-4">
                                    <label htmlFor="wd-due-date"><b>Due</b></label>
                                    <input id="wd-due-date" type="date" className="form-control"
                                           value={assignment.due} name="due" onChange={handleChange}/>
                                </div>
                                <div className="row my-2">
                                    <div className="col">
                                        <label htmlFor="wd-available-from"><b>Available from</b></label>
                                        <input id="wd-available-from" type="date" className="form-control"
                                               value={assignment.available} name="available" onChange={handleChange}/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="wd-available-until"><b>Until</b></label>
                                        <input id="wd-available-until" type="date" name="until"
                                               className="form-control" value={assignment.until}
                                               onChange={handleChange}/>
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
                           onClick={handleAddAssignment}/>
                    <Link key={'cancel'} to={`/Kanbas/Courses/${cid}/Assignments`}>
                        <input type="button" className="btn btn-secondary float-end" value="Cancel"/>
                    </Link>
                </div>
                <div className="row" style={{height: '30px', width: '100%'}}></div>
            </div>
        </div>
    )
}