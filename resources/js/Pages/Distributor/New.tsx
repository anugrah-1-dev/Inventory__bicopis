import { Back, Save } from "@/Components/Icons";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { PageProps } from "@/types";
import AuthLayout from "@/Layouts/AuthLayout";
import Button from "@/Components/Button";
import TextInput from "@/Components/TextInput";
import Textarea from "@/Components/Textarea";

export default function New({ auth }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        address: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('distributors.add'));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-3">Tambah Distributor Baru</h2>
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 bg-white p-4 rounded-md">
                <div className="sm:col-span-2 md:col-span-3">
                    <p className="text-xl font-medium mb-2">Informasi Distributor</p>
                    <hr className="border border-gray-200"/>
                </div>
                <div className="max-w-screen-sm">
                    <TextInput
                        label="Nama Distributor"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        id="name"
                        errorMsg={errors.name}
                        autoFocus
                        required
                    />
                </div>
                <div className="max-w-screen-sm">
                    <TextInput
                        label="Nomor Telepon"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        id="phone"
                        errorMsg={errors.phone}
                        required
                    />
                </div>
                
                <div className="max-w-screen-sm sm:col-span-2">
                    <Textarea
                        label="Alamat"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        id="address"
                        errorMsg={errors.address}
                        required
                    />
                </div>
                <div className="max-w-screen-sm sm:col-span-3 flex gap-2">
                    <Link href="/distributors" className="btn secondary"><Back className="w-5 h-5"/>Kembali</Link>
                    <Button icon={<Save className="w-5 h-5"/>} type="submit" disabled={processing}>Simpan</Button>
                </div>
            </form>
        </AuthLayout>
    )
}