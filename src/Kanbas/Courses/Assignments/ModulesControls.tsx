export default function ModulesControls() {
    return(
        <div>
            <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
                +Assignment
            </button>
            <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 float-end">
                +Group
            </button>
            <div>
                <input id="wd-search-assignment" placeholder="&#128269; Search..." className="input form-control-lg float-left input-sm w-50"
                />
            </div>
            <br />
        </div>
    );
}