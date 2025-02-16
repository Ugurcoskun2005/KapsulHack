import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const navigate = useNavigate(); // useNavigate hook'u
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userAddress = localStorage.getItem("userAddress");
      setUserInfo({ address: userAddress });
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="user-page" style={{ textAlign: "center" }}>
      <h1>Kullanıcı Sayfası</h1>
      {userInfo ? (
        <div>
          <p>Cüzdan Adresi: {userInfo.address}</p>
        </div>
      ) : (
        <p>Yükleniyor...</p>
      )}

      <div 
        className="button-container" 
        style={{
          display: "flex",
          justifyContent: "center", // Butonları ortalar
          gap: "30px", // Butonlar arasına mesafe ekler
        }}
      >
        <button 
          className="tame-button" 
          onClick={() => navigate("/odemeler")}
        >
          Ödemeler
        </button>
        <button 
          className="tame-button" 
          onClick={() => navigate("/anket")}
        >
          Anketler
        </button>
      </div>
    </div>
  );
}

export default UserPage;
