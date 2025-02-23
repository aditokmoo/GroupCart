import { recognizeImageText } from "../../services/shoppingListServices";
import { IoMdClose } from "react-icons/io";

interface PropTypes {
    capturedImage: string,
    facingMode: "user" | "environment",
    setCapturedImage: () => void
}

export default function ShoppingCapture({ facingMode, capturedImage, setCapturedImage }: PropTypes) {
    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <img
                src={capturedImage}
                alt="Captured"
                className={`w-full h-full object-cover ${facingMode === "user" ? "scale-x-[-1]" : ""}`}
            />
            <button onClick={setCapturedImage} className="absolute top-10 right-10 text-4xl text-white">
                <IoMdClose />
            </button>
            <button onClick={async () => {
                const extractedText = await recognizeImageText(capturedImage);
                console.log(extractedText);
            }} className="absolute bottom-10 bg-primary text-sm py-4 px-16 rounded-full text-white">Update list</button>
        </div>
    )
}
