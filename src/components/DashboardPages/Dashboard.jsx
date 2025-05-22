import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        userName: username,
        password: password,
      });
      if (res.data.success) {
        // Optionally store admin info in localStorage/sessionStorage here
        navigate('/dashboard/Homepage');
      }
    } catch (err) {
      setLoginError('Invalid username or password.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Background with Blur */}
      <div style={styles.background}></div>

      {/* Dark Overlay */}
      <div style={styles.overlay}></div>

      {/* Main Content */}
      <div style={styles.contentWrapper}>
        <div style={styles.loginCard}>
          {/* Back to Home Button with an icon */}
          <Link to="/" style={styles.backButton}>
            <span className="material-icons">arrow_back</span>
          </Link>

          {/* Left Side: Form */}
          <div style={styles.formContainer}>
            <h2 style={styles.heading}>GSIS Employee Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {loginError && (
                <div style={{ color: 'red', marginBottom: '10px' }}>{loginError}</div>
              )}
              <button type="submit" style={styles.button}>Login</button>
            </form>
          </div>

          {/* Right Side: Image */}
          <div style={styles.imageContainer}>
            <img
              src="/images/dashboard/GSIS-logo.png"
              alt="Login Illustration"
              style={styles.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(images/dashboard/bg_login.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(8px)',
    zIndex: -2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: -1,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    zIndex: 1,
    paddingTop: '20px', // Space for the back button
  },
  backButton: {
    color: '#274760',
    position: 'absolute', // Position the button above the form
    top: '45px', // Give it some space from the top
    left: '43px', // Align to the left side
  },
  loginCard: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    width: '950px',
    maxWidth: '95%',
    minHeight: '500px',
    position: 'relative',
  },
  formContainer: {
    flex: 1,
    padding: '50px 40px',
    borderRight: '1px solid #e2e6ea',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#274760',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  heading: {
    marginTop: '30px',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#274760',
    fontSize: '28px',
    fontWeight: '700',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '25px',
  },
  label: {
    fontSize: '15px',
    color: '#333',
    marginBottom: '8px',
    fontWeight: '500',
  },
  input: {
    padding: '14px 16px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '14px',
    backgroundColor: '#274760',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  },
};

export default LoginForm;
