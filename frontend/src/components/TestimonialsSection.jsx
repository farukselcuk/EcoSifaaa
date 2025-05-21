import React from 'react';

function TestimonialsSection() {
  const testimonials = [
    {
      avatar: 'A', // Placeholder initial
      name: 'Ayşe Y.',
      rating: 5,
      comment: 'Yıllardır çektiğim migren ağrıları için önerilen bitkisel tedaviler hayatımı değiştirdi. Artık ilaçlara bağımlı değilim ve kendimi çok daha iyi hissediyorum. Şifalı Dokunuş ekibine teşekkür ederim!',
      treatment: 'Migren, Bitkisel Tedavi',
    },
    {
      avatar: 'M', // Placeholder initial
      name: 'Mehmet K.',
      rating: 4,
      comment: 'Stres ve anksiyete sorunlarım için başladığım meditasyon ve nefes egzersizleri sayesinde artık çok daha sakinim. Uygulama üzerinden aldığım günlük sağlık takibi ve rehberlik çok faydalı oluyor.',
      treatment: 'Stres, Meditasyon',
    },
    {
      avatar: 'Z', // Placeholder initial
      name: 'Zeynep A.',
      rating: 5,
      comment: 'Cilt sorunlarım için önerilen doğal yağlar ve maskeler sayesinde cildim iyileşti. Kimyasal ürünlere veda ettim. Ayrıca topluluk forumunda benzer sorunları yaşayan kişilerle iletişim kurmak çok faydalı.',
      treatment: 'Cilt Sorunları, Doğal Bakım',
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} style={{ color: '#FFD700' }}>★</span>); // Filled star
      } else {
        stars.push(<span key={i} style={{ color: '#E0E0E0' }}>★</span>); // Empty star
      }
    }
    return stars;
  };

  return (
    <section style={{
      padding: '4rem 0', // Üst ve alt dolgu, yanal dolgu container tarafından sağlanacak
      backgroundColor: '#fff', // Beyaz arka plan
    }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem', color: '#222' }}>Kullanıcılarımız Ne Diyor?</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={{
              backgroundColor: '#f8f9fa', // Kart arka planı
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                {/* Avatar */}
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '1.5rem',
                  marginRight: '1rem',
                }}>{testimonial.avatar}</div>
                {/* Name and Rating */}
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#222' }}>{testimonial.name}</h4>
                  <div>{renderStars(testimonial.rating)}</div>
                </div>
              </div>
              {/* Comment */}
              <p style={{ color: '#666', marginBottom: '1rem' }}>{testimonial.comment}</p>
              {/* Treatment */}
              <p style={{ fontSize: '0.9rem', color: '#4CAF50', fontWeight: 'bold' }}>{testimonial.treatment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection; 