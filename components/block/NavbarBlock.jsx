import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export default function NavbarBlock({
    currentProject, //當前顯示的專案
}){
    return(
        <>
            <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{currentProject?.name ?? "選取或建立一個新專案吧!"}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {
                                currentProject?.type == 'personal' ? '個人專案空間' :
                                currentProject?.type == 'private' ? '私人專案空間' :
                                currentProject?.type == 'group' ? '團隊專案空間' :
                                '歡迎使用 Tracklo 專案管理系統，選取或建立一個新專案開始吧!'
                            }
                        </p>
                    </div>
                    {
                        currentProject?.name ? (
                            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                                <Plus className="w-4 h-4" />
                                <span className="font-medium">新增任務</span>
                            </Button>
                            // <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            //     <Plus className="w-4 h-4" />
                            //     <span className="font-medium">新增任務</span>
                            // </button>
                        ) : (
                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                <Plus className="w-4 h-4" />
                                <span className="font-medium">建立專案</span>
                            </Button>
                            // <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            //     <Plus className="w-4 h-4" />
                            //     <span className="font-medium">建立專案</span>
                            // </button>
                        )
                    }
                </div>
            </div>
        </>
    )
}