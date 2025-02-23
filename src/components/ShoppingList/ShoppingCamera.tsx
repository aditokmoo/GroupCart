import { IoMdClose } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { MdOutlineCameraswitch } from "react-icons/md";
import Webcam from "react-webcam";

interface PropTypes {
    facingMode: "user" | "environment";
    handleCameraToggle: () => void,
    handleCameraCapture: () => void,
    setFacingMode: () => void
    webcamRef: React.RefObject<Webcam | null>
}

export default function ShoppingCamera({ facingMode, handleCameraToggle, handleCameraCapture, setFacingMode, webcamRef }: PropTypes) {

    console.log('Jel radi ova komponenta')

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
                onClick={handleCameraCapture}
                className="absolute bottom-10 flex justify-center items-center text-4xl text-gray-500 p-4 border-8 border-white bg-gray-200 text-black rounded-full w-32 h-32">
                <IoCameraOutline />
            </button>

            <button
                onClick={setFacingMode}
                className="absolute bottom-16 right-44 text-4xl p-4 bg-gray-800 text-white rounded-full">
                <MdOutlineCameraswitch />
            </button>

            <button onClick={handleCameraToggle} className="absolute top-10 right-10 text-4xl text-white">
                <IoMdClose />
            </button>
        </div >
    )
}
