import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import CancelIcon from "./CancelIcon";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls(
    { newModule, setNewModule, addModule }:
        { newModule: any; setNewModule: ({ ...newModule }) => void; addModule: () => void; }) {
    return (
        <div id="wd-modules-controls" className="text-nowrap mb-2">
            <button id="wd-add-module-btn" className="btn btn-lg btn-danger m-1 float-end"
                data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog" >
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module
            </button>
            <div className="dropdown d-inline m-1 float-end">
                <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
                    type="button" data-bs-toggle="dropdown">
                    <GreenCheckmark />
                    Publish All
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#/Labs">
                            <GreenCheckmark />
                            Publish all modules and items
                        </a>
                    </li>
                    <li>
                        <a id="wd-publish-modules-only-button" className="dropdown-item" href="#/Labs">
                            <GreenCheckmark />
                            Publish modules only
                        </a>
                    </li>
                    <li>
                        <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href="#/Labs">
                            <CancelIcon />
                            Unpublish all modules and items
                        </a>
                    </li>
                    <li>
                        <a id="wd-unpublish-modules-only" className="dropdown-item" href="#/Labs">
                            <CancelIcon />
                            Unpublish modules only
                        </a>
                    </li>
                </ul>
            </div>
            <button id="wd-view-progress-btn" className="btn btn-lg m-1 float-end btn-secondary" >
                View Progress
            </button>
            <button id="wd-collapse-all-btn" className="btn btn-lg m-1 float-end btn-secondary" >
                Collapse All
            </button>
            <ModuleEditor dialogTitle="Add Module" newModule={newModule}
                setNewModule={setNewModule} addModule={addModule} />
        </div>
    );
}

