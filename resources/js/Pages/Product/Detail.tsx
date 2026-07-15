import { Back, Pencil, Save, Trash } from "@/Components/Icons";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import Button from "@/Components/Button";
import { priceFormat, productIdFormat } from "@/utils/formats";
import TextInput from "@/Components/TextInput";
import Textarea from "@/Components/Textarea";
import Barcode from "@/Components/Barcode";

interface Product {
    id: number;
    name: string;
    stock: number;
    code: string;
    price: number;
    category: string;
    unit: string;
    description?: string;
}

export default function Detail({
    auth,
    product,
}: PageProps & { product: Product }) {
    const [isEdit, setIsEdit] = useState(false);
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        code: product.code,
        stock: product.stock,
        category: product.category,
        unit: product.unit,
        description: product.description,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("products.edit", { id: productIdFormat(product.id) }));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6">
                Detail Barang
            </h2>
            <form
                onSubmit={submit}
                className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 bg-white p-4 rounded-md"
            >
                <div className="max-w-screen-sm">
                    {isEdit ? (
                        <TextInput
                            label="Nama Barang"
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
                                Nama Barang
                            </p>
                            <p className="w-full text-lg text-gray-900">
                                {product.name}
                            </p>
                        </>
                    )}
                </div>

                <div className="max-w-screen-sm">
                    {isEdit ? (
                        <TextInput
                            label="Harga"
                            value={data.price || ""}
                            type="number"
                            onChange={(e) => setData("price", +e.target.value)}
                            id="price"
                            errorMsg={errors.price}
                            required
                        />
                    ) : (
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">
                                Harga
                            </p>
                            <p className="w-full text-lg text-gray-900">
                            {priceFormat(product.price)}
                        </p>
                        </>
                    )}
                </div>
                
                <div className="max-w-screen-sm">
                    {isEdit ? (
                        <TextInput
                            label="Stok"
                            value={data.stock}
                            type="number"
                            onChange={(e) => setData("stock", +e.target.value)}
                            id="stock"
                            errorMsg={errors.stock}
                            required
                        />
                    ) : (
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">
                                Stok
                            </p>
                            <p className="w-full text-lg text-gray-900">
                                {product.stock}
                            </p>
                        </>
                    )}
                </div>
                
                <div className="max-w-screen-sm">
                    {isEdit ? (
                        <TextInput
                            label="Satuan"
                            value={data.unit}
                            onChange={(e) => setData("unit", e.target.value)}
                            id="unit"
                            errorMsg={errors.unit}
                            required
                        />
                    ) : (
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">
                                Satuan
                            </p>
                            <p className="w-full text-lg text-gray-900">
                                {product.unit}
                            </p>
                        </>
                    )}
                </div>
                
                <div className="max-w-screen-sm">
                    {isEdit ? (
                        <TextInput
                            label="Kategori"
                            value={data.category}
                            onChange={(e) => setData("category", e.target.value)}
                            id="category"
                            errorMsg={errors.category}
                            required
                        />
                    ) : (
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">
                                Kategori
                            </p>
                            <p className="w-full text-lg text-gray-900">
                                {product.category}
                            </p>
                        </>
                    )}
                </div>

                <div className="max-w-screen-sm">
                    {isEdit ? (
                        <TextInput
                            label="Barcode"
                            value={data.code}
                            onChange={(e) => setData("code", e.target.value)}
                            id="code"
                            errorMsg={errors.code}
                            required
                        />
                    ) : (
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">
                                Barcode
                            </p>
                            <Barcode value={product.code} />
                        </>
                    )}
                </div>

                <div className="max-w-screen-sm sm:col-span-2">
                    {isEdit ? (
                        <Textarea
                            label="Deskripsi"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            id="description"
                            errorMsg={errors.description}
                        />
                    ) : (
                        <>
                            <p className="block mb-1 text-sm font-medium text-gray-600">
                                Deskripsi
                            </p>
                            <p className="w-full text-lg text-gray-900">
                                {product.description}
                            </p>
                        </>
                    )}
                </div>
                <div className="max-w-screen-sm sm:col-span-2 flex gap-2">
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
                                href={`/products/${productIdFormat(
                                    product.id
                                )}`}
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
