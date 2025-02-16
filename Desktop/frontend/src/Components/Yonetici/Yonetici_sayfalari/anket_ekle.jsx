import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const SurveyAdd = () => {
  const [surveys, setSurveys] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState("");
  const [contract, setContract] = useState(null);

  // Ethereum provider ve kontrat bağlantısı
  useEffect(() => {
    const initBlockchain = async () => {
      // MetaMask'a bağlan
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const contractInstance = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        setContract(contractInstance);
      } else {
        alert("MetaMask yüklü değil.");
      }
    };
    initBlockchain();
  }, []);

  // Anket ekleme işlevi
  const handleAddSurvey = async () => {
    if (title && description && options && contract) {
      console.log(title, description);
      const newSurvey = {
        id: Date.now(),
        title,
        description,
        options: options.split(",").map((opt) => opt.trim()),
      };

      const updatedSurveys = [...surveys, newSurvey];
      setSurveys(updatedSurveys);

      // LocalStorage'a kaydet
      localStorage.setItem("surveys", JSON.stringify(updatedSurveys));

      // Formu sıfırla
      setTitle("");
      setDescription("");
      setOptions("");

      // Burada kontrata işlem yapabilirsiniz, örneğin anket verisi ekleme
      try {
        console.log("deneme");
        const tx = await contract.createProposal(
          description,
          "0x1f8ac67293F77d5A3aa32E88EB13ec039B6C0Aa9",
          100
        ); // Verileri kontrata gönder
        await tx.wait(); // İşlemin onaylanmasını bekle
        console.log("Transaction successful: ", tx);
      } catch (error) {
        console.error("Transaction failed: ", error);
      }
    } else {
      alert("Lütfen tüm alanları doldurun.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1>Anket Ekle</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Seçenekler (Virgülle ayır)"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleAddSurvey} style={buttonStyle}>
          Anket Ekle
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  fontSize: "1em",
  width: "300px",
  borderRadius: "8px",
  marginBottom: "10px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  backgroundColor: "#3498db",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  fontSize: "1.2em",
  cursor: "pointer",
};

const contractAddress = "0x977760C734507E4a05E45C7B0cE4cEBaE657D45c"; // Kontrat adresiniz
const contractAbi = [
  // Buraya ABI'yı yerleştirebilirsiniz
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
  // ABI'nin geri kalan kısmı...
];

export default SurveyAdd;
