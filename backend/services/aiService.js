const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class AIService {
  static async generateSuggestions(symptoms, symptomDetails, lifestyleDetails) {
    try {
      // Prepare the prompt for the AI
      const prompt = this.preparePrompt(symptoms, symptomDetails, lifestyleDetails);
      
      // Call OpenAI API
      const completion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Sen bir alternatif tıp uzmanısın. Kullanıcının semptomlarına ve yaşam tarzına göre doğal tedavi önerileri sunuyorsun. Önerilerin bilimsel temelli ve güvenli olmalı."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      // Parse and structure the AI response
      const suggestions = this.parseAIResponse(completion.data.choices[0].message.content);
      return suggestions;

    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Öneriler oluşturulurken bir hata oluştu.');
    }
  }

  static preparePrompt(symptoms, symptomDetails, lifestyleDetails) {
    let prompt = `Kullanıcının semptomları ve detayları:\n`;
    
    // Add symptoms and their details
    symptoms.forEach(symptom => {
      prompt += `\n${symptom}:\n`;
      const details = symptomDetails[symptom];
      if (details) {
        Object.entries(details).forEach(([key, value]) => {
          prompt += `- ${key}: ${value}\n`;
        });
      }
    });

    // Add lifestyle details
    prompt += `\nYaşam Tarzı Detayları:\n`;
    Object.entries(lifestyleDetails).forEach(([key, value]) => {
      prompt += `- ${key}: ${value}\n`;
    });

    prompt += `\nLütfen bu bilgilere dayanarak aşağıdaki kategorilerde öneriler sun:\n`;
    prompt += `1. Doğal Tedavi Yöntemleri\n`;
    prompt += `2. Beslenme Önerileri\n`;
    prompt += `3. Yaşam Tarzı Değişiklikleri\n`;
    prompt += `4. Takviyeler\n`;
    prompt += `5. Önlemler ve Uyarılar\n`;

    return prompt;
  }

  static parseAIResponse(response) {
    try {
      // Split the response into sections
      const sections = response.split('\n\n');
      
      const suggestions = {
        naturalTreatments: [],
        nutritionAdvice: [],
        lifestyleChanges: [],
        supplements: [],
        precautions: []
      };

      let currentSection = '';
      
      sections.forEach(section => {
        if (section.includes('Doğal Tedavi Yöntemleri')) {
          currentSection = 'naturalTreatments';
        } else if (section.includes('Beslenme Önerileri')) {
          currentSection = 'nutritionAdvice';
        } else if (section.includes('Yaşam Tarzı Değişiklikleri')) {
          currentSection = 'lifestyleChanges';
        } else if (section.includes('Takviyeler')) {
          currentSection = 'supplements';
        } else if (section.includes('Önlemler ve Uyarılar')) {
          currentSection = 'precautions';
        } else if (currentSection && section.trim()) {
          suggestions[currentSection].push(section.trim());
        }
      });

      return suggestions;
    } catch (error) {
      console.error('Error parsing AI response:', error);
      throw new Error('AI yanıtı işlenirken bir hata oluştu.');
    }
  }
}

module.exports = AIService; 