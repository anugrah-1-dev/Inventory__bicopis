import { Add, Save, Trash } from "@/Components/Icons";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { PageProps } from "@/types";
import AuthLayout from "@/Layouts/AuthLayout";
import Table from "@/Components/Table";
import { priceFormat } from "@/utils/formats";
import Button from "@/Components/Button";
import ComboboxSelect from "@/Components/ComboboxSelect";
import TextInput from "@/Components/TextInput";
import Alert from "@/Components/Alert";

interface Product {
    id: number
    name: string
    price: number
    stock: number
    quantity: number
}

export default function New({ auth, products, flash }: PageProps & 
    {
        products: {id: number, name: string, stock: number}[]
}) {
    const { data, setData, post, processing, errors } = useForm<{date: string, products: Product[]}>({
        date: '',
        products: []
    });

    const [product, setProduct] = useState<Product>({
        id: 0,
        name: '',
        price: 0,
        stock: 0,
        quantity: 1
    })
    const [productList, setProductList] = useState<Product[]>([]);

    const addProduct = () => {
        let isUpdate = false
        const newList = [...productList]
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].id === product.id) {
                newList[i].name = product.name
                newList[i].price = product.price
                newList[i].quantity = product.quantity
                isUpdate = true
            }
        }
        if (!isUpdate){
            setProductList([...productList, product]);
            setData('products', [...productList, product]);
        } else {
            setProductList([...newList]);
            setData('products', [...newList])
        }
    }

    const deleteProduct = (id: number) => {
        const newList = [...productList]
        productList.forEach((list, i) => {
            if (list.id === id) newList.splice(i, 1);
        })
        setProductList(newList)
    }

    const addProductHandle: FormEventHandler = (e) => {
        e.preventDefault();
        addProduct();
        setProduct({
            id: 0,
            name: '',
            price: 0,
            stock: 0,
            quantity: 1
        })
    }

    const submit = () => {
        post(route('product-out.add'));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-3">Tambah Barang Keluar</h2>
            <Alert flash={flash}/>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex w-full flex-col gap-3 bg-white p-4 rounded-md">
                    <div className="w-full">
                        <p className="text-xl font-medium mb-2">Informasi Transaksi</p>
                        <hr className="border border-gray-200"/>
                    </div>
                    <div className="w-full">
                        <TextInput
                            label="Tanggal"
                            value={data.date}
                            type="date"
                            onChange={(e) => setData('date', e.target.value)}
                            errorMsg={errors.date}
                            max={new Date().toISOString().split('T')[0]}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="sm:col-span-2 md:col-span-3">
                        <p className="text-xl font-medium mb-2">Data Barang</p>
                        <hr className="border border-gray-200"/>
                    </div>
                    <form onSubmit={addProductHandle} className="space-y-2">
                        <div className="w-full">
                            <ComboboxSelect
                                label="Nama Barang"
                                id="product"
                                errorMsg={errors.products}
                                options={products}
                                value={product} 
                                placeholder="Pilih barang"
                                customValue={false}
                                onChange={(value) => setProduct({...product, id: value?.id, name: value?.name, price: value?.price, stock: value?.stock})}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <TextInput
                                label="Harga"
                                value={priceFormat(product.price)}
                                min={0}
                                id="price"
                                onChange={(e) => setProduct({...product, price: +e.target.value})}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="w-full mb-3">
                            <TextInput
                                label="Jumlah"
                                value={product.quantity || ''}
                                type="number"
                                min={1}
                                max={product.stock}
                                id="quantity"
                                errorMsg={product.stock === 0 && product.id > 0 ? 'Stok barang habis': ''}
                                onChange={(e) => setProduct({...product, quantity: +e.target.value})}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Button className="w-full" type="submit" icon={<Add className="w-5 h-5"/>} disabled={product.stock === 0}>Tambah</Button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col bg-white p-4 rounded-md md:col-span-2">
                    <div className="w-full mb-2">
                        <p className="text-xl font-medium mb-2">Daftar Barang Keluar</p>
                        <hr className="border border-gray-200"/>
                    </div>
                    <div className="w-full">
                        <Table 
                            header={[
                                {label: 'Nama Barang'},
                                {label: 'Jumlah'},
                                {label: 'Harga'},
                                {label: 'Total Harga'},
                                {label: ''}
                            ]}
                            body={productList.length ? [...productList.map(list => [
                                list.name,
                                list.quantity,
                                priceFormat(list.price),
                                priceFormat(list.price * list.quantity),
                                <button className="text-red-500" onClick={() => deleteProduct(list.id)}><Trash className="w-5 h-5"/></button>
                            ]), ['', '', 'Total', `${priceFormat(productList.reduce((sum, item) => sum + item.price * +item.quantity, 0))}`, '']]: []}
                        ></Table>
                    </div>
                    <div>
                        {productList.length > 0 && <Button onClick={submit} icon={<Save className="w-5 h-5"/>} disabled={processing}>Simpan</Button>}
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}