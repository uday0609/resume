import React from 'react';
import { MdLiveHelp } from 'react-icons/md'; // Clean help/FAQ icon

const FloatingButton = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Open FAQ Bot"
    style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      width: '60px',
      height: '60px',
      backgroundColor: '#389ae0', // Blue background
      color: '#ffffff',           // White icon
      border: 'none',
      borderRadius: '50%',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '30px',
      cursor: 'pointer',
      transition: 'transform 0.2s ease-in-out',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.08)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    <MdLiveHelp />
  </button>
);

export default FloatingButton;
