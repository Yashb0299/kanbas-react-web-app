import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [] as any[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = {
        _id: new Date().getTime().toString(),
        title: assignment.title,
        course: assignment.course,
        availableDate: assignment.availableDate,
        dueDate: assignment.dueDate,
        availableUntil: assignment.availableUntil,
        description: assignment.description,
        points: assignment.points || 100,
        completed: assignment.completed || false,
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignment._id ? assignment : a
      );
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
