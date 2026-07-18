import { Back, Pencil, Save, Trash } from "@/Components/Icons";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { categoryIdFormat } from "@/utils/formats";
import Button from "@/Components/Button";
import TextInput from "@/Components/TextInput";

interface Category {
    id: number;
    name: string;
    shop_id: string;
}

export default function Detail({ auth, productCategory }: PageProps & { productCategory: Category }) {
    const [isEdit, setIsEdit] = useState(false);
    const { data, setData, put, processing, errors } = useForm({
        name: productCategory.name,
        shop_id: productCategory.shop_id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('product-category.edit', {id: categoryIdFormat(productCategory.id)}));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6">
                Detail Kategori
            </h2>
            <form
                onSubmit={submit}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 bg-white p-4 rounded-md"
            >
                <div className="sm:col-span-2 md:col-span-3">
                    <p className="text-xl font-medium mb-2">
                        Informasi Kategori Barang
                    </p>
                    <hr className="border border-gray-200" />
                </div>

                <div className="max-w-screen-sm">
                    {isEdit ? (
                        <TextInput
                            label="Nama Kategori Barang"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            id="name"
                            errorMsg={errors.name}
                            required
                            autoFocus
                        />
                    ) : (
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">
                                Nama Kategori Barang
                            </p>
                            <p className="w-full text-lg text-gray-900">
                                {productCategory.name}
                            </p>
                        </>
                    )}
                </div>

                <div className="max-w-screen-sm sm:col-span-3 flex gap-2">
                    {isEdit ? (
                        <>
                            <Button
                                type="button"
                                colorScheme="secondary"
                                onClick={() => setIsEdit(false)}
                                icon={<Back className="w-5 h-5" />}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                icon={<Save className="w-5 h-5" />}
                                disabled={processing}
                            >
                                Simpan
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                colorScheme="warning"
                                type="button"
                                onClick={() => setIsEdit(true)}
                                icon={<Pencil className="w-5 h-5" />}
                            >
                                Edit
                            </Button>
                            <Link
                                href={`/product-category/${categoryIdFormat(productCategory.id)}`}
                                as="button"
                                method="delete"
                                type="button"
                                className="btn danger"
                            >
                                <Trash className="h-5 w-5" />
                                Hapus
                            </Link>
                        </>
                    )}
                </div>
            </form>
        </AuthLayout>
    );
}
