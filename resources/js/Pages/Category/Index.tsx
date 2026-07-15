import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import { Add } from "@/Components/Icons";
import SearchBox from "@/Components/SearchBox";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps, TableHeader } from "@/types";
import { categoryIdFormat } from "@/utils/formats";
import { Link, usePage } from "@inertiajs/react";

interface Category {
    id: number;
    name: string;
}

interface Categorys {
    data: Category[];
    current_page: number;
    last_page: number;
}

export default function Index({
    auth,
    categorys,
    flash,
}: PageProps & { categorys: Categorys }) {
    const { query } = usePage<{ query: { search?: string } }>().props;

    const categoryList = categorys.data.map((category) => [
        categoryIdFormat(category.id),
        category.name,
        
        <Link
            href={`/product-category/detail/${categoryIdFormat(category.id)}`}
            className="text-primary-600 hover:underline"
        >
            Detail
        </Link>,
    ]);

    const tableHeader: TableHeader[] = [
        { name: "id", label: "ID", sortable: true },
        { name: "name", label: "Nama Kategori", sortable: true },
        // { name: "shop_id", label: "Nomor Satuan", sortable: true },
        { label: "Aksi" },
    ];

    return (
        <AuthLayout user={auth.user}>
            <div>
                <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-2">
                    Data Kategori
                </h2>
                <div className="mb-2 flex sm:flex-row flex-col-reverse sm:justify-between gap-3">
                    <SearchBox
                        value={query?.search || ""}
                        placeholder="Cari kategori..."
                    />
                    <div className="flex gap-3 justify-end">
                        <Link
                            href={route("product-category.create")}
                            className="btn primary"
                        >
                            <Add className="w-5 h-5" />
                            Tambah
                        </Link>
                    </div>
                </div>
                <Alert flash={flash} />
                <Table header={tableHeader} body={categoryList}>
                    {query.search?.length
                        ? "Kategori tidak ditemukan"
                        : "Kategori masih kosong"}
                </Table>
            </div>
        </AuthLayout>
    );
}
