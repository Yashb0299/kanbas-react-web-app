import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Signup() {
    const [user, setUser] = useState<any>({});
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signup = async () => {
        try {
            const currentUser = await client.signup(user);
            dispatch(setCurrentUser(currentUser));
            navigate("/Kanbas/Account/Profile");
        }
        catch (error: any) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="profile-container">
            <h1>Sign up</h1>
            {error && <div className="wd-error alert alert-danger">{error}</div>}
            <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="wd-username form-control mb-2"
                placeholder="Username"
            />
            <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                className="wd-password form-control mb-2"
                placeholder="Password"
            />
            <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} id="wd-role" className="form-select mb-2">
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT" selected>Student</option>
            </select>
            <button onClick={signup} id="wd-signup-btn" className="btn btn-primary w-100 mb-2"> Sign up </button><br />
            <Link to="/Kanbas/Account/Signin" id="wd-signin-link"><button className="btn btn-primary w-100 mb-2"> Sign in </button></Link>
        </div>
    );
}

