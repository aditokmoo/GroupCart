import useToggle from "../../hooks/useToggle";
import MobileNav from "../Navbar/MobileNav";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { FaPlus } from "react-icons/fa";
import useShoppingCamera from "../../hooks/useShoppingCamera";
import ShoppingForm from "./ShoppingForm";
import ShoppingItem from "./ShoppingItem";
import ShoppingCamera from "./ShoppingCamera";
import ShoppingCapture from "./ShoppingCapture";
import useDragDrop from "../../hooks/useDragDrop";
import { SortableContext } from '@dnd-kit/sortable';
import { DndContext } from "@dnd-kit/core";

export default function ShoppingList({ data }: { data?: Group | null }) {
    const { isActive, toggle } = useToggle();
    const { state, dispatch, handleCameraToggle, handleCameraCapture, webcamRef } = useShoppingCamera();
    const { handleDragEnd } = useDragDrop(data?.id || "");

    return (
        <div className="flex flex-col max-w-[700px] mx-auto w-full">
            <div className="bg-light-primary py-4 px-4 md:px-10">
                <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-20 text-xs px-12">
                        <p>Status</p>
                        <p>Name</p>
                    </div>
                    <p className="text-xs mr-28">Price</p>
                </div>
                <DndContext onDragEnd={handleDragEnd}>
                    <SortableContext items={data?.groupList?.map(item => item.order) || []}>
                        <div className="relative flex flex-col gap-6 h-list-screen overflow-auto px-12 pb-12">
                            {data?.groupList?.map((item) => (
                                <ShoppingItem
                                    key={item.order}
                                    data={item}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>

                <MobileNav toggle={toggle} handleCameraToggle={handleCameraToggle} />

                {state.hasCamera && state.cameraStream && (
                    <ShoppingCamera
                        facingMode={state.facingMode}
                        handleCameraToggle={handleCameraToggle}
                        handleCameraCapture={handleCameraCapture}
                        setFacingMode={() => dispatch({ type: "SET_FACING_MODE", payload: state.facingMode === "user" ? "environment" : "user" })}
                        ref={webcamRef}
                    />
                )}

                {state.capturedImage && (
                    <ShoppingCapture
                        facingMode={state.facingMode}
                        capturedImage={state.capturedImage}
                        setCapturedImage={() => dispatch({ type: "SET_CAPTURE_IMAGE", payload: null })}
                    />
                )}

                {isActive["NewItemForm"] && (
                    <Dialog open={isActive["NewItemForm"]} onOpenChange={() => toggle("NewItemForm")}>
                        <DialogTrigger className="fixed bottom-10 right-8 p-4 border-2 border-primary rounded-full">
                            <FaPlus className="text-2xl text-primary" />
                        </DialogTrigger>
                        <ShoppingForm toggle={() => toggle("NewItemForm")} />
                    </Dialog>
                )}
            </div>
        </div>
    );
}
