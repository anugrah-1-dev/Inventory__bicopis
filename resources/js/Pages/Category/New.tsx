import { Back, Save } from "@/Components/Icons";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { PageProps } from "@/types";
import AuthLayout from "@/Layouts/AuthLayout";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";

interface Categorys {
    id: number;
    name: string;
    quantity: number;
    shop_id: string;
}

export default function New({ auth, shop_id }: PageProps & { shop_id: string }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        shop_id: shop_id || "", 
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("product-category.add"));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-3">
                Tambah Kategori Baru
            </h2>
            <form
                onSubmit={submit}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 bg-white p-4 rounded-md shadow"
            >
                <div className="sm:col-span-2 md:col-span-3">
                    <p className="text-xl font-medium mb-2">Informasi Kategori</p>
                    <hr className="border border-gray-200" />
                </div>
                <div className="max-w-screen-sm">
                    <TextInput
                        label="Nama Kategori"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        errorMsg={errors.name}
                        required
                        autoFocus
                        disabled={processing}
                    />
                </div>
                {/* <div className="max-w-screen-sm">
                    <TextInput
                        label="Nomor Satuan"
                        type="number"
                        value={data.quantity}
                        onChange={(e) => setData("quantity", e.target.value)}
                        errorMsg={errors.quantity}
                        required
                        disabled={processing}
                    />
                </div> */}
                <div className="max-w-screen-sm sm:col-span-3 flex gap-2">
                    <Link href={route("product-category.get")} className="btn bg-gray-600 text-white hover:bg-gray-700 flex items-center px-4 py-2 rounded-md">
                        <Back className="w-5 h-5" />
                        Kembali
                    </Link>
                    <Button
                        type="submit"
                        className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md flex items-center"
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
