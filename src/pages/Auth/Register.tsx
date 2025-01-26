import OAuthButtons from "./OAuthButtons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useRegister } from "@/hooks/useAuth";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RegisterInputFields } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/zodSchema";

export default function Register() {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
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
                    {RegisterInputFields.map(({ name, type, placeholder }) => (
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

                    <Button radius="rounded" size="lg" className="my-6">
                        Register
                    </Button>
                </form>
            </Form>

            <Link to='/login' className="flex justify-center gap-2 text-sm">Already have account? <span className="text-primary">Login here</span></Link>

        </div>
    )
}
