import React from 'react';
import MenuWidget from '../Widget/MenuWidget';
import ContactInfoWidget from '../Widget/ContactInfoWidget';
import TextWidget from '../Widget/TextWidget';
import SocialWidget from '../Widget/SocialWidget';

const menuDataOne = [
  { title: 'Insurance', href: '/' },
  { title: 'Accredited Hospitals', href: '/departments' },
  { title: 'Accredited Doctors', href: '/doctors' },
];

const menuDataTwo = [
  { title: 'Home', href: '/' },
  { title: 'About Us', href: '/about' },
  { title: 'Appointment', href: '/appointments' },
];

export default function FooterStyle2() {
  return (
    <footer className="cs_footer cs_style_2 cs_accent_bg cs_white_color">
      <div className="container">
        <div className="cs_footer_in">
          <div className="cs_footer_col">
            <div className="cs_footer_item">
              <TextWidget
                logoUrl="/images/footer_logo_white.svg"
                text=" GSIS EduHealth"
              />
              <ContactInfoWidget />
            </div>
          </div>
          <div className="cs_footer_col">
            <div className="cs_footer_item">
              <MenuWidget data={menuDataOne} />
            </div>
          </div>
          <div className="cs_footer_col">
            <div className="cs_footer_item">
              <MenuWidget data={menuDataTwo} />
            </div>
          </div>
          <div className="cs_footer_col">
            <div className="cs_footer_item">
              <SocialWidget />
            </div>
          </div>
        </div>
      </div>
      <div className="cs_footer_bottom">
        <div className="container">
          <div className="cs_copyright">
            Copyright © 2025 GSIS EduHealth. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
