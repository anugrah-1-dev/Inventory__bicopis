import { router } from '@inertiajs/react';
import { Html5Qrcode, Html5QrcodeSupportedFormats, QrcodeSuccessCallback } from 'html5-qrcode';
import { PropsWithChildren, useEffect, useRef } from 'react';

export default function Scanner({updateData}: PropsWithChildren & {updateData: (data: boolean) => void}) {
    const scannerRef = useRef(null);

    // const successCallback: QrcodeSuccessCallback = (text, result) =>  {
    //     router.post('products/barcode', {code: text});
    // }

    useEffect(() => {
        const support = [
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E,
            Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
            Html5QrcodeSupportedFormats.ITF,
            Html5QrcodeSupportedFormats.CODABAR
        ]
        
        const scanner = new Html5Qrcode('qrcode-reader', {
            formatsToSupport: support, 
            verbose: false
        });
        scanner.start({
            facingMode: 'environment'
        }, {
            fps: 10,
            // qrbox: 250
            // qrbox: {width:400, height: 100}
            qrbox: (viewWidth, viewHeight) => {
                const edgePercentage = 0.6;
                const minEdge = Math.min(viewWidth, viewHeight);
                const size = Math.floor(minEdge * edgePercentage);
                return {
                    width: size,
                    height: size
                }
            }
        }, (text, result) =>  {
            updateData(false);
            router.post('products/barcode', {code: text});
        }, () => {});
        return () => {
            if (scanner.isScanning) scanner.stop();
        }
    }, []);

    return <div id="qrcode-reader" ref={scannerRef} className="max-w-screen-sm h-full w-full rounded-xl"></div>
}