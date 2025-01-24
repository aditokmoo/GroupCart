import { Form } from "@/components/ui/form";
import { useLoginWithPassword } from "@/hooks/useAuth";
import { authSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import OAuthButtons from "./OAuthButtons";
import AuthForm from "./AuthForm";
import { Button } from "@/components/ui/button";

export default function Login() {
    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const { mutate: loginWithEmailAndPassword, isPending: isLogginPending } = useLoginWithPassword();

    if (isLogginPending) return <h2>Loading...</h2>

    return (
        <div className="pt-10 pb-32 max-w-[500px] mx-auto">
            <OAuthButtons />

            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => loginWithEmailAndPassword(data))} className="flex flex-col gap-4 mt-28">
                    <AuthForm form={form} />

                    <Link to="/forgot-password" className="flex justify-end text-sm text-primary">
                        Forgot password?
                    </Link>

                    <Button radius="rounded" size="lg" className="my-6">
                        Login
                    </Button>
                </form>
            </Form>

            <Link to='/register' className="flex justify-center gap-2 text-sm">Don't have account? <span className="text-primary">Register here</span></Link>

        </div>
    )
}
