import Alert from "@/Components/Alert";
import { Add } from "@/Components/Icons";
import Pagination from "@/Components/Pagination";
import SearchBox from "@/Components/SearchBox";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps, TableHeader } from "@/types";
import { distributorIdFormat } from "@/utils/formats";
import { Link, usePage } from "@inertiajs/react";

interface Distributors {
    data: {
        id: number
        name: string
        phone: string
        address: string
    }[]
    current_page: number
    last_page: number
}

export default function Index({ auth, distributors, flash }: PageProps & {distributors: Distributors}) {
    const { query } = usePage<{query: {search?: string}}>().props;

    const distributorsList = distributors.data.map(distributor => [
        distributorIdFormat(distributor.id),
        distributor.name,
        distributor.phone,
        distributor.address,
        <Link
            href={`/distributors/detail/${distributorIdFormat(distributor.id)}`}
            className="text-primary-600 hover:underline"
        >
            Detail
        </Link>
    ]);

    const tableHeader: TableHeader[] = [
        {name: 'id', label: 'ID', sortable: true},
        {name: 'name', label: 'Nama Distributor', sortable: true},
        {name: 'phone', label: 'Telepon'},
        {name: 'address', label: 'Alamat'},
        {label: 'Aksi'},
    ];
    
    return (
        <AuthLayout user={auth.user}>
            <div>
                <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-2">Data Distributor</h2>
                <div className="mb-2 flex sm:flex-row flex-col-reverse sm:justify-between gap-3">
                    <SearchBox value={query.search} placeholder="Cari distributor..."/>
                    <div className="flex justify-end">
                        <Link href="/distributors/new" className="btn primary">
                            <Add className="w-5 h-5"/>
                            Tambah
                        </Link>
                    </div>
                </div>
                <Alert flash={flash}/>
                <Table header={tableHeader} body={distributorsList}>
                    {query.search?.length ? 'Distributor tidak ditemukan' : 'Distributor masih kosong'}
                </Table>
                <div className="flex justify-center">
                    <Pagination page={distributors.current_page} totalPage={distributors.last_page}/>
                </div>
            </div>
        </AuthLayout>
    )
}