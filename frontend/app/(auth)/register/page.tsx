"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerSchema } from "@/schemas/auth"
import { Eye, Mail, User, UserCircle2 } from "lucide-react"
import { toast } from "sonner"
import { AlertMessage } from "@/components/ui/alert"
import Link from "next/link"


export default function RegisterPage() {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    function onSubmit({ password, confirmPassword, ...values }: z.infer<typeof registerSchema>) {
        if (password !== confirmPassword) {
            return toast.error("Password not match")
        }
        console.log(values)
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Column */}
            <div className="bg-[#2B3990] p-8 flex flex-col justify-center items-center text-white gap-8">
                <h1 className="text-4xl font-bold mb-4">UrbanNext</h1>
                <p className="text-xl italic text-center md:text-start">"UrbanNext: Innovación y Confort en Cada Reserva"</p>
            </div>

            {/* Right Column */}
            <div className="p-8 flex flex-col justify-center bg-[#E3F3F0]">
                <div className="w-full max-w-md mx-auto space-y-6">
                    <h2 className="text-3xl font-bold text-[#2B3990] mb-6">Registrarse</h2>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre y Apellido</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nombre y Apellido" {...field} icon={<User />} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" type="email" {...field} icon={<Mail />} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Contraseña" type="password" {...field} icon={<Eye />} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Repetir contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Repetir contraseña" type="password" {...field} icon={<Eye />} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="py-6">

                                <Link href="/login" className="my-2">Ya tienes cuenta? <span className="text-blue-400">Inicia session</span></Link>

                            </div>
                            <AlertMessage form={form}
                                onSubmit={() => form.handleSubmit(onSubmit)()}
                                iconLucide={
                                    <div className="rounded-full overflow-hidden bg-yellow-200">
                                        <UserCircle2 className="text-yellow-600 p-2 size-12" />
                                    </div>
                                }
                                backgroundButton="bg-[#1E3A8A]"
                                dialogTitle="Are you sure?"
                                dialogDescription="This action register new user"
                            />
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
