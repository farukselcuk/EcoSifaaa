import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-green-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/images/hero-bg.jpg"
            alt="Alternatif Tıp"
          />
          <div className="absolute inset-0 bg-green-800 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Doğal Tedavi Yöntemleri
          </h1>
          <p className="mt-6 text-xl text-green-100 max-w-3xl">
            Alternatif tıp yöntemleriyle sağlığınıza kavuşun. Kişiselleştirilmiş öneriler ve doğal tedavi yöntemleriyle yanınızdayız.
          </p>
          <div className="mt-10 flex space-x-4">
            <Link
              to="/suggestions"
              className="inline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-green-700 hover:bg-green-50"
            >
              Tedavi Önerileri Al
            </Link>
            <Link
              to="/about"
              className="inline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-green-700 hover:bg-green-50"
            >
              Hakkımızda
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-green-700 hover:bg-green-50"
            >
              İletişim
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Özellikler</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Neden Bizi Tercih Etmelisiniz?
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Kişiselleştirilmiş Öneriler</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Yapay zeka destekli sistemimiz, sizin için en uygun tedavi yöntemlerini belirler.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Doğal Tedavi Yöntemleri</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Bitkisel ve doğal tedavi yöntemleriyle sağlığınıza kavuşun.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">7/24 Destek</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Uzman ekibimiz her zaman yanınızda, sorularınızı yanıtlıyor.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Detaylı Takip</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Tedavi sürecinizi takip edin ve ilerlemenizi görün.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Başarı Hikayeleri</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Kullanıcılarımızın Deneyimleri
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold">A</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Ahmet Y.</h4>
                    <p className="text-gray-500">Migren Tedavisi</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Uzun yıllardır çektiğim migren ağrıları için önerilen bitkisel tedavi yöntemleri sayesinde artık çok daha iyiyim."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold">M</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Mehmet K.</h4>
                    <p className="text-gray-500">Uyku Problemi</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Uyku problemim için önerilen doğal çözümler sayesinde artık daha kaliteli uyuyabiliyorum."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold">Z</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Zeynep A.</h4>
                    <p className="text-gray-500">Stres Yönetimi</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Stres yönetimi için önerilen meditasyon ve nefes egzersizleri hayatımı değiştirdi."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">SSS</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Sıkça Sorulan Sorular
            </p>
          </div>
          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Alternatif tıp nedir?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Alternatif tıp, geleneksel tıbbi tedavilerin yanında kullanılan, doğal ve bütünsel yaklaşımları içeren tedavi yöntemleridir.
                </dd>
              </div>

              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Nasıl tedavi önerisi alabilirim?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Sitemize üye olarak belirtilerinizi ve sağlık geçmişinizi paylaşabilir, size özel tedavi önerileri alabilirsiniz.
                </dd>
              </div>

              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Önerilen tedaviler güvenli mi?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Tüm öneriler uzmanlar tarafından değerlendirilir ve bilimsel araştırmalara dayanır. Ancak her zaman doktorunuza danışmanızı öneririz.
                </dd>
              </div>

              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Üyelik ücretli mi?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Temel üyelik ücretsizdir. Premium üyelik ile daha detaylı öneriler ve özel içeriklere erişebilirsiniz.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Hemen Başlayın</span>
            <span className="block text-green-200">Sağlıklı bir yaşam için ilk adımı atın.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to={user ? "/suggestions" : "/register"}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50"
              >
                {user ? "Tedavi Önerileri Al" : "Üye Ol"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 