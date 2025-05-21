import React, { useState } from 'react';

function SuggestionPage() {
  const [currentStep, setCurrentStep] = useState(1); // Start at step 1
  const [selectedSymptoms, setSelectedSymptoms] = useState([]); // State to hold selected symptom names
  const [activeLifestyleTab, setActiveLifestyleTab] = useState('Beslenme'); // State for lifestyle tabs
  const [suggestions, setSuggestions] = useState({
    naturalTreatments: [],
    nutritionAdvice: [],
    lifestyleChanges: [],
    supplements: [],
    precautions: []
  });
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for errors
  const [symptomDetails, setSymptomDetails] = useState({}); // State to hold details for each selected symptom
  const [lifestyleDetails, setLifestyleDetails] = useState({}); // State to hold lifestyle details

  const symptoms = [
    { name: 'Baş Ağrısı', description: 'Migren, gerilim tipi', icon: '🤕' },
    { name: 'Eklem Ağrısı', description: 'Artrit, romatizma', icon: '🦴' },
    { name: 'Bağışıklık Sorunları', description: 'Sık hastalık, yorgunluk', icon: '🤒' },
    { name: 'Stres ve Anksiyete', description: 'Gerginlik, endişe', icon: '😟' },
    { name: 'Uyku Sorunları', description: 'Uykusuzluk, kalitesiz uyku', icon: '😴' },
    { name: 'Sindirim Sorunları', description: 'Hazımsızlık, şişkinlik', icon: '🤢' },
    { name: 'Cilt Sorunları', description: 'Akne, egzama, kuruluk', icon: ' rashes' }, // İkon burada tam çıkmamış olabilir, kontrol etmek gerek
    { name: 'Enerji Eksikliği', description: 'Yorgunluk, halsizlik', icon: '⚡' },
    { name: 'Diğer', description: 'Listede olmayan semptomlar', icon: '❓' },
  ];

  const handleNext = () => {
    if (currentStep === 1 && selectedSymptoms.length === 0) {
      // Optional: Prevent going to the next step if no symptoms are selected
      // For now, we'll allow proceeding to show the next step content,
      // but you might want to add a validation message here later.
       console.log("Lütfen en az bir semptom seçin."); // Placeholder for validation
       // return; // Uncomment this line to prevent proceeding without selection
    }

    // If moving from Step 3 to Step 4, fetch suggestions
    if (currentStep === 3) {
      // Pass all collected data to fetchSuggestions
      fetchSuggestions(selectedSymptoms, symptomDetails, lifestyleDetails);
    }

    if (currentStep < 4) { // Assuming 4 steps total
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSymptomClick = (symptomName) => {
    setSelectedSymptoms(prevSelected => {
      if (prevSelected.includes(symptomName)) {
        // If already selected, remove it
        return prevSelected.filter(name => name !== symptomName);
      } else {
        // If not selected, add it
        return [...prevSelected, symptomName];
      }
    });
  };

  const fetchSuggestions = async (symptoms, symptomDetails, lifestyleDetails) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send all collected data in the request body
        body: JSON.stringify({ symptoms, symptomDetails, lifestyleDetails }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch suggestions');
      }

      const data = await response.json();
      setSuggestions(data);
      console.log('Fetched suggestions:', data); // Log suggestions for now

    } catch (err) {
      setError(err.message);
      console.error('Error fetching suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/suggestions/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: selectedSymptoms,
          symptomDetails: symptomDetails,
          lifestyleDetails: lifestyleDetails
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Öneriler alınırken bir hata oluştu');
      }

      setSuggestions(data.data);
      setCurrentStep(4); // Move to results step

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Green Banner Section */}
      <section style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '3rem 0',
        textAlign: 'center',
        width: '100%',
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Kişiselleştirilmiş Tedavi Önerileri</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, color: 'white', maxWidth: '800px', margin: '0 auto' }}>
            Semptomlarınızı ve sağlık durumunuzu değerlendirerek size özel alternatif tedavi önerileri sunuyoruz. Doğal yollarla iyileşme yolculuğunuz burada başlıyor.
          </p>
        </div>
      </section>

      {/* Stepper Component */}
      <div className="container" style={{
        padding: '2rem 0',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '600px', // Stepper genişliği
          margin: '0 auto',
        }}>
          {/* Step 1 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: currentStep >= 1 ? '#4CAF50' : '#ccc', // Active color based on state
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto 0.5rem auto',
              fontWeight: 'bold',
            }}>1</div>
            <span style={{ color: currentStep >= 1 ? '#222' : '#666' }}>Semptomlar</span>
          </div>
          {/* Connector Line */}
          <div style={{ flexGrow: 1, height: '2px', backgroundColor: currentStep >= 2 ? '#4CAF50' : '#ccc', margin: '0 10px' }}></div> {/* Color based on state */}
          {/* Step 2 */}
          <div style={{ textAlign: 'center' }}>
             <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: currentStep >= 2 ? '#4CAF50' : '#ccc', // Active color based on state
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>2</div>
            <span style={{ color: currentStep >= 2 ? '#222' : '#666' }}>Detaylar</span>
          </div>
           {/* Connector Line */}
          <div style={{ flexGrow: 1, height: '2px', backgroundColor: currentStep >= 3 ? '#4CAF50' : '#ccc', margin: '0 10px' }}></div> {/* Color based on state */}
          {/* Step 3 */}
          <div style={{ textAlign: 'center' }}>
             <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: currentStep >= 3 ? '#4CAF50' : '#ccc', // Active color based on state
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>3</div>
            <span style={{ color: currentStep >= 3 ? '#222' : '#666' }}>Yaşam Tarzı</span>
          </div>
           {/* Connector Line */}
          <div style={{ flexGrow: 1, height: '2px', backgroundColor: currentStep >= 4 ? '#4CAF50' : '#ccc', margin: '0 10px' }}></div> {/* Color based on state */}
          {/* Step 4 */}
          <div style={{ textAlign: 'center' }}>
             <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: currentStep >= 4 ? '#4CAF50' : '#ccc', // Active color based on state
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>4</div>
            <span style={{ color: currentStep >= 4 ? '#222' : '#666' }}>Öneriler</span>
          </div>
        </div>
      </div>

      {/* Step 1: Symptom Selection */}
      {currentStep === 1 && (
        <section className="container" style={{ 
          padding: '2rem 0',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#222' }}>Hangi semptomları yaşıyorsunuz?</h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>Lütfen yaşadığınız semptomları seçin. Birden fazla seçim yapabilirsiniz.</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}>
            {symptoms.map((symptom, index) => {
              const isSelected = selectedSymptoms.includes(symptom.name);
              return (
                <div
                  key={index}
                  onClick={() => handleSymptomClick(symptom.name)}
                  style={{
                    backgroundColor: isSelected ? '#e8f5e9' : '#fff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                    cursor: 'pointer',
                    border: `1px solid ${isSelected ? '#4CAF50' : '#eee'}`,
                    transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
                  }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{symptom.icon}</div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem', color: '#222' }}>{symptom.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>{symptom.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Step 2: Symptom Details */}
      {currentStep === 2 && (
        <section className="container" style={{ 
          padding: '2rem 0',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#222' }}>Semptomlarınız hakkında detaylı bilgi</h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>Lütfen semptomlarınızla ilgili aşağıdaki soruları yanıtlayın.</p>

          {/* Dynamically render detail sections for selected symptoms */}
          {selectedSymptoms.map(symptomName => {
            // Find the full symptom object if needed, though symptomName is enough for the key
            const symptom = symptoms.find(s => s.name === symptomName);

            // Render details based on symptomName
            // This is a basic structure, you'll need more specific components/logic here
            // for different symptom details.
            switch (symptomName) {
              case 'Baş Ağrısı':
                return (
                   <div key={symptomName} style={{
                      backgroundColor: '#fff',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                      marginBottom: '2rem',
                    }}>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#222' }}>{symptomName} <span style={{fontSize: '0.9rem', color: '#4CAF50', fontWeight: 'normal'}}>(Seçili)</span></h3>

                      {/* Süre */} {/* Radio buttons */}
                      <div style={{ marginBottom: '1rem' }}>
                        <p style={{ marginBottom: '0.5rem', color: '#222' }}>Ne kadar süredir bu semptomu yaşıyorsunuz?</p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                          {['Birkaç gündür', 'Birkaç haftadır', 'Birkaç aydır', 'Bir yıldan fazla'].map((option) => (
                            <label
                              key={option}
                              style={{
                                marginRight: '1rem',
                                padding: '0.5rem 1rem',
                                border: `1px solid ${symptomDetails[symptomName]?.sure === option ? '#4CAF50' : '#ccc'}`,
                                borderRadius: '4px',
                                cursor: 'pointer',
                                backgroundColor: symptomDetails[symptomName]?.sure === option ? '#e8f5e9' : 'white',
                                transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
                              }}
                            >
                              <input
                                type="radio"
                                name={`${symptomName}_sure`}
                                value={option}
                                checked={symptomDetails[symptomName]?.sure === option}
                                onChange={(e) => setSymptomDetails({
                                  ...symptomDetails,
                                  [symptomName]: { ...symptomDetails[symptomName], sure: e.target.value }
                                })}
                                style={{ marginRight: '0.5rem' }}
                              /> {option}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Şiddet */} {/* Slider */}
                      <div style={{ marginBottom: '1rem' }}>
                        <p style={{ marginBottom: '0.5rem', color: '#222' }}>Semptomun şiddeti?</p>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                          <span style={{marginRight: '1rem', color: '#666'}}>Hafif</span>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            defaultValue="6"
                            className="slider"
                            id={`${symptomName}_siddet`}
                             value={symptomDetails[symptomName]?.siddet || 6} // Default value
                             onChange={(e) => setSymptomDetails({
                               ...symptomDetails,
                               [symptomName]: { ...symptomDetails[symptomName], siddet: parseInt(e.target.value) }
                             })}
                            style={{flexGrow: 1}}
                          />
                          <span style={{marginLeft: '1rem', color: '#666'}}>Şiddetli</span>
                        </div>
                         <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666', maxWidth: 'calc(100% - 7rem)', margin: '0 auto'}}>
                           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => <span key={num}>{num}</span>)}
                        </div>
                      </div>

                      {/* Zaman */} {/* Checkboxes */}
                       <div style={{ marginBottom: '1rem' }}>
                        <p style={{ marginBottom: '0.5rem', color: '#222' }}>Semptomlar ne zaman ortaya çıkıyor?</p>
                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                           {['Sabah', 'Öğlen', 'Akşam', 'Gece', 'Rastgele'].map((option) => (
                             <label
                               key={option}
                               style={{
                                 padding: '0.5rem',
                                 border: `1px solid ${symptomDetails[symptomName]?.zaman?.includes(option) ? '#4CAF50' : '#eee'}`,
                                 borderRadius: '4px',
                                 cursor: 'pointer',
                                 backgroundColor: symptomDetails[symptomName]?.zaman?.includes(option) ? '#e8f5e9' : 'white',
                                 transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
                               }}
                             >
                               <input
                                 type="checkbox"
                                 name={`${symptomName}_zaman`}
                                 value={option}
                                 checked={symptomDetails[symptomName]?.zaman?.includes(option) || false}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    const value = e.target.value;
                                    setSymptomDetails(prevDetails => {
                                      const zamanArray = prevDetails[symptomName]?.zaman || [];
                                      if (checked) {
                                        return {
                                          ...prevDetails,
                                          [symptomName]: { ...prevDetails[symptomName], zaman: [...zamanArray, value] }
                                        };
                                      } else {
                                        return {
                                          ...prevDetails,
                                          [symptomName]: { ...prevDetails[symptomName], zaman: zamanArray.filter(item => item !== value) }
                                        };
                                      }
                                    });
                                  }}
                                 style={{ marginRight: '0.5rem' }}
                               /> {option}
                             </label>
                           ))}
                         </div>
                      </div>

                       {/* Tetikleyici Faktörler */} {/* Checkboxes */}
                       <div style={{ marginBottom: '1rem' }}>
                         <p style={{ marginBottom: '0.5rem', color: '#222' }}>Semptomlarınızı tetikleyen faktörler var mı?</p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                            {['Stres', 'Belli yiyecekler', 'Uyku düzensizliği', 'Hava değişimleri', 'Fiziksel aktivite', 'Bilmiyorum'].map((option) => (
                              <label
                                key={option}
                                style={{
                                  padding: '0.5rem',
                                  border: `1px solid ${symptomDetails[symptomName]?.tetikleyici?.includes(option) ? '#4CAF50' : '#eee'}`,
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                   backgroundColor: symptomDetails[symptomName]?.tetikleyici?.includes(option) ? '#e8f5e9' : 'white',
                                  transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
                                }}
                              >
                                <input
                                  type="checkbox"
                                  name={`${symptomName}_tetikleyici`}
                                  value={option}
                                  checked={symptomDetails[symptomName]?.tetikleyici?.includes(option) || false}
                                   onChange={(e) => {
                                     const checked = e.target.checked;
                                     const value = e.target.value;
                                     setSymptomDetails(prevDetails => {
                                       const tetikleyiciArray = prevDetails[symptomName]?.tetikleyici || [];
                                       if (checked) {
                                         return {
                                           ...prevDetails,
                                           [symptomName]: { ...prevDetails[symptomName], tetikleyici: [...tetikleyiciArray, value] }
                                         };
                                       } else {
                                         return {
                                           ...prevDetails,
                                           [symptomName]: { ...prevDetails[symptomName], tetikleyici: tetikleyiciArray.filter(item => item !== value) }
                                         };
                                       }
                                     });
                                   }}
                                  style={{ marginRight: '0.5rem' }}
                                /> {option}
                              </label>
                            ))}
                          </div>
                       </div>

                       {/* Ağrı Tipi */} {/* Radio buttons */}
                       <div style={{ marginBottom: '1rem' }}>
                        <p style={{ marginBottom: '0.5rem', color: '#222' }}>Baş ağrınızın tipi nedir?</p>
                         <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                           {['Zonklayıcı', 'Baskı hissi', 'Tek taraflı', 'Diğer'].map((option) => (
                             <label
                               key={option}
                               style={{
                                 marginRight: '1rem',
                                 padding: '0.5rem 1rem',
                                 border: `1px solid ${symptomDetails[symptomName]?.agriTipi === option ? '#4CAF50' : '#ccc'}`,
                                 borderRadius: '4px',
                                 cursor: 'pointer',
                                  backgroundColor: symptomDetails[symptomName]?.agriTipi === option ? '#e8f5e9' : 'white',
                                 transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
                               }}
                             >
                               <input
                                 type="radio"
                                 name={`${symptomName}_agriTipi`}
                                 value={option}
                                 checked={symptomDetails[symptomName]?.agriTipi === option || false}
                                  onChange={(e) => setSymptomDetails({
                                    ...symptomDetails,
                                    [symptomName]: { ...symptomDetails[symptomName], agriTipi: e.target.value }
                                  })}
                                 style={{ marginRight: '0.5rem' }}
                               /> {option}
                             </label>
                           ))}
                         </div>
                      </div>

                      {/* Ek Notlar */} {/* Textarea */}
                       <div>
                        <p style={{ marginBottom: '0.5rem', color: '#222' }}>Ek notlar veya belirtmek istediğiniz başka semptomlar:</p>
                        <textarea
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white' }}
                          rows="4"
                          placeholder="Ek detayları buraya yazabilirsiniz..."
                           value={symptomDetails[symptomName]?.ekNotlar || ''}
                          onChange={(e) => setSymptomDetails({
                            ...symptomDetails,
                            [symptomName]: { ...symptomDetails[symptomName], ekNotlar: e.target.value }
                          })}
                        ></textarea>
                      </div>
                    </div>
                );
              case 'Uyku Sorunları':
                 return (
                   <div key={symptomName} style={{
                      backgroundColor: '#fff',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                      marginBottom: '2rem',
                    }}>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#222' }}>{symptomName} <span style={{fontSize: '0.9rem', color: '#4CAF50', fontWeight: 'normal'}}>(Seçili)</span></h3>

                      {/* Süre */} {/* Radio buttons */}
                      <div style={{ marginBottom: '1rem' }}>
                        <p style={{ marginBottom: '0.5rem', color: '#222' }}>Ne kadar süredir bu semptomu yaşıyorsunuz?</p>
                         <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                           {['Birkaç gündür', 'Birkaç haftadır', 'Birkaç aydır', 'Bir yıldan fazla'].map((option) => (
                             <label
                               key={option}
                               style={{
                                 marginRight: '1rem',
                                 padding: '0.5rem 1rem',
                                 border: `1px solid ${symptomDetails[symptomName]?.sure === option ? '#4CAF50' : '#ccc'}`,
                                 borderRadius: '4px',
                                 cursor: 'pointer',
                                  backgroundColor: symptomDetails[symptomName]?.sure === option ? '#e8f5e9' : 'white',
                                 transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
                               }}
                             >
                               <input
                                 type="radio"
                                 name={`${symptomName}_sure`}
                                 value={option}
                                 checked={symptomDetails[symptomName]?.sure === option || false}
                                  onChange={(e) => setSymptomDetails({
                                    ...symptomDetails,
                                    [symptomName]: { ...symptomDetails[symptomName], sure: e.target.value }
                                  })}
                                 style={{ marginRight: '0.5rem' }}
                               /> {option}
                             </label>
                           ))}
                         </div>
                      </div>

                      {/* Yaşadığınız Sorunlar */} {/* Checkboxes */}
                       <div style={{ marginBottom: '1rem' }}>
                        <p style={{ marginBottom: '0.5rem', color: '#222' }}>Yaşadığınız uyku sorunları nelerdir?</p>
                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                           {['Uykuya dalmada zorluk', 'Uykuyu sürdürmede zorluk', 'Erken uyanma', 'Dinlendirici olmayan uyku'].map((option) => (
                             <label
                               key={option}
                               style={{
                                 padding: '0.5rem',
                                 border: `1px solid ${symptomDetails[symptomName]?.yasadiginizSorunlar?.includes(option) ? '#4CAF50' : '#eee'}`,
                                 borderRadius: '4px',
                                 cursor: 'pointer',
                                 backgroundColor: symptomDetails[symptomName]?.yasadiginizSorunlar?.includes(option) ? '#e8f5e9' : 'white',
                                 transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
                               }}
                             >
                               <input
                                 type="checkbox"
                                 name={`${symptomName}_yasadiginizSorunlar`}
                                 value={option}
                                 checked={symptomDetails[symptomName]?.yasadiginizSorunlar?.includes(option) || false}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    const value = e.target.value;
                                    setSymptomDetails(prevDetails => {
                                      const sorunlarArray = prevDetails[symptomName]?.yasadiginizSorunlar || [];
                                      if (checked) {
                                        return {
                                          ...prevDetails,
                                          [symptomName]: { ...prevDetails[symptomName], yasadiginizSorunlar: [...sorunlarArray, value] }
                                        };
                                      } else {
                                        return {
                                          ...prevDetails,
                                          [symptomName]: { ...prevDetails[symptomName], yasadiginizSorunlar: sorunlarArray.filter(item => item !== value) }
                                        };
                                      }
                                    });
                                  }}
                                 style={{ marginRight: '0.5rem' }}
                               /> {option}
                             </label>
                           ))}
                         </div>
                      </div>

                      {/* Ek notlar */} {/* Textarea */}
                       <div>
                        <p style={{ marginBottom: '0.5rem', color: '#222' }}>Ek notlar:</p>
                         <textarea
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white' }}
                          rows="4"
                          placeholder="Ek detayları buraya yazabilirsiniz..."
                           value={symptomDetails[symptomName]?.ekNotlar || ''}
                          onChange={(e) => setSymptomDetails({
                            ...symptomDetails,
                            [symptomName]: { ...symptomDetails[symptomName], ekNotlar: e.target.value }
                          })}
                        ></textarea>
                      </div>
                    </div>
                 );

              // Add cases for other symptoms here
              case 'Eklem Ağrısı':
                return (
                  <div key={symptomName} style={{
                    backgroundColor: '#fff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                    marginBottom: '2rem',
                  }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#222' }}>{symptomName} <span style={{fontSize: '0.9rem', color: '#4CAF50', fontWeight: 'normal'}}>(Seçili)</span></h3>
                    {/* Süre */} {/* Radio buttons */}
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ marginBottom: '0.5rem', color: '#222' }}>Ne kadar süredir bu semptomu yaşıyorsunuz?</p>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {['Birkaç gündür', 'Birkaç haftadır', 'Birkaç aydır', 'Bir yıldan fazla'].map((option) => (
                          <label
                            key={option}
                            style={{
                              marginRight: '1rem',
                              padding: '0.5rem 1rem',
                              border: `1px solid ${symptomDetails[symptomName]?.sure === option ? '#4CAF50' : '#ccc'}`,
                              borderRadius: '4px',
                              cursor: 'pointer',
                              backgroundColor: symptomDetails[symptomName]?.sure === option ? '#e8f5e9' : 'white',
                              transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
                            }}
                          >
                            <input
                              type="radio"
                              name={`${symptomName}_sure`}
                              value={option}
                              checked={symptomDetails[symptomName]?.sure === option || false}
                              onChange={(e) => setSymptomDetails({
                                ...symptomDetails,
                                [symptomName]: { ...symptomDetails[symptomName], sure: e.target.value }
                              })}
                              style={{ marginRight: '0.5rem' }}
                            /> {option}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Şiddet */} {/* Slider */}
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ marginBottom: '0.5rem', color: '#222' }}>Semptomun şiddeti?</p>
                      <div style={{ display: 'flex', alignItems: 'center'}}>
                        <span style={{marginRight: '1rem', color: '#666'}}>Hafif</span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          defaultValue="6"
                          className="slider"
                          id={`${symptomName}_siddet`}
                           value={symptomDetails[symptomName]?.siddet || 6} // Default value
                           onChange={(e) => setSymptomDetails({
                              ...symptomDetails,
                              [symptomName]: { ...symptomDetails[symptomName], siddet: parseInt(e.target.value) }
                            })}
                          style={{flexGrow: 1}}
                        />
                        <span style={{marginLeft: '1rem', color: '#666'}}>Şiddetli</span>
                      </div>
                       <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666', maxWidth: 'calc(100% - 7rem)', margin: '0 auto'}}>
                         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => <span key={num}>{num}</span>)}
                      </div>
                    </div>

                     {/* Ağrının Yeri */} {/* Checkboxes */}
                     <div style={{ marginBottom: '1rem' }}>
                       <p style={{ marginBottom: '0.5rem', color: '#222' }}>Ağrı nerede yoğunlaşıyor?</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                          {['Dizler', 'Kalçalar', 'Omuzlar', 'Eller', 'Ayaklar', 'Bel', 'Sırt', 'Genel'].map((option) => (
                            <label
                              key={option}
                              style={{
                                padding: '0.5rem',
                                border: `1px solid ${symptomDetails[symptomName]?.agriYeri?.includes(option) ? '#4CAF50' : '#eee'}`,
                                borderRadius: '4px',
                                cursor: 'pointer',
                                 backgroundColor: symptomDetails[symptomName]?.agriYeri?.includes(option) ? '#e8f5e9' : 'white',
                                transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
                              }}
                            >
                              <input
                                type="checkbox"
                                name={`${symptomName}_agriYeri`}
                                value={option}
                                checked={symptomDetails[symptomName]?.agriYeri?.includes(option) || false}
                                 onChange={(e) => {
                                   const checked = e.target.checked;
                                   const value = e.target.value;
                                   setSymptomDetails(prevDetails => {
                                     const yeriArray = prevDetails[symptomName]?.agriYeri || [];
                                     if (checked) {
                                       return {
                                         ...prevDetails,
                                         [symptomName]: { ...prevDetails[symptomName], agriYeri: [...yeriArray, value] }
                                       };
                                     } else {
                                       return {
                                         ...prevDetails,
                                         [symptomName]: { ...prevDetails[symptomName], agriYeri: yeriArray.filter(item => item !== value) }
                                       };
                                     }
                                   });
                                 }}
                                style={{ marginRight: '0.5rem' }}
                              /> {option}
                            </label>
                          ))}
                        </div>
                     </div>

                      {/* Ek Notlar */} {/* Textarea */}
                      <div>
                       <p style={{ marginBottom: '0.5rem', color: '#222' }}>Ek notlar veya belirtmek istediğiniz başka semptomlar:</p>
                       <textarea
                         style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white' }}
                         rows="4"
                         placeholder="Ek detayları buraya yazabilirsiniz..."
                          value={symptomDetails[symptomName]?.ekNotlar || ''}
                         onChange={(e) => setSymptomDetails({
                           ...symptomDetails,
                           [symptomName]: { ...symptomDetails[symptomName], ekNotlar: e.target.value }
                         })}
                       ></textarea>
                     </div>
                  </div>
                );
              case 'Stres ve Anksiyete':
                 return (
                   <div key={symptomName} style={{
                      backgroundColor: '#fff',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                      marginBottom: '2rem',
                    }}>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#222' }}>{symptomName} <span style={{fontSize: '0.9rem', color: '#4CAF50', fontWeight: 'normal'}}>(Seçili)</span></h3>

                       {/* Şiddet */} {/* Slider */}
                       <div style={{ marginBottom: '1rem' }}>
                         <p style={{ marginBottom: '0.5rem', color: '#222' }}>Ne kadar yoğun yaşıyorsunuz?</p>
                         <div style={{ display: 'flex', alignItems: 'center'}}>
                           <span style={{marginRight: '1rem', color: '#666'}}>Hafif</span>
                           <input
                             type="range"
                             min="1"
                             max="10"
                             defaultValue="6"
                             className="slider"
                             id={`${symptomName}_siddet`}
                              value={symptomDetails[symptomName]?.siddet || 6} // Default value
                              onChange={(e) => setSymptomDetails({
                                ...symptomDetails,
                                [symptomName]: { ...symptomDetails[symptomName], siddet: parseInt(e.target.value) }
                              })}
                             style={{flexGrow: 1}}
                           />
                           <span style={{marginLeft: '1rem', color: '#666'}}>Şiddetli</span>
                         </div>
                          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666', maxWidth: 'calc(100% - 7rem)', margin: '0 auto'}}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => <span key={num}>{num}</span>)}
                         </div>
                       </div>

                       {/* Belirtiler */} {/* Checkboxes */}
                       <div style={{ marginBottom: '1rem' }}>
                         <p style={{ marginBottom: '0.5rem', color: '#222' }}>Başlıca belirtileriniz neler?</p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                            {['Endişe', 'Gerginlik', 'Sinirlilik', 'Konsantrasyon Güçlüğü', 'Kalp Çarpıntısı', 'Nefes Darlığı', 'Panik Ataklar', 'Sosyal Geri Çekilme'].map((option) => (
                              <label
                                key={option}
                                style={{
                                  padding: '0.5rem',
                                  border: `1px solid ${symptomDetails[symptomName]?.belirtiler?.includes(option) ? '#4CAF50' : '#eee'}`,
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                   backgroundColor: symptomDetails[symptomName]?.belirtiler?.includes(option) ? '#e8f5e9' : 'white',
                                  transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
                                }}
                              >
                                <input
                                  type="checkbox"
                                  name={`${symptomName}_belirtiler`}
                                  value={option}
                                  checked={symptomDetails[symptomName]?.belirtiler?.includes(option) || false}
                                   onChange={(e) => {
                                     const checked = e.target.checked;
                                     const value = e.target.value;
                                     setSymptomDetails(prevDetails => {
                                       const belirtilerArray = prevDetails[symptomName]?.belirtiler || [];
                                       if (checked) {
                                         return {
                                           ...prevDetails,
                                           [symptomName]: { ...prevDetails[symptomName], belirtiler: [...belirtilerArray, value] }
                                         };
                                       } else {
                                         return {
                                           ...prevDetails,
                                           [symptomName]: { ...prevDetails[symptomName], belirtiler: belirtilerArray.filter(item => item !== value) }
                                         };
                                       }
                                     });
                                   }}
                                  style={{ marginRight: '0.5rem' }}
                                /> {option}
                              </label>
                            ))}
                          </div>
                       </div>

                       {/* Ek Notlar */} {/* Textarea */}
                       <div>
                        <p style={{ marginBottom: '0.5rem', color: '#222' }}>Ek notlar veya belirtmek istediğiniz başka semptomlar:</p>
                        <textarea
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white' }}
                          rows="4"
                          placeholder="Ek detayları buraya yazabilirsiniz..."
                           value={symptomDetails[symptomName]?.ekNotlar || ''}
                          onChange={(e) => setSymptomDetails({
                            ...symptomDetails,
                            [symptomName]: { ...symptomDetails[symptomName], ekNotlar: e.target.value }
                          })}
                        ></textarea>
                      </div>
                    </div>
                 );

              // Add cases for other symptoms here
              case 'Bağışıklık Sorunları':
                return (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Süre</label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={symptomDetails.duration || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, duration: e.target.value })}
                      >
                        <option value="">Seçiniz</option>
                        <option value="1-3 gün">1-3 gün</option>
                        <option value="4-7 gün">4-7 gün</option>
                        <option value="1-2 hafta">1-2 hafta</option>
                        <option value="2 haftadan fazla">2 haftadan fazla</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Şiddet</label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={symptomDetails.severity || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, severity: e.target.value })}
                      >
                        <option value="">Seçiniz</option>
                        <option value="Hafif">Hafif</option>
                        <option value="Orta">Orta</option>
                        <option value="Şiddetli">Şiddetli</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Spesifik Belirtiler</label>
                      <div className="mt-2 space-y-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                            checked={symptomDetails.specificSymptoms?.includes('Sık hastalanma') || false}
                            onChange={(e) => {
                              const symptoms = symptomDetails.specificSymptoms || [];
                              if (e.target.checked) {
                                symptoms.push('Sık hastalanma');
                              } else {
                                const index = symptoms.indexOf('Sık hastalanma');
                                if (index > -1) {
                                  symptoms.splice(index, 1);
                                }
                              }
                              setSymptomDetails({ ...symptomDetails, specificSymptoms: symptoms });
                            }}
                          />
                          <span className="ml-2">Sık hastalanma</span>
                        </label>
                        <br />
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                            checked={symptomDetails.specificSymptoms?.includes('Yorgunluk') || false}
                            onChange={(e) => {
                              const symptoms = symptomDetails.specificSymptoms || [];
                              if (e.target.checked) {
                                symptoms.push('Yorgunluk');
                              } else {
                                const index = symptoms.indexOf('Yorgunluk');
                                if (index > -1) {
                                  symptoms.splice(index, 1);
                                }
                              }
                              setSymptomDetails({ ...symptomDetails, specificSymptoms: symptoms });
                            }}
                          />
                          <span className="ml-2">Yorgunluk</span>
                        </label>
                        <br />
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                            checked={symptomDetails.specificSymptoms?.includes('Ateş') || false}
                            onChange={(e) => {
                              const symptoms = symptomDetails.specificSymptoms || [];
                              if (e.target.checked) {
                                symptoms.push('Ateş');
                              } else {
                                const index = symptoms.indexOf('Ateş');
                                if (index > -1) {
                                  symptoms.splice(index, 1);
                                }
                              }
                              setSymptomDetails({ ...symptomDetails, specificSymptoms: symptoms });
                            }}
                          />
                          <span className="ml-2">Ateş</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ek Bilgiler</label>
                      <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        rows="3"
                        value={symptomDetails.additionalInfo || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, additionalInfo: e.target.value })}
                        placeholder="Eklemek istediğiniz başka bilgiler var mı?"
                      ></textarea>
                    </div>
                  </div>
                );
              case 'Sindirim Sorunları':
                return (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Süre</label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={symptomDetails.duration || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, duration: e.target.value })}
                      >
                        <option value="">Seçiniz</option>
                        <option value="1-3 gün">1-3 gün</option>
                        <option value="4-7 gün">4-7 gün</option>
                        <option value="1-2 hafta">1-2 hafta</option>
                        <option value="2 haftadan fazla">2 haftadan fazla</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Şiddet</label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={symptomDetails.severity || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, severity: e.target.value })}
                      >
                        <option value="">Seçiniz</option>
                        <option value="Hafif">Hafif</option>
                        <option value="Orta">Orta</option>
                        <option value="Şiddetli">Şiddetli</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Spesifik Belirtiler</label>
                      <div className="mt-2 space-y-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                            checked={symptomDetails.specificSymptoms?.includes('Mide ağrısı') || false}
                            onChange={(e) => {
                              const symptoms = symptomDetails.specificSymptoms || [];
                              if (e.target.checked) {
                                symptoms.push('Mide ağrısı');
                              } else {
                                const index = symptoms.indexOf('Mide ağrısı');
                                if (index > -1) {
                                  symptoms.splice(index, 1);
                                }
                              }
                              setSymptomDetails({ ...symptomDetails, specificSymptoms: symptoms });
                            }}
                          />
                          <span className="ml-2">Mide ağrısı</span>
                        </label>
                        <br />
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                            checked={symptomDetails.specificSymptoms?.includes('Bulantı') || false}
                            onChange={(e) => {
                              const symptoms = symptomDetails.specificSymptoms || [];
                              if (e.target.checked) {
                                symptoms.push('Bulantı');
                              } else {
                                const index = symptoms.indexOf('Bulantı');
                                if (index > -1) {
                                  symptoms.splice(index, 1);
                                }
                              }
                              setSymptomDetails({ ...symptomDetails, specificSymptoms: symptoms });
                            }}
                          />
                          <span className="ml-2">Bulantı</span>
                        </label>
                        <br />
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                            checked={symptomDetails.specificSymptoms?.includes('İshal') || false}
                            onChange={(e) => {
                              const symptoms = symptomDetails.specificSymptoms || [];
                              if (e.target.checked) {
                                symptoms.push('İshal');
                              } else {
                                const index = symptoms.indexOf('İshal');
                                if (index > -1) {
                                  symptoms.splice(index, 1);
                                }
                              }
                              setSymptomDetails({ ...symptomDetails, specificSymptoms: symptoms });
                            }}
                          />
                          <span className="ml-2">İshal</span>
                        </label>
                        <br />
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                            checked={symptomDetails.specificSymptoms?.includes('Kabızlık') || false}
                            onChange={(e) => {
                              const symptoms = symptomDetails.specificSymptoms || [];
                              if (e.target.checked) {
                                symptoms.push('Kabızlık');
                              } else {
                                const index = symptoms.indexOf('Kabızlık');
                                if (index > -1) {
                                  symptoms.splice(index, 1);
                                }
                              }
                              setSymptomDetails({ ...symptomDetails, specificSymptoms: symptoms });
                            }}
                          />
                          <span className="ml-2">Kabızlık</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ek Bilgiler</label>
                      <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        rows="3"
                        value={symptomDetails.additionalInfo || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, additionalInfo: e.target.value })}
                        placeholder="Eklemek istediğiniz başka bilgiler var mı?"
                      ></textarea>
                    </div>
                  </div>
                );
              case 'Cilt Sorunları':
                return (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Süre</label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={symptomDetails.duration || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, duration: e.target.value })}
                      >
                        <option value="">Seçiniz</option>
                        <option value="1-3 gün">1-3 gün</option>
                        <option value="4-7 gün">4-7 gün</option>
                        <option value="1-2 hafta">1-2 hafta</option>
                        <option value="2 haftadan fazla">2 haftadan fazla</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Şiddet</label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={symptomDetails.severity || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, severity: e.target.value })}
                      >
                        <option value="">Seçiniz</option>
                        <option value="Hafif">Hafif</option>
                        <option value="Orta">Orta</option>
                        <option value="Şiddetli">Şiddetli</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Spesifik Belirtiler</label>
                      <div className="mt-2 space-y-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                            checked={symptomDetails.specificSymptoms?.includes('Kızarıklık') || false}
                            onChange={(e) => {
                              const symptoms = symptomDetails.specificSymptoms || [];
                              if (e.target.checked) {
                                symptoms.push('Kızarıklık');
                              } else {
                                const index = symptoms.indexOf('Kızarıklık');
                                if (index > -1) {
                                  symptoms.splice(index, 1);
                                }
                              }
                              setSymptomDetails({ ...symptomDetails, specificSymptoms: symptoms });
                            }}
                          />
                          <span className="ml-2">Kızarıklık</span>
                        </label>
                        <br />
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                            checked={symptomDetails.specificSymptoms?.includes('Kaşıntı') || false}
                            onChange={(e) => {
                              const symptoms = symptomDetails.specificSymptoms || [];
                              if (e.target.checked) {
                                symptoms.push('Kaşıntı');
                              } else {
                                const index = symptoms.indexOf('Kaşıntı');
                                if (index > -1) {
                                  symptoms.splice(index, 1);
                                }
                              }
                              setSymptomDetails({ ...symptomDetails, specificSymptoms: symptoms });
                            }}
                          />
                          <span className="ml-2">Kaşıntı</span>
                        </label>
                        <br />
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                            checked={symptomDetails.specificSymptoms?.includes('Döküntü') || false}
                            onChange={(e) => {
                              const symptoms = symptomDetails.specificSymptoms || [];
                              if (e.target.checked) {
                                symptoms.push('Döküntü');
                              } else {
                                const index = symptoms.indexOf('Döküntü');
                                if (index > -1) {
                                  symptoms.splice(index, 1);
                                }
                              }
                              setSymptomDetails({ ...symptomDetails, specificSymptoms: symptoms });
                            }}
                          />
                          <span className="ml-2">Döküntü</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ek Bilgiler</label>
                      <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        rows="3"
                        value={symptomDetails.additionalInfo || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, additionalInfo: e.target.value })}
                        placeholder="Eklemek istediğiniz başka bilgiler var mı?"
                      ></textarea>
                    </div>
                  </div>
                );
              case 'Enerji Eksikliği':
                return (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Süre</label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={symptomDetails.duration || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, duration: e.target.value })}
                      >
                        <option value="">Seçiniz</option>
                        <option value="1-3 gün">1-3 gün</option>
                        <option value="4-7 gün">4-7 gün</option>
                        <option value="1-2 hafta">1-2 hafta</option>
                        <option value="2 haftadan fazla">2 haftadan fazla</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Şiddet</label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={symptomDetails.severity || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, severity: e.target.value })}
                      >
                        <option value="">Seçiniz</option>
                        <option value="Hafif">Hafif</option>
                        <option value="Orta">Orta</option>
                        <option value="Şiddetli">Şiddetli</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Spesifik Belirtiler</label>
                      <div className="mt-2 space-y-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                            checked={symptomDetails.specificSymptoms?.includes('Yorgunluk') || false}
                            onChange={(e) => {
                              const symptoms = symptomDetails.specificSymptoms || [];
                              if (e.target.checked) {
                                symptoms.push('Yorgunluk');
                              } else {
                                const index = symptoms.indexOf('Yorgunluk');
                                if (index > -1) {
                                  symptoms.splice(index, 1);
                                }
                              }
                              setSymptomDetails({ ...symptomDetails, specificSymptoms: symptoms });
                            }}
                          />
                          <span className="ml-2">Yorgunluk</span>
                        </label>
                        <br />
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                            checked={symptomDetails.specificSymptoms?.includes('Halsizlik') || false}
                            onChange={(e) => {
                              const symptoms = symptomDetails.specificSymptoms || [];
                              if (e.target.checked) {
                                symptoms.push('Halsizlik');
                              } else {
                                const index = symptoms.indexOf('Halsizlik');
                                if (index > -1) {
                                  symptoms.splice(index, 1);
                                }
                              }
                              setSymptomDetails({ ...symptomDetails, specificSymptoms: symptoms });
                            }}
                          />
                          <span className="ml-2">Halsizlik</span>
                        </label>
                        <br />
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                            checked={symptomDetails.specificSymptoms?.includes('Konsantrasyon güçlüğü') || false}
                            onChange={(e) => {
                              const symptoms = symptomDetails.specificSymptoms || [];
                              if (e.target.checked) {
                                symptoms.push('Konsantrasyon güçlüğü');
                              } else {
                                const index = symptoms.indexOf('Konsantrasyon güçlüğü');
                                if (index > -1) {
                                  symptoms.splice(index, 1);
                                }
                              }
                              setSymptomDetails({ ...symptomDetails, specificSymptoms: symptoms });
                            }}
                          />
                          <span className="ml-2">Konsantrasyon güçlüğü</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ek Bilgiler</label>
                      <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        rows="3"
                        value={symptomDetails.additionalInfo || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, additionalInfo: e.target.value })}
                        placeholder="Eklemek istediğiniz başka bilgiler var mı?"
                      ></textarea>
                    </div>
                  </div>
                );
              case 'Diğer':
                return (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Süre</label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={symptomDetails.duration || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, duration: e.target.value })}
                      >
                        <option value="">Seçiniz</option>
                        <option value="1-3 gün">1-3 gün</option>
                        <option value="4-7 gün">4-7 gün</option>
                        <option value="1-2 hafta">1-2 hafta</option>
                        <option value="2 haftadan fazla">2 haftadan fazla</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Şiddet</label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        value={symptomDetails.severity || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, severity: e.target.value })}
                      >
                        <option value="">Seçiniz</option>
                        <option value="Hafif">Hafif</option>
                        <option value="Orta">Orta</option>
                        <option value="Şiddetli">Şiddetli</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Spesifik Belirtiler</label>
                      <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        rows="3"
                        value={symptomDetails.specificSymptoms || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, specificSymptoms: e.target.value })}
                        placeholder="Lütfen belirtilerinizi detaylı bir şekilde açıklayın."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ek Bilgiler</label>
                      <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        rows="3"
                        value={symptomDetails.additionalInfo || ''}
                        onChange={(e) => setSymptomDetails({ ...symptomDetails, additionalInfo: e.target.value })}
                        placeholder="Eklemek istediğiniz başka bilgiler var mı?"
                      ></textarea>
                    </div>
                  </div>
                );
              default:
                return (
                  <div key={symptomName} style={{
                     backgroundColor: '#fff',
                     padding: '1.5rem',
                     borderRadius: '8px',
                     boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                     marginBottom: '2rem',
                   }}>
                     <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#222' }}>{symptomName} <span style={{fontSize: '0.9rem', color: '#4CAF50', fontWeight: 'normal'}}>(Seçili)</span></h3>
                     <p>Detaylar bu semptom için henüz eklenmedi.</p>
                      {/* Add a generic notes field for unhandled symptoms */}
                      <div style={{ marginTop: '1rem' }}>
                        <p style={{ marginBottom: '0.5rem', color: '#222' }}>Ek notlar:</p>
                        <textarea
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white' }}
                          rows="4"
                          placeholder="Ek detayları buraya yazabilirsiniz..."
                           value={symptomDetails[symptomName]?.ekNotlar || ''}
                          onChange={(e) => setSymptomDetails({
                            ...symptomDetails,
                            [symptomName]: { ...symptomDetails[symptomName], ekNotlar: e.target.value }
                          })}
                        ></textarea>
                      </div>
                   </div>
                 );
            }
          })}

        </section>
      )}

      {/* Step 3: Lifestyle */}
      {currentStep === 3 && (
        <section className="container" style={{ 
          padding: '2rem 0',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#222' }}>Yaşam Tarzınız hakkında bilgi</h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>Tedavi önerilerinizi kişiselleştirmek için lütfen yaşam tarzınızla ilgili soruları yanıtlayın.</p>

          {/* Lifestyle Tabs */}
          <div style={{ marginBottom: '2rem' }}>
            <button
              style={{
                marginRight: '1rem',
                padding: '0.5rem 1rem',
                border: 'none',
                backgroundColor: activeLifestyleTab === 'Beslenme' ? '#4CAF50' : '#eee',
                color: activeLifestyleTab === 'Beslenme' ? 'white' : '#222',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              onClick={() => setActiveLifestyleTab('Beslenme')}
            >
              Beslenme
            </button>
            <button
              style={{
                marginRight: '1rem',
                padding: '0.5rem 1rem',
                border: 'none',
                backgroundColor: activeLifestyleTab === 'Fiziksel Aktivite' ? '#4CAF50' : '#eee',
                color: activeLifestyleTab === 'Fiziksel Aktivite' ? 'white' : '#222',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              onClick={() => setActiveLifestyleTab('Fiziksel Aktivite')}
            >
              Fiziksel Aktivite
            </button>
            <button
              style={{
                marginRight: '1rem',
                padding: '0.5rem 1rem',
                border: 'none',
                backgroundColor: activeLifestyleTab === 'Uyku' ? '#4CAF50' : '#eee',
                color: activeLifestyleTab === 'Uyku' ? 'white' : '#222',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              onClick={() => setActiveLifestyleTab('Uyku')}
            >
              Uyku
            </button>
            <button
               style={{
                padding: '0.5rem 1rem',
                border: 'none',
                backgroundColor: activeLifestyleTab === 'Stres Yönetimi' ? '#4CAF50' : '#eee',
                color: activeLifestyleTab === 'Stres Yönetimi' ? 'white' : '#222',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              onClick={() => setActiveLifestyleTab('Stres Yönetimi')}
            >
              Stres Yönetimi
            </button>
          </div>

          {/* Lifestyle Tab Content */}
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            {activeLifestyleTab === 'Beslenme' && (
              <div>
                {/* Beslenme Alışkanlıkları */}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#222' }}>Beslenme Alışkanlıkları</h3>

                {/* Soru 1: Günde kaç öğün? */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ marginBottom: '0.5rem', color: '#222', fontSize: '1rem', fontWeight: '500' }}>Günde kaç öğün yemek yiyorsunuz?</p>
                  <select
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem', 
                      borderRadius: '8px', 
                      border: '1px solid #ddd',
                      backgroundColor: 'white',
                      fontSize: '1rem',
                      color: '#333',
                      maxWidth: '400px',
                      margin: '0 auto',
                      display: 'block'
                    }}
                    value={lifestyleDetails.ogunSayisi || ''}
                    onChange={(e) => setLifestyleDetails({ ...lifestyleDetails, ogunSayisi: e.target.value })}
                  >
                    <option value="">Seçiniz</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4+</option>
                  </select>
                </div>

                {/* Soru 2: Su tüketimi? */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ marginBottom: '0.5rem', color: '#222', fontSize: '1rem', fontWeight: '500' }}>Su tüketiminiz günde ortalama ne kadar?</p>
                  <select
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem', 
                      borderRadius: '8px', 
                      border: '1px solid #ddd',
                      backgroundColor: 'white',
                      fontSize: '1rem',
                      color: '#333',
                      maxWidth: '400px',
                      margin: '0 auto',
                      display: 'block'
                    }}
                    value={lifestyleDetails.suTuketimi || ''}
                    onChange={(e) => setLifestyleDetails({ ...lifestyleDetails, suTuketimi: e.target.value })}
                  >
                    <option value="">Seçiniz</option>
                    <option value="<1L">&lt; 1 Litre</option>
                    <option value="1-2L">1-2 Litre</option>
                    <option value="2-3L">2-3 Litre</option>
                    <option value=">3L">&gt; 3 Litre</option>
                  </select>
                </div>

                {/* Soru 3: Beslenme tarzı? */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ marginBottom: '0.5rem', color: '#222', fontSize: '1rem', fontWeight: '500' }}>Beslenme tarzınızı en iyi hangisi tanımlar?</p>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                  }}>
                    {['Karışık Beslenme', 'Vejetaryen', 'Vegan'].map((option) => (
                      <label key={option} style={{ 
                        border: `1px solid ${lifestyleDetails.beslenmeTarzi === option ? '#4CAF50' : '#eee'}`,
                        padding: '1.5rem',
                        borderRadius: '8px',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                        cursor: 'pointer',
                        backgroundColor: lifestyleDetails.beslenmeTarzi === option ? '#e8f5e9' : 'white',
                        transition: 'all 0.2s ease-in-out',
                      }}>
                        <input
                          type="radio"
                          name="beslenme_tarzi"
                          value={option}
                          checked={lifestyleDetails.beslenmeTarzi === option || false}
                          onChange={(e) => setLifestyleDetails({ ...lifestyleDetails, beslenmeTarzi: e.target.value })}
                          style={{ marginRight: '0.75rem' }}
                        />
                        <strong style={{ fontSize: '1.1rem', color: '#333' }}>{option}</strong>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                          {option === 'Karışık Beslenme' ? 'Et, sebze, meyve, tahıl gibi çeşitli besinleri tüketiyorum.' :
                           option === 'Vejetaryen' ? 'Et tüketmiyorum, ancak süt ürünleri ve yumurta tüketiyorum.' :
                           'Hiçbir hayvansal gıda tüketmiyorum.'}
                        </p>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Soru 4: Düzenli tüketilenler? */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ marginBottom: '0.5rem', color: '#222', fontSize: '1rem', fontWeight: '500' }}>Aşağıdaki besinlerden hangilerini düzenli olarak tüketiyorsunuz?</p>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '1rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                  }}>
                    {['Yeşil yapraklı sebzeler', 'Meyveler', 'Tam tahıllı ürünler', 'Kuruyemişler ve tohumlar', 'Baklagiller', 'Balık', 'Probiyotik gıdalar (yoğurt, kefir vb.)', 'Zeytinyağı'].map((option) => (
                      <label key={option} style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.75rem',
                        border: `1px solid ${lifestyleDetails.duzenliTuketim?.includes(option) ? '#4CAF50' : '#eee'}`,
                        borderRadius: '8px',
                        backgroundColor: lifestyleDetails.duzenliTuketim?.includes(option) ? '#e8f5e9' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                      }}>
                        <input
                          type="checkbox"
                          name="duzenli_tuketim"
                          value={option}
                          checked={lifestyleDetails.duzenliTuketim?.includes(option) || false}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const value = e.target.value;
                            setLifestyleDetails(prevDetails => {
                              const duzenliArray = prevDetails.duzenliTuketim || [];
                              if (checked) {
                                return { ...prevDetails, duzenliTuketim: [...duzenliArray, value] };
                              } else {
                                return { ...prevDetails, duzenliTuketim: duzenliArray.filter(item => item !== value) };
                              }
                            });
                          }}
                          style={{ marginRight: '0.75rem' }}
                        />
                        <span style={{ fontSize: '0.95rem', color: '#333' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Soru 5: Sık tüketilenler? */}
                <div style={{ marginBottom: '2rem' }}>
                  <p style={{ marginBottom: '0.5rem', color: '#222', fontSize: '1rem', fontWeight: '500' }}>Aşağıdaki besinlerden hangilerini sık tüketiyorsunuz?</p>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '1rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                  }}>
                    {['İşlenmiş gıdalar', 'Şekerli içecekler', 'Fast food', 'Tatlılar ve şekerli atıştırmalıklar', 'Alkollü içecekler', 'Kafeinli içecekler'].map((option) => (
                      <label key={option} style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.75rem',
                        border: `1px solid ${lifestyleDetails.sikTuketim?.includes(option) ? '#4CAF50' : '#eee'}`,
                        borderRadius: '8px',
                        backgroundColor: lifestyleDetails.sikTuketim?.includes(option) ? '#e8f5e9' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                      }}>
                        <input
                          type="checkbox"
                          name="sik_tuketim"
                          value={option}
                          checked={lifestyleDetails.sikTuketim?.includes(option) || false}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const value = e.target.value;
                            setLifestyleDetails(prevDetails => {
                              const sikArray = prevDetails.sikTuketim || [];
                              if (checked) {
                                return { ...prevDetails, sikTuketim: [...sikArray, value] };
                              } else {
                                return { ...prevDetails, sikTuketim: sikArray.filter(item => item !== value) };
                              }
                            });
                          }}
                          style={{ marginRight: '0.75rem' }}
                        />
                        <span style={{ fontSize: '0.95rem', color: '#333' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                 {/* Beslenme Önerileri */}
                 <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#222' }}>Beslenme Önerileri</h3>
                 <div style={{ 
                   display: 'grid', 
                   gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                   gap: '1.5rem',
                   maxWidth: '1200px',
                   margin: '0 auto',
                   padding: '0 1rem',
                 }}>
                   <div style={{ backgroundColor: '#e8f5e9', borderTop: '5px solid #4CAF50', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}>
                     <h4 style={{ fontSize: '1.2rem', color: '#4CAF50', marginBottom: '1rem' }}>Tüketilmesi Önerilenler</h4>
                     <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>✔️ Yeşil yapraklı sebzeler</li>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>✔️ Omega-3 açısından zengin balıklar</li>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>✔️ Zerdeçal ve zencefil</li>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>✔️ Antioksidan açısından zengin meyveler</li>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>✔️ Tam tahıllı ürünler</li>
                     </ul>
                   </div>

                   {/* Sınırlandırılması Önerilenler */}
                   <div style={{ backgroundColor: '#ffebee', borderTop: '5px solid #f44336', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}>
                     <h4 style={{ fontSize: '1.2rem', color: '#f44336', marginBottom: '1rem' }}>Sınırlandırılması Önerilenler</h4>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>❌ İşlenmiş gıdalar</li>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>❌ Şekerli içecekler ve tatlılar</li>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>❌ Aşırı tuz içeren gıdalar</li>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>❌ Trans yağlar</li>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>❌ Alkollü içecekler</li>
                        <li style={{ marginBottom: '0.5rem', color: '#333' }}>❌ Aşırı kafein</li>
                     </ul>
                   </div>

                   {/* Önerilen Takviyeler */}
                   <div style={{ backgroundColor: '#e3f2fd', borderTop: '5px solid #2196f3', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}>
                     <h4 style={{ fontSize: '1.2rem', color: '#2196f3', marginBottom: '1rem' }}>Önerilen Takviyeler</h4>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>💊 Omega-3 takviyesi</li>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>💊 D vitamini</li>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>💊 Magnezyum</li>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>💊 Probiyotik takviyesi</li>
                       <li style={{ marginBottom: '0.5rem', color: '#333' }}>💊 Kurkumin (Zerdeçal özü)</li>
                     </ul>
                     <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '1rem' }}>* Herhangi bir takviye kullanmadan önce doktorunuza danışınız.</p>
                   </div>
                 </div>

                 {/* Önerilen Günlük Beslenme Planı */}
                 <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#222' }}>Önerilen Günlük Beslenme Planı</h3>
                 <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)', overflow: 'hidden' }}>
                   <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                     <thead>
                       <tr style={{ backgroundColor: '#f0f0f0' }}>
                         <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ccc' }}>ÖĞÜN</th>
                         <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ccc' }}>ÖNERİLER</th>
                       </tr>
                     </thead>
                     <tbody>
                       <tr style={{ borderBottom: '1px solid #eee' }}>
                         <td style={{ padding: '1rem' }}>Kahvaltı</td>
                         <td style={{ padding: '1rem' }}>Yulaf ezmesi, taze meyveler ve ceviz ile. Yanında yeşil çay.</td>
                       </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                         <td style={{ padding: '1rem' }}>Ara Öğün</td>
                         <td style={{ padding: '1rem' }}>Bir avuç karışık kuruyemiş veya taze meyve.</td>
                       </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                         <td style={{ padding: '1rem' }}>Öğle Yemeği</td>
                         <td style={{ padding: '1rem' }}>Bol yeşillikli salata, ızgara balık veya mercimek yemeği. Tam tahıllı ekmek.</td>
                       </tr>
                       <tr style={{ borderBottom: '1px solid #eee' }}>
                         <td style={{ padding: '1rem' }}>Ara Öğün</td>
                         <td style={{ padding: '1rem' }}>Probiyotik yoğurt ve taze meyveler.</td>
                       </tr>
                        <tr> {/* Last row, no bottom border */}
                         <td style={{ padding: '1rem' }}>Akşam Yemeği</td>
                         <td style={{ padding: '1rem' }}>Zeytinyağlı sebze yemeği, ızgara tavuk veya tofu. Yanında bulgur pilavı.</td>
                       </tr>
                     </tbody>
                   </table>
                 </div>

              </div>
            )}

            {activeLifestyleTab === 'Fiziksel Aktivite' && (
              <div>
                {/* Fiziksel Aktivite soruları ve inputları buraya gelecek */}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#222' }}>Fiziksel Aktivite Alışkanlıkları</h3>

                {/* Soru 1: Egzersiz sıklığı? */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ marginBottom: '0.5rem', color: '#222' }}>Haftada kaç gün egzersiz yapıyorsunuz?</p>
                  <select
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    value={lifestyleDetails.egzersizSikligi || ''}
                    onChange={(e) => setLifestyleDetails({ ...lifestyleDetails, egzersizSikligi: e.target.value })}
                  >
                    <option value="">Seçiniz</option>
                    <option value="0">Hiç</option>
                    <option value="1-2">1-2 gün</option>
                    <option value="3-4">3-4 gün</option>
                    <option value="5+">5+ gün</option>
                  </select>
                </div>

                {/* Soru 2: Egzersiz tipi? */} {/* Checkboxes */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ marginBottom: '0.5rem', color: '#222' }}>Genellikle ne tür egzersizler yapıyorsunuz?</p>
                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                    {['Yürüyüş', 'Koşu', 'Yüzme', 'Bisiklet', 'Fitness / Ağırlık Çalışması', 'Yoga / Pilates', 'Takım Sporları', 'Diğer'].map((option) => (
                       <label key={option} style={{ marginRight: '1rem' }}>
                         <input
                           type="checkbox"
                           name="egzersiz_tipi"
                           value={option}
                           checked={lifestyleDetails.egzersizTipi?.includes(option) || false}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const value = e.target.value;
                              setLifestyleDetails(prevDetails => {
                                const egzersizArray = prevDetails.egzersizTipi || [];
                                if (checked) {
                                  return { ...prevDetails, egzersizTipi: [...egzersizArray, value] };
                                } else {
                                  return { ...prevDetails, egzersizTipi: egzersizArray.filter(item => item !== value) };
                                }
                              });
                            }}
                           style={{ marginRight: '0.5rem' }}
                         /> {option}
                       </label>
                     ))}
                  </div>
                </div>

                {/* Ek Notlar */} {/* Textarea */}
                 <div>
                  <p style={{ marginBottom: '0.5rem', color: '#222' }}>Fiziksel aktivite alışkanlıklarınız hakkında ek notlar:</p>
                  <textarea
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white' }}
                    rows="4"
                    placeholder="Ek detayları buraya yazabilirsiniz..."
                     value={lifestyleDetails.egzersizEkNotlar || ''}
                    onChange={(e) => setLifestyleDetails({ ...lifestyleDetails, egzersizEkNotlar: e.target.value })}
                  ></textarea>
                </div>
              </div>
            )}

             {activeLifestyleTab === 'Uyku' && (
              <div>
                {/* Uyku soruları ve inputları buraya gelecek */}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#222' }}>Uyku Alışkanlıkları</h3>

                 {/* Soru 1: Ortalama Uyku Süresi? */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ marginBottom: '0.5rem', color: '#222' }}>Ortalama günlük uyku süreniz ne kadar?</p>
                  <select
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    value={lifestyleDetails.uykuSuresi || ''}
                    onChange={(e) => setLifestyleDetails({ ...lifestyleDetails, uykuSuresi: e.target.value })}
                  >
                    <option value="">Seçiniz</option>
                    <option value="<6">6 saatten az</option>
                    <option value="6-7">6-7 saat</option>
                    <option value="7-8">7-8 saat</option>
                    <option value="8+">8 saatten fazla</option>
                  </select>
                </div>

                 {/* Soru 2: Uyku Kalitesi? */}
                 <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ marginBottom: '0.5rem', color: '#222' }}>Genel olarak uyku kalitenizi nasıl değerlendirirsiniz?</p>
                   <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {['Çok Kötü', 'Kötü', 'Normal', 'İyi', 'Çok İyi'].map((option) => (
                       <label key={option} style={{ marginRight: '1rem' }}>
                         <input
                           type="radio"
                           name="uyku_kalitesi"
                           value={option}
                            checked={lifestyleDetails.uykuKalitesi === option || false}
                            onChange={(e) => setLifestyleDetails({ ...lifestyleDetails, uykuKalitesi: e.target.value })}
                           style={{ marginRight: '0.5rem' }}
                         /> {option}
                       </label>
                     ))}
                  </div>
                </div>

                {/* Ek Notlar */} {/* Textarea */}
                 <div>
                  <p style={{ marginBottom: '0.5rem', color: '#222' }}>Uyku alışkanlıklarınız hakkında ek notlar:</p>
                  <textarea
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white' }}
                    rows="4"
                    placeholder="Ek detayları buraya yazabilirsiniz..."
                     value={lifestyleDetails.uykuEkNotlar || ''}
                    onChange={(e) => setLifestyleDetails({ ...lifestyleDetails, uykuEkNotlar: e.target.value })}
                  ></textarea>
                </div>
              </div>
            )}

             {activeLifestyleTab === 'Stres Yönetimi' && (
              <div>
                {/* Stres Yönetimi soruları ve inputları buraya gelecek */}
                 <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#222' }}>Stres Yönetimi Alışkanlıkları</h3>

                 {/* Soru 1: Stres Seviyesi? */}
                 <div style={{ marginBottom: '1rem' }}>
                  <p style={{ marginBottom: '0.5rem', color: '#222' }}>Genel stres seviyeniz (1:Çok Düşük, 10:Çok Yüksek)?</p>
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '1rem', color: '#666'}}>1</span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      defaultValue="5"
                      className="slider"
                       value={lifestyleDetails.stresSeviyesi || 5} // Default value
                       onChange={(e) => setLifestyleDetails({ ...lifestyleDetails, stresSeviyesi: parseInt(e.target.value) })}
                      style={{flexGrow: 1}}
                    />
                    <span style={{marginLeft: '1rem', color: '#666'}}>10</span>
                  </div>
                   <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666', maxWidth: 'calc(100% - 3rem)', margin: '0 auto'}}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => <span key={num}>{num}</span>)}
                   </div>
                </div>

                {/* Soru 2: Stresle Başa Çıkma Yöntemleri? */} {/* Checkboxes */}
                 <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ marginBottom: '0.5rem', color: '#222' }}>Stresle başa çıkmak için genellikle hangi yöntemleri kullanırsınız?</p>
                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                    {['Egzersiz', 'Meditasyon / Farkındalık', 'Hobi', 'Sosyal Aktiviteler', 'Profesyonel Destek (Terapi vb.)', 'Dinlenme / Uyku', 'Sağlıklı Beslenme', 'Diğer'].map((option) => (
                       <label key={option} style={{ marginRight: '1rem' }}>
                         <input
                           type="checkbox"
                           name="stres_basa_cikma"
                           value={option}
                           checked={lifestyleDetails.stresBasaCikma?.includes(option) || false}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const value = e.target.value;
                              setLifestyleDetails(prevDetails => {
                                const stresArray = prevDetails.stresBasaCikma || [];
                                if (checked) {
                                  return { ...prevDetails, stresBasaCikma: [...stresArray, value] };
                                } else {
                                  return { ...prevDetails, stresBasaCikma: stresArray.filter(item => item !== value) };
                                }
                              });
                            }}
                           style={{ marginRight: '0.5rem' }}
                         /> {option}
                       </label>
                     ))}
                  </div>
                </div>

                {/* Ek Notlar */} {/* Textarea */}
                 <div>
                  <p style={{ marginBottom: '0.5rem', color: '#222' }}>Stres yönetimi alışkanlıklarınız hakkında ek notlar:</p>
                  <textarea
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: 'white' }}
                    rows="4"
                    placeholder="Ek detayları buraya yazabilirsiniz..."
                     value={lifestyleDetails.stresEkNotlar || ''}
                    onChange={(e) => setLifestyleDetails({ ...lifestyleDetails, stresEkNotlar: e.target.value })}
                  ></textarea>
                </div>
              </div>
            )}

          </div>

        </section>
      )}

       {/* Step 4: Suggestions */}
       {currentStep === 4 && (
        <section className="container" style={{ 
          padding: '2rem 0',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#222' }}>Tedavi Önerileri</h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>Semptomlarınız ve yaşam tarzınız değerlendirilerek size özel tedavi önerileri aşağıda listelenmiştir.</p>

          {loading && <p>Öneriler yükleniyor...</p>}
          {error && <p style={{ color: 'red' }}>Hata: {error}</p>}

          {/* Tedavi önerileri buraya gelecek */}
          {suggestions.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 1rem',
            }}>
              {suggestions.map((suggestion, index) => (
                <div key={index} style={{
                  backgroundColor: '#fff', // Beyaz kart arka planı
                  padding: '1.5rem',
                  borderRadius: '8px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #eee', // Kenarlık
                }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#222' }}>{suggestion.name}</h3>
                  {/* Gösterilecek bilgiyi benefits veya how_to_use alanlarından alalım */}
                  {suggestion.benefits && <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>**Faydaları:** {Array.isArray(suggestion.benefits) ? suggestion.benefits.join(', ') : suggestion.benefits}</p>}
                  {suggestion.how_to_use && <p style={{ fontSize: '0.9rem', color: '#666' }}>**Kullanımı:** {suggestion.how_to_use}</p>}

                  {/* Daha fazla detay eklenebilir */}
                </div>
              ))}
            </div>
          ) : (!loading && !error && currentStep === 4) ? (
            <p>Seçtiğiniz semptomlara uygun öneri bulunamadı.</p>
          ) : null}

        </section>
      )}

      {/* Navigation Buttons */}
      <div className="container" style={{ 
        padding: '2rem 0', 
        display: 'flex', 
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          style={{
            padding: '0.8rem 2rem',
            fontSize: '1rem',
            backgroundColor: currentStep === 1 ? '#ccc' : '#f0f0f0', // Farklı renk veya disable stili
            color: currentStep === 1 ? '#666' : '#222',
            border: 'none',
            borderRadius: '5px',
            cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            opacity: currentStep === 1 ? 0.5 : 1, // Disable durumunda opaklık
          }}
        >Geri</button>
        <button
          onClick={handleNext}
          disabled={currentStep === 4} // Assuming 4 steps total
          style={{
            padding: '0.8rem 2rem',
            fontSize: '1rem',
            backgroundColor: currentStep === 4 ? '#ccc' : '#4CAF50', // Farklı renk veya disable stili
            color: currentStep === 4 ? '#666' : 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: currentStep === 4 ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            opacity: currentStep === 4 ? 0.5 : 1, // Disable durumunda opaklık
          }}
        >Devam Et</button>
      </div>
    </>
  );
}

export default SuggestionPage; 