import React from 'react';
import Spacing from '../../Spacing';

export default function TeamSectionStyle2({ data, selectedRegion, onRegionChange, fullData }) {
  const regions = ['All', 'NCR', 'Visayas', 'Mindanao'];

  const handleFilter = (region) => {
    onRegionChange(region);
  };

  const totalCount = selectedRegion === 'All'
    ? fullData.length
    : fullData.filter(item =>
        item.region === selectedRegion || item.category === selectedRegion
      ).length;

  return (
    <div className="container">
      <div className="cs_doctors_heading">
        <div className="cs_isotop_filter cs_style1">
          <p className="mb-0">Sort by</p>
          <ul className="cs_mp0">
            {regions.map(region => (
              <li key={region} className={selectedRegion === region ? 'active' : ''}>
                <span onClick={() => handleFilter(region)}>{region}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="cs_view_box">
          <span>Showing {data.length} of {totalCount} items</span>
        </div>
      </div>
      <Spacing md="65" />
      <div className="cs_team_grid">
        {data.map((doctor) => (
          <div key={doctor.doctorID} className="doctor-card-container" style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            padding: "24px",
            margin: "12px",
            minWidth: "250px",
            maxWidth: "350px",
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}>
            <h3 style={{ marginBottom: 8 }}>Dr. {doctor.name}</h3>
            <p><strong>Hospital:</strong> {doctor.hospital}</p>
            <p><strong>City:</strong> {doctor.city}</p>
            <p><strong>Region:</strong> {doctor.region}</p>
            {doctor.specialty && <p><strong>Specialty:</strong> {doctor.specialty}</p>}
            {doctor.contact && <p><strong>Contact:</strong> {doctor.contact}</p>}
            {doctor.email && <p><strong>Email:</strong> {doctor.email}</p>}
          </div>
        ))}
      </div>
      <Spacing md="90" />
    </div>
  );
}
