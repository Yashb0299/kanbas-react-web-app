import React, {useState} from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER

export default function WorkingWithObjects() {
	const [assignment, setAssignment] = useState(
		{
			id:1,
			title: "NodeJS Assignment",
			description:"Create a NodeJS server with ExpressJS",
			due: "2024-06-10",
			complete: false,
			score: "0"
		}
	)
	const [module, setModule] = useState(
		{
			id: "module001",
			name: "full stack module",
			description: "learning full stack development and gain new abilities",
			course: "CS5610"
		}
	)
	const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
	return(
		<div id="wd-working-with-objects">
			<h3>Working With Objects</h3>
			<h4>Retrieving Objects</h4>
			<a id="wd-retrieve-assignments"
			   className="btn btn-primary"
			   href={`${REMOTE_SERVER}/lab5/assignment`}>
			   Get Assignment
			</a>
			<hr/>
			<h4>Retrieving Properties</h4>
			<a id="wd-retrieve-assignment-title"
			   className="btn btn-primary"
			   href={`${REMOTE_SERVER}/lab5/assignment/title`}>
			   Get Title
			</a>
			<hr/>
			<h4>Modifying Properties</h4>
			<a id ="wd-update_assignment-title"
			   className="btn btn-primary  float-end "
			   href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
			   Update Title
			</a>
			<input className="form-control w-75"
			       id="wd-assignment-title"
			       value={assignment.title}
			       onChange={e=>setAssignment({...assignment, title:e.target.value})}/>			
			<hr/>
			<a id ="wd-update_assignment-score"
			   className="btn btn-primary  float-end "
			   href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
			   Update Score
			</a>
			<input className="form-control w-75"
			       id="wd-assignment-score"
			       value={assignment.score}
			       onChange={e=>setAssignment({...assignment, score:e.target.value})}/>			
			<hr/>
			<a id ="wd-update_assignment-score"
			   className="btn btn-primary  float-end w-25"
			   href={`${ASSIGNMENT_API_URL}/complete/${assignment.complete}`}>
			   Update Complete
			</a>
			<input className="form-check-input "
			       id="wd-assignment-complete"
			       value= "true"
			       type="checkbox"
			       onChange={e=>setAssignment({...assignment, complete:e.target.value=="true"})}/>	
			<label htmlFor="wd-assignment-complete"
			       className="form-check-label"> Complete </label>	
			<input className="form-check-input"
			       id="wd-assignment-not-complete"
			       value= "false"
			       type="checkbox"
			       onChange={e=>setAssignment({...assignment, complete:e.target.value=="true"})}/>	
			<label htmlFor="wd-assignment-not-complete"
			       className="form-check-label"> Not Complete </label>
			<hr/>
			<h4>Retrieving Module</h4>
			<a id="wd-retrieve-module"
			   className="btn btn-primary"
			   href={`${REMOTE_SERVER}/lab5/module`}>
			   Get Module
			</a>
			<hr/>
			<h4>Retrieving Module Name</h4>
			<a id="wd-retrieve-module-name"
			   className="btn btn-primary"
			   href={`${REMOTE_SERVER}/lab5/module/name`}>
			   Get Module Name
			</a>
			<hr/>
			<a id ="wd-update_assignment-title"
			   className="btn btn-primary  float-end w-25"
			   href={`${REMOTE_SERVER}/lab5/module/name/${module.name}`}>
			   Update Module Name
			</a>
			<input className="form-control w-75"
			       id="wd-module-change-name"
			       value={module.name}
			       onChange={e=>setModule({...module, name:e.target.value})}/>			
			<hr/>
			<h4>Modifying Module Description</h4>
			<a id ="wd-update-module-description"
			   className="btn btn-primary float-end w-25"
			   href={`${REMOTE_SERVER}/lab5/module/description/${module.description}`}>
			   Update Module Description
			</a>
			<input className="form-control w-75"
			       id="wd-module-change-module-description"
			       value={module.description}
			       onChange={e=>setModule({...module, description:e.target.value})}/>			
			<hr/>
		</div>
	)
}