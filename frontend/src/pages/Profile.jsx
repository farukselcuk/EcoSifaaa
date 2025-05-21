import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile, error } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profile: {
      birthDate: user?.profile?.birthDate || '',
      gender: user?.profile?.gender || '',
      height: user?.profile?.height || '',
      weight: user?.profile?.weight || '',
      medicalHistory: user?.profile?.medicalHistory || [],
      allergies: user?.profile?.allergies || [],
      medications: user?.profile?.medications || []
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('profile.')) {
      const profileField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          [profileField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Lütfen giriş yapın</h2>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          {/* Profil Başlığı */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Profil Bilgileri
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Kişisel bilgileriniz ve geçmiş önerileriniz
                </p>
              </div>
              <div className="flex space-x-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Düzenle
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    İptal
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>

          {/* Profil Bilgileri */}
          <div className="px-4 py-5 sm:p-6">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="profile.birthDate" className="block text-sm font-medium text-gray-700">
                      Doğum Tarihi
                    </label>
                    <input
                      type="date"
                      name="profile.birthDate"
                      id="profile.birthDate"
                      value={formData.profile.birthDate}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="profile.gender" className="block text-sm font-medium text-gray-700">
                      Cinsiyet
                    </label>
                    <select
                      name="profile.gender"
                      id="profile.gender"
                      value={formData.profile.gender}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Seçiniz</option>
                      <option value="male">Erkek</option>
                      <option value="female">Kadın</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="profile.height" className="block text-sm font-medium text-gray-700">
                      Boy (cm)
                    </label>
                    <input
                      type="number"
                      name="profile.height"
                      id="profile.height"
                      value={formData.profile.height}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="profile.weight" className="block text-sm font-medium text-gray-700">
                      Kilo (kg)
                    </label>
                    <input
                      type="number"
                      name="profile.weight"
                      id="profile.weight"
                      value={formData.profile.weight}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Kaydet
                  </button>
                </div>
              </form>
            ) : (
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Ad Soyad</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                </div>
                {user.profile && (
                  <>
                    {user.profile.birthDate && (
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Doğum Tarihi</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {new Date(user.profile.birthDate).toLocaleDateString('tr-TR')}
                        </dd>
                      </div>
                    )}
                    {user.profile.gender && (
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Cinsiyet</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {user.profile.gender === 'male' ? 'Erkek' : user.profile.gender === 'female' ? 'Kadın' : 'Diğer'}
                        </dd>
                      </div>
                    )}
                    {user.profile.height && (
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Boy</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.profile.height} cm</dd>
                      </div>
                    )}
                    {user.profile.weight && (
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Kilo</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.profile.weight} kg</dd>
                      </div>
                    )}
                  </>
                )}
              </dl>
            )}
          </div>

          {/* Geçmiş Öneriler */}
          <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Geçmiş Öneriler
            </h3>
            {user.suggestions && user.suggestions.length > 0 ? (
              <div className="mt-4 space-y-4">
                {user.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <h4 className="font-medium text-gray-900">
                      {new Date(suggestion.date).toLocaleDateString('tr-TR')}
                    </h4>
                    <div className="mt-2 space-y-2">
                      {suggestion.symptoms && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Belirtiler:
                          </span>{' '}
                          <span className="text-sm text-gray-900">
                            {suggestion.symptoms.join(', ')}
                          </span>
                        </div>
                      )}
                      {suggestion.treatments && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Önerilen Tedaviler:
                          </span>{' '}
                          <span className="text-sm text-gray-900">
                            {suggestion.treatments.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                Henüz öneri kaydınız bulunmamaktadır.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 