// src/components/FAQScreen.js
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { sampleFaqs, sampleAnswers } from './Faqsampledata';

const FAQScreen = ({ category, goBack }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [answers, setAnswers] = useState({});

  const faqs = sampleFaqs[category] || [];

  const handleClick = (index, faqId) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      const answersArray = sampleAnswers[faqId];
      const randomAnswer =
        answersArray && answersArray.length > 0
          ? answersArray[Math.floor(Math.random() * answersArray.length)]
          : 'Sorry, no answer is available for this question at the moment.';
      setAnswers((prev) => ({ ...prev, [faqId]: randomAnswer }));
      setOpenIndex(index);
    }
  };

  return (
    <div>
      <button
        onClick={goBack}
        style={{
          marginBottom: 14,
          background: 'none',
          border: 'none',
          color: '#007bff',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          paddingLeft: 2,
        }}
        aria-label="Back to categories"
      >
        ← Back to Categories
      </button>

      {faqs.length === 0 ? (
        <p style={{ color: '#777', fontStyle: 'italic' }}>No FAQs found in this category.</p>
      ) : (
        faqs.map((faqId, index) => (
          <div
            key={faqId}
            style={{
              marginBottom: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              borderRadius: 10,
              overflow: 'hidden',
              border: '1.2px solid #ddd',
            }}
          >
            <button
              onClick={() => handleClick(index, faqId)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px',
                backgroundColor: openIndex === index ? '#d9eaff' : 'white',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: 15,
                color: '#003366',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              aria-expanded={openIndex === index}
              aria-controls={`answer-${faqId}`}
            >
              {faqId.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              <span
                style={{
                  fontSize: 18,
                  lineHeight: 1,
                  transform: openIndex === index ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  color: '#007bff',
                }}
              >
                ▶
              </span>
            </button>
            {openIndex === index && (
              <div
                id={`answer-${faqId}`}
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#f5faff',
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: '#333',
                  borderTop: '1px solid #ccc',
                  whiteSpace: 'pre-wrap',
                  userSelect: 'text',
                }}
              >
                <ReactMarkdown>{answers[faqId]}</ReactMarkdown>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default FAQScreen;
