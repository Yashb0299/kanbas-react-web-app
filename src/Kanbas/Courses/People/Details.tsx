import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as client from "./client";
import { FaPencil } from "react-icons/fa6";

export default function PeopleDetails(
    { fetchUsers }: { fetchUsers: () => void; }) {
    const navigate = useNavigate();
    const { uid, cid } = useParams();
    const [user, setUser] = useState<any>({});
    const [name, setName] = useState("");
    const [editing, setEditing] = useState(false);
    const [firstName, lastName] = name.split(" ");

    const saveUser = async () => {
        const updatedUser = { ...user, firstName, lastName };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setName(`${firstName} ${lastName}`);
        setEditing(false);
        fetchUsers();
        navigate(`/Kanbas/Courses/${cid}/People`);
    };

    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
        fetchUsers();
        navigate(`/Kanbas/Courses/${cid}/People`);
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (!uid) return;
            const user = await client.findUserById(uid);
            setUser(user);
            setName(user.firstName + " " + user.lastName);
        };
        if (uid) fetchUser();
    }, [uid]);

    if (!uid) return null;

    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <Link to={`/Kanbas/Courses/${cid}/People`} className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1"/> </Link>
            <div className="text-center mt-2"><FaUserCircle className="text-secondary me-2 fs-1"/></div>
            <hr/>
            <span className="float-start"><b>Name:</b></span>
            <div className="text-danger fs-4 wd-name">
                {!editing && (
                    <FaPencil onClick={() => setEditing(true)}
                              className="float-end fs-5 mt-2 wd-edit"/>)}
                {editing && (
                    <FaCheck onClick={() => saveUser()}
                             className="float-end fs-5 mt-2 me-2 wd-save"/>)}
                {!editing && (
                    <div className="wd-name"
                         onClick={() => setEditing(true)}>
                        {user.firstName} {user.lastName}</div>)}
                {user && editing && (
                    <input className="form-control w-50 wd-edit-name"
                           defaultValue={`${user.firstName} ${user.lastName}`}
                           onChange={(e) => setName(e.target.value)}
                           onKeyDown={(e) => {
                               if (e.key === "Enter") {
                                   saveUser();
                               }
                           }}
                    />
                )}
            </div>
            <div id="wd-email">
                <span className="float-start"><b>Email:</b></span>
                {!editing && (
                    <><span className="wd-email float-start">{user.email}</span><br/></>
                )}
                {editing && (
                    <><input className="form-control w-50 wd-edit-email float-start"
                             type="email"
                             defaultValue={user.email}
                             onChange={(e) => setUser({...user, email: e.target.value})}
                             onKeyDown={(e) => {
                                 if (e.key === "Enter") {
                                     saveUser();
                                 }
                             }}
                    /> <br/><br/></>
                )}
            </div>
            <span className="float-start"><b>Login ID:</b></span> <span
            className="wd-login-id">      {user.loginId}      </span> <br/>
            <span className="float-start"><b>Section:</b></span> <span
            className="wd-section">       {user.section}      </span> <br/>
            <span className="float-start"><b>Total Activity:</b></span> <span
            className="wd-total-activity">{user.totalActivity}</span>
            <hr/>
            <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete"> Delete</button>
            <button onClick={() => navigate(`/Kanbas/Courses/${cid}/People`)}
                    className="btn btn-secondary float-start float-end me-2 wd-cancel"> Cancel
            </button>
        </div>
    );
}