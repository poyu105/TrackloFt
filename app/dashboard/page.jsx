"use client";

import { useDispatch, useSelector } from "react-redux";
import NavbarBlock from "@/components/block/NavbarBlock";
import SidebarBlock from "@/components/block/SidebarBlock";
import { useEffect, useState } from "react";
import { fetchProjects } from "@/store/projectSlice";
import { fetchBoards } from "@/store/boardSlice";
import BoardBlock from "@/components/block/BoardBlock";
import { fetchTasks, moveTaskAsync, moveTaskLocal, rollBackMoveTask } from "@/store/taskSlice";
import { Calendar, CalendarSync, ChevronRight, FileText, Paperclip, Plus, Tags, User } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function Dashboard(){
    const dispatch = useDispatch();
    const {userInfo} = useSelector((state)=>state.user); //取得使用者資訊
    const {projects, loading: projectLoading, error: projectError} = useSelector((state)=>state.project); //取得專案狀態
    const {boards, loading: boardLoading, error: boardError} = useSelector((state)=>state.board); //取得看板狀態
    const {tasks} = useSelector((state)=>state.task); //取得任務狀態

    //載入時取得專案列表(登入狀態下)
    useEffect(()=>{
        if(userInfo && userInfo.userid){
            dispatch(fetchProjects(userInfo.userid))
                .catch(err => toast.error(`取得專案列表失敗: ${err}`, { style: { whiteSpace: "pre-line" } }));
        }
    },[dispatch, userInfo]);

    const [currentProject, setCurrentProject] = useState(null); //當前顯示的專案
    //當currentProject改變時，取得該專案的看板列表&任務列表
    useEffect(()=>{
        if(currentProject?.id){
            dispatch(fetchBoards(currentProject.id))//取得看板列表
                .catch(err => toast.error(`取得專案列表失敗: ${err}`, { style: { whiteSpace: "pre-line" } }));
            dispatch(fetchTasks(currentProject.id))//取得任務列表
                .catch(err => toast.error(`取得專案列表失敗: ${err}`, { style: { whiteSpace: "pre-line" } }));
        }
    },[dispatch, currentProject]);

    const [selectedTask, setSelectedTask] = useState(null); //選中的任務詳細資料

    //======================
    // 卡片拖移相關start
    //======================
    const [draggedTask, setDraggedTask] = useState(null); //被拖移的卡片
    const [draggedFromBoard, setDraggedFromBoard] = useState(null); //被拖移卡片的來源看板
    const [dragOverBoard, setDragOverBoard] = useState(null); //目前拖移到的看板

    //卡片拖移開始
    function handleDragStart(e, task, boardId){
        setDraggedTask(task); //設定被拖移的卡片
        setDraggedFromBoard(boardId); //設定來源看板ID
        e.dataTransfer.effectAllowed = "move"; //顯示移動圖示
    }

    //卡片拖移結束
    function handleDragOver(e, boardId){
        e.preventDefault(); //允許放下
        e.dataTransfer.dropEffect = "move"; //顯示移動圖示
        setDragOverBoard(boardId); //設定目前拖移到的看板
    }

    //卡片拖移離開
    function handleDragLeave(){
        setDragOverBoard(null); //重置目前拖移到的看板
    }

    //卡片放下
    function handleDrop(e, targetBoardId){
        e.preventDefault();
        if(!draggedTask || draggedFromBoard === targetBoardId){
            //如果沒有拖移的卡片或放回原本看板，則不做任何動作
            setDraggedTask(null);
            setDraggedFromBoard(null);
            setDragOverBoard(null);
            return;
        }

        const prevTasks = structuredClone(tasks); //儲存目前任務狀態以便rollback
        //執行卡片移動的Redux動作
        dispatch(moveTaskLocal({
            taskId: draggedTask.id,
            fromBoardId: draggedFromBoard,
            toBoardId: targetBoardId,
        }));

        //非同步更新後端
        dispatch(moveTaskAsync({
            taskId: draggedTask.id,
            fromBoardId: draggedFromBoard,
            toBoardId: targetBoardId,
        })).unwrap().catch(()=>{
            //失敗則rollback
            dispatch(rollBackMoveTask(prevTasks));
            toast.error("操作失敗，請確認網路連線，或聯絡管理員!");
        });

        //重置拖移狀態
        setDraggedTask(null);
        setDraggedFromBoard(null);
        setDragOverBoard(null);
    }
    //======================
    // 卡片拖移相關end
    //======================
        
    return(
        <>
            <div className="flex h-screen bg-gray-100">
                {/* 側邊欄 */}
                <SidebarBlock
                    currentProject={currentProject}
                    setCurrentProject={setCurrentProject}
                />
                {/* 主要內容區 */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* 頂部導覽列 */}
                    <NavbarBlock
                        currentProject={currentProject}
                    />
                    {/* 看板區域 */}
                    <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
                        <div className="flex gap-4 h-full">
                            {
                                boards.map((board, index) => (
                                    <BoardBlock
                                        key={board.id + index}
                                        board={board}
                                        tasks={tasks[board.id]}
                                        handleDragOver={handleDragOver}
                                        handleDragLeave={handleDragLeave}
                                        handleDrop={handleDrop}
                                        dragOverBoard={dragOverBoard}
                                        handleDragStart={handleDragStart} //for TaskCardBlock
                                        setSelectedTask={setSelectedTask} //for TaskCardBlock
                                    />
                                ))
                            }
                            {/* 新增列表 */}
                            <div className="shrink-0 w-80">
                                <button className="w-full px-4 py-3 bg-white bg-opacity-60 hover:bg-opacity-80 rounded-lg transition-all border-2 border-dashed border-gray-300 flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900">
                                    <Plus className="w-5 h-5" />
                                    <span className="font-medium">新增列表</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 顯示點擊的卡片 */}
            {selectedTask && (
                <ShowSelectedTaskDialog 
                    selectedTask={selectedTask} 
                    setSelectedTask={setSelectedTask} 
                    projectName={currentProject?.name}
                    boardName={boards.find(board => tasks[board.id]?.some(task => task.id === selectedTask.id))?.name}
                />
            )}
        </>
    )
}

//顯示選中的任務詳細資料對話框
const ShowSelectedTaskDialog = ({
    selectedTask, //選中的任務資料
    setSelectedTask, //設置選中的任務
    projectName, //專案名稱
    boardName, //看板名稱
}) => {
    return(
        <>
            <Dialog open={true} onOpenChange={() => setSelectedTask(null)}>
                <DialogContent className="max-w-2xl w-full">
                    <DialogHeader>
                        {/* 標題 */}
                        <DialogTitle>
                            {selectedTask.title}
                            {/* 標題下方資訊 */}
                            <div className="flex items-center gap-2 text-sm font-normal text-gray-600 mt-2 border-b">
                                <span>在 {projectName}</span>
                                <ChevronRight className="w-4 h-4"/>
                                <span>{boardName}</span>
                            </div>
                        </DialogTitle>
                    </DialogHeader>

                    {/* 任務基本資訊 */}
                    <table className="w-full">
                        <thead>
                            <tr>
                                {/* 追蹤者(負責人) */}
                                <th>
                                    <div className="flex items-center mb-2">
                                        <User className="w-5 h-5"/>
                                        <span className="ml-2 font-bold text-black">追蹤者</span>
                                    </div>
                                </th>
                                {/* 建立日期 */}
                                <th>
                                    <div className="flex items-center mb-2">
                                        <Calendar className="w-5 h-5"/>
                                        <span className="ml-2 font-bold text-black">建立日期</span>
                                    </div>
                                </th>
                                {/* 更新日期 */}
                                <th>
                                    <div className="flex items-center mb-2">
                                        <CalendarSync className="w-5 h-5"/>
                                        <span className="ml-2 font-bold text-black">更新日期</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className=" h-2/3">
                                {/* 名稱頭像 */}
                                <td>
                                    <div className="flex items-center gap-3">
                                        {
                                            selectedTask.assignee && (
                                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                                                    {selectedTask.assignee.charAt(0)}
                                                </div>
                                            )
                                        }
                                        <div className="flex-1">
                                            <div className="text-sm font-medium">{selectedTask.assignee || "尚無追蹤者"}</div> {/* 使用者名稱 */}
                                            {/*<div className="text-xs text-gray-400">{selectedTask.role}</div>*/} {/* 使用者角色 */}
                                        </div>
                                    </div>
                                </td>
                                {/* 建立日期 */}
                                <td>
                                    {selectedTask.createTime}
                                </td>
                                {/* 更新日期 */}
                                <td>
                                    {selectedTask.updateTime}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    {/* 任務內容 */}
                    <div>
                        <div className="flex items-center mb-2">
                            <FileText className="w-5 h-5"/>
                            <span className="ml-2 font-bold text-black">內容</span>
                        </div>
                        <div className="border p-3 rounded-lg bg-gray-100">
                            <DialogDescription className="text-black">
                                {selectedTask.content}
                            </DialogDescription>
                        </div>
                    </div>

                    {/* 標籤 */}
                    <div>
                        <div className="flex items-center mb-2">
                            <Tags className="w-5 h-5"/>
                            <span className="ml-2 font-bold text-black">標籤</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                            {selectedTask.tags.map((tag, idx) => (
                                <Badge key={idx} variant="default" className="bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-600 text-xs rounded-full">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* 附件 */}
                    <div>
                        <div className="flex items-center mb-2">
                            <Paperclip className="w-5 h-5"/>
                            <span className="ml-2 font-bold text-black">附件</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                            
                        </div>
                    </div>

                    {/* 底部按鈕 */}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">關閉</Button>
                        </DialogClose>
                        <Button onClick={() => alert("執行某個操作")}>執行操作</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}