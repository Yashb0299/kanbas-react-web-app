import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllCourses = async () => {
    const { data } = await axios.get(COURSES_API);
    return data;
};

export const createCourse = async (course: any) => {
    const response = await axios.post(COURSES_API, course);
    return response.data;
};

export const deleteCourse = async (id: string) => {
    const response = await axios.delete(`${COURSES_API}/${id}`);
    return response.data;
};

export const updateCourse = async (course: any) => {
    const response = await axios.put(`${COURSES_API}/${course._id}`, course);
    return response.data;
};

export const fetchEnrolledCourses = async (uid: string) => {
    const { data } = await axios.get(`${COURSES_API}/${uid}`);
    return data;
};

export const fetchAuthoredCourses = async (authid: string) => {
    const { data } = await axios.get(`${COURSES_API}/auth/${authid}`);
    return data;
};

export const fetchUnenrolledCourses = async (uid: string) => {
    const { data } = await axios.get(`${COURSES_API}/unenrolled/${uid}`);
    return data;
};

export const enrollCourse = async (cid: string, uid: string) => {
    const response = await axios.put(`${COURSES_API}/${cid}/enroll/${uid}`);
    return response.data;
}