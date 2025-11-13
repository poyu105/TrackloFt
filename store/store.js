import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import projectReducer from "./projectSlice";
import boardReducer from "./boardSlice";
import taskReducer from "./taskSlice";

export const store = configureStore({
    reducer:{
        user: userReducer,
        project: projectReducer,
        board: boardReducer,
        task: taskReducer,
    }
});