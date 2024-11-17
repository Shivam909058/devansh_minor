

export const summarizeText = (text) => {
    if (!text) return '';
  
    
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  
    
    const summaryLength = 3;
    const summarized = sentences.slice(0, summaryLength).join(' ');
  
    return summarized;
  };
