import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

interface BarcodeProps {
  value: string;
}

const Barcode: React.FC<BarcodeProps> = ({ value }) => {
  const barcodeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, {
        format: "CODE128",
        displayValue: true,
        lineColor: "#000",
        width: 2,
        height: 50,
      });
    }
  }, [value]);

  return <svg ref={barcodeRef}></svg>;
};

export default Barcode;
