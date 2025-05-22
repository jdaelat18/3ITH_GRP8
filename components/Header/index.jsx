import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropDown from './DropDown';

export default function Header({ logoSrc, variant }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <header
        className={`cs_site_header cs_style1 cs_sticky_header ${
          mobileToggle ? 'cs_mobile_toggle_active' : ''
        } ${variant} ${isSticky ? 'cs_active_sticky' : ''}`}
      >
        <div className="cs_main_header">
          <div className="container">
            <div className="cs_main_header_in">
              <div className="cs_main_header_left">
                <Link className="cs_site_branding" to="/">
                  <img src={logoSrc} alt="Logo" />
                </Link>
                <nav className="cs_nav">
                  <ul
                    className={`${
                      mobileToggle ? 'cs_nav_list cs_active' : 'cs_nav_list'
                    }`}
                  >
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/appointments">Appointment</Link>
                    </li>
                    <li className="menu-item-has-children">
                    <span
                      style={{
                        marginTop: '38px',
                        display: 'inline-block',
                        color: '#fff',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#0b74d9')}
                      onMouseLeave={(e) => (e.target.style.color = '#fff')}
                    >
                      Coverage
                    </span>
                    <DropDown>
                        <ul>
                          <li>
                            <Link to="/hospitals">Accredited Hospitals</Link>
                          </li>
                          <li>
                            <Link to="/doctors">Accredited Doctors</Link>
                          </li>
                          <li>
                            <Link to="/benefits">Benefits</Link>
                          </li>
                        </ul>
                      </DropDown>
                    </li>
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
  <Link
    to="/dashboard"
    style={{
      display: 'inline-block',
      width: '150px',        // ← fixed width
      height: '50px',        // ← fixed height
      backgroundColor: '#6390b2',
      color: 'white',
      marginTop: '25px',
      borderRadius: '8px',
      padding: '12px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      fontSize: '16px',      // ← text size
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',  // smooth transition on hover
    }}
    onMouseOver={(e) => {
      e.target.style.backgroundColor = '#4f6d8a'; // darkens the button color
      e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';  // darker shadow on hover
    }}
    onMouseOut={(e) => {
      e.target.style.backgroundColor = '#6390b2'; // returns to original color
      e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';  // original shadow
    }}
  >
    A D M I N
  </Link>
</li>

                
                  </ul>
                  <span
                    className={
                      mobileToggle
                        ? 'cs_menu_toggle cs_teggle_active'
                        : 'cs_menu_toggle'
                    }
                    onClick={() => setMobileToggle(!mobileToggle)}
                  >
                    <span></span>
                  </span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
