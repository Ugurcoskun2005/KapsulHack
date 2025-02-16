import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddress = "0x977760C734507E4a05E45C7B0cE4cEBaE657D45c"; // Kontrat adresiniz
const contractAbi = [
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
];

const SurveyPage1 = () => {
  const [surveys, setSurveys] = useState([]);
  const [answers, setAnswers] = useState({});
  const [txStatus, setTxStatus] = useState("");

  // Sayfa yüklendiğinde anketleri localStorage'dan al
  useEffect(() => {
    const savedSurveys = JSON.parse(localStorage.getItem("surveys")) || [];
    setSurveys(savedSurveys);
  }, []);

  const handleAnswerChange = (surveyId, answer) => {
    setAnswers({
      ...answers,
      [surveyId]: answer,
    });
    if (answer === "Evet") {
      handleVote(surveyId, "Evet"); // Evet seçildiğinde oylama işlemi başlatılır
    }
  };

  const handleVote = async (surveyId, answer) => {
    if (!window.ethereum) {
      alert("MetaMask yüklü değil!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      // "Evet" için true, "Hayır" için false
      const support = answer === "Evet";

      const tx = await contract.vote(4, support);
      setTxStatus("İşlem gönderildi, bekleniyor...");
      await tx.wait(); // İşlem blokta onaylanana kadar bekle
      setTxStatus("Oyunuz başarıyla kaydedildi!");
    } catch (error) {
      console.error("Oylama hatası:", error);
      setTxStatus("Oylama işlemi başarısız oldu.");
    }
  };

  return (
    <div>
      {surveys.length > 0 ? (
        surveys.map((survey) => (
          <div key={survey.id} style={surveyStyle}>
            <h3>{survey.title}</h3>
            <p>{survey.description}</p>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "20px" }}
            >
              <button
                onClick={() => handleAnswerChange(survey.id, "Evet")}
                style={{ ...buttonStyle, backgroundColor: "green" }} // Evet butonu yeşil
              >
                Evet
              </button>
              <button
                onClick={() => handleAnswerChange(survey.id, "Hayır")}
                style={{ ...buttonStyle, backgroundColor: "red" }} // Hayır butonu kırmızı
              >
                Hayır
              </button>
            </div>
            {txStatus && <p>{txStatus}</p>}
          </div>
        ))
      ) : (
        <p>Henüz bir anket eklenmedi.</p>
      )}
    </div>
  );
};

const surveyStyle = {
  backgroundColor: "#f1f1f1",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "20px",
};

const buttonStyle = {
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  fontSize: "1em",
  cursor: "pointer",
};

export default SurveyPage1;
