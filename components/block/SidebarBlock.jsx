import { Plus } from "lucide-react"
import { useSelector } from "react-redux"
import logo from "../../public/Tracklo-logo-removebg-rectangle.png";
import { ScrollArea } from "../ui/scroll-area";

export default function SidebarBlock({
    currentProject, //選取顯示的專案
    setCurrentProject, //設定選取顯示的專案
}){
    const {userInfo} = useSelector((state)=>state.user); //取得使用者資訊
    const {projects} = useSelector((state)=>state.project); //取得專案狀態

    return(
        <>
            <div className="w-64 bg-linear-to-b from-gray-900 to-gray-800 text-white p-4 flex flex-col shadow-xl">
                {/* 標題 */}
                <div className="mb-8 flex flex-col items-center text-center">
                    <a href="/" className="">
                        <h1 className="text-3xl font-bold mb-1">Tracklo</h1>
                        {/* <img 
                            src={logo} 
                            alt="Tracklo Logo" 
                            style={{ height: '50px', width: 'auto' }} 
                            className="mx-auto"
                        /> */}
                    </a>
                    <p className="text-sm text-gray-400">專案管理系統</p>
                </div>
                {/* 專案列表 */}
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">我的專案({projects?.length})</h2>
                <ScrollArea className="flex-1 mb-4">
                {/* <div className="flex-1 overflow-y-auto"> */}
                    {/* <div className="mb-4"> */}
                        <div className="space-y-1">
                            {projects?.map((project, index) => (
                                <button 
                                    key={project.id + index} 
                                    onClick={() => setCurrentProject(project)}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-3 ${
                                        currentProject?.id === project.id
                                        ? 'bg-white bg-opacity-10 text-white'
                                        : 'text-gray-300 hover:bg-white hover:bg-opacity-5'
                                    }`}
                                >
                                    {/* 前標圖示 */}
                                    <div className={`w-3 h-3 rounded ${project.color}`}></div>
                                    {/* 專案名稱 */}
                                    <span className="text-sm font-medium">{project.name}</span>
                                </button>
                            ))}
                        </div>
                    {/* </div> */}
                {/* </div> */}
                </ScrollArea>
                {/* 新增專案按鈕 */}
                <button className="w-full flex justify-center items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-white hover:bg-opacity-5 rounded-lg transition-all my-2">
                    <Plus className="w-4 h-4" />
                    <span>新增專案</span>
                </button>
                {/* 使用者資訊區塊 */}
                <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-3 px-3 py-2">
                        {/* 名稱頭像 */}
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm font-bold">
                            {userInfo.name ? userInfo.name.charAt(0) : "U"}
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium">{userInfo.name}</div> {/* 使用者名稱 */}
                            <div className="text-xs text-gray-400">{userInfo.role}</div> {/* 使用者角色 */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}