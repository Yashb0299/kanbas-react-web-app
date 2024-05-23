export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name"><h3>Assignment Name</h3></label>
            <input id="wd-name" value="A1 - ENV + HTML"/><br/><br/>
            <textarea id="wd-description">The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:Your full name and section, Links to each of the lab assignments, Link to the Kanbas application, Links to all relevant source code repositories. The Kanbas application should include a link to navigate back to the landing page.</textarea>
            <br/>
            <table>
                <tbody>
                <tr>
                    <td align="left" valign="top">
                        <label htmlFor="wd-points"> Points: </label>
                        <input id="wd-points" value={100}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="wd-group"> Assignments Group: </label>
                        <select id="wd-group">
                            <option value="Assignments">Assignments</option>
                            <option value="Quizzes">Quizzes</option>
                            <option value="Exams">Exams</option>
                            <option value="Project">Project</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="wd-display-grade-as"> Display Grade as: </label>
                        <select id="wd-display-grade-as">
                            <option value="Percentage">Percentage</option>
                            <option value="Grade">Grades</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="wd-submission-type"> Submission: </label>
                        <select id="wd-submission-type">
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="left" valign="top">
                        <label id="wd-submission-type">Online Entry Options</label><br/>
                        <input type="checkbox" name="check-genre" id="wd-text-entry"/>
                        <label htmlFor="wd-text-entry">Text Entry</label><br/>
                        <input type="checkbox" name="check-genre" id="wd-website-url"/>
                        <label htmlFor="wd-website-url">Website URL</label><br/>
                        <input type="checkbox" name="check-genre" id="wd-media-recordings"/>
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
                        <input type="checkbox" name="check-genre" id="wd-student-annotation"/>
                        <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
                        <input type="checkbox" name="check-genre" id="wd-file-upload"/>
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="wd-assign-to"> Assign: Assign To: </label><br/>
                        <input id="wd-assign-to" value={"Everyone"}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="wd-due-date"> Due: </label><br/>
                        <input type="date" id="wd-due-date" value="2024-05-13"/><br/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="wd-available-from"> Available From: </label><br/>
                        <input type="date" id="wd-available-from" value="2024-05-06"/>
                    </td>
                    <td>
                        <label htmlFor="wd-available-until"> Until: </label><br/>
                        <input type="date" id="wd-available-until" value="2024-05-13"/>
                    </td>
                </tr>
                </tbody>
            </table>
            <hr/>
            <button id="wd-cancel">Cancel</button> &nbsp;
            <button id="wd-save">Save</button>
        </div>
    );
}