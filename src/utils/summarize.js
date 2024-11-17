// src/utils/summarize.js

export const summarizeText = (text) => {
    if (!text) return '';
  
    // Split text into sentences using regex
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  
    // Determine the number of sentences to extract
    const summaryLength = 3;
    const summarized = sentences.slice(0, summaryLength).join(' ');
  
    return summarized;
  };