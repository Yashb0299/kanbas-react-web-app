import './style.css'
export default function Dashboard() {

    const courses = [
        { id: 5010, name: "CS5010 Programming Design Paradigm", description: "Programming Design Paradigm", image: "images/PDP.jpg" },
        { id: 5011, name: "CS5011 Recitation For CS 5010", description: "Recitation For CS 5010", image: "images/PDP.jpg" },
        { id: 5100, name: "CS5100 Foundations Of Artificial Intelligence", description: "Foundations Of Artificial Intelligence", image: "images/FAI.jpg" },
        { id: 5150, name: "CS5150 Game Artificial Intelligence", description: "Game Artificial Intelligence", image: "images/WD.jpg" },
        { id: 5610, name: "CS5610 Web Development", description: "Web Development", image: "images/FAI.jpg" },
        { id: 5800, name: "CS5800 Algorithms", description: "Algorithms", image: "images/Algo.jpg" },
        { id: 6120, name: "CS6120 Natural Language Processing", description: "Natural Language Processing", image: "images/NLP.jpg" },
    ];

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div key={course.id} className="wd-dashboard-course col">
                            <div className="card">
                                <img src={course.image} alt={course.description} />
                                <div className="card-body">
                                    <a className="wd-dashboard-course-link"
                                       href={`#/Kanbas/Courses/${course.id}/Home`}>
                                        {course.name}
                                    </a>
                                    <p className="course-title">
                                        {course.description}
                                    </p>
                                    <a href={`#/Kanbas/Courses/${course.id}/Home`} className="btn btn-primary btn-small">Go</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}