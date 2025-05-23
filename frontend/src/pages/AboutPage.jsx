import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Hakkımızda</h1>
          <p className="text-gray-700 mb-4">
            Alternatif Tıp Platformu, doğal tedavi yöntemleri hakkında güvenilir bilgi sunmak ve kişiselleştirilmiş önerilerle kullanıcıların sağlık yolculuklarına destek olmak amacıyla kurulmuştur.
          </p>
          <p className="text-gray-700 mb-4">
            Uzman ekibimiz, geleneksel ve tamamlayıcı tıp alanındaki en güncel araştırmaları takip ederek, yapay zeka destekli algoritmalarımızla birleştirir ve size en uygun çözümleri sunar.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Misyonumuz</h2>
          <p className="text-gray-700 mb-4">
            Doğal tedavi yöntemlerinin erişilebilirliğini artırmak ve insanların daha bilinçli sağlık kararları almasına yardımcı olmak.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Vizyonumuz</h2>
          <p className="text-gray-700">
            Alternatif tıp alanında lider bir platform olmak ve küresel sağlık ve refahı iyileştirmeye katkıda bulunmak.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 