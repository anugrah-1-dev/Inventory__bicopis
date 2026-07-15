import Alert from "@/Components/Alert";
import { Add } from "@/Components/Icons";
import Pagination from "@/Components/Pagination";
import SearchBox from "@/Components/SearchBox";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps, TableHeader } from "@/types";
import { dateFormat, priceFormat, productOutIdFormat } from "@/utils/formats";
import { Link, usePage } from "@inertiajs/react";

interface ProductOuts {
    data: {
        id: number
        date: string
        total_price: number
    }[]
    current_page: number
    last_page: number
}

export default function Index({ auth, productOuts, flash }: PageProps & {productOuts: ProductOuts}) {
    const { query } = usePage<{query: {search?: string}}>().props;

    const productInList = productOuts.data.map(productOut => [
        productOutIdFormat(productOut.id),
        dateFormat(productOut.date),
        priceFormat(productOut.total_price),
        <Link 
            href={`/product-out/detail/${productOutIdFormat(productOut.id)}`}
            className="text-primary-600 hover:underline"
        >
            Detail
        </Link>
    ]);

    const tableHeader: TableHeader[] = [
        {name: 'id', label: 'ID Transaksi', sortable: true},
        {name: 'date', label: 'Tanggal', sortable: true},
        {name: 'total_price', label: 'Total Harga'},
        {label: 'Aksi'},
    ];
    
    return (
        <AuthLayout user={auth.user}>
            <div>
                <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-2">Data Barang Keluar</h2>
                <div className="mb-2 flex sm:flex-row flex-col-reverse sm:justify-between gap-3">
                    <SearchBox value={query.search} placeholder="Cari ID Transaksi..."/>
                    <div className="flex justify-end">
                        <Link href="/product-out/new" className="btn primary">
                            <Add className="w-5 h-5"/>
                            Tambah
                        </Link>
                    </div>
                </div>
                <Alert flash={flash}/>
                <Table header={tableHeader} body={productInList}>
                    {query.search?.length ? 'Transakasi tidak ditemukan' : 'Transaksi masih kosong'}
                </Table>
                <div className="flex justify-center">
                <Pagination page={productOuts.current_page} totalPage={productOuts.last_page}/>
                </div>
            </div>
        </AuthLayout>
    )
}