export default function Alert({flash}: {flash: {success: string | null, error: string | null}}) {
    return (
        <>
            {flash.success && <div className="p-3 mb-2 text-sm text-green-800 rounded-md bg-green-50 border border-green-200" role="alert">
                {flash.success}
            </div>}
            {flash.error && <div className="p-3 mb-2 text-sm text-red-800 rounded-md bg-red-50 border border-red-200" role="alert">
                {flash.error}
            </div>}
        </>
    )
}