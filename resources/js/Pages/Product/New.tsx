import { Back, Save } from "@/Components/Icons";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { PageProps } from "@/types";
import AuthLayout from "@/Layouts/AuthLayout";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import Textarea from "@/Components/Textarea";

export default function New({
    auth,
    dept
}: PageProps & { dept: string }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        price: "0",
        stock: "0",
        category: "",
        unit: "", 
        description: "",
        department: dept,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("products.add"));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-3">
                Tambah Barang Baru
            </h2>
            <form
                onSubmit={submit}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 bg-white p-4 rounded-md"
            >
                <div className="sm:col-span-2 md:col-span-3">
                    <p className="text-xl font-medium mb-2">Informasi Barang</p>
                    <hr className="border border-gray-200" />
                </div>
                <div className="max-w-screen-sm">
                    <TextInput
                        label="Nama Barang"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        errorMsg={errors.name}
                        required
                        autoFocus
                    />
                </div>
                <div className="max-w-screen-sm">
                    <TextInput
                        label="Harga (Rp)"
                        value={data.price}
                        type="number"
                        onChange={(e) => setData("price", e.target.value)}
                        errorMsg={errors.price}
                        required
                    />
                </div>
                <div className="max-w-screen-sm">
                    <TextInput
                        label="Kategori"
                        id="category"
                        value={data.category}
                        onChange={(e) => setData("category", e.target.value)}
                        errorMsg={errors.category}
                        required
                    />
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">Satuan</label>
                    <select
                        id="unit"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        value={data.unit}
                        onChange={(e) => setData("unit", e.target.value)}
                        required
                    >
                        <option value="" disabled>Pilih Satuan</option>
                        <option value="BTL">BTL (Botol)</option>
                        <option value="KG">KG (Kilogram)</option>
                        <option value="LITER">LITER</option>
                        <option value="PCS">PCS</option>
                        <option value="IKAT">IKAT</option>
                        <option value="PACK">PACK</option>
                        <option value="KARTON">KARTON</option>
                    </select>
                    {errors.unit && <p className="mt-1 text-sm text-red-600">{errors.unit}</p>}
                </div>

                <div className="max-w-screen-sm sm:col-span-2">
                    <Textarea
                        label="Deskripsi"
                        id="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        errorMsg={errors.description}
                    />
                </div>
                <div className="max-w-screen-sm sm:col-span-3 flex gap-2">
                    <Link href={`/products?dept=${dept}`} className="btn secondary">
                        <Back className="w-5 h-5" />
                        Kembali
                    </Link>
                    <Button
                        type="submit"
                        icon={<Save className="w-5 h-5" />}
                        disabled={processing}
                    >
                        Simpan
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
