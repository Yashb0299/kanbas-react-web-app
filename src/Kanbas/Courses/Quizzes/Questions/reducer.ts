import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: []
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        addQuestion: (state, { payload: question }) => {
            state.questions = [...state.questions, question] as any;
        },
        deleteQuestion: (state, { payload: questionId }) => {
            state.questions = state.questions.filter((q: any) => q.number !== questionId);
        },
        updateQuestion: (state, { payload: question }) => {
            state.questions = state.questions?.map((q: any) => q.number === question.number ? question : q) as any;
        },
        editQuestion: (state, { payload: qid }) => {
            state.questions = state.questions?.map((q: any) =>
                q.number === qid ? { ...q, editable: true } : q
            ) as any;
        },
    }
});

export const { addQuestion, deleteQuestion, updateQuestion, setQuestions, editQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;