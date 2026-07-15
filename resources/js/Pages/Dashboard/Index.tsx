import Alert from "@/Components/Alert";
import AreaChart from "@/Components/AreaChart";
import { Box, Archive } from "@/Components/Icons";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";

interface DashboardProps extends PageProps {
    currentyear: number;
    countitem: number;
    countin: number;
    countout: number;
}
interface ChartProps {
    earnings: number[];
    expenses: number[];
  }
  

export default function Index({ auth, flash, ziggy, countitem, currentyear, countin, countout, earnings, expenses }: DashboardProps & ChartProps) {

    return (
        <AuthLayout user={auth.user}>
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
                <Alert flash={flash} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center border-l-4 border-blue-500">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500">Stok Barang</h3>
                            <p className="text-2xl font-bold text-gray-800">{countitem}</p>
                        </div>
                        <Box className="w-10 h-10 text-gray-400" />
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center border-l-4 border-green-500">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500">Barang Masuk</h3>
                            <p className="text-2xl font-bold text-gray-800">{countin}</p>
                        </div>
                        <Archive className="w-10 h-10 text-gray-400" />
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center border-l-4 border-red-500">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500">Barang Keluar</h3>
                            <p className="text-2xl font-bold text-gray-800">{countout}</p>
                        </div>
                        <Archive className="w-10 h-10 text-gray-400" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Ringkasan Barang Tahun {currentyear}</h3>
                        <AreaChart auth={auth} flash={flash} ziggy={ziggy} earnings={earnings} expenses={expenses} />

                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Revenue Sources</h3>
                        <div className="flex justify-center items-center h-40">
                            <p className="text-gray-400">Chart Placeholder</p>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            <span className="mr-2 text-blue-500">● Direct</span>
                            <span className="mr-2 text-green-500">● Social</span>
                            <span className="text-yellow-500">● Referral</span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}