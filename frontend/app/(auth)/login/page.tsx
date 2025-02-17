"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import Link  from "next/link"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { registerSchema } from "@/schemas/auth"
import { Eye, Mail, UserCircle2 } from "lucide-react"
import { toast } from "sonner"
import { AlertMessage } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
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
          <h2 className="text-3xl font-bold text-[#2B3990] mb-6 text-center">Iniciar sesión</h2>

          <p className="text-[#1E3A8A] mb-4 text-center">Ingresa de manera rápida con..</p>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-3 gap-4 justify-between mb-6">
            <Button variant="outline" className="w-full h-14 rounded-lg bg-[#1E3A8A] hover:bg-[#5865F2]/90" onClick={() => console.log("Google login")}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              className="w-full h-14 rounded-lg bg-[#1E3A8A] hover:bg-[#1877F2]/90"
              onClick={() => console.log("Facebook login")}
            >
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                alt="Facebook logo"
                className="w-6 h-6"
              />
            </Button>
            <Button
              variant="outline"
              className="w-full h-14 rounded-lg bg-[#1E3A8A] hover:bg-[#5865F2]/90"
              onClick={() => console.log("Discord login")}
            >
              <img src="https://www.svgrepo.com/show/353655/discord-icon.svg" alt="Discord logo" className="w-6 h-6" />
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#E3F3F0] px-2 text-gray-500">o</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-600">Recordarme</span>
                </label>
                <Link href={"/#"} className="text-[#2B3990] hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <AlertMessage
                form={form}
                onSubmit={() => form.handleSubmit(onSubmit)()}
                iconLucide={
                  <div className="rounded-full overflow-hidden bg-yellow-200">
                    <UserCircle2 className="text-yellow-600 p-2 size-12" />
                  </div>
                }
                backgroundButton="bg-[#1E3A8A]"
                dialogTitle="¿Estás seguro?"
                dialogDescription="Esta acción iniciará sesión con este usuario"
              />

              <p className="text-center text-gray-600 text-sm">
                ¿No tienes una cuenta?{" "}
                <Link href={"/register"} className="text-[#2B3990] hover:underline">
                  Regístrate aquí
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

