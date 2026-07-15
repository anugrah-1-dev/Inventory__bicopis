export function priceFormat(price: number) {
    return price.toLocaleString('id-ID', {
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0
    });
}

export function productIdFormat(id: number) {
    return `B${id.toString().padStart(3, '0')}`
}

export function unitIdFormat(id: number) {
    return `C${id.toString().padStart(3, '0')}`
}
export function categoryIdFormat(id: number) {
    return `F${id.toString().padStart(3, '0')}`
}

export function distributorIdFormat(id: number) {
    return `D${id.toString().padStart(3, '0')}`
}

export function productInIdFormat(id: number) {
    return `BM${id.toString().padStart(3, '0')}`
}

export function productOutIdFormat(id: number) {
    return `BK${id.toString().padStart(3, '0')}`
}

export function dateFormat(date: string) {
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
    });
}