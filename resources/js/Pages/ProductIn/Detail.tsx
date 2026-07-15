import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import { Print, Trash } from "@/Components/Icons";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { dateFormat, priceFormat, productInIdFormat } from "@/utils/formats";
import { Link } from "@inertiajs/react";
import Barcode from "@/Components/Barcode"; 
import ModalCode from "@/Components/ModalCode"; // Import Modal
import { useState, useRef } from "react";

interface ProductIn {
    id: number,
    distributor: string,
    date: string,
    total_price: number,
    products: {
        name: string,
        quantity: number, // Jumlah produk
        price: number,
        total_price: number,
        code: string
    }[]
}

export default function Detail({ auth, productIn, flash }: PageProps & {productIn: ProductIn}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        if (printRef.current) {
            const printContents = printRef.current.innerHTML;
            const originalContents = document.body.innerHTML;

            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload();
        }
    };

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
            <div className="flex flex-row mt-6">
                <Link href={`/product-in/${productInIdFormat(productIn.id)}`} as="button" method="delete" type="button" className="btn danger">
                    <Trash className="h-5 w-5"/> Hapus
                </Link>
                <div className="ml-4">
                    <Button type="button" icon={<Print className="w-5 h-5" />} onClick={() => setIsModalOpen(true)}>
                        Cetak Barcode
                    </Button>
                </div>
            </div>

            {/* MODAL BARCODE */}
            <ModalCode isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div ref={printRef}>
                    <h3 className="font-semibold text-lg">Barcode Produk</h3>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {productIn.products.map((product, index) => 
                            Array(product.quantity).fill(0).map((_, i) => (
                                <div key={`${index}-${i}`} className="border p-4 rounded-md text-center">
                                    <p className="text-sm font-semibold mb-2">{product.name}</p>
                                    <div className="flex">
                                        <Barcode value={product.code}/>
                                        <div className="w-30">
                                            <p>{productInIdFormat(productIn.id)}</p>
                                            <p>{dateFormat(productIn.date)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <Button type="button" icon={<Print className="w-5 h-5" />} onClick={handlePrint}>
                        Cetak
                    </Button>
                </div>
            </ModalCode>
        </AuthLayout>
    );
}
