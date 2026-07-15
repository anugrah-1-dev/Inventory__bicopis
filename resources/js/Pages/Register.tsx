import Button from "@/Components/Button";
import { Lock, Mail, Person } from "@/Components/Icons";
import Navbar from "@/Components/Navbar";
import PasswordInput from "@/Components/PasswordInput";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="antialiased bg-gray-100">
            <Navbar/>
            <main className="px-4 pt-20 min-h-screen flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-100">
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl font-medium text-center mb-1 text-gray-900">Selamat Datang</h2>
                    <h3 className="text-center text-sm mb-2 text-gray-500 font-medium">Silahkan masuk ke akun Anda</h3>
                    <form className="p-4" onSubmit={submit}>
                        <div className="mb-2">
                            <TextInput
                                label="Nama"
                                icon={<Person className="w-5 h-5"/>}
                                errorMsg={errors.name}
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                autoFocus
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <TextInput
                                label="Email"
                                icon={<Mail className="w-5 h-5"/>}
                                errorMsg={errors.email}
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <PasswordInput
                                label="Kata Sandi" 
                                icon={<Lock className="w-5 h-5"/>} 
                                errorMsg={errors.password} 
                                id="password" 
                                minLength={8} 
                                value={data.password} 
                                onChange={(e) => setData('password', e.target.value)} 
                                required
                            />
                        </div>
                        <Button className="w-full mb-2" type="submit" disabled={processing}>Daftar</Button>
                        <div className="text-center text-sm font-medium text-gray-500">
                            Sudah punya akun?
                            <Link href="/login" className="text-primary-700 hover:underline">Masuk</Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}