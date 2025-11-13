import { MoreHorizontal, Plus } from "lucide-react";
import TaskCardBlock from "./TaskCardBlock";
import { ScrollArea } from "../ui/scroll-area";

export default function BoardBlock({
    board, //看板資料
    tasks, //看板內的卡片列表
    handleDragOver, //拖曳進入看板事件
    handleDragLeave, //拖曳離開看板事件
    handleDrop, //放下卡片事件
    dragOverBoard, //目前拖曳進入的看板ID

    //以下為卡片相關
    handleDragStart, //卡片拖移開始事件
    setSelectedTask, //設置選中的任務
}){
    //排序釘選的任務在最前面
    function getSortedTasks(tasks){
        const pinnedTasks = tasks.filter(task => task.pinned); //釘選的任務
        const unpinnedTasks = tasks.filter(task => !task.pinned); //未釘選的任務
        return [...pinnedTasks, ...unpinnedTasks];
    }

    return(
        <>
            <div 
                className="flex-shrink-0 w-80 flex flex-col"
                onDragOver={(e) => handleDragOver(e, board.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, board.id)}
            >
                <div 
                    className={`bg-white rounded-lg shadow-sm border-2 flex flex-col h-full transition-colors 
                        ${dragOverBoard === board.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                    `}
                >
                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{board.name}</h3>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                {tasks?.length}
                            </span>
                        </div>
                        {/* 編輯看板按鈕 */}
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <ScrollArea className="flex p-2">
                    {/* <div className="flex-1 overflow-y-auto p-4"> */}
                        {getSortedTasks(tasks).map((task, index) => (
                            <TaskCardBlock 
                                key={task.id + index} 
                                task={task} 
                                boardId={board.id} 
                                handleDragStart={handleDragStart}
                                setSelectedTask={setSelectedTask}
                            />
                        ))}
                        <button className="w-full px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg transition-colors border-2 border-dashed border-gray-300 flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" />
                            <span>新增卡片</span>
                        </button>
                    {/* </div> */}
                    </ScrollArea>
                </div>
            </div>
        </>
    )
}