import React from 'react';

function Footer() {
  return (
    <footer style={{
      padding: '2rem 1rem',
      backgroundColor: '#333', // Koyu gri arka plan
      color: 'white',
      textAlign: 'center',
    }}>
      <p>&copy; 2023 Şifalı Dokunuş. Tüm hakları saklıdır.</p>
      {/* Hızlı Linkler veya Sosyal Medya ikonları buraya eklenebilir */}
    </footer>
  );
}

export default Footer; 