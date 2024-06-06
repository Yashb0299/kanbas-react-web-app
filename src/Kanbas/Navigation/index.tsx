import React from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegCircleUser, FaInbox } from "react-icons/fa6";
import { BsGear } from "react-icons/bs";
import { LiaBookSolid } from "react-icons/lia";
import './style.css'; // Ensure the CSS file is correctly linked
type NavLinkProps = {
    id: string;
    href: string;
    icon: React.ElementType | string;
    text: string;
    target?: string;
};
const links: NavLinkProps[] = [
    { id: 'neu', href: 'https://www.northeastern.edu/', icon: 'images/NEU_Logo.jpg', target: '_blank', text: '' },
    { id: 'account', href: '/Kanbas/Account', icon: FaRegCircleUser, text: 'Account' },
    { id: 'dashboard', href: '/Kanbas/Dashboard', icon: AiOutlineDashboard, text: 'Dashboard' },
    { id: 'courses', href: '/Kanbas/Courses', icon: LiaBookSolid, text: 'Courses' },
    { id: 'calendar', href: '/Kanbas/Calendar', icon: IoCalendarOutline, text: 'Calendar' },
    { id: 'inbox', href: '/Kanbas/Inbox', icon: FaInbox, text: 'Inbox' },
    { id: 'labs', href: '/Kanbas/Labs', icon: BsGear, text: 'Labs' }
];
export default function KanbasNavigation() {
    const location = useLocation();
    const isActive = (href: string) => location.pathname === href || (href === '/Kanbas/Dashboard' && location.pathname === '/');
    return (
        <nav className="navbar">
            <ul className="nav-list">
                {links.map(link => {
                    const active = isActive(link.href);
                    return (
                        <li key={link.id} className={`nav-item ${active ? 'active' : ''}`}>
                            <RouterNavLink to={link.href} target={link.target || '_self'} className="nav-link">
                                {typeof link.icon === 'string' ?
                                    <img src={link.icon} alt={link.id} className="icon" />
                                    :
                                    React.createElement(link.icon, {
                                        className: 'icon-svg',
                                        style: {
                                            color: active && link.id === 'account' ? 'red' : (link.id === 'account' ? 'white' : 'red'),
                                            fontSize: '24px'
                                        }
                                    })
                                }
                                <span>{link.text}</span>
                            </RouterNavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}