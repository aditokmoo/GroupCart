import { useState } from "react";
import useToggle from "../../hooks/useToggle";
import { FaPlus } from "react-icons/fa6";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { MdAddCircleOutline, MdOutlineCameraAlt } from "react-icons/md";
import ShoppingForm from "../ShoppingList/ShoppingForm";
import ShoppingCamera from "../ShoppingList/ShoppingCamera";
import ShoppingCapture from "../ShoppingList/ShoppingCapture";

export default function MobileNav() {
    const { isActive, toggle } = useToggle();
    const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    return (
        <>
            <div className="fixed bottom-0 z-40 left-0 w-full bg-white border-t text-2xl border-gray-300 flex items-center justify-between">
                <button onClick={() => toggle('camera')} className="w-full border-r border-gray-300 text-center flex flex-col items-center justify-center hover:bg-gray-50 transition-all duration-300 py-6"><MdOutlineCameraAlt />
                    <span className="text-xs text-gray-500">Scan bill</span>
                </button>
                <button onClick={() => toggle('NewItemForm')} className="w-full text-center flex justify-center flex-col items-center hover:bg-gray-50 transition-all duration-300 py-6"><MdAddCircleOutline />
                    <span className="text-xs text-gray-500">Add new item</span>
                </button>
            </div>

            {isActive['camera'] && <ShoppingCamera facingMode={facingMode} toggle={toggle} setCapturedImage={setCapturedImage} setFacingMode={setFacingMode} />}

            {capturedImage && <ShoppingCapture toggle={toggle} facingMode={facingMode} capturedImage={capturedImage} setCapturedImage={setCapturedImage} />}

            {
                isActive["NewItemForm"] && (
                    <Dialog open={isActive["NewItemForm"]} onOpenChange={() => toggle("NewItemForm")}>
                        <DialogTrigger className="fixed bottom-10 right-8 p-4 border-2 border-primary rounded-full"><FaPlus className="text-2xl text-primary" /></DialogTrigger>
                        <ShoppingForm toggle={() => toggle("NewItemForm")} />
                    </Dialog>
                )
            }
        </>
    )
}
