import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/appointments';

const AppointmentRequests = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [appointmentsList, setAppointmentsList] = useState([]);

  // Fetch appointments from the database
  const fetchAppointments = () => {
    axios.get(API_URL)
      .then(res => {
        const mapped = res.data.map((appt, idx) => ({
          id: appt.appointID || appt.id || idx + 1,
          fullName: appt.fName || appt.fullName,
          phone: appt.pNum || appt.phone,
          email: appt.email || appt.Email || appt.EMAIL || "",
          partnerNumber: appt.bPNum || appt.partnerNumber,
          date: appt.date,
          time: appt.time,
          reason: appt.reason,
          region: appt.region,
          city: appt.city,
          hospital: appt.hospital,
          doctor: appt.doctor,
          status: appt.status || '',
        }));
        setAppointmentsList(mapped);
      })
      .catch(() => setAppointmentsList([]));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

 const sendEmail = (appointment, status, reason = '') => {
  console.log('DEBUG appointment:', appointment);
  if (!appointment) {
    Swal.fire({
      icon: 'error',
      title: 'Missing Appointment',
      text: 'No appointment data found.',
    });
    return;
  }
  const email =
    appointment.email ||
    appointment.Email ||
    appointment.EMAIL ||
    "";
  if (!email || typeof email !== "string" || !email.trim()) {
    console.error('No email address found for appointment:', appointment);
    Swal.fire({
      icon: 'error',
      title: 'Missing Email',
      text: 'Cannot send email: No email address found for this appointment.',
    });
    return;
  }
  emailjs.send(
    'service_71hvwpt',
    'template_r5ai5cc',
    {
      to_email: email.trim(),
      full_name: appointment.fullName || appointment.fName || "",
      date: appointment.date ? appointment.date.slice(0, 10) : "",
      time: appointment.time,
      doctor: appointment.doctor,
      hospital: appointment.hospital,
      status,
      reason,
    },
    'iXyKv6QhHFn-YcgIR'
  )
  .then(() => {
    console.log('Email sent successfully');
  }).catch((error) => {
    console.error('Email sending failed:', error);
    Swal.fire({
      icon: 'error',
      title: 'EmailJS Error',
      text: error?.text || 'Failed to send email.',
    });
  });
};

  // Accept appointment and update status in DB
  const handleAccept = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: 'Accepted' });
      const appointment = appointmentsList.find((appt) => appt.id === id);
      sendEmail(appointment, 'Accepted');
      Swal.fire({
        icon: 'success',
        title: 'Appointment Accepted',
        text: `Appointment ${id} has been successfully accepted.`,
      });
      fetchAppointments();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to accept appointment.',
      });
    }
  };

  // Open decline modal
  const handleDecline = (id) => {
    setSelectedAppointmentId(id);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDeclineReason('');
  };

  // Decline appointment and update status in DB
  const handleSubmitDecline = async () => {
    try {
      await axios.put(`${API_URL}/${selectedAppointmentId}`, {
        status: 'Declined',
        declineReason,
      });
      const appointment = appointmentsList.find(appt => appt.id === selectedAppointmentId);
      sendEmail(appointment, 'Declined', declineReason);
      Swal.fire({
        icon: 'success',
        title: 'Appointment Declined',
        text: `The reason for the decline: ${declineReason}. The status has been sent to the email address.`,
      });
      setIsModalOpen(false);
      setDeclineReason('');
      fetchAppointments();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to decline appointment.',
      });
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>GSIS EduHealth</h2>
        <Link to="/dashboard/homepage" style={styles.navLink}>Home</Link>
        <Link to="/dashboard/appointment-requests" style={{ ...styles.navLink, ...styles.activeLink }}>Appointments</Link>
        <Link to="/dashboard/add-doctor" style={styles.navLink}>Doctors</Link>
        <Link to="/dashboard/add-hospital" style={styles.navLink}>Hospitals</Link>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>

      <div style={styles.mainContent}>
        <h1 style={styles.title}>Appointment Requests</h1>
        <div style={styles.cardContainer}>
          {appointmentsList
            .filter(appt => !appt.status || appt.status === 'Pending')
            .map((appt) => (
              <div key={appt.id} style={styles.card}>
                <div style={styles.detailsColumns}>
                  <div style={styles.leftColumn}>
                    <p><strong>Full Name:</strong> {appt.fullName}</p>
                    <p><strong>Phone Number:</strong> {appt.phone}</p>
                    <p><strong>Email:</strong> {appt.email || <span style={{color: 'red'}}>No email</span>}</p>
                    <p><strong>BP Number:</strong> {appt.partnerNumber}</p>
                    <p><strong>Preferred Date:</strong> {appt.date ? appt.date.slice(0, 10) : ''}</p>
                    <p><strong>Preferred Time:</strong> {appt.time}</p>
                  </div>
                  <div style={styles.rightColumn}>
                    <p><strong>Reason for Visit:</strong> {appt.reason}</p>
                    <p><strong>Region:</strong> {appt.region}</p>
                    <p><strong>City:</strong> {appt.city}</p>
                    <p><strong>Hospital:</strong> {appt.hospital}</p>
                    <p><strong>Doctor:</strong> {appt.doctor}</p>
                  </div>
                </div>

                <div style={{
                  ...styles.statusContainer,
                  borderColor: appt.status === 'Declined' ? '#dc2626' : appt.status === 'Accepted' ? '#16a34a' : '#ccc',
                }}>
                  <strong>Status:</strong> {appt.status || 'Pending'}
                </div>

                {(!appt.status || appt.status === 'Pending') && (
                  <div style={styles.buttonGroup}>
                    <button style={styles.acceptBtn} onClick={() => handleAccept(appt.id)}>Accept</button>
                    <button style={styles.declineBtn} onClick={() => handleDecline(appt.id)}>Decline</button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Reason for Declination</h2>
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              style={styles.textarea}
              placeholder="Enter reason..."
            />
            <div style={styles.modalButtons}>
              <button style={{ ...styles.modalBtn, ...styles.submitBtn }} onClick={handleSubmitDecline}>Submit</button>
              <button style={{ ...styles.modalBtn, ...styles.cancelBtn }} onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  pageContainer: {
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
  },
  navLink: {
    display: 'block',
    padding: '12px 16px',
    margin: '10px 0',
    textDecoration: 'none',
    color: '#e2e8f0',
    borderRadius: '8px',
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
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  mainContent: {
    marginLeft: '240px',
    padding: '40px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '2rem',
    color: '#0f172a',
    marginBottom: '30px',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  detailsColumns: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '24px',
  },
  leftColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  rightColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
  },
  acceptBtn: {
    backgroundColor: '#16a34a',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontWeight: '500',
    cursor: 'pointer',
    width: '48%',
  },
  declineBtn: {
    backgroundColor: '#dc2626',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontWeight: '500',
    cursor: 'pointer',
    width: '48%',
  },
  modalOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    marginBottom: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
  },
  modalBtn: {
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
  },
  submitBtn: {
    backgroundColor: '#16a34a',
    color: '#fff',
  },
  cancelBtn: {
    backgroundColor: '#dc2626',
    color: '#fff',
  },
  statusContainer: {
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'inline-block',
    border: '2px solid',
  },
};

export default AppointmentRequests;