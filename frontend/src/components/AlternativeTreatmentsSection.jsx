import React from 'react';

function AlternativeTreatmentsSection() {
  const treatments = [
    {
      icon: '🌿', // Placeholder icon
      title: 'Fitoterapi',
      description: 'Bitkisel tedavi yöntemleri ile doğanın şifalı gücünden yararlanın.',
    },
    {
      icon: '🌸', // Placeholder icon
      title: 'Aromaterapi',
      description: 'Esansiyel yağların terapötik etkileriyle ruh ve beden sağlığınızı destekleyin.',
    },
    {
      icon: '⚡', // Placeholder icon
      title: 'Akupunktur',
      description: 'Binlerce yıllık Çin tıbbı yöntemleriyle enerji akışınızı düzenleyin.',
    },
    {
      icon: '🧘', // Placeholder icon
      title: 'Meditasyon',
      description: 'Zihin-beden bağlantınızı güçlendirin, stres ve kaygıyı azaltın.',
    },
    {
      icon: '🤸‍♀️', // Placeholder icon
      title: 'Yoga',
      description: 'Beden, zihin ve ruh dengenizi sağlayın, esneklik ve güç kazanın.',
    },
    {
      icon: '💆', // Placeholder icon
      title: 'Masaj Terapisi',
      description: 'Kas gerginliğini azaltın, kan dolaşımını artırın ve rahatlayın.',
    },
  ];

  return (
    <section style={{
      padding: '4rem 0', // Üst ve alt dolgu, yanal dolgu container tarafından sağlanacak
      backgroundColor: '#fff', // Beyaz arka plan
    }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem', color: '#222' }}>Alternatif Tedavi Yöntemleri</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {treatments.map((treatment, index) => (
            <div key={index} style={{
              backgroundColor: '#f8f9fa', // Kart arka planı
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem',
                color: '#4CAF50',
              }}>{treatment.icon}</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#222' }}>{treatment.title}</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>{treatment.description}</p>
              <a href="#" style={{ color: '#4CAF50', textDecoration: 'none', fontWeight: 'bold' }}>Daha Fazla Bilgi &gt;</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AlternativeTreatmentsSection; 