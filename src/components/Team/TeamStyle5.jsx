import React from 'react';

export default function TeamStyle5({ title, place }) {
  return (
    <div
      className="cs_team cs_style_5 text-center cs_radius_20 overflow-hidden"
      style={{
        border: '1px solid #ddd',
        borderRadius: '20px',
        padding: '10px 20px 1px 20px',
        backgroundColor: '#fff',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
        minHeight: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = '#e6f4ff';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = '#fff';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div className="cs_team_meta">
        <h3 className="cs_member_name cs_fs_24" style={{ marginBottom: '10px' }}>{title}</h3>
        <p className="cs_member_designation cs_heading_color cs_medium">{place}</p>
      </div>
    </div>
  );
}
