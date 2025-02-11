import { TbAnalyze } from "react-icons/tb";

export default function AIOutput() {
    return (
        <div className="w-full bg-white m-12 rounded-xl">
            <div className="flex items-center gap-2 p-6">
                <img src="/images/ai-chat-mascot.webp" alt="" />
                <div className="flex flex-col">
                    <h3 className="font-semibold">Suggestion AI Chat</h3>
                    <p className="text-xs text-gray-400">Use this tool to analyze your list so you dont forgot to list something</p>
                </div>
            </div>

            <div className="h-3/4 bg-slate-50 flex items-center justify-center">
                AI Output
            </div>

            <div className="flex justify-center items-center w-full py-10 px-20">
                <button className="flex justify-center items-center gap-2 bg-light-green text-white p-6 w-full rounded-md text-sm font-bold hover:opacity-80 transition-all duration-300"><TbAnalyze className="text-xl" />ANALYZE</button>
            </div>
        </div>
    )
}
