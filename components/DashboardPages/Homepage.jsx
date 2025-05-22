import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Homepage = () => {
  const [pendingAppointments, setPendingAppointments] = useState(0);
  const [activeDoctors, setActiveDoctors] = useState(0);
  const [partnerHospitals, setPartnerHospitals] = useState(0);

  useEffect(() => {
  axios.get('http://localhost:5000/api/count/appointments')
    .then(res => setPendingAppointments(res.data.count || 0))
    .catch(err => {
      console.log('Appointments count error:', err);
      setPendingAppointments(0);
    });
  axios.get('http://localhost:5000/api/count/doctors')
    .then(res => setActiveDoctors(res.data.count || 0))
    .catch(() => setActiveDoctors(0));
  axios.get('http://localhost:5000/api/count/hospitals')
    .then(res => setPartnerHospitals(res.data.count || 0))
    .catch(() => setPartnerHospitals(0));
}, []);

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>GSIS EduHealth</h2>
        <a href="/dashboard/home" style={{ ...styles.navLink, ...styles.activeLink }}>
          Home
        </a>
        <a href="/dashboard/appointment-requests" style={styles.navLink}>
          Appointments
        </a>
        <a href="/dashboard/add-doctor" style={styles.navLink}>
          Doctors
        </a>
        <a href="/dashboard/add-hospital" style={styles.navLink}>
          Hospitals
        </a>

        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Main Content - Modern Design */}
      <div style={styles.mainContent}>
        <div style={styles.dashboardWrapper}>
          {/* Header Section */}
          <div style={styles.headerSection}>
            <div style={styles.headerContent}>
              <h1 style={styles.heading}>Welcome to GSIS EduHealth</h1>
              <p style={styles.subText}>Your comprehensive healthcare management platform</p>
            </div>
            <div style={styles.adminBadge}>
              <span style={styles.adminBadgeText}>Admin Portal</span>
            </div>
          </div>

          {/* Stats Section */}
          <div style={styles.statsContainer}>
            <div style={styles.statCardBlue}>
              <div style={styles.statIconWrapper}>
                <div style={styles.calendarIcon}>📅</div>
              </div>
              <div>
                <p style={styles.statLabel}>Pending Appointments</p>
                <p style={styles.statNumber}>{pendingAppointments}</p>
              </div>
            </div>
            
            <div style={styles.statCardPurple}>
              <div style={styles.statIconWrapper}>
                <div style={styles.doctorIcon}>👨‍⚕️</div>
              </div>
              <div>
                <p style={styles.statLabel}>Active Doctors</p>
                <p style={styles.statNumber}>{activeDoctors}</p>
              </div>
            </div>
            
            <div style={styles.statCardGreen}>
              <div style={styles.statIconWrapper}>
                <div style={styles.hospitalIcon}>🏥</div>
              </div>
              <div>
                <p style={styles.statLabel}>Partner Hospitals</p>
                <p style={styles.statNumber}>{partnerHospitals}</p>
              </div>
            </div>
          </div>

          {/* Quick Access Section */}
          <h2 style={styles.sectionTitle}>Quick Access</h2>
          <div style={styles.cardContainer}>
            <div style={styles.cardBlue}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Appointments</h3>
                <div style={styles.cardIconBlue}>📅</div>
              </div>
              <p style={styles.cardDesc}>
                Schedule and track healthcare appointments with ease.
              </p>
              <Link to="/dashboard/appointment-requests">
                <button style={styles.cardButtonBlue}>Manage Appointments</button>
              </Link>       
            </div>
            <div style={styles.cardPurple}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Doctors</h3>
                <div style={styles.cardIconPurple}>👨‍⚕️</div>
              </div>
              <p style={styles.cardDesc}>
                View, add, and manage verified healthcare professionals.
              </p>
              <Link to="/dashboard/add-doctor">
                <button style={styles.cardButtonPurple}>Manage Doctors</button>
              </Link>        
            </div>
            <div style={styles.cardGreen}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Hospitals</h3>
                <div style={styles.cardIconGreen}>🏥</div>
              </div>
              <p style={styles.cardDesc}>
                Connect and manage partner hospitals effortlessly.
              </p>
              <Link to="/dashboard/add-hospital">
                <button style={styles.cardButtonGreen}>Manage Hospitals</button>
              </Link>       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#274760',
    color: '#fff',
    padding: '30px 20px',
    position: 'fixed',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  sidebarTitle: {
    fontSize: '26px',
    fontWeight: '600',
    marginBottom: '40px',
    textAlign: 'center',
    color: 'white',
  },
  navLink: {
    display: 'block',
    padding: '12px 16px',
    margin: '10px 0',
    textDecoration: 'none',
    color: '#e2e8f0',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    fontWeight: '500',
  },
  activeLink: {
    backgroundColor: '#1d3345',
    borderLeft: '4px solid #38bdf8',
    color: '#38bdf8',
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: '20px',
    padding: '12px 16px',
    backgroundColor: 'red',
    color: '#e2e8f0',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
  mainContent: {
    marginLeft: '240px',
    padding: '50px 60px',
    flexGrow: 1,
    backgroundColor: '#f8fafc',
  },
  dashboardWrapper: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px'
  },
  headerContent: {
    flex: 1,
    marginTop: '30px',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#0f172a',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: '1.2rem',
    color: '#64748b',
    marginBottom: '0',
  },
  adminBadge: {
    backgroundColor: 'white',
    padding: '12px 20px',
    borderRadius: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  adminBadgeText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '80px 0 20px',
  },
  statsContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-between',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  statCardBlue: {
    background: 'linear-gradient(to right, #3b82f6, #2563eb)',
    padding: '20px 30px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
    textAlign: 'left',
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  },
  statCardPurple: {
    background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
    padding: '20px 30px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
    textAlign: 'left',
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  },
  statCardGreen: {
    background: 'linear-gradient(to right, #10b981, #059669)',
    padding: '20px 30px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
    textAlign: 'left',
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  },
  statIconWrapper: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '10px',
    padding: '12px',
    marginRight: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarIcon: {
    fontSize: '26px',
  },
  doctorIcon: {
    fontSize: '26px',
  },
  hospitalIcon: {
    fontSize: '26px',
  },
  statNumber: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: 'white',
    margin: '5px 0 0',
  },
  statLabel: {
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.9)',
    margin: '0',
  },
  cardContainer: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardBlue: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
    width: '30%',
    borderLeft: '4px solid #3b82f6',
  },
  cardPurple: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
    width: '30%',
    borderLeft: '4px solid #8b5cf6',
  },
  cardGreen: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
    width: '30%',
    borderLeft: '4px solid #10b981',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0',
  },
  cardIconBlue: {
    backgroundColor: '#eff6ff',
    color: '#3b82f6',
    padding: '10px',
    borderRadius: '10px',
    fontSize: '20px',
  },
  cardIconPurple: {
    backgroundColor: '#f5f3ff',
    color: '#8b5cf6',
    padding: '10px',
    borderRadius: '10px',
    fontSize: '20px',
  },
  cardIconGreen: {
    backgroundColor: '#ecfdf5',
    color: '#10b981',
    padding: '10px',
    borderRadius: '10px',
    fontSize: '20px',
  },
  cardDesc: {
    fontSize: '0.95rem',
    color: '#64748b',
    marginBottom: '20px',
  },
  cardButtonBlue: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#eff6ff',
    color: '#3b82f6',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  cardButtonPurple: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#f5f3ff',
    color: '#8b5cf6',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  cardButtonGreen: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#ecfdf5',
    color: '#10b981',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  activitySection: {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
    marginTop: '40px',
  },
  activityHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  viewAllButton: {
    color: '#3b82f6',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
  },
  activityIconBlue: {
    backgroundColor: '#dbeafe',
    color: '#3b82f6',
    padding: '12px',
    borderRadius: '10px',
    marginRight: '15px',
    fontSize: '18px',
  },
  activityIconPurple: {
    backgroundColor: '#ede9fe',
    color: '#8b5cf6',
    padding: '12px',
    borderRadius: '10px',
    marginRight: '15px',
    fontSize: '18px',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 5px',
  },
  activityTime: {
    fontSize: '0.85rem',
    color: '#64748b',
    margin: '0',
  },
  viewButton: {
    color: '#3b82f6',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default Homepage;