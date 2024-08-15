import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ASSIGNMENT_API = `${REMOTE_SERVER}/api/assignments`;

export const findAssignmentsForCourse = async (cid: string) => {
    const response = await axios.get(`${COURSES_API}/${cid}/assignments`);
    return response.data;
};

export const deleteAssignment = async (aid: string) => {
    const response = await axios.delete(`${ASSIGNMENT_API}/${aid}`);
    return response.data;
};

export const createAssignment = async (cid: string, assignment: any) => {
    const response = await axios.post(`${COURSES_API}/${cid}/assignments`, assignment);
    return response.data;
}

export const updateAssignment = async (assignment: any) => {
    const response = await axios.put(`${ASSIGNMENT_API}/${assignment._id}`, assignment);
    return response.data;
};