import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
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
    <div className="user-page">
      <h1>Yönetici Sayfası</h1>
      {userInfo ? (
        <div>
          <p>Cüzdan Adresi: {userInfo.address}</p>
        </div>
      ) : (
        <p>Yükleniyor...</p>
      )}

      <div className="button-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '2rem' }}>
        <button className="tame-button" onClick={() => navigate("/odemeler1")}>
          Ödemeler
        </button>
        <button className="tame-button" onClick={() => navigate("/anket1")}>
          Anket Oyla
        </button>
        <button className="tame-button" onClick={() => navigate("/anket_ekle")}>
          Anket Ekle/Sil
        </button>
        <button className="tame-button" onClick={() => navigate("/profil_ekle_sil")}>
          Kullanıcı Ekle
        </button>
      </div>
    </div>
  );
}

export default AdminPage;
