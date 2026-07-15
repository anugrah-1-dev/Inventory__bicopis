import Button from "@/Components/Button";
import { Back, Pencil, Save, Trash } from "@/Components/Icons";
import Textarea from "@/Components/Textarea";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

interface Distributor {
    id: number
    name: string
    phone: string
    address: string
}[]

export default function Detail({ auth, distributor }: PageProps & {distributor: Distributor}) {
    const [isEdit, setIsEdit] = useState(false);
    const { data, setData, put, processing, errors } = useForm({
        name: distributor.name,
        phone: distributor.phone,
        address: distributor.address
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('distributors.edit', {id: `D${distributor.id.toString().padStart(3, '0')}`}));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6">Detail Distributor</h2>
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 bg-white p-4 rounded-md">
                <div className="sm:col-span-2 md:col-span-3">
                    <p className="text-xl font-medium mb-2">Informasi Distributor</p>
                    <hr className="border border-gray-200"/>
                </div>
                <div className="max-w-screen-sm">
                    {
                        isEdit ?
                        <TextInput
                            label="Nama Distributor"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            id="name"
                            errorMsg={errors.name}
                            required
                            autoFocus
                        />:
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">Nama Distributor</p>
                            <p className="w-full text-lg text-gray-900">{distributor.name}</p>
                        </>
                    }
                </div>
                <div className="max-w-screen-sm">
                    {
                        isEdit ?
                        <TextInput
                            label="Nomor Telepon"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            id="phone"
                            errorMsg={errors.phone}
                            required
                        />:
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">Nomor Telepon</p>
                            <p className="w-full text-lg text-gray-900">{distributor.phone}</p>
                        </>
                    }
                </div>
                <div className="max-w-screen-sm sm:col-span-2">
                    {
                        isEdit ?
                        <Textarea
                            label="Alamat"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            id="address"
                            errorMsg={errors.address}
                            required
                        />:
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">Alamat</p>
                            <p className="w-full text-lg text-gray-900">{distributor.address}</p>
                        </>
                    }
                </div>
                <div className="max-w-screen-sm sm:col-span-3 flex gap-2">
                    {
                        isEdit ? 
                        <>
                            <Button type="button" colorScheme="secondary" onClick={() => setIsEdit(false)} icon={<Back className="w-5 h-5"/>}>Batal</Button>
                            <Button type="submit" icon={<Save className="w-5 h-5"/>} disabled={processing}>Simpan</Button>
                        </> :
                        <>
                            <Button colorScheme="warning" type="button" onClick={() => setIsEdit(true)} icon={<Pencil className="w-5 h-5"/>}>Edit</Button>
                            <Link href={`/distributors/${distributor.id.toString().padStart(3, '0')}`} as="button" method="delete" type="button" className="btn danger"><Trash className="h-5 w-5"/>Hapus</Link>
                        </>
                    }
                </div>
            </form>
        </AuthLayout>
    )
}