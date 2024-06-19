export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src={"images/PDP.jpg"}  alt="Programming Design Paradigm"/>
                            <div className="card-body">
                                <a className="wd-dashboard-course-link" href={"#/Kanbas/Courses/5010/Home"} style ={{ textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                                    CS5010 Programming Design Paradigm
                                </a>
                                <p className="wd-dashboard-course-title card-text">
                                    Programming Design Paradigm
                                </p>
                                <a href={"#/Kanbas/Courses/5010/Home"} className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src="/images/PDP.jpg" alt="Recitation For CS 5010"/>
                            <div className="card-body">
                                <a className="wd-dashboard-course-link" href={"#/Kanbas/Courses/5011/Home"} style ={{ textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                                    CS5011 Recitation For CS 5010
                                </a>
                                <p className="wd-dashboard-course-title card-text">
                                    Recitation For CS 5010
                                </p>
                                <a href={"#/Kanbas/Courses/5011/Home"} className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src="/images/FAI.jpg" alt="Foundations Of Artificial Intelligence" />
                            <div className="card-body">
                                <a className="wd-dashboard-course-link" href={"#/Kanbas/Courses/5100/Home"} style ={{ textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                                    CS5100 Foundations Of Artificial Intelligence
                                </a>

                                <p className="wd-dashboard-course-title card-text">
                                    Foundations Of Artificial Intelligence
                                </p>
                                <a href={"#/Kanbas/Courses/CS5100/Home"} className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src={"/images/GAI.jpg"} alt="Game Artificial Intelligence" />
                            <div className="card-body">
                                <a className="wd-dashboard-course-link" href={"#/Kanbas/Courses/5150/Home"} style ={{ textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                                    CS5150 Game Artificial Intelligence
                                </a>
                                <p className="wd-dashboard-course-title card-text">
                                    Game Artificial Intelligence
                                </p>
                                <a href={"#/Kanbas/Courses/5150/Home"} className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src="/images/WD.jpg" alt="Web Development"/>
                            <div className="card-body">
                                <a className="wd-dashboard-course-link" href={"#/Kanbas/Courses/5610/Home"} style ={{ textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                                    CS5400  Web Development
                                </a>
                                <p className="wd-dashboard-course-title card-text">
                                    Web Development
                                </p>
                                <a href={"#/Kanbas/Courses/5610/Home"} className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src={"images/Algo.jpg"} alt="Algorithms"/>
                            <div className="card-body">
                                <a className="wd-dashboard-course-link" href={"#/Kanbas/Courses/5800/Home"} style ={{ textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                                    CS5800 Algorithms
                                </a>
                                <p className="wd-dashboard-course-title card-text">
                                    Algorithms
                                </p>
                                <a href={"#/Kanbas/Courses/5800/Home"} className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{width: "300px"}}>
                        <div className="card">
                            <img src={"images/NLP.jpg"} alt="Natural Language Processing" />
                            <div className="card-body">
                                <a className="wd-dashboard-course-link" href={"#/Kanbas/Courses/6120/Home"} style ={{ textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                                    CS6120 Natural Language Processing
                                </a>
                                <p className="wd-dashboard-course-title card-text">
                                    Natural Language Processing
                                </p>
                                <a href={"#/Kanbas/Courses/6120/Home"} className="btn btn-primary"> Go </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}