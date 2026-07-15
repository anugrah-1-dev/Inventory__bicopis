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
            <Link href={`/product-out/${productOutIdFormat(productOut.id)}`} as="button" method="delete" type="button" className="btn danger"><Trash className="h-5 w-5"/>Hapus</Link>
        </AuthLayout>
    )
}