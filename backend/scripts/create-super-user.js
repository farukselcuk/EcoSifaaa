const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// MongoDB bağlantı URL'si
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alternatif-tip';

// Kullanıcı şeması
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
});

const User = mongoose.model('User', userSchema);

async function createSuperUser() {
  try {
    // MongoDB'ye bağlan
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB\'ye bağlandı');

    // Süper kullanıcı bilgileri
    const superUser = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    };

    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    superUser.password = await bcrypt.hash(superUser.password, salt);

    // Kullanıcıyı oluştur
    const user = new User(superUser);
    await user.save();

    console.log('Süper kullanıcı başarıyla oluşturuldu:');
    console.log('Kullanıcı adı:', superUser.username);
    console.log('Email:', superUser.email);
    console.log('Şifre:', 'admin123');

  } catch (error) {
    console.error('Hata:', error);
  } finally {
    // Bağlantıyı kapat
    await mongoose.connection.close();
  }
}

createSuperUser(); 