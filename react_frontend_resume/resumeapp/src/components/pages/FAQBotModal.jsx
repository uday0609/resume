// src/components/FAQBotModal.js
import { useState } from 'react';
import CategoryScreen from './CategoryScreen';
import FAQScreen from './FAQScreen';

const FAQBotModal = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 80,
        right: 20,
        width: 370,
        height: 520,
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header with title and close */}
      <div
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '14px 18px',
          fontWeight: '700',
          fontSize: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        <span>{selectedCategory ? `${selectedCategory} FAQs` : 'FAQ Bot'}</span>
        <button
          onClick={onClose}
          aria-label="Close FAQ bot"
          title="Close"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: 24,
            fontWeight: '700',
            cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          &times;
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 16,
          backgroundColor: '#fefefe',
        }}
      >
        {selectedCategory ? (
          <FAQScreen
            category={selectedCategory}
            goBack={() => setSelectedCategory(null)}
          />
        ) : (
          <CategoryScreen onSelect={setSelectedCategory} />
        )}
      </div>
    </div>
  );
};

export default FAQBotModal;
