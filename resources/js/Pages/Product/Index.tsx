import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import { Add } from "@/Components/Icons";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SearchBox from "@/Components/SearchBox";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps, TableHeader } from "@/types";
import { priceFormat, productIdFormat } from "@/utils/formats";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

interface Products {
    data: {
        id: number;
        name: string;
        unit: string;
        category: string;
        stock: number;
        price: number;
    }[];
    current_page: number;
    last_page: number;
}

export default function Index({
    auth,
    products,
    flash,
}: PageProps & { products: Products }) {
    const [isOpen, setIsOpen] = useState(false);
    const { query } = usePage<{ query: { search?: string, dept?: string } }>().props;
    const dept = query.dept || 'kitchen';

    const productsList = products.data.map((product) => [
        productIdFormat(product.id),
        product.name,
        product.unit,
        product.category,
        product.stock,
        priceFormat(product.price),
        <Link
            href={`/products/detail/${productIdFormat(product.id)}`}
            className="text-primary-600 hover:underline"
        >
            Detail
        </Link>,
    ]);

    const tableHeader: TableHeader[] = [
        { name: "id", label: "ID", sortable: true },
        { name: "name", label: "Nama Barang", sortable: true },
        { name: "unit", label: "Satuan", sortable: true },
        { name: "category", label: "Kategori", sortable: true },
        { name: "stock", label: "Stok", sortable: true },
        { name: "price", label: "Harga", sortable: true },
        { label: "Aksi" },
    ];

    return (
        <AuthLayout user={auth.user}>
            <div>
                <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-2">
                    Data Barang {dept === 'bar' ? '(Bar & Service)' : '(Kitchen)'}
                </h2>
                <div className="mb-2 flex sm:flex-row flex-col-reverse sm:justify-between gap-3">
                    <SearchBox
                        value={query.search}
                        placeholder="Cari barang..."
                    />
                    <div className="flex gap-3 justify-end">

                        <Link href={`/products/new?dept=${dept}`} className="btn primary">
                            <Add className="w-5 h-5" />
                            Tambah
                        </Link>
                    </div>
                </div>
                <Alert flash={flash} />
                <Table header={tableHeader} body={productsList}>
                    {query.search?.length
                        ? "Barang tidak ditemukan"
                        : "Barang masih kosong"}
                </Table>

                <div className="flex justify-center">
                    <Pagination
                        page={products.current_page}
                        totalPage={products.last_page}
                    />

                </div>
            </div>
        </AuthLayout>
    );
}
