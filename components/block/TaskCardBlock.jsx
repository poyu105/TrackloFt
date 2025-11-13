import { CalendarSync, MessagesSquare, Paperclip, Pin, User } from "lucide-react";
import { Badge } from "../ui/badge";

export default function TaskCardBlock({
    task, //任務資料
    boardId, //所屬看板ID
    handleDragStart, //卡片拖移開始事件
    setSelectedTask, //設置選中的任務
}){
    return(
        <>
            <div
                draggable // Enable drag-and-drop
                onDragStart={(e) => handleDragStart(e, task, boardId)} //處理拖曳開始事件
                onClick={() => setSelectedTask(task)} 
                className={`bg-white rounded-lg p-3 m-1 mb-3 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-200 ${
                    task.pinned ? 'ring-1 ring-yellow-400' : ''// 如果任務被釘選，添加一個黃色的環繞效果
                }`}
            >
                <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 flex-1 line-clamp-1">{task.title}</h4> {/* 任務標題，限制為單行顯示 */}
                    {/* 釘選按鈕 */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // 防止觸發卡片的點擊事件
                            togglePin(boardId, task.id, e)
                        }}
                        className={`ml-2 p-1 rounded transition-colors ${
                            task.pinned // 如果任務被釘選，使用黃色樣式，否則使用灰色樣式
                            ? 'text-yellow-600 hover:text-yellow-700 bg-yellow-50' 
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                        }`}
                        title={task.pinned ? '取消釘選' : '釘選到頂部'}
                    >
                        <Pin className={`w-4 h-4 ${task.pinned ? 'fill-current' : ''}`} /> {/* 釘選圖標 */}
                    </button>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.content}</p> {/* 任務內容，限制為兩行顯示 */}
                
                {/* 標籤 */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {task.tags.map((tag, idx) => (
                        <Badge key={idx} variant="default" className="bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-600 text-xs rounded-full">
                            {tag}
                        </Badge>
                    ))}
                </div>
                
                {/* 下方footer */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                        {/* 更新日期 */}
                        <div 
                            title={`更新日期:${task.updateTime}`}
                            className="flex items-center gap-1"
                        >
                            <CalendarSync className="w-3 h-3" />
                            <span>{task.updateTime}</span>
                        </div>

                        {/* 評論數量 */}
                        <div 
                            title={`評論數量:${task.comments}`}
                            className="flex items-center gap-1"
                        >
                            <MessagesSquare className="w-3 h-3" />
                            <span>{task.comments}</span>
                        </div>

                        {/* 附件數量 */}
                        <div 
                            title={`附件數量:${task.attachments}`}
                            className="flex items-center gap-1"
                        >
                            <Paperclip className="w-3 h-3" />
                            <span>{task.attachments}</span>
                        </div>
                    </div>

                    {/* 追蹤者 */}
                    <div 
                        title={`追蹤者:${task.assignee || "尚無追蹤者"}`}
                        className="flex items-center gap-1"
                    >
                        <User className="w-3 h-3" />
                        <span>{task.assignee || "無"}</span>
                    </div>
                </div>
            </div>
        </>
    )
}