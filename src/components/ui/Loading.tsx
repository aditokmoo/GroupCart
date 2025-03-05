import { MoonLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="h-screen flex items-center justify-center">
            <MoonLoader
                color="#ff7300"
                loading
                size={35}
                speedMultiplier={1}
            />
        </div>
    )
}
