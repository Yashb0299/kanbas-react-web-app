import {AiOutlineDashboard} from "react-icons/ai";
import {IoCalendarOutline} from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KanbasNavigation() {
    return (
        <div id="wd-kanbas-navigation" className="list-group rounded-0">
            <a id="wd-neu-link" target="_blank" href={"https://www.northeastern.edu/"} className="list-group-item bg-black border-0" rel="noreferrer">
                <img src={"/images/NEU_Logo.jpg"} width="75px" alt="Northeastern Logo"/></a>
            <a id="wd-account-link" href={"#/Kanbas/Account"}
               className="list-group-item text-center border-0 bg-black text-white">
                <FaRegCircleUser className="fs-1 text text-white" />
                <br />Account</a>
            <a id="wd-dashboard-link" href={"#/Kanbas/Dashboard"}
               className="list-group-item text-center border-0 bg-white text-danger">
                <AiOutlineDashboard className="fs-1 text text-danger" />
                <br />Dashboard</a>
            <a id="wd-course-link" href={"#/Kanbas/Courses"}
               className="list-group-item text-center border-0 bg-black text-white">
                <LiaBookSolid className="fs-1 text text-danger" />
                <br />Courses</a>
            <a id="wd-calendar-link" href={"#/Kanbas/Calendar"}
               className="list-group-item text-center border-0 bg-black text-white">
                <IoCalendarOutline className="fs-1 text text-danger" />
                <br />Calendar</a>
            <a id="wd-inbox-link" href={"#/Kanbas/Inbox"}
               className="list-group-item text-center border-0 bg-black text-white">
                <FaInbox className="fs-1 text text-danger" />
                <br />Inbox</a>
            <a id="wd-history-link" href={"#/Kanbas/History"}
               className="list-group-item text-center border-0 bg-black text-white">
                <LiaCogSolid className="fs-1 text text-danger" />
                <br />Labs</a>
        </div>
    );
}