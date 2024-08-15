import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer";
import questionsReducer from "./Courses/Quizzes/Questions/reducer";

const store = configureStore({
    reducer: {
        accountReducer,
        coursesReducer,
        modulesReducer,
        assignmentsReducer,
        quizzesReducer,
        questionsReducer
    },
});
export default store;