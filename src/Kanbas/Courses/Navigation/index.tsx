import './index.css';
import React, { useState } from 'react';
export default function CoursesNavigation() {
    const [activeItem, setActiveItem] = useState('Home');
    const navigationItems = [
        { id: 'home', label: 'Home', path: 'Home' },
        { id: 'modules', label: 'Modules', path: 'Modules' },
        { id: 'piazza', label: 'Piazza', path: 'Piazza' },
        { id: 'zoom', label: 'Zoom', path: 'Zoom' },
        { id: 'assignments', label: 'Assignments', path: 'Assignments' },
        { id: 'quizzes', label: 'Quizzes', path: 'Quizzes' },
        { id: 'grades', label: 'Grades', path: 'Grades' }
    ];
    const handleSetActive = (item: string) => {
        setActiveItem(item);
    };
    const getItemClass = (itemName: string) => {
        return `list-group-item border border-0 ${activeItem === itemName ? 'active' : 'text-danger'}`;
    };
    return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
            {navigationItems.map((item) => (
                <a key={item.id}
                   id={`wd-course-${item.id}-link`}
                   href={`#/Kanbas/Courses/5010/${item.path}`}
                   className={getItemClass(item.label)}
                   onClick={() => handleSetActive(item.label)}>
                    {item.label}
                </a>
            ))}
        </div>
    );
}