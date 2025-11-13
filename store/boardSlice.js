"use client";

import { toast } from "sonner";
import ApiServices from "../api/ApiServices"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//取得看板(不含task)
export const fetchBoards = createAsyncThunk("board/fetchBoards", async (projectId)=>{
    try{
        return await ApiServices.getBoards(projectId);
    } catch (error) {
        toast.error(`取得看板失敗: ${error}`, { style: { whiteSpace: "pre-line" } });
    }
});

const boardSlice = createSlice({
    name: "board",
    initialState:{
        boards: [
            // id: 看板ID, name: 看板名稱
            { id: "board-1", name: "流程一" },
            { id: "board-2", name: "流程二" },
            { id: "board-3", name: "流程三" },
            // { id: "board-4", name: "流程四" },
            // { id: "board-5", name: "流程五" },
            // { id: "board-4", name: "流程四" },
            // { id: "board-5", name: "流程五" },
        ],
        loading: false,
        error: null,
    },
    reducers:{

    },
    extraReducers: (builder)=>{
        builder
            //fetchBoards
            .addCase(fetchBoards.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBoards.fulfilled, (state, action)=>{
                state.loading = false;
                state.boards = action.payload.boards;
            })
            .addCase(fetchBoards.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.error.message;
            })

    }
});

export default boardSlice.reducer;