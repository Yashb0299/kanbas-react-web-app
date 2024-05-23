export default function Modules() {
    return (
        <div>
            <button id="Collapse-All" type="button"> Collapse All</button>
            &nbsp;
            <button id="View-Progress" type="button"> View Progress</button>
            &nbsp;
            <select id="Publish">
                <option selected value="Publish All"> Publish All</option>
            </select> &nbsp;
            <button id="+ Module" type="button"> + Module</button>
            &nbsp;
            <ul id="wd-modules">
                <li className="wd-module">
                    <div className="wd-title"><strong> Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda, Internet, Web, HTML, Assignment 1 </strong></div>
                    <br/>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title"><strong> LEARNING OBJECTIVES </strong></span>
                            <ul className="wd-content">
                                <br/>
                                <li className="wd-content-item"> Learn how to create user interfaces with HTML</li>
                                <li className="wd-content-item"> Learn what is Web Development</li>
                                <li className="wd-content-item"> Creating a development environment</li>
                                <li className="wd-content-item"> Creating a Web Application</li>
                                <li className="wd-content-item"> Getting started with the 1st assignment</li>
                            </ul>
                        </li>
                        <br/>
                        <li className="wd-lesson">
                            <span className="wd-title"><strong> READING </strong> </span>
                            <ul className="wd-content">
                                <br/>
                                <li className="wd-content-item"> Full Stack Developer - Chapter 1 - Introduction</li>
                                <li className="wd-content-item"> Full Stack Developer - Chapter 2 - Creating User
                                    Interfaces With HTML
                                </li>
                            </ul>
                        </li>
                        <br/>
                        <li className="wd-lesson">
                            <span className="wd-title"><strong> SLIDES </strong></span>
                            <ul className="wd-content">
                                <br/>
                                <li className="wd-content-item"> Introduction to Web Development</li>
                                <li className="wd-content-item"> Creating an HTTP server with Node.js</li>
                                <li className="wd-content-item"> Creating a React Application</li>
                                <li className="wd-content-item"> Commit your source to GitHub.com</li>
                                <li className="wd-content-item"> Deploying to Netlify</li>
                                <li className="wd-content-item"> Deploying multiple branches in Netlify</li>
                                <li className="wd-content-item"> Kanbas Web App on Netlify</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <br/>
                <li className="wd-module">
                    <div className="wd-title"><strong> Week 2, Lecture 2 - Formatting User Interfaces with HTML </strong></div>
                    <br/>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title"><strong> LEARNING OBJECTIVES </strong></span>
                            <ul className="wd-content">
                                <br/>
                                <li className="wd-content-item"> Learn how to create user interfaces with HTML</li>
                                <li className="wd-content-item"> Keep working on assignment 1</li>
                                <li className="wd-content-item"> Deploy the assignment to Netlify</li>
                            </ul>
                        </li>
                        <br/>
                        <li className="wd-lesson">
                            <span className="wd-title"><strong> READING </strong></span>
                            <ul className="wd-content">
                                <br/>
                                <li className="wd-content-item"> Full Stack Developer - Chapter 1 - Introduction</li>
                                <li className="wd-content-item"> Full Stack Developer - Chapter 2 - Creating User Interfaces With HTML </li>
                            </ul>
                        </li>
                        <br/>
                        <li className="wd-lesson">
                            <span className="wd-title"><strong> SLIDES </strong></span>
                            <ul className="wd-content">
                                <br/>
                                <li className="wd-content-item"> Introduction to HTML and the DOM</li>
                                <li className="wd-content-item"> Formatting Web content with Headings and Paragraphs
                                </li>
                                <li className="wd-content-item"> Formatting content with Lists and Tables</li>
                                <li className="wd-content-item"> Creating Web Forms</li>
                                <li className="wd-content-item"> Navigating with Anchors</li>
                                <li className="wd-content-item"> Single Page Navigation</li>
                                <li className="wd-content-item"> Embedding content with Iframes</li>
                                <li className="wd-content-item"> Drawing with Scalable Vector Graphics</li>
                                <li className="wd-content-item"> Kanbas Web App on Netlify</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            <br/>
        </div>
    );
}