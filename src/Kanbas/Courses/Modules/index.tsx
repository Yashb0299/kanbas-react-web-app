import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useState, useEffect } from "react";
import * as client from "./client";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
    const { cid } = useParams();
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [isFaculty, setIsFaculty] = useState(false);
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const [moduleError, setModuleError] = useState(null);
    const [newModule, setNewModule] = useState<any>({ name: "", description: "" });


    const saveModule = async (module: any) => {
        try {
            await client.updateModule(module);
            dispatch(updateModule(module));
        }
        catch (error: any) {
            setModuleError(error.response.data.message);
        }
    };

    const updateModuleTitle = (module: any) => {
        dispatch(updateModule(module));
    };

    const removeModule = async (moduleId: string) => {
        try {
            await client.deleteModule(moduleId);
            dispatch(deleteModule(moduleId));
        }
        catch (error: any) {
            setModuleError(error.response.data.message);
        }
    };

    const createModule = async (module: any) => {
        const newModule = await client.createModule(cid as string, module);
        dispatch(addModule(newModule));
    };

    useEffect(() => {
        const fetchModules = async () => {
            const modules = await client.findModulesForCourse(cid as string);
            dispatch(setModules(modules));
            if (currentUser.role === "FACULTY") {
                setIsFaculty(true);
            }
        };
        fetchModules();
    }, [cid, currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div id="wd-modules">
            {isFaculty &&
                <>
                    <ModulesControls
                        setNewModule={setNewModule}
                        newModule={newModule}
                        addModule={() => {
                            createModule({ ...newModule, course: cid });
                            setNewModule({ ...newModule, name: "", description: "" });
                        }}
                    />
                    < br /><br /><br /><br /><br /><br />
                </>
            }
            {moduleError &&
                <div id="wd-error-message" className="alert alert-danger mb-2 mt-2">{moduleError}</div>
            }
            <ul id="wd-modules" className="list-group rounded-0 pt-3">
                {modules
                    .filter((module: any) => module.course === cid)
                    ?.map((module: any) => (
                        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                <BsGripVertical className="me-2 fs-3" />
                                {!module.editing && module.name}
                                {module.editing && (
                                    <input className="form-control w-50 d-inline-block"
                                        onChange={(e) => updateModuleTitle({ ...module, name: e.target.value })
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                saveModule({ ...module, editing: false });
                                            }
                                        }}
                                        value={module.name} />
                                )}
                                {isFaculty &&
                                    <ModuleControlButtons
                                        moduleId={module._id}
                                        deleteModule={(moduleId) => {
                                            removeModule(moduleId);
                                        }}
                                        editModule={(moduleId) => dispatch(editModule(moduleId))}
                                    />
                                }
                            </div>
                            {module.lessons && (
                                <ul className="list-group rounded-0 border-start border-3 border-success">
                                    {module.lessons?.map((lesson: any) => (
                                        <li className="wd-lesson list-group-item p-3 ps-1">
                                            <BsGripVertical className="me-2 fs-3" />
                                            {lesson.name}
                                            {isFaculty &&
                                                <LessonControlButtons />
                                            }
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

