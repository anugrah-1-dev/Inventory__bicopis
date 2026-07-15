import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import { Save } from "@/Components/Icons";
import PasswordInput from "@/Components/PasswordInput";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Index({ auth, flash }: PageProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        password: '',
        current_password: ''
    });

    const changeAcc: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('account.update-profile'));
    }

    const changePass: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('account.update-password'));
        reset('password', 'current_password');
    }

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6">Akun Saya</h2>
            <Alert flash={flash}/>
            <div className="grid grid-cols-1 w-full gap-4 bg-white p-4 rounded-md">
                <div className="">
                    <p className="text-xl font-medium mb-2">Informasi Akun</p>
                    <hr className="border border-gray-200"/>
                </div>
                <form className="max-w-screen-sm space-y-4" onSubmit={changeAcc}>
                    <div>
                        <TextInput
                            label="Nama"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <TextInput
                            label="Email"
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Button type="submit" icon={<Save className="w-5 h-5"/>} disabled={processing}>Simpan</Button>
                    </div>
                </form>

                <div className="">
                    <p className="text-xl font-medium mb-2">Ubah Kata Sandi</p>
                    <hr className="border border-gray-200"/>
                </div>
                <form className="max-w-screen-sm space-y-4" onSubmit={changePass}>
                    <div>
                        <PasswordInput
                            label="Kata Sandi Lama"
                            id="current-password"
                            minLength={8}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            errorMsg={errors.current_password}
                            required
                        />
                    </div>
                    <div>
                        <PasswordInput
                            label="Kata Sandi Baru"
                            id="new-password"
                            minLength={8}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            errorMsg={errors.password}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Button type="submit" icon={<Save className="w-5 h-5"/>} disabled={processing}>Simpan</Button>
                    </div>
                </form>
            </div>  
        </AuthLayout>
    )
}