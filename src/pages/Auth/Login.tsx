import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginWithGoogle } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export default function Login() {
    const handleGoogleSignIn = useLoginWithGoogle();

    return (
        <div className="pt-10 pb-32 max-w-[500px] mx-auto">
            <div className="flex flex-col gap-10 justify-center items-center">
                <button onClick={handleGoogleSignIn}>
                    <img src="/images/google-logo.webp" alt="Google Logo" className="w-20 border border-gray-100 bg-white shadow-md rounded-full p-4" />
                </button>
                <p className="text-sm text-gray-600 font-light">or login with email account</p>
            </div>

            <form className="flex flex-col gap-4 mt-28">
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Link to='/forgot-password' className="flex justify-end relative bottom-0 text-sm text-primary">Forgot password?</Link>

                <Button radius='rounded' size='lg' className="my-6">Login</Button>
            </form>

            <Link to='/register' className="flex justify-center gap-2 text-sm">Don't have account? <span className="text-primary">Register here</span></Link>

        </div>
    )
}
