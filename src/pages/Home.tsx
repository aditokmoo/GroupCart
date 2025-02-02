import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex items-center justify-center h-screen bg-light-primary">
            <section className="text-center">
                <img src="/images/logo.webp" alt="GroupCart Logo" className="w-24 mx-auto mb-8" />
                <h1 className="text-4xl font-bold text-gray-800">Group<span className="text-primary">Cart</span></h1>
                <p className="mt-4 text-sm text-gray-600 px-20 md:text-base md:leading-10 md:max-w-[540px] w-full">
                    Your ultimate app for organizing grocery shopping with friends! Plan weekend parties without forgetting a thing—make every barbecue stress-free and unforgettable
                </p>
                <Link to='/login' className="block w-80 text-xs mx-auto py-5 font-semibold bg-primary text-white rounded-md mt-12">Start your planing</Link>
            </section>
        </div>
    )
}
