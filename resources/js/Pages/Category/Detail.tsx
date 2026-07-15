import { Back, Pencil, Save, Trash } from "@/Components/Icons";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import Button from "@/Components/Button";
import { priceFormat, productIdFormat } from "@/utils/formats";
import TextInput from "@/Components/TextInput";
import ComboboxSelect from "@/Components/ComboboxSelect";
import Textarea from "@/Components/Textarea";

interface Product {
    id: number
    name: string
    category: {
        id: number,
        name: string
    }
    stock: number
    unit: {
        id: number,
        name: string
    }
    code: string
    price: number
    description?: string
}

export default function Detail({ auth, product, categories, units }: PageProps & {
    product: Product,
    categories: {id: number, name: string}[],
    units: {id: number, name: string}[]
}) {
    const [isEdit, setIsEdit] = useState(false);
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        category: {id: product.category.id, name: product.category.name},
        unit: {id: product.unit.id, name: product.unit.name},
        price: product.price,
        code: product.code,
        description: product.description
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('products.edit', {id: productIdFormat(product.id)}));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6">Detail Barang</h2>
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 bg-white p-4 rounded-md">
                <div className="sm:col-span-2 md:col-span-3">
                    <p className="text-xl font-medium mb-2">Informasi Barang</p>
                    <hr className="border border-gray-200"/>
                </div>
                <div className="max-w-screen-sm">
                    {
                        isEdit ?
                        <TextInput
                            label="Nama Barang"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            id="name"
                            errorMsg={errors.name}
                            required
                            autoFocus
                        />:
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">Nama Barang</p>
                            <p className="w-full text-lg text-gray-900">{product.name}</p>
                        </>
                    }
                </div>
                <div className="max-w-screen-sm">
                    {
                        isEdit ?
                        <TextInput
                            label="Harga"
                            value={data.price || ''}
                            type="number"
                            onChange={(e) => setData('price', +e.target.value)}
                            id="price"
                            errorMsg={errors.price}
                            required
                        />:
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">Harga</p>
                            <p className="w-full text-lg text-gray-900">{priceFormat(product.price)}</p>
                        </>
                    }
                </div>
                <div className="max-w-screen-sm">
                    {
                        isEdit ?
                        <ComboboxSelect
                            label="Kategori"
                            options={categories}
                            value={data.category || {}}
                            onChange={(value) => {setData('category', {id: value?.id, name: value?.name})}}
                            id="category"
                            errorMsg={errors.category}
                        />:
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">Kategori</p>
                            <p className="w-full text-lg text-gray-900">{product.category.name || '-'}</p>
                        </>
                    }
                </div>
                <div className="max-w-screen-sm">
                    {
                        isEdit ?
                        <ComboboxSelect
                            label="Satuan"
                            options={units}
                            value={data.unit || {}}
                            onChange={(value) => setData('unit', {id: value?.id, name: value?.name})}
                            id="unit"
                            errorMsg={errors.unit}
                        />:
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">Satuan</p>
                            <p className="w-full text-lg text-gray-900">{product.unit.name || '-'}</p>
                        </>
                    }
                </div>
                <div className="max-w-screen-sm">
                    {
                        isEdit ?
                        <TextInput
                            label="Barcode"
                            value={data.code}
                            type="number"
                            onChange={(e) => setData('code', e.target.value.trim())}
                            id="code"
                            errorMsg={errors.code}
                        />:
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">Barcode</p>
                            <p className="w-full text-lg text-gray-900">{product.code}</p>
                        </>
                    }
                </div>
                <div className="max-w-screen-sm">
                    {!isEdit &&
                        <>
                        <p className="block mb-1 text-sm font-medium text-gray-600">Stok</p>
                        <p className="w-full text-lg text-gray-900">{product.stock}</p>
                        </>
                    }
                </div>
                <div className="max-w-screen-sm sm:col-span-2">
                    {
                        isEdit ?
                        <Textarea
                            label="Deskripsi"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            id="description"
                            errorMsg={errors.description}
                        />:
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">Deskripsi</p>
                            <p className="w-full text-lg text-gray-900">{product.description || '-'}</p>
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
                            <Link href={`/products/${productIdFormat(product.id)}`} as="button" method="delete" type="button" className="btn danger"><Trash className="h-5 w-5"/>Hapus</Link>
                        </>
                    }
                </div>
            </form>
        </AuthLayout>
    )
}
