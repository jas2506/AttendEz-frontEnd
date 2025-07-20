import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner({ onScanSuccess, onScanError }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(onScanSuccess, onScanError);

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [onScanSuccess, onScanError]);

  return <div id="reader" />;
}
