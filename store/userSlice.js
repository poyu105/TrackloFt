"use client";

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        // 使用者資訊{ id: 使用者ID, role: 使用者角色, name: 使用者名稱, email: 使用者電子郵件 }
        // token: 認證Token
        // isAuthenticated: 是否已認證
        userInfo: {
            id: "",
            role: "用戶",
            name: "用戶",
            email: "",
        },
        isAuthenticated: false,
    },
    reducers:{
        //登入
        login(state, action){
            state.userInfo = action.payload.userInfo;
            state.token = action.payload.token;
            state.isAuthenticated = !!action.payload;
        },
        //登出
        logout(state){
            state.userInfo = { id: "", role: "", name: "", email: "" };
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;