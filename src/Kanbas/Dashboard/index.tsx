export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr/>
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr/>
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course_1">
                    <img src={"PDP.jpg"} alt="Programming Design Paradigm" width={250}/>
                    <div>
                        <br/>
                        <a className="wd-dashboard-course_1-link" href={"#/Kanbas/Courses/5010/Home"}> CS 5010 -
                            Programming Design Paradigm </a>
                        <p className="wd-dashboard-course_1-title"> Programming Design Paradigm </p>
                        <a href={"#/Kanbas/Courses/5010/Home"}> Go </a>
                    </div>
                    <br/>
                </div>
                <div className="wd-dashboard-course_2">
                    <img src={"PDP.jpg"} alt="Recitation For CS 5010" width={250}/>
                    <div>
                        <br/>
                        <a className="wd-dashboard-course_2-link" href={"#/Kanbas/Courses/5011/Home"}> CS 5011 -
                            Recitation For CS 5010 </a>
                        <p className="wd-dashboard-course_2-title"> Recitation For CS 5010 </p>
                        <a href={"#/Kanbas/Courses/5011/Home"}> Go </a>
                    </div>
                    <br/>
                </div>
                <div className="wd-dashboard-course_3">
                    <img src={"FAI.jpg"} alt="Foundations Of Artificial Intelligence" width={250}/>
                    <div>
                        <br/>
                        <a className="wd-dashboard-course_3-link" href={"#/Kanbas/Courses/5100/Home"}> CS 5100 -
                            Foundations Of Artificial Intelligence </a>
                        <p className="wd-dashboard-course_3-title"> Foundations Of Artificial Intelligence </p>
                        <a href={"#/Kanbas/Courses/5100/Home"}> Go </a>
                    </div>
                    <br/>
                </div>
                <div className="wd-dashboard-course_4">
                    <img src={"GAI.jpg"} alt="Game Artificial Intelligence" width={250}/>
                    <div>
                        <br/>
                        <a className="wd-dashboard-course_4-link" href={"#/Kanbas/Courses/5150/Home"}> CS 5150 -
                            Game Artificial Intelligence </a>
                        <p className="wd-dashboard-course_4-title"> Game Artificial Intelligence </p>
                        <a href={"#/Kanbas/Courses/5150/Home"}> Go </a>
                    </div>
                    <br/>
                </div>
                <div className="wd-dashboard-course_5">
                    <img src={"WD.jpg"} alt="Web Development" width={250}/>
                    <div>
                        <br/>
                        <a className="wd-dashboard-course_5-link" href={"#/Kanbas/Courses/5610/Home"}> CS 5610 -
                            Web Development </a>
                        <p className="wd-dashboard-course_5-title"> Web Development </p>
                        <a href={"#/Kanbas/Courses/5610/Home"}> Go </a>
                    </div>
                    <br/>
                </div>
                <div className="wd-dashboard-course_6">
                    <img src={"Algo.jpg"} alt="Algorithms" width={250}/>
                    <div>
                        <br/>
                        <a className="wd-dashboard-course_6-link" href={"#/Kanbas/Courses/5800/Home"}> CS 5800 -
                            Algorithms </a>
                        <p className="wd-dashboard-course_6-title"> Algorithms </p>
                        <a href={"#/Kanbas/Courses/5800/Home"}> Go </a>
                    </div>
                    <br/>
                </div>
                <div className="wd-dashboard-course_7">
                    <img src={"NLP.jpg"} alt="Natural Language Processing" width={250}/>
                    <div>
                        <br/>
                        <a className="wd-dashboard-course_7-link" href={"#/Kanbas/Courses/6120/Home"}> CS 6120 -
                            Natural Language Processing </a>
                        <p className="wd-dashboard-course_7-title"> Natural Language Processing </p>
                        <a href={"#/Kanbas/Courses/6120/Home"}> Go </a>
                    </div>
                    <br/>
                </div>
            </div>
        </div>
    );
}