// src/hooks/useSummarizationHistory.js

import { useState, useEffect } from 'react';

const HISTORY_KEY = 'summarization_history';

const useSummarizationHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    setHistory(storedHistory);
  }, []);

  const addToHistory = (originalText, summarizedText) => {
    const newEntry = { originalText, summarizedText, timestamp: new Date() };
    const updatedHistory = [newEntry, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return { history, addToHistory, clearHistory };
};

export default useSummarizationHistory;