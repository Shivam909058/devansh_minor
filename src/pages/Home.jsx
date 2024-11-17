// src/pages/Home.jsx

import React, { useState } from 'react';
import { summarizeText } from '../utils/summarize';
import useSummarizationHistory from '../hooks/useSummarizationHistory';

const Home = () => {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const { history, addToHistory, clearHistory } = useSummarizationHistory();

  const handleSummarize = () => {
    if (input.trim()) {
      setLoading(true);
      // Simulate processing time
      setTimeout(() => {
        const summarized = summarizeText(input);
        setSummary(summarized);
        addToHistory(input, summarized);
        setInput('');
        setLoading(false);
      }, 500); // Adjust the timeout as needed
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* History column */}
      <div style={{ width: '25%', backgroundColor: '#fac650', padding: '20px', overflowY: 'auto' }}>
        <h3 className="text-center text-xl">History</h3>
        {history.length === 0 ? (
          <p className="text-center pb-4">No summaries yet.</p>
        ) : (
          <ul>
            {history.map((item, index) => (
              <li key={index} style={{ marginBottom: '15px' }}>
                <strong>Original:</strong>
                <p>{item.originalText}</p>
                <strong>Summary:</strong>
                <p>{item.summarizedText}</p>
                <small>{new Date(item.timestamp).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={clearHistory}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            borderRadius: '8px',
            backgroundColor: '#e53e3e',
            color: '#fff',
            border: 'none',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#c53030')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#e53e3e')}
        >
          Clear History
        </button>
      </div>

      {/* Input and Summary area */}
      <div style={{ flex: 1, padding: '40px', position: 'relative' }}>
        <h1
          className="text-white opacity-75 uppercase tracking-wider text-center leading-tight"
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            fontSize: '48px',
            color: '#fff',
          }}
        >
          Text Summarizer
        </h1>
        <div style={{ maxWidth: '600px', margin: '100px auto' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here..."
            style={{
              width: '100%',
              height: '150px',
              padding: '15px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #fac650',
              resize: 'vertical',
            }}
          />
          <button
            onClick={handleSummarize}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '8px',
              backgroundColor: '#fac650',
              color: '#000',
              border: 'none',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#e0a800')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#fac650')}
            disabled={loading}
          >
            {loading ? 'Summarizing...' : 'Submit'}
          </button>

          {summary && (
            <div
              className="mt-6 p-4 bg-gray-800 rounded-lg"
              style={{
                marginTop: '30px',
                backgroundColor: '#1f2937',
                padding: '20px',
                borderRadius: '8px',
                color: '#fff',
              }}
            >
              <h3 className="text-xl mb-2">Summary:</h3>
              <p>{summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;