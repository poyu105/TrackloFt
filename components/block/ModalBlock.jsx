import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

export default function ModalBlock({
    isOpen = false, //是否開啟
    onClose = () => { isOpen = false }, //關閉回調
}){
    return(
        <>
            {/* Dialog */}
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        {/* 標題 */}
                        <DialogTitle>
                            這是 Dialog 標題
                        </DialogTitle>
                        {/* 描述 */}
                        <DialogDescription>
                            這是 Dialog 內容，可以像 modal 一樣顯示。
                        </DialogDescription>
                    </DialogHeader>

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