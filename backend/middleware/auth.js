const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Kullanıcı authentication kontrolü
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Token'ı header'dan al
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Token yoksa hata döndür
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Bu işlem için giriş yapmanız gerekmektedir'
      });
    }

    try {
      // Token'ı doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Kullanıcıyı bul
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Kullanıcı bulunamadı'
        });
      }

      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        error: 'Geçersiz token'
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Sunucu hatası'
    });
  }
};

// Rol bazlı yetkilendirme
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Bu işlem için yetkiniz bulunmamaktadır'
      });
    }
    next();
  };
}; 