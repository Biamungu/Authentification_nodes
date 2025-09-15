// Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'books', label: 'Books', icon: '📚' },
    { id: 'members', label: 'Members', icon: '👥' },
    { id: 'transactions', label: 'Transactions', icon: '🔁' },
    { id: 'reports', label: 'Reports', icon: '📈' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Library System</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              <button 
                className={activeSection === item.id ? 'active' : ''}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;