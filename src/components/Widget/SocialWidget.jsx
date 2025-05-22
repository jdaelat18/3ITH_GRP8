import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function SocialWidget() {
  return (
    <div className="cs_social_links_wrap">
      <h2>Follow Us</h2>
      <div className="cs_social_links">
        <Link to="https://www.facebook.com/gsis.ph/">
          <Icon icon="fa-brands:facebook-f" />
        </Link>
        <Link to="https://www.youtube.com/channel/UCkZgdWwfZS7VmZSueXqQirA">
          <Icon icon="fa-brands:youtube" />
        </Link>
        <Link to="https://ph.linkedin.com/company/gsisph">
          <Icon icon="fa-brands:linkedin-in" />
        </Link>
        <Link to="https://www.instagram.com/gsis.ph/">
          <Icon icon="fa-brands:instagram" />
        </Link>
      </div>
    </div>
  );
}
