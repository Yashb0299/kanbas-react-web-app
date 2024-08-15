import { IoSettingsSharp } from "react-icons/io5";
import { TbFileExport, TbFileImport } from "react-icons/tb";
import { FaRegFilePdf } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";

export default function GradeControls() {
    return (
        <div id="wd-grade-controls" className="text-nowrap">
            <button id="wd-grade-settings-btn" className="btn btn-lg btn-secondary float-end m-1">
                <IoSettingsSharp className="fs-4" />
            </button>
            <div className="dropdown d-inline float-end mt-1 mx-1">
                <button id="wd-grade-export-btn" className="btn btn-lg btn-secondary dropdown-toggle"
                    type="button" data-bs-toggle="dropdown">
                    <TbFileExport className="fs-4 me-1" />
                    Export
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a id="wd-grade-export-pdf-btn" className="dropdown-item" href="#/Labs">
                            <FaRegFilePdf className="fs-4 me-1" />
                            Export as PDF
                        </a>
                    </li>
                    <li>
                        <a id="wd-grade-export-excel-btn" className="dropdown-item" href="#/Labs">
                            <SiMicrosoftexcel className="fs-4 me-1" />
                            Export as Excel
                        </a>
                    </li>
                </ul>
            </div>
            <button id="wd-grade-import-btn" className="btn btn-lg btn-secondary float-end m-1">
                <TbFileImport className="fs-4 me-1" />
                Import
            </button>
        </div>
    );
}