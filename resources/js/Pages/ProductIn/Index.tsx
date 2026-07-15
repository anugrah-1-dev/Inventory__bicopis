import Alert from "@/Components/Alert";
import { Add } from "@/Components/Icons";
import Pagination from "@/Components/Pagination";
import SearchBox from "@/Components/SearchBox";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps, TableHeader } from "@/types";
import { dateFormat, priceFormat, productInIdFormat } from "@/utils/formats";
import { Link, usePage } from "@inertiajs/react";

interface ProductIns {
    data: {
        id: number
        date: string
        distributor: string
        total_price: number
    }[]
    current_page: number
    last_page: number
}

export default function Index({ auth, productIns, flash }: PageProps & {productIns: ProductIns}) {
    const { query } = usePage<{query: {search?: string}}>().props;

    const productInList = productIns.data.map(productIn => [
        productInIdFormat(productIn.id),
        dateFormat(productIn.date),
        productIn.distributor,
        priceFormat(productIn.total_price),
        <Link 
            href={`/product-in/detail/${productInIdFormat(productIn.id)}`}
            className="text-primary-600 hover:underline"
        >
            Detail
        </Link>
    ]);

    const tableHeader: TableHeader[] = [
        {name: 'id', label: 'ID Transaksi', sortable: true},
        {name: 'date', label: 'Tanggal', sortable: true},
        {name: 'distributor', label: 'Distributor'},
        {name: 'total_price', label: 'Total Harga'},
        {label: 'Aksi'},
    ];
    
    return (
        <AuthLayout user={auth.user}>
            <div>
                <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-2">Data Barang Masuk</h2>
                <div className="mb-2 flex sm:flex-row flex-col-reverse sm:justify-between gap-3">
                    <SearchBox value={query.search} placeholder="Cari ID Transaksi..."/>
                    <div className="flex justify-end gap-2">
                        <Link href="/product-in/new" className="btn primary">
                            <Add className="w-5 h-5"/>
                            Tambah
                        </Link>
                    </div>
                </div>
                <Alert flash={flash}/>
                <Table header={tableHeader} body={productInList}>
                    {query.search?.length ? 'Transaksi tidak ditemukan' : 'Transaksi masih kosong'}
                </Table>
                <div className="flex justify-center">
                <Pagination page={productIns.current_page} totalPage={productIns.last_page}/>
                </div>
            </div>
        </AuthLayout>
    )
}