import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import { Back, Print, Trash } from "@/Components/Icons";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { dateFormat, priceFormat, productInIdFormat } from "@/utils/formats";
import { Link } from "@inertiajs/react";

interface ProductIn {
    id: number,
    distributor: string,
    date: string,
    total_price: number,
    products: {
        name: string,
        quantity: number, // Jumlah produk
        price: number,
        total_price: number
    }[]
}

export default function Detail({ auth, productIn, flash }: PageProps & {productIn: ProductIn}) {

    const dataTable = productIn.products.map(product => [
        product.name, 
        product.quantity, 
        priceFormat(product.price),
        priceFormat(product.total_price)
    ]);
    
    dataTable.push([
        '',
        '',
        'Jumlah',
        `${priceFormat(productIn.products.reduce((sum, item) => sum + item.total_price, 0))}`
    ]);

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6">Detail Barang Masuk</h2>
            
            <div className="p-4 bg-white rounded-lg grid grid-cols-2 text-base font-medium gap-x-3 w-fit mb-3">
                <p>ID Transaksi</p>
                <p>: {productInIdFormat(productIn.id)}</p>
                <p>Tanggal</p>
                <p>: {dateFormat(productIn.date)}</p>
                <p>Nama Distributor</p>
                <p>: {productIn.distributor}</p>
            </div>
            <Alert flash={flash}/>
            <Table 
                header={[
                    {label: 'Nama Barang'},
                    {label: 'Jumlah'},
                    {label: 'Harga'},
                    {label: 'Total Harga'}
                ]}
                body={dataTable}
            />

            {/* Tombol Aksi */}
            <div className="flex flex-row mt-6 gap-4">
                <button onClick={() => window.history.back()} type="button" className="btn bg-gray-600 text-white hover:bg-gray-700 flex items-center px-4 py-2 rounded-md">
                    <Back className="w-5 h-5" />
                    Kembali
                </button>
                <Link href={`/product-in/${productInIdFormat(productIn.id)}`} as="button" method="delete" type="button" className="btn danger">
                    <Trash className="h-5 w-5"/> Hapus
                </Link>
            </div>
        </AuthLayout>
    );
}
