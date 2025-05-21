const asyncHandler = require('express-async-handler');
const Herb = require('../models/Herb');
const Mixture = require('../models/Mixture');

// @desc    Get suggestions based on symptoms and details
// @route   POST /api/suggestions
// @access  Public
const getSuggestions = asyncHandler(async (req, res) => {
  const { symptoms, symptomDetails, lifestyleDetails } = req.body; // Get data from the request body

  console.log("Received suggestion request with body:", req.body); // Log received data for debugging

  if (!symptoms || symptoms.length === 0) {
    res.status(400);
    throw new Error('Please provide symptoms');
  }

  // Build a query based on symptoms and potentially other details
  // This is a basic example, you'll likely want more sophisticated logic here
  const queryTerms = [...symptoms];

  // Add keywords from symptom details if available
  if (symptomDetails) {
    for (const symptomName in symptomDetails) {
      const details = symptomDetails[symptomName];
      if (details) {
        for (const detailKey in details) {
          const detailValue = details[detailKey];
          if (detailValue) {
            if (Array.isArray(detailValue)) {
              queryTerms.push(...detailValue);
            } else if (typeof detailValue === 'string') {
               queryTerms.push(detailValue);
            } else if (typeof detailValue === 'number') {
               queryTerms.push(detailValue.toString());
            }
          }
        }
      }
    }
  }

  // Add keywords from lifestyle details if available (basic example)
   if (lifestyleDetails) {
     for (const lifestyleKey in lifestyleDetails) {
       const lifestyleValue = lifestyleDetails[lifestyleKey];
       if (lifestyleValue) {
         if (Array.isArray(lifestyleValue)) {
            queryTerms.push(...lifestyleValue);
          } else if (typeof lifestyleValue === 'string') {
             queryTerms.push(lifestyleValue);
           } else if (typeof lifestyleValue === 'number') {
             queryTerms.push(lifestyleValue.toString());
           }
       }
     }
   }

  // Remove duplicates and create case-insensitive regex terms
  const uniqueQueryTerms = [...new Set(queryTerms)].filter(term => term && term.length > 1);
  const regexQuery = uniqueQueryTerms.map(term => new RegExp(term, 'i')); // Case-insensitive regex search

   console.log("Searching with query terms:", uniqueQueryTerms);

  // Find herbs and mixtures matching the query terms in their benefits or how_to_use fields
  const herbs = await Herb.find({
    $or: [
      { benefits: { $in: regexQuery } },
      { how_to_use: { $in: regexQuery } },
    ],
  });

  const mixtures = await Mixture.find({
    $or: [
      { benefits: { $in: regexQuery } },
      { how_to_use: { $in: regexQuery } },
    ],
  });

  // Combine results (you might want to add scoring or ranking later)
  const suggestions = [...herbs, ...mixtures];

  res.status(200).json(suggestions);
});

// @desc Get personalized treatment suggestions
// @route POST /api/suggestions
// @access Public (or Private, depending on authentication plan)
const getPersonalizedSuggestions = asyncHandler(async (req, res) => {
  // TODO: Implement actual suggestion logic based on symptoms and other data

  console.log("Received suggestion request with body:", req.body);

  // For now, return a dummy response to test the frontend connection
  const dummySuggestions = [
    {
      name: "Örnek Bitki Çayı",
      benefits: ["Sakinleştirici etki", "Sindirim desteği"],
      how_to_use: "Günde 2 fincan içilebilir."
    },
    {
      name: "Örnek Egzersiz",
      benefits: ["Stresi azaltır", "Enerjiyi artırır"],
      how_to_use: "Haftada 3 gün 30 dakika yürüyüş."
    }
  ];

  res.status(200).json(dummySuggestions);
});

module.exports = { getSuggestions, getPersonalizedSuggestions }; 