import React from 'react';

function WhySection() {
  const cards = [
    {
      icon: '🛡️', // Placeholder icon
      title: 'Uzman Kadro',
      description: 'Alanında uzman doktorlar ve terapistler tarafından hazırlanan içerikler ve tedavi önerileri.',
    },
    {
      icon: '🔬', // Placeholder icon
      title: 'Bilimsel Yaklaşım',
      description: 'Geleneksel yöntemleri modern bilimle birleştiren, kanıta dayalı alternatif tıp uygulamaları.',
    },
    {
      icon: '💡', // Placeholder icon
      title: 'Kişiselleştirilmiş Öneriler',
      description: 'Sağlık durumunuza ve ihtiyaçlarınıza özel hazırlanan tedavi planları ve tavsiyeler.',
    },
    {
      icon: '🌍', // Placeholder icon
      title: 'Her Yerde Erişim',
      description: 'Web ve mobil uygulama üzerinden dilediğiniz zaman, dilediğiniz yerden sağlık bilgilerinize erişin.',
    },
    {
      icon: '🗓️', // Placeholder icon
      title: 'Düzenli Takip',
      description: 'Sağlık durumunuzu düzenli olarak takip edin, gelişiminizi görün ve hatırlatmalarla tedavicinizi aksatmayın.',
    },
    {
      icon: '🤝', // Placeholder icon
      title: 'Topluluk Desteği',
      description: 'Benzer sağlık sorunları yaşayan kişilerle iletişim kurun, deneyimlerinizi paylaşın ve destek alın.',
    },
  ];

  return (
    <section style={{
      padding: '4rem 0', // Üst ve alt dolgu, yanal dolgu container tarafından sağlanacak
      backgroundColor: '#f8f9fa', // Açık gri arka plan
    }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem', color: '#222' }}>Neden Şifalı Dokunuş?</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {cards.map((card, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                color: '#4CAF50',
              }}>{card.icon}</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#222' }}>{card.title}</h3>
              <p style={{ color: '#666' }}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhySection; 