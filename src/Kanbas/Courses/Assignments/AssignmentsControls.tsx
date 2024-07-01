import React from "react";
import {FaPlus} from "react-icons/fa6";
import {Link} from "react-router-dom";

export default function AssignmentsControls({cid}: {cid: string}) {
    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <div className="row">
                <div className="col">
                    <div id="wd-search-assignment">
                        <input id="wd-search-assignment-input" type="text" placeholder="Search..." className="form-control"/>
                    </div>
                </div>
                <div className="col">
                    <Link id="wd-add-assignment-btn" to={`/Kanbas/Courses/${cid}/Assignments/add`} className="btn btn-lg btn-danger me-1 float-end">
                        <FaPlus className="position-relative me-2" style={{bottom: "1px"}}/>
                        Assignment
                    </Link>
                    <button id="wd-add-group-btn" className="btn btn-lg btn-secondary me-1 float-end">
                        <FaPlus className="position-relative me-2" style={{bottom: "1px"}}/>
                        Group
                    </button>
                </div>
            </div>
        </div>
    )
}