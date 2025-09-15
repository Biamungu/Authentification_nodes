import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  
  // Sample data for demonstration
  const libraryStats = {
    totalBooks: 1245,
    availableBooks: 876,
    borrowedBooks: 369,
    totalMembers: 342,
    overdueBooks: 28
  };

  const recentActivities = [
    { id: 1, action: 'Book Returned', book: 'The Great Gatsby', member: 'John Doe', time: '2 hours ago' },
    { id: 2, action: 'New Book Added', book: 'React Programming', member: 'Admin', time: '5 hours ago' },
    { id: 3, action: 'Book Borrowed', book: 'Python Basics', member: 'Sarah Smith', time: 'Yesterday' },
    { id: 4, action: 'Member Registered', book: '-', member: 'Michael Brown', time: '2 days ago' }
  ];

  const popularBooks = [
    { id: 1, title: 'JavaScript Essentials', author: 'David Flanagan', borrowCount: 42 },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', borrowCount: 38 },
    { id: 3, title: 'Design Patterns', author: 'Erich Gamma', borrowCount: 35 },
    { id: 4, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', borrowCount: 31 }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Library Management System</h1>
          <div className="user-info">
            <span>Welcome, Librarian</span>
            <div className="user-avatar">L</div>
          </div>
        </header>

        <div className="dashboard-main">
          {activeSection === 'overview' && (
            <div className="overview-section">
              <h2>Library Overview</h2>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon books-icon">📚</div>
                  <div className="stat-info">
                    <h3>{libraryStats.totalBooks}</h3>
                    <p>Total Books</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon available-icon">✅</div>
                  <div className="stat-info">
                    <h3>{libraryStats.availableBooks}</h3>
                    <p>Available Books</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon borrowed-icon">🔖</div>
                  <div className="stat-info">
                    <h3>{libraryStats.borrowedBooks}</h3>
                    <p>Borrowed Books</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon members-icon">👥</div>
                  <div className="stat-info">
                    <h3>{libraryStats.totalMembers}</h3>
                    <p>Total Members</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon overdue-icon">⏰</div>
                  <div className="stat-info">
                    <h3>{libraryStats.overdueBooks}</h3>
                    <p>Overdue Books</p>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-row">
                <div className="recent-activities">
                  <h3>Recent Activities</h3>
                  <div className="activities-list">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-details">
                          <span className="activity-action">{activity.action}</span>
                          <span className="activity-book">{activity.book}</span>
                          <span className="activity-member">by {activity.member}</span>
                        </div>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="popular-books">
                  <h3>Popular Books</h3>
                  <div className="books-list">
                    {popularBooks.map(book => (
                      <div key={book.id} className="book-item">
                        <div className="book-info">
                          <h4>{book.title}</h4>
                          <p>{book.author}</p>
                        </div>
                        <div className="borrow-count">
                          <span>{book.borrowCount} borrows</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'books' && (
            <div className="books-section">
              <h2>Book Management</h2>
              <p>Here you can manage all books in the library.</p>
              {/* Book management components would go here */}
            </div>
          )}
          
          {activeSection === 'members' && (
            <div className="members-section">
              <h2>Member Management</h2>
              <p>Here you can manage library members.</p>
              {/* Member management components would go here */}
            </div>
          )}
          
          {activeSection === 'transactions' && (
            <div className="transactions-section">
              <h2>Transaction History</h2>
              <p>View and manage all book transactions.</p>
              {/* Transaction components would go here */}
            </div>
          )}
          
          {activeSection === 'reports' && (
            <div className="reports-section">
              <h2>Reports & Analytics</h2>
              <p>Generate library reports and view analytics.</p>
              {/* Report components would go here */}
            </div>
          )}
        </div>
        
        <footer className="dashboard-footer">
          <p>© 2023 Library Management System. All rights reserved.</p>
          <a href='/'>Log Out</a>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;