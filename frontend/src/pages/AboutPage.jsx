import React from 'react';

function AboutPage() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#222' }}>Hakkımızda</h1>
      <p style={{ fontSize: '1.1rem', color: '#666' }}>Projemiz ve ekibimiz hakkında bilgileri burada bulabilirsiniz.</p>

      {/* Hakkımızda içeriği buraya gelecek */}
      <div style={{ marginTop: '2rem' }}>
        <p>Vizyonumuz, misyonumuz, değerlerimiz ve hikayemiz...</p>
        {/* Ekip üyeleri, çalışma prensipleri vb. eklenebilir */}
      </div>
    </div>
  );
}

export default AboutPage; 