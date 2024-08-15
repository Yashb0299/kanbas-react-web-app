import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as client from "./client";
import { addQuiz, updateQuiz } from "./reducer";

export default function QuizDetails(
    { quiz, setQuiz }: { quiz: any, setQuiz: (qz: any) => void }
) {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [saveError, setSaveError] = useState<string>("");

    const navigateToQuizList = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };

    const saveQuiz = async () => {
        try {
            if (quiz !== undefined && quiz !== null) {
                if (quizzes.filter((quiz: any) => quiz._id === qid).length === 0) {
                    await client.createQuiz(cid as string, quiz);
                    console.log("Created Quiz: ", quiz);
                    dispatch(addQuiz(quiz));
                }
                else {
                    await client.updateQuizById(quiz._id, quiz);
                    console.log("Update Quiz: ", quiz);

                    dispatch(updateQuiz(quiz));
                }
            }
        }
        catch (error: any) {
            setSaveError(error.message);
        }
    };

    const saveAndPublishQuiz = async () => {
        try {

            const qz = { ...quiz, isPublished: true };
            if (quiz !== undefined && quiz !== null) {
                if (quizzes.filter((quiz: any) => quiz._id === qid).length === 0) {
                    await client.createQuiz(cid as string, qz);
                    dispatch(addQuiz(quiz));
                }
                else {
                    await client.updateQuizById(quiz._id, qz);
                    dispatch(updateQuiz(quiz));
                }
            }
            navigateToQuizList();
        }
        catch (error: any) {
            setSaveError(error.message);
        }
    };

    return (
        <div id="wd-quiz-details" className="mt-4 w-75">
            {saveError && <div className="alert alert-danger mt-2 mb-2">{saveError}</div>}
            <input type="text" className="form-control float-start p-2 ps-3 rounded-1 w-25 border-secondary-subtle" placeholder="Quiz Title" defaultValue={quiz?.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} /><br /><br /><br />
            <div id="wd-quiz-instructions" className="mt-2 ms-3">
                <div id="wd-quiz-description" className="mb-4">
                    Quiz Instructions: <br /><br />
                    <textarea className="form-control" rows={10} placeholder="Enter quiz instructions here..." defaultValue={quiz?.description}
                        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
                </div>
                <div id="wd-quiz-attributes" className="d-block mt-4">
                    <div className="mb-4 row">
                        <label htmlFor="wd-points" className="col-sm-4 col-form-label text-sm-end">
                            Quiz Type
                        </label>
                        <div className="col-sm-8 float-end">
                            <select id="wd-group" className="form-select" defaultValue={quiz?.type} onChange={(e) => setQuiz({ ...quiz, type: e.target.value })}>
                                <option value="Graded Quiz">
                                    Graded Quiz
                                </option>
                                <option value=" Practice Quiz">
                                    Practice Quiz
                                </option>
                                <option value="Graded Survey">
                                    Graded Survey
                                </option>
                                <option value="Ungraded Survey">
                                    Ungraded Survey
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-5 row">
                        <label htmlFor="wd-group" className="col-sm-4 col-form-label text-sm-end">
                            Assignment Group
                        </label>
                        <div className="col-sm-8 float-end">
                            <select id="wd-group" className="form-select" defaultValue={quiz?.assignmentGroup} onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
                                <option value="ASSIGNMENTS">
                                    ASSIGNMENTS
                                </option>
                                <option value="QUIZZES">
                                    QUIZZES
                                </option>
                                <option value="EXAMS">
                                    EXAMS
                                </option>
                                <option value="PROJECT">
                                    PROJECT
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-5 row d-flex justify-content-end">
                        <div className="col-sm-8">
                            <span className="fw-semibold mt-2">Options</span>
                            <div className="mb-2 mt-2">
                                <input type="checkbox" className="form-check-input" id="shuffle-answers" defaultChecked={quiz?.shuffleAnswers} onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })} />
                                <label htmlFor="shuffle-answers" className="ms-2">Shuffle Answers</label>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 mt-2">
                                    <input type="checkbox" className="form-check-input" id="time-limit" defaultChecked={quiz?.timeLimit} onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.checked })} />
                                    <label htmlFor="time-limit" className="ms-2">Time Limit</label>
                                </div>
                                {quiz?.timeLimit &&
                                    <div className="d-flex col-sm-8 align-items-center">
                                        <input type="number" className="form-control w-25 text-center" id="time-allotted" defaultValue={quiz?.timeAllowed} onChange={(e) => setQuiz({ ...quiz, timeAllowed: e.target.value })} />
                                        <label htmlFor="time-allotted" className="ms-2">Minutes</label>
                                    </div>
                                }
                            </div>
                            <div className="row mb-5 mt-2 border rounded border-secondary-subtle p-2 ms-2">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <input type="checkbox" className="form-check-input" id="multiple-attempts" defaultChecked={quiz?.multipleAttempts} onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })} />
                                        <label htmlFor="multiple-attempts" className="ms-2">Allow Multiple Attempts</label>
                                    </div>
                                    {quiz?.multipleAttempts &&
                                        <div className="d-flex col-sm-6 align-items-center">
                                            <input type="number" className="form-control w-25 text-center" id="total-attempts" defaultValue={quiz?.totalAttempts} onChange={(e) => setQuiz({ ...quiz, totalAttempts: e.target.value })} />
                                            <label htmlFor="time-allotted" className="ms-2">Attempts</label>
                                        </div>
                                    }
                                </div>
                                <div className="col-sm-12 mt-2 mb-2">
                                    <input type="checkbox" className="form-check-input" id="show-correct-answers" defaultChecked={quiz?.showCorrectAnswers} onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })} />
                                    <label htmlFor="show-correct-answers" className="form-check-label ms-2">Show Correct Answers</label>
                                </div>
                                <div className="col-sm-12 mt-2 mb-2 d-flex align-items-center">
                                    <label htmlFor="access-code" className="form-check-label me-2">Access Code</label>
                                    <input type="text" className="form-control w-25" id="access-code" defaultValue={quiz?.accessCode} onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })} />
                                </div>
                                <div className="col-sm-12 mt-2 mb-2">
                                    <input type="checkbox" className="form-check-input" id="one-question" defaultChecked={quiz?.oneQuestionAtATime} onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })} />
                                    <label htmlFor="one-question" className="form-check-label ms-2">One Question at a Time</label>
                                </div>
                                <div className="col-sm-12 mt-2 mb-2">
                                    <input type="checkbox" className="form-check-input" id="webcam-required" defaultChecked={quiz?.webcamRequired} onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })} />
                                    <label htmlFor="webcam-required" className="form-check-label ms-2">Webcam Required</label>
                                </div>
                                <div className="col-sm-12 mt-2 mb-2">
                                    <input type="checkbox" className="form-check-input" id="lock-questions" defaultChecked={quiz?.lockQuestionsAfterAnswering} onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })} />
                                    <label htmlFor="lock-questions" className="form-check-label ms-2">Lock Questions After Answering</label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2 row">
                            <span className="col-sm-4 col-form-label text-sm-end">
                                Assign
                            </span>
                            <div className="col-sm-8 float-end">
                                <div className="border rounded-1 p-3">
                                    <div className="mb-4">
                                        <label htmlFor="wd-assign-to" className="form-label fw-bold fs-6">Assign to</label>
                                        <input type="text" id="wd-assign-to" defaultValue={quiz?.for} className="form-control" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="wd-due-date" className="form-label fw-bold fs-6">Due</label>
                                        <input type="date" defaultValue={quiz?.due?.split("T")[0]} id="wd-available-from" className="form-control"
                                            onChange={(e) => setQuiz({ ...quiz, due: e.target.value })} />
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor="wd-available-from" className="form-label fw-bold fs-6">Available from</label>
                                            <input type="date" defaultValue={quiz?.available?.split("T")[0]} id="wd-available-from" className="form-control"
                                                onChange={(e) => setQuiz({ ...quiz, available: e.target.value })} />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="wd-available-until" className="form-label fw-bold fs-6">Until</label>
                                            <input type="date" defaultValue={quiz?.until?.split("T")[0]} id="wd-available-from" className="form-control"
                                                onChange={(e) => setQuiz({ ...quiz, until: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-secondary text-center rounded-top-0 col-sm-12">+ Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="e-1">
                    <hr />
                    <button className="btn btn-secondary mx-2" onClick={navigateToQuizList}>Cancel</button>
                    <hr />
                </div>
                <div className="mx-1">
                    <hr />
                    <button className="btn btn-danger mx-2" onClick={saveQuiz}>Save</button>
                    <hr />
                </div>
                <div className="s-1">
                    <hr />
                    <button className="btn btn-success mx-2" onClick={saveAndPublishQuiz}>Save & Publish</button>
                    <hr />
                </div>
            </div>
        </div>
    )
};