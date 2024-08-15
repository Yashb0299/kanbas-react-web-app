import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const findQuizzesForCourse = async (cid: string) => {
    const response = await axios.get(`${COURSES_API}/${cid}/quizzes`);
    return response.data;
};

export const updateQuizById = async (qid: string, quiz: any) => {
    const response = await axios.put(`${QUIZZES_API}/${qid}`, quiz);
    return response.data;
};

export const createQuiz = async (cid: string, quiz: any) => {
    const response = await axios.post(`${COURSES_API}/${cid}/quizzes`, quiz);
    return response.data;
};

export const deleteQuiz = async (qid: string) => {
    const response = await axios.delete(`${QUIZZES_API}/${qid}`);
    return response.data;
};

export const getPrevResponse = async (qid: string, uid: string) => {
    const response = await axios.get(`${QUIZZES_API}/${qid}/response/${uid}`);
    return response.data;
};

export const updateUserResponse = async (qid: string, uid: string, response: any) => {
    const res = await axios.put(`${QUIZZES_API}/${qid}/response/${uid}`, response);
    return res.data;
}

export const createUserResponse = async (qid: string, uid: string, response: any) => {
    const res = await axios.post(`${QUIZZES_API}/${qid}/response/${uid}`, response);
    return res.data;
};

export const getUserQuizScores = async (uid: string) => {
    const response = await axios.get(`${QUIZZES_API}/scores/${uid}`);
    return response.data;
}