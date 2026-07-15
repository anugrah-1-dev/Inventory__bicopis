import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import { Add } from "@/Components/Icons";
import SearchBox from "@/Components/SearchBox";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps, TableHeader } from "@/types";
import { unitIdFormat } from "@/utils/formats";
import { Link, usePage } from "@inertiajs/react";

interface Unit {
    id: number;
    name: string;
    shop_id: string;
}

interface Units {
    data: Unit[];
    current_page: number;
    last_page: number;
}

export default function Index({
    auth,
    units,
    flash,
}: PageProps & { units: Units }) {
    const { query } = usePage<{ query: { search?: string } }>().props;

    const unitsList = units.data.map((unit) => [
        unitIdFormat(unit.id),
        unit.name,
        
        <Link
            href={`/product-units/detail/${unitIdFormat(unit.id)}`}
            className="text-primary-600 hover:underline"
        >
            Detail
        </Link>,
    ]);

    const tableHeader: TableHeader[] = [
        { name: "id", label: "ID", sortable: true },
        { name: "name", label: "Nama Satuan Barang", sortable: true },
        // { name: "shop_id", label: "Nomor Satuan", sortable: true },
        { label: "Aksi" },
    ];

    return (
        <AuthLayout user={auth.user}>
            <div>
                <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-2">
                    Data Satuan
                </h2>
                <div className="mb-2 flex sm:flex-row flex-col-reverse sm:justify-between gap-3">
                    <SearchBox
                        value={query?.search || ""}
                        placeholder="Cari satuan..."
                    />
                    <div className="flex gap-3 justify-end">
                        <Link
                            href={route("product-units.create")}
                            className="btn primary"
                        >
                            <Add className="w-5 h-5" />
                            Tambah
                        </Link>
                    </div>
                </div>
                <Alert flash={flash} />
                <Table header={tableHeader} body={unitsList}>
                    {query.search?.length
                        ? "Satuan Barang tidak ditemukan"
                        : "Satuan masih kosong"}
                </Table>
            </div>
        </AuthLayout>
    );
}
