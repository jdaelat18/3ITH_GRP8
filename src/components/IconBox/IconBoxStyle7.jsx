import React from 'react';
import parser from 'html-react-parser';

export default function IconBoxStyle6({ title }) {
  return (
    <div
      className="cs_iconbox cs_style_7"
      style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)' }}
    >
      <h2 className="cs_iconbox_title cs_fs_32">{parser(title)}</h2>
    </div>
  );
}
