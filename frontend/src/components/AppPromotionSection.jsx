import React from 'react';

function AppPromotionSection() {
  return (
    <section style={{
      padding: '4rem 0', // Üst ve alt dolgu, yanal dolgu container tarafından sağlanacak
      backgroundColor: '#f8f9fa', // Açık gri arka plan
    }}>
      <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap-reverse'}}>
        {/* App Info */}
        <div style={{ maxWidth: '500px', marginRight: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#222' }}>Sağlığınız Elinizin Altında</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9, color: '#222' }}>
            Şifalı Dokunuş uygulaması ile alternatif tıp dünyasını cebinize taşıyın. Kişiselleştirilmiş tedavi önerileri, günlük sağlık takibi ve uzman desteği ile sağlıklı bir yaşamın kapılarını aralayın.
          </p>
          {/* Features List */}
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
            <li style={{ marginBottom: '1rem', color: '#222' }}><span style={{ marginRight: '0.5rem', color: '#4CAF50' }}>✅</span> Kişisel Sağlık Günlüğü</li>
            <li style={{ marginBottom: '1rem', color: '#222' }}><span style={{ marginRight: '0.5rem', color: '#4CAF50' }}>✅</span> Hatırlatmalar ve Bildirimler</li>
            <li style={{ marginBottom: '1rem', color: '#222' }}><span style={{ marginRight: '0.5rem', color: '#4CAF50' }}>✅</span> Uzman Desteği</li>
          </ul>
          {/* App Store Buttons */}
          <div>
            <button style={{
              padding: '0.8rem 2rem',
              fontSize: '1rem',
              marginRight: '1rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}>Google Play</button>
            <button style={{
              padding: '0.8rem 2rem',
              fontSize: '1rem',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}>App Store</button>
          </div>
        </div>
        {/* App Mock-up Image */}
        <div style={{ width: '300px', height: '400px', backgroundColor: '#E8F5E9', borderRadius: '20px', marginTop: '2rem' }}>
          {/* Mobil Uygulama Mock-up Görseli Buraya Gelecek */}
          {/* Şimdilik Placeholder */}
        </div>
      </div>
    </section>
  );
}

export default AppPromotionSection; 