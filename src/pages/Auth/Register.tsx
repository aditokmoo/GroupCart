import OAuthButtons from "./OAuthButtons";
import { useForm } from "react-hook-form";
import { authSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";
import { useRegister } from "@/hooks/useAuth";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export default function Register() {
    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const { mutate: createAccount, isPending: isCreatingAccount } = useRegister();

    if (isCreatingAccount) return <h2>Loading...</h2>

    return (
        <div className="pt-10 pb-32 max-w-[500px] mx-auto">
            <OAuthButtons />

            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => createAccount(data))} className="flex flex-col gap-4 mt-28">
                    <AuthForm form={form} />

                    <Button radius="rounded" size="lg" className="my-6">
                        Register
                    </Button>
                </form>
            </Form>

            <Link to='/login' className="flex justify-center gap-2 text-sm">Already have account? <span className="text-primary">Login here</span></Link>

        </div>
    )
}
