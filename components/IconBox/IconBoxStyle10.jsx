import React from 'react';

export default function IconBoxStyle10({ title, subTitle }) {
  return (
<div
  className="cs_iconbox cs_style_10 cs_radius_20 cs_white_bg text-center"
  style={{ marginTop: '-40px' }}
>
      <h3 className="cs_iconbox_title">{title}</h3>
      <p className="cs_iconbox_subtitle mb-0" style={{ textAlign: 'justify', color: '#274760' }}>
{subTitle}</p>
    </div>
  );
}
