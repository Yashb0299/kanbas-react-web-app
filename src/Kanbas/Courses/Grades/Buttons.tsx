import React from 'react';
import { FaFileImport, FaFileExport, FaGear } from "react-icons/fa6";
export default function Buttons() {
    return (
        <div className="float-end">
            <button className="btn btn-secondary btn-lg me-1" style={{ alignItems: 'center' }}>
                <FaFileImport style={{ marginRight: '8px' }} />
                Import
            </button>
            <div className="btn-group me-1">
                <button type="button" className="btn btn-secondary btn-lg dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ alignItems: 'center' }}>
                    <FaFileExport style={{ marginRight: '8px' }} />
                    Export
                </button>
                <ul className="dropdown-menu">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <li><a className="dropdown-item" href={"#"}>Export as PDF</a></li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <li><a className="dropdown-item" href={"#"}>Export as Excel</a></li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <li><a className="dropdown-item" href={"#"}>Export as CSV</a></li>
                </ul>
            </div>
            <button className="btn btn-secondary btn-lg" style={{alignItems: 'center' }}>
                <FaGear />
            </button>
        </div>
    );
}