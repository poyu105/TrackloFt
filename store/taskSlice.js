"use client";

import { createAsyncThunk, createSlice, isAction } from "@reduxjs/toolkit";
import ApiServices from "../api/ApiServices";

//取得Task
export const fetchTasks = createAsyncThunk("task/fetchTasks", async (projectId)=>{
    const tasks = await ApiServices.getTasks(projectId);
    return {boardId, tasks};
})

//更新移動後的Task
export const moveTaskAsync = createAsyncThunk("task/moveTaskAsync", async ({taskId, fromBoardId, toBoardId}, {rejectWithValue})=>{
    const res = await ApiServices.moveTask(taskId, fromBoardId, toBoardId);
    if(res && res.success){
        return true;
    }else{
        return rejectWithValue(res.message || "移動任務失敗");
    }
})

const taskSlice = createSlice({
    name: "task",
    initialState:{
        tasks: {
            // 看板ID: 任務陣列{ id: 任務ID, title: 任務標題, content: 任務內容, tags:標籤, pinned:是否釘選, createTime: 建立時間, updateTime: 更新時間, comments: 評論數量, attachments: 附件數量, assignee: 追蹤者 }
            "board-1": [
                {   id: "task-1", title: "任務 1-1", content: "這是任務內容 1-1", tags: ['設計', 'UI/UX', 'UI/UX', 'UI/UX', 'UI/UX', 'UI/UX', 'UI/UX'], pinned: true, createTime: "2025/09/20", updateTime: "2025/09/25",
                    comments: 3, attachments: 2, assignee: ""
                },
                {   id: "task-2", title: "任務 1-2", content: "這是任務內容 1-2", tags: ['設計', 'UI/UX'], pinned: false, createTime: "2025/09/25", updateTime: "2025/09/30",
                    comments: 0, attachments: 1, assignee: ""
                },
            ],
            "board-2": [
                {   id: "task-3", title: "任務 2-1, 任務 2-1, 任務 2-1, 任務 2-1, 任務 2-1", content: "這是任務內容 2-1, 這是任務內容 2-1, 這是任務內容 2-1, 這是任務內容 2-1, 這是任務內容 2-1, 這是任務內容 2-1, 這是任務內容 2-1, 這是任務內容 2-1, 這是任務內容 2-1", tags: ['設計', 'UI/UX'], pinned: false, createTime: "2025/08/20", updateTime: "2025/08/25",
                    comments: 5, attachments: 0, assignee: "王五"
                },
            ],
            "board-3": [
                {   id: "task-4", title: "任務 3-1", content: "這是任務內容 3-1", tags: ['設計', 'UI/UX'], pinned: false, createTime: "2025/07/20", updateTime: "2025/07/22",
                    comments: 2, attachments: 3, assignee: "趙六"
                },
                {   id: "task-5", title: "任務 3-2", content: "這是任務內容 3-2", tags: ['設計', 'UI/UX'], pinned: false, createTime: "2025/07/21", updateTime: "2025/07/23",
                    comments: 0, attachments: 0, assignee: "孫七"
                },
                {   id: "task-6", title: "任務 3-3", content: "這是任務內容 3-3", tags: ['設計', 'UI/UX'], pinned: false, createTime: "2025/07/23", updateTime: "2025/07/27",
                    comments: 1, attachments: 1, assignee: "周八"
                },
                {   id: "task-7", title: "任務 3-4", content: "這是任務內容 3-3", tags: ['設計', 'UI/UX'], pinned: false, createTime: "2025/07/23", updateTime: "2025/07/27",
                    comments: 4, attachments: 2, assignee: "吳九"
                },
                {   id: "task-8", title: "任務 3-5", content: "這是任務內容 3-3", tags: ['設計', 'UI/UX'], pinned: true, createTime: "2025/07/23", updateTime: "2025/07/27",
                    comments: 0, attachments: 0, assignee: "鄭十"
                },
                {   id: "task-9", title: "任務 3-6", content: "這是任務內容 3-3", tags: ['設計', 'UI/UX'], pinned: false, createTime: "2025/07/23", updateTime: "2025/07/27",
                    comments: 2, attachments: 1, assignee: "冉十一"
                },
                {   id: "task-10", title: "任務 3-7", content: "這是任務內容 3-3", tags: ['設計', 'UI/UX'], pinned: false, createTime: "2025/07/23", updateTime: "2025/07/27",
                    comments: 3, attachments: 0, assignee: "傅十二"
                },
                {   id: "task-11", title: "任務 3-8", content: "這是任務內容 3-3", tags: ['設計', 'UI/UX'], pinned: false, createTime: "2025/07/23", updateTime: "2025/07/27",
                    comments: 0, attachments: 2, assignee: "曹十三"
                },
            ],
            "board-4": [
            ],
            "board-5": [
            ],
        },
        loading: false,
        error: null,
    },
    reducers:{
        //更新任務拖移
        moveTaskLocal(state, action){
            const { taskId, fromBoardId, toBoardId } = action.payload;

            // 找到要移動的任務
            const taskIndex = state.tasks[fromBoardId].findIndex(task => task.id === taskId);
            if (taskIndex === -1) return; // 如果找不到任務，直接返回
            const [task] = state.tasks[fromBoardId].splice(taskIndex, 1); // 從來源看板移除任務

            state.tasks[toBoardId].push(task); // 將任務加入目標看板
        },
        //rollback任務拖移
        rollBackMoveTask(state, action){
            state.tasks = action.payload;
        },
    },
    extraReducers: (builder)=>{
        builder
            //fetchTasks
            .addCase(fetchTasks.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action)=>{
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.error.message;
            })
            //moveTaskAsync
            .addCase(moveTaskAsync.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(moveTaskAsync.fulfilled, (state)=>{
                state.loading = false;
            })
            .addCase(moveTaskAsync.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
    }
});

export const { moveTask, moveTaskLocal, rollBackMoveTask } = taskSlice.actions;
export default taskSlice.reducer;