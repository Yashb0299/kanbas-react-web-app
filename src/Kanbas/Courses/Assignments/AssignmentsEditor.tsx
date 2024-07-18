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
    const {assignments} = useSelector((state: any) => state.assignmentsReducer);
    const curAssignment = assignments.find((item: any) => item._id === aid);
    console.log(curAssignment)
    const [assignment, setAssignment] = useState({
        ...curAssignment
    });
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