export default function AssignmentControl() {
    return (
        <div id="wd-modules-controls" className="d-flex justify-content-end align-items-center">
            <input type="text" className="form-control me-1" placeholder="Search for Assignment ..." style={{ height: '48px', width:'250px' }} />
            <button id="wd-view-progress" className="btn btn-lg btn-secondary me-1 float-end">
                + Group
            </button>
            <button id="wd-collapse-all" className="btn btn-lg btn-secondary me-1 float-end" style={{ backgroundColor: 'red', color: 'white' }}>
                + Assignment
            </button>
        </div>
    );
}