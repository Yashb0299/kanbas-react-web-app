import * as client from "./client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import "./Profile.css";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [change, setChange] = useState(false);

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kanbas/Account/Signin");
    };

    const saveChanges = async () => {
        await client.updateProfile(profile);
        setChange(false);
        setProfile(profile);
        dispatch(setCurrentUser(profile));
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const account = await client.profile();
                setProfile({ ...account, dob: account?.dob?.split("T")[0] });
                dispatch(setCurrentUser(account));
            }
            catch (err: any) {
                console.log(err.response.data.message);
                navigate("/Kanbas/Account/Signin");
            }
        };
        fetchProfile();
    }, [navigate, dispatch]);

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            {profile && (
                <div className="profile-details">
                    <div className="profile-section">
                        <h2>Account Information</h2>
                        <div className="profile-field">
                            <label>Username</label>
                            <input
                                className="profile-input"
                                value={profile.username}
                                onChange={(e) => {
                                    setProfile({ ...profile, username: e.target.value }); setChange(true);}}/>
                        </div>
                        <div className="profile-field">
                            <label>Password</label>
                            <input
                                className="profile-input"
                                value={profile.password}
                                onChange={(e) => {
                                    setProfile({ ...profile, password: e.target.value }); setChange(true);}} type="password"/>
                        </div>
                    </div>
                    <div className="profile-section">
                        <h2>Personal Information</h2>
                        <div className="profile-field">
                            <label>First Name</label>
                            <input
                                className="profile-input"
                                value={profile.firstName}
                                onChange={(e) => {
                                    setProfile({ ...profile, firstName: e.target.value }); setChange(true);}}/>
                        </div>
                        <div className="profile-field">
                            <label>Last Name</label>
                            <input
                                className="profile-input"
                                value={profile.lastName}
                                onChange={(e) => {
                                    setProfile({ ...profile, lastName: e.target.value }); setChange(true);}}/>
                        </div>
                        <div className="profile-field">
                            <label>Date of Birth</label>
                            <input
                                className="profile-input"
                                value={profile.dob}
                                onChange={(e) => {
                                    setProfile({ ...profile, dob: e.target.value }); setChange(true);}} type="date"/>
                        </div>
                        <div className="profile-field">
                            <label>Email</label>
                            <input
                                className="profile-input"
                                value={profile.email}
                                onChange={(e) => {
                                    setProfile({ ...profile, email: e.target.value }); setChange(true);}} type="email" />
                        </div>
                    </div>
                    <div className="profile-section">
                        <h2>Role Information</h2>
                        <div className="profile-field">
                            <label>Role</label>
                            <select
                                className="profile-input"
                                value={profile.role}
                                onChange={(e) =>
                                    setProfile({ ...profile, role: e.target.value })} disabled={true}>
                                <option value="STUDENT">Student</option>
                                <option value="FACULTY">Faculty</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
            {change && <button onClick={saveChanges} className="wd-save-btn btn btn-success w-100 mb-2">Save changes</button>}
            <button onClick={signout} className="wd-signout-btn btn btn-danger w-100"> Sign out </button>
        </div>
    );
}
