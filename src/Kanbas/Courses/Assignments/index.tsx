export default function Assignments() {
    return (
        <div id="wd-assignments">
            <input id="wd-search-assignment"
                   placeholder="Search for Assignments" /> &nbsp;
            <button id="wd-add-assignment-group">+ Group</button> &nbsp;
            <button id="wd-add-assignment">+ Assignment</button>
            <h3 id="wd-assignments-title">
                ASSIGNMENTS 40% of Total <button>+</button>
            </h3>
            <ul id="wd-assignment-list">
                <li className="wd-assignment-list-item">
                    <a className="wd-assignment-link" href={"#/Kanbas/Courses/5010/Assignments/1"}> A1 - ENV + HTML </a><br/>
                    <label id="wd-assignment-details">Multiple Modules | <strong>Not available until</strong> May 6
                        until 12:00 am | <br/><strong>Due</strong> May 13 at 11:59 pm | 100 pts </label><br/>
                </li>
                <li className="wd-assignment-list-item">
                    <a className="wd-assignment-link" href={"#/Kanbas/Courses/5010/Assignments/2"}> A2 - CSS + BOOTSTRAP </a><br/>
                    <label id="wd-assignment-details">Multiple Modules | <strong>Not available until</strong> May 13
                        until 12:00 am | <br/><strong>Due</strong> May 20 at 11:59 pm | 100 pts </label><br/>
                </li>
                <li className="wd-assignment-list-item">
                    <a className="wd-assignment-link" href={"#/Kanbas/Courses/5010/Assignments/3"}> A3 - JAVASCRIPT + REACT </a><br/>
                    <label id="wd-assignment-details">Multiple Modules | <strong>Not available until</strong> May 20
                        until 12:00 am | <br/><strong>Due</strong> May 27 at 11:59 pm | 100 pts </label><br/>
                </li>
            </ul>
        </div>
    );
}