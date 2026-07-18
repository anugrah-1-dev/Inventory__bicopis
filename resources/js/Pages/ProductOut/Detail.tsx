import { Trash } from "@/Components/Icons";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { dateFormat, priceFormat, productOutIdFormat } from "@/utils/formats";
import { Link } from "@inertiajs/react";

interface ProductOut {
    id: number,
    date: string,
    total_price: number,
    products: {
        name: string,
        quantity: number,
        price: number,
        total_price: number
    }[]
}

export default function Detail({ auth, productOut }: PageProps & {productOut: ProductOut}) {
    const dataTable = productOut.products.map(product => [
        product.name, 
        product.quantity, 
        priceFormat(product.price),
        priceFormat(product.total_price)
    ]);
    dataTable.push([
        '', 
        '', 
        'Jumlah', 
        `${priceFormat(productOut.products.reduce((sum, item) => sum + item.total_price, 0))}`
    ]);

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6">Detail Barang Keluar</h2>
            <div className="p-4 bg-white rounded-lg grid grid-cols-2 text-base font-medium gap-x-3 w-fit mb-3">
                <p>ID Transaksi</p>
                <p>: {productOutIdFormat(productOut.id)}</p>
                <p>Tanggal</p>
                <p>: {dateFormat(productOut.date)}</p>
            </div>
            <Table 
                    header={[
                        {label: 'Nama Barang'},
                        {label: 'Jumlah'},
                        {'label': 'Harga'},
                        {label: 'Total Harga'}
                    ]}
                    body={dataTable}
                />
            <div className="flex flex-row mt-6 gap-4">
                <Link href="/product-out" className="btn bg-gray-600 text-white hover:bg-gray-700 flex items-center px-4 py-2 rounded-md">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Kembali
                </Link>
                <Link href={`/product-out/${productOutIdFormat(productOut.id)}`} as="button" method="delete" type="button" className="btn danger"><Trash className="h-5 w-5"/>Hapus</Link>
            </div>
        </AuthLayout>
    )
}