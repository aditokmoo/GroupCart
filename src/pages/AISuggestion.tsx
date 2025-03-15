import { TbAnalyze } from "react-icons/tb";

export default function AISuggestion() {
    return (
        <div className="w-full bg-white rounded-xl h-screen flex flex-col justify-center">
            <div className="flex flex-col items-center gap-4 py-6 px-32">
                <img src="/images/ai-chat-mascot.webp" alt="" />
                <div className="flex flex-col gap-2 text-center">
                    <h3 className="font-semibold">Suggestion AI Chat</h3>
                    <p className="text-xs text-gray-400">Use this tool to analyze your list so you dont forgot to list something</p>
                </div>
            </div>

            <div className="flex justify-center items-center w-full p-10">
                <button className="flex justify-center items-center gap-2 bg-light-green text-white p-6 w-full rounded-md text-sm font-bold hover:opacity-80 transition-all duration-300"><TbAnalyze className="text-xl" />ANALYZE</button>
            </div>
        </div>
    )
}
