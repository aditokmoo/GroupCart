import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useLoginWithPassword } from "@/hooks/useAuth";
import { loginSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import OAuthButtons from "./OAuthButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginInputFields } from "@/lib/constants";

export default function Login() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
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
                    {LoginInputFields.map(({ name, type, placeholder }) => (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type={type} placeholder={placeholder} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

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
