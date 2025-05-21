import React from 'react';

function ContactPage() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#222' }}>İletişim</h1>
      <p style={{ fontSize: '1.1rem', color: '#666' }}>Bize ulaşmak için aşağıdaki bilgileri kullanabilir veya formu doldurabilirsiniz.</p>

      {/* İletişim bilgileri veya form buraya gelecek */}
      <div style={{ marginTop: '2rem' }}>
        <p style={{ fontWeight: 'bold' }}>Email:</p>
        <p>info@sifalidokunus.com</p>
        <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>Telefon:</p>
        <p>+90 XXX XXX XX XX</p>
        {/* Basit bir form yapısı eklenebilir */}
        {/*
        <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: '#222' }}>Bize Yazın</h3>
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Adınız:</label>
            <input type="text" id="name" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email Adresiniz:</label>
            <input type="email" id="email" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem' }}>Mesajınız:</label>
            <textarea id="message" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} rows="4"></textarea>
          </div>
          <button type="submit" style={{ padding: '0.8rem 2rem', fontSize: '1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Gönder</button>
        </form>
        */}
      </div>
    </div>
  );
}

export default ContactPage; 