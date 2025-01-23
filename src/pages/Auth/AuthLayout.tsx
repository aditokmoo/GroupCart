import { ReactNode } from "react";

export default function AuthLayout({ children, headerMessage }: { children: ReactNode, headerMessage: string }) {
    return (
        <section className="bg-gray-800 h-custom-screen">

            <div className="flex flex-col gap-2 px-8 pt-32 pb-12 max-w-[500px] mx-auto">
                <img src="/images/logo.webp" alt="GroupCart Logo" className="w-20 object-cover" />
                <h2 className="text-white text-2xl">Group<span className="text-primary">Cart</span></h2>
                <p className="text-gray-300 text-xs font-light">{headerMessage}</p>
            </div>

            <div className="bg-white h-full rounded-t-2xl p-8">
                {children}
            </div>

        </section>
    )
}
