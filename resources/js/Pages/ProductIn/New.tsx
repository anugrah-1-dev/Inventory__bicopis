import { Add, Save, Trash } from "@/Components/Icons";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { PageProps } from "@/types";
import AuthLayout from "@/Layouts/AuthLayout";
import Table from "@/Components/Table";
import TextInput from "@/Components/TextInput";
import ComboboxSelect from "@/Components/ComboboxSelect";
import Button from "@/Components/Button";
import { priceFormat } from "@/utils/formats";

interface Product {
    id: number
    name: string
    price: number
    quantity: number
}

export default function New({ auth, products, distributors }: PageProps & 
    {
        products: {id: number, name: string, stock: number}[],
        distributors: {id: number, name: string}[],
}) {
    const { data, setData, post, processing, errors } = useForm<{date: string, distributor: {id: string, name: string}, products: Product[], 'distributor.id': null}>({
        date: '',
        distributor: {
            id: '',
            name: ''
        },
        products: [],
        'distributor.id': null
    });

    const [product, setProduct] = useState<Product>({
        id: 0,
        name: '',
        price: 0,
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

    const deleteProduct = (name: string) => {
        const newList = [...productList]
        productList.forEach((list, i) => {
            if (list.name === name) newList.splice(i, 1);
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
            quantity: 1
        })
    }

    const submit = () => {
        post(route('product-in.add'));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-3">Tambah Barang Masuk</h2>
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
                    <div className="w-full mb-3">
                        <ComboboxSelect
                            label="Distributor"
                            id="distributor"
                            errorMsg={errors["distributor.id"]}
                            options={distributors}
                            value={data.distributor || {}} 
                            customValue={false}
                            placeholder="Pilih distributor"
                            onChange={(value) => setData('distributor', {id: value?.id, name: value?.name})}
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
                                onChange={(value) => setProduct({...product, id: value?.id, name: value?.name})}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <TextInput
                                label="Harga Beli"
                                value={product.price || ''}
                                type="number"
                                min={0}
                                id="price"
                                onChange={(e) => setProduct({...product, price: +e.target.value})}
                                required
                            />
                        </div>
                        <div className="w-full mb-3">
                            <TextInput
                                label="Jumlah"
                                value={product.quantity || ''}
                                type="number"
                                min={1}
                                id="quantity"
                                onChange={(e) => setProduct({...product, quantity: +e.target.value})}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Button className="w-full" type="submit" icon={<Add className="w-5 h-5"/>} disabled={product.id === 0 && product.quantity < 1}>Tambah</Button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col bg-white p-4 rounded-md md:col-span-2">
                    <div className="w-full mb-2">
                        <p className="text-xl font-medium mb-2">Daftar Barang Masuk</p>
                        <hr className="border border-gray-200"/>
                    </div>
                    <div className="w-full">
                        <Table 
                            header={[
                                {label: 'Nama Barang'}, 
                                {label: 'Jumlah'}, 
                                {label: 'Harga'}, 
                                {label: 'Total Harga'}, 
                                {label: ''}]}
                            body={productList.length ? [...productList.map(list => [
                                list.name,
                                list.quantity,
                                priceFormat(list.price),
                                priceFormat(list.price * list.quantity),
                                <button className="text-red-500" onClick={() => deleteProduct(list.name)}><Trash className="w-5 h-5"/></button>
                            ]), ['', '', 'Total', `${priceFormat(productList.reduce((sum, item) => sum + item.price * +item.quantity, 0))}`, '']] : []}
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