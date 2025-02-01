import { useLoginWithGoogle } from "../../hooks/useAuth";

export default function OAuthButtons() {
    const handleGoogleSignIn = useLoginWithGoogle();

    return (
        <div className="flex flex-col gap-10 justify-center items-center">
            <button onClick={handleGoogleSignIn}>
                <img src="/images/google-logo.webp" alt="Google Logo" className="w-20 border border-gray-100 bg-white shadow-md rounded-full p-4" />
            </button>
            <p className="text-sm text-gray-600 font-light">or login with email account</p>
        </div>
    )
}
