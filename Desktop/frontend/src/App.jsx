import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate'ı import ettik
import { ethers } from "ethers";

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [signer, setSigner] = useState("");
  const navigate = useNavigate(); // useNavigate hook'u

  const contractAddress = "0x977760C734507E4a05E45C7B0cE4cEBaE657D45c"; // Kontrat adresiniz
  const contractAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_treasuryContract",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "manager",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "treasuryContract",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
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
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
        },
      ],
      name: "removeFromWhitelist",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          internalType: "address payable",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "createProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "support",
          type: "bool",
        },
      ],
      name: "vote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
      ],
      name: "executeProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "addDue",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "proposals",
      outputs: [
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          internalType: "address payable",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "endTime",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "votesFor",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "votesAgainst",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "executed",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ]; // Kontrat ABI'ı

  // CÜZDAN BAĞLAMA FONKSİYONU
  const connectWallet = async () => {
    // Browserda provider var mı yok mu kontrol ediyoruz
    if (!window.ethereum) {
      alert("MetaMask not found!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setUserAddress(address);
      setSigner(signer);

      console.log("Wallet connected:", address);
      localStorage.setItem("userAddress", address);

      // Burada istediğiniz cüzdan adresini kontrol edin
      const expectedAddress = "0x2599d9481b4846ad22214683f1a505EA4C35b4f0"; // Örnek cüzdan adresi
      if (address.toLowerCase() === expectedAddress.toLowerCase()) {
        // Eğer cüzdan adresi doğruysa yönetici sayfasına yönlendir
        navigate("/yonetici");
      } else {
        alert("Cüzdan adresi geçerli değil.");
        navigate("/kullanici");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div className="text-center">
      <h1>Blockchain Residences</h1>
      <button className="mb-3" onClick={connectWallet}>
        Cüzdan Bağla
      </button>

      {userAddress && <p>Cüzdan Adresi: {userAddress}</p>}
    </div>
  );
}

export default App;
