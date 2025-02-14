import { useCallback, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { MdOutlineCameraswitch } from "react-icons/md";
import Webcam from "react-webcam";

interface PropTypes {
    facingMode: "user" | "environment";
    toggle: (val: string) => void;
    setCapturedImage: React.Dispatch<React.SetStateAction<string | null>>
    setFacingMode: React.Dispatch<React.SetStateAction<"user" | "environment">>
}

export default function ShoppingCamera({ facingMode, toggle, setCapturedImage, setFacingMode }: PropTypes) {
    const webcamRef = useRef<Webcam>(null);

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImage(imageSrc);
            toggle('camera');
        }
    }, [webcamRef, toggle]);

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-screen h-screen object-cover"
                videoConstraints={{
                    facingMode,
                }}
                style={{
                    transform: facingMode === "user" ? "scaleX(-1)" : "none",
                }}
            />
            <button
                onClick={capture}
                className="absolute bottom-10 flex justify-center items-center text-4xl text-gray-500 p-4 border-8 border-white bg-gray-200 text-black rounded-full w-32 h-32">
                <IoCameraOutline />
            </button>

            <button
                onClick={() => setFacingMode(prev => (prev === "user" ? "environment" : "user"))}
                className="absolute bottom-16 right-44 text-4xl p-4 bg-gray-800 text-white rounded-full">
                <MdOutlineCameraswitch />
            </button>

            <button onClick={() => toggle('camera')} className="absolute top-10 right-10 text-4xl text-white">
                <IoMdClose />
            </button>
        </div >
    )
}
