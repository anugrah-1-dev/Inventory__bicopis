import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import { Lock, Mail } from "@/Components/Icons";
import Navbar from "@/Components/Navbar";
import PasswordInput from "@/Components/PasswordInput";
import TextInput from "@/Components/TextInput";
import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({ flash }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <div className="antialiased bg-gray-100 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex flex-1 justify-center items-center p-6">
                <div className="flex flex-wrap bg-white border border-gray-200 rounded-lg shadow-md w-full max-w-4xl overflow-hidden">
                    <div className="hidden md:flex items-center justify-center bg-white-100 p-8 w-1/2">
                        <img src="/logo_bicopi.jpeg" alt="Bicopis Logo" className="max-w-xs" />
                    </div>
                    <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                        <h2 className="text-xl font-medium text-center text-gray-900 mb-1">Selamat Datang</h2>
                        <h3 className="text-center text-sm text-gray-500 font-medium mb-4">Silahkan masuk ke akun Anda</h3>
                        <Alert flash={flash} />
                        <form className="space-y-4" onSubmit={submit}>
                            <TextInput
                                label="Email"
                                icon={<Mail className="w-5 h-5" />}
                                errorMsg={errors.email}
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                autoFocus
                                required
                            />
                            <PasswordInput
                                label="Kata Sandi"
                                icon={<Lock className="w-5 h-5" />}
                                errorMsg={errors.password}
                                id="password"
                                minLength={8}
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                required
                            />
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="text-primary-600 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring focus:ring-primary-300"
                                    checked={data.remember}
                                    onChange={(e) => setData("remember", e.target.checked)}
                                />
                                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">
                                    Ingatkan saya
                                </label>
                            </div>
                            <Button className="w-full" type="submit" disabled={processing}>
                                Masuk
                            </Button>
                            <div className="text-center text-sm font-medium text-gray-500">
                                Belum punya akun?
                                <Link href="/register" className="text-primary-600 hover:underline ml-1">
                                    Buat akun
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
