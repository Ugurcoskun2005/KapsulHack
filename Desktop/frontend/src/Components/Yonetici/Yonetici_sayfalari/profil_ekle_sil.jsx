import React, { useState } from "react";
import { ethers } from "ethers";

const contractAddress = "0x977760C734507E4a05E45C7B0cE4cEBaE657D45c";
const contractAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "addToWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const ProfilePage = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [profile, setProfile] = useState(null);
  const [txStatus, setTxStatus] = useState(null);

  const handleCreateProfile = () => {
    if (walletAddress) {
      setProfile({
        address: walletAddress,
        createdAt: new Date().toLocaleString(),
      });
    } else {
      alert("Lütfen geçerli bir cüzdan adresi girin.");
    }
  };

  const addToWhitelist = async () => {
    if (!window.ethereum) {
      alert("MetaMask yüklü değil!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);

      const tx = await contract.addToWhitelist(walletAddress);
      setTxStatus("İşlem gönderildi, bekleniyor...");

      await tx.wait();
      setTxStatus("İşlem başarıyla tamamlandı!");
    } catch (error) {
      console.error("Whitelist ekleme hatası:", error);
      setTxStatus("İşlem başarısız oldu.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <h1>Kullanıcı Ekleme</h1>
      <input
        type="text"
        placeholder="Cüzdan Adresi"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        style={{ padding: "10px", fontSize: "1em", width: "300px", borderRadius: "8px", marginBottom: "10px", border: "1px solid #ccc" }}
      />
      <button
        onClick={handleCreateProfile}
        style={{ backgroundColor: "#3498db", color: "white", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}
      >
        Profili Oluştur
      </button>

      {profile && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
          <p><strong>Cüzdan Adresi:</strong> {profile.address}</p>
          <p><strong>Oluşturulma Tarihi:</strong> {profile.createdAt}</p>
          <button
            onClick={addToWhitelist}
            style={{ backgroundColor: "#2ecc71", color: "white", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", marginTop: "10px" }}
          >
            Whitelist'e Ekle
          </button>
          {txStatus && <p>{txStatus}</p>}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;