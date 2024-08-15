export default function ModuleEditor({ dialogTitle, newModule, setNewModule, addModule }:
    { dialogTitle: string; newModule: any; setNewModule: ({ ...newModule }) => void; addModule: () => void; }) {
    return (
        <div id="wd-add-module-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            {dialogTitle} </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <input className="form-control mb-2" value={newModule.name} placeholder="Module Name"
                            onChange={(e) => setNewModule({ ...newModule, name: e.target.value })} />
                        <input className="form-control" value={newModule.description} placeholder="Module Description"
                            onChange={(e) => setNewModule({ ...newModule, description: e.target.value })} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Cancel </button>
                        <button onClick={addModule} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                            Add Module </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

