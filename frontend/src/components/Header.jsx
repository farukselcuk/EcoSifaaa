import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <header style={{
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    }}>
      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Kitap ikonu */}
          <span style={{ marginRight: '0.5rem', fontSize: '1.8rem', color: '#4CAF50' }}>📖</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#222' }}>Şifalı Dokunuş</span>
        </div>

        {/* Nav Links */}
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, flexGrow: 1, justifyContent: 'center' }}>
          <li style={{ marginRight: '1.5rem' }}><Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold', color: location.pathname === '/' ? '#4CAF50' : '#222' }}>Anasayfa</Link></li>
          <li style={{ marginRight: '1.5rem' }}><Link to="#" style={{ textDecoration: 'none', color: '#222', fontWeight: 'bold' }}>Tedaviler</Link></li>
          <li style={{ marginRight: '1.5rem' }}><Link to="/suggestion" style={{ textDecoration: 'none', fontWeight: 'bold', color: location.pathname === '/suggestion' ? '#4CAF50' : '#222' }}>Tedavi Önerisi Al</Link></li>
          <li style={{ marginRight: '1.5rem' }}><Link to="/about" style={{ textDecoration: 'none', fontWeight: 'bold', color: location.pathname === '/about' ? '#4CAF50' : '#222' }}>Hakkımızda</Link></li>
          <li style={{ marginRight: '1.5rem' }}><Link to="#" style={{ textDecoration: 'none', color: '#222', fontWeight: 'bold' }}>Blog</Link></li>
          <li><Link to="/contact" style={{ textDecoration: 'none', color: location.pathname === '/contact' ? '#4CAF50' : '#222', fontWeight: 'bold' }}>İletişim</Link></li>
        </ul>

        {/* Icons and Button */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Arama ikonu */}
          <span style={{ marginRight: '1rem', fontSize: '1.2rem', color: '#222' }}>🔍</span>
          {/* Kullanıcı ikonu */}
          <span style={{ marginRight: '1rem', fontSize: '1.2rem', color: '#222' }}>👤</span>
          <button style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Giriş Yap</button>
        </div>
      </nav>
    </header>
  );
}

export default Header; 