import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps, TableHeader } from "@/types";
import Table from "@/Components/Table";
import { priceFormat } from "@/utils/formats";
import { usePage, router } from "@inertiajs/react";
import Button from "@/Components/Button";

interface Stock {
    id: number;
    name: string;
    unit: string;
    price: number;
    shift_1: number;
    shift_2: number;
    total: number;
    stock: number;
}

export default function Index({ auth, stocks }: PageProps & { stocks: Stock[] }) {
    const { query } = usePage<{ query: { date?: string, dept?: string } }>().props;
    const dept = query.dept || 'kitchen';
    const date = query.date || new Date().toISOString().split('T')[0];

    const stockList = stocks.map((s) => [
        s.name,
        s.unit,
        priceFormat(s.price),
        s.shift_1,
        s.shift_2,
        s.total,
        s.stock
    ]);

    const tableHeader: TableHeader[] = [
        { name: "name", label: "Nama Barang" },
        { name: "unit", label: "Satuan" },
        { name: "price", label: "Harga" },
        { name: "shift_1", label: "Shift 1" },
        { name: "shift_2", label: "Shift 2" },
        { name: "total", label: "Total" },
        { name: "stock", label: "Sisa Akhir" },
    ];

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get('/daily-stock', { dept, date: e.target.value }, { preserveState: true });
    };

    return (
        <AuthLayout user={auth.user}>
            <div>
                <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-2">
                    Laporan Stok Harian {dept === 'bar' ? '(Bar & Service)' : '(Kitchen)'}
                </h2>
                
                <div className="mb-4 flex sm:flex-row flex-col sm:justify-between gap-3 items-end">
                    <div className="w-full max-w-xs">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Tanggal</label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            value={date}
                            onChange={handleDateChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        />
                    </div>
                    <Button
                        colorScheme="secondary"
                        onClick={() => window.print()}
                    >
                        Cetak Laporan
                    </Button>
                </div>

                <div className="bg-white p-4 rounded-md shadow-sm overflow-x-auto print:shadow-none print:p-0">
                    <Table header={tableHeader} body={stockList}>
                        {stocks.length === 0 ? "Tidak ada data barang" : ""}
                    </Table>
                </div>
            </div>
        </AuthLayout>
    );
}
