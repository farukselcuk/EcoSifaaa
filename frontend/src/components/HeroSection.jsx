import React from 'react';

function HeroSection() {
  return (
    <section style={{
      backgroundColor: '#4CAF50', // Yeşil arka plan
      color: 'white',
      padding: '4rem 0', // Üst ve alt dolgu
    }}>
      <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
        <div style={{ maxWidth: '600px', marginRight: '2rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            Doğal Yollarla Sağlıklı Yaşamın Kapısını Arayın
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.95, color: 'white', textShadow: '0 1px 4px rgba(0,0,0,0.12)' }}>
            Alternatif tıp yöntemleriyle tanışın, doğanın şifalı gücünü keşfedin ve sağlıklı bir yaşam için doğru adımları atın.
          </p>
          <div>
            <button style={{
              padding: '0.8rem 2rem',
              fontSize: '1rem',
              marginRight: '1rem',
              backgroundColor: 'white',
              color: '#4CAF50',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}>Hemen Başla</button>
            <button style={{
              padding: '0.8rem 2rem',
              fontSize: '1rem',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}>Daha Fazla Bilgi</button>
          </div>
        </div>
        <div style={{ width: '300px', height: '400px', backgroundColor: '#E8F5E9', borderRadius: '20px', marginTop: '2rem' }}>
          {/* Mobil Uygulama Mock-up Görseli Buraya Gelecek */}
          {/* Şimdilik Placeholder */}
        </div>
      </div>
    </section>
  );
}

export default HeroSection; 