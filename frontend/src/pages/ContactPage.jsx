import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">İletişim</h1>
          <p className="text-gray-700 mb-4">
            Bizimle iletişime geçmek için aşağıdaki bilgileri kullanabilir veya formu doldurabilirsiniz.
          </p>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">İletişim Bilgileri</h2>
            <p className="text-gray-700">Email: info@alternatiftip.com</p>
            <p className="text-gray-700">Telefon: +90 555 123 45 67</p>
            <p className="text-gray-700">Adres: Örnek Mahallesi, Örnek Caddesi No: 1, Örnek İlçe, Örnek Şehir</p>
          </div>
          
          {/* İletişim Formu - Basit örnek */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Bize Yazın</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Adınız</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Adresiniz</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mesajınız</label>
              <textarea id="message" name="message" rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"></textarea>
            </div>
            <div>
              <button type="submit" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">Gönder</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 