"use client";

import ApiServices from "../api/ApiServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//取得專案(不含board和task)
export const fetchProjects = createAsyncThunk("project/getAllProject", async (userid)=>{
    return await ApiServices.getProjects(userid);
});

const projectSlice = createSlice({
    name: "project",
    initialState:{
        projects: [
            // id: 專案ID, name: 專案名稱, type: 專案類型(個人、私人、團隊), color: 專案顏色
            { id: 1, name: '網站重構專案', type: 'private', color: 'bg-blue-500' },
            { id: 2, name: '行銷活動企劃', type: 'personal', color: 'bg-green-500' },
            { id: 3, name: '產品開發 Q4', type: 'group', color: 'bg-purple-500' },
            { id: 1, name: '網站重構專案', type: 'private', color: 'bg-blue-500' },
            { id: 2, name: '行銷活動企劃', type: 'personal', color: 'bg-green-500' },
            { id: 3, name: '產品開發 Q4', type: 'group', color: 'bg-purple-500' },
            { id: 1, name: '網站重構專案', type: 'private', color: 'bg-blue-500' },
            { id: 2, name: '行銷活動企劃', type: 'personal', color: 'bg-green-500' },
            { id: 3, name: '產品開發 Q4', type: 'group', color: 'bg-purple-500' },
            { id: 1, name: '網站重構專案', type: 'private', color: 'bg-blue-500' },
            { id: 2, name: '行銷活動企劃', type: 'personal', color: 'bg-green-500' },
            { id: 3, name: '產品開發 Q4', type: 'group', color: 'bg-purple-500' },
            { id: 1, name: '網站重構專案', type: 'private', color: 'bg-blue-500' },
            { id: 2, name: '行銷活動企劃', type: 'personal', color: 'bg-green-500' },
            { id: 3, name: '產品開發 Q4', type: 'group', color: 'bg-purple-500' },
            { id: 1, name: '網站重構專案', type: 'private', color: 'bg-blue-500' },
            { id: 2, name: '行銷活動企劃', type: 'personal', color: 'bg-green-500' },
            { id: 3, name: '產品開發 Q4', type: 'group', color: 'bg-purple-500' },
        ],
        loading: false,
        error: null,
    },
    reducers:{

    },
    extraReducers: (builder)=>{
        builder
            //fetchProjects
            .addCase(fetchProjects.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action)=>{
                state.loading = false;
                state.projects = action.payload.projects;
            })
            .addCase(fetchProjects.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default projectSlice.reducer;