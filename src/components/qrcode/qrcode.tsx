import { QRCode } from "react-qrcode-logo";
import logo from './chuha.png';

const QRCodeComponent = () => {
  const url = "https://vk-electronics.netlify.app/";

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Scan the QR Code to Open the URL
      </h1>

      <div
        style={{
          display: "inline-block",
          padding: "20px",
          background: "#fff",
          borderRadius: "15px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <QRCode
          value={url}
          size={280} // QR Code size
          logoImage={logo}
          logoWidth={60} // Proportional size
          logoHeight={60}
          logoOpacity={1}
          logoPadding={10}
          removeQrCodeBehindLogo={false}
        />
      </div>

      <p style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>{url}</p>
    </div>
  );
};

export default QRCodeComponent;
