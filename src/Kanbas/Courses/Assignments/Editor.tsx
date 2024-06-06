import React from 'react';
export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className="editor-container container">
            <div className="row mb-3">
                <label htmlFor="wd-name" className="col-sm-12 col-form-label">Assignment Name</label>
                <div className="col-sm-12">
                    <input id="wd-name" className="form-control" value="A1 - ENV + HTML" />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="wd-description" className="col-sm-12 col-form-label">Description</label>
                <div className="col-sm-12">
          <textarea id="wd-description" className="form-control">
            The assignment is available online. Submit a link to the landing page of
          </textarea>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="wd-points" className="col-sm-3 col-form-label text-end">Points</label>
                <div className="col-sm-9">
                    <input id="wd-points" className="form-control" value={100} />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="wd-group" className="col-sm-3 col-form-label text-end">Assignment Group</label>
                <div className="col-sm-9">
                    <select id="wd-group" className="form-control">
                        <option selected value="assignment">Assignment</option>
                        <option value="project">Project</option>
                        <option value="quiz">Quiz</option>
                        <option value="exam">Exam</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="wd-display-grade-as" className="col-sm-3 col-form-label text-end">Display Grade as</label>
                <div className="col-sm-9">
                    <select id="wd-display-grade-as" className="form-control">
                        <option selected value="points">Points</option>
                        <option value="percentage">Percentage</option>
                        <option value="pass">P/NP</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="wd-submission-type" className="col-sm-3 col-form-label text-end">Submission Type</label>
                <div className="col-sm-9">
                    <select id="wd-submission-type" className="form-control">
                        <option selected value="online">Online</option>
                        <option value="paper">Paper</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-3 col-form-label text-end">Online Entry Options</label>
                <div className="col-sm-9">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="wd-text-entry" />
                        <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="wd-website-url" />
                        <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="wd-media-recordings" />
                        <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="wd-student-annotation" />
                        <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="wd-file-upload" />
                        <label className="form-check-label" htmlFor="wd-file-upload">File Upload</label>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="wd-assign-to" className="col-sm-3 col-form-label text-end">Assign to</label>
                <div className="col-sm-9">
                    <select id="wd-assign-to" className="form-control">
                        <option selected value="everyone">Everyone</option>
                        <option value="student">Student Only</option>
                        <option value="ta">TA</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="wd-due-date" className="col-sm-3 col-form-label text-end">Due Date</label>
                <div className="col-sm-9">
                    <input type="date" id="wd-due-date" className="form-control" value="2024-05-21" />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="wd-available-from" className="col-sm-3 col-form-label text-end">Available from</label>
                <div className="col-sm-3">
                    <input type="date" id="wd-available-from" className="form-control" value="2024-05-06" />
                </div>
                <label htmlFor="wd-available-to" className="col-sm-3 col-form-label text-end">Until</label>
                <div className="col-sm-3">
                    <input type="date" id="wd-available-to" className="form-control" value="2024-05-22" />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3"></div>
                <div className="col-sm-9">
                    <button className="btn btn-secondary">Cancel</button>
                    <button className="btn btn-danger">Save</button>
                </div>
            </div>
        </div>
    );
}