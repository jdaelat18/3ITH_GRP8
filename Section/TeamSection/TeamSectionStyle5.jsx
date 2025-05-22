import React, { useState } from 'react';
import Spacing from '../../Spacing';

export default function TeamSectionStyle5({ data, selectedRegion, onRegionChange, fullData }) {
  const [view, setView] = useState('grid');

  const regions = ['All', 'NCR', 'Visayas', 'Mindanao'];

  const handleFilter = (region) => {
    onRegionChange(region);
  };

  const totalCount = selectedRegion === 'All'
    ? fullData.length
    : fullData.filter(item => item.region === selectedRegion).length;

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
          <div className="cs_view_box_in">
            <button
              type="button"
              className={`cs_grid_view ${view === 'grid' ? 'active' : ''}`}
              onClick={() => setView('grid')}
            ></button>
            <button
              type="button"
              className={`cs_list_view ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
            ></button>
          </div>
        </div>
      </div>
      <Spacing md="65" />
      <div className={`cs_team_grid cs_${view}_view_wrap`}>
        {data.length === 0 && (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <p>No hospitals found.</p>
          </div>
        )}
        {data.map((hospital) => (
          <div key={hospital.hospitalID || hospital.hospName || hospital.title} className="hospital-card-container" style={{
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
            <h3 style={{ marginBottom: 8 }}>{hospital.hospName || hospital.title}</h3>
            <p><strong>City:</strong> {hospital.city}</p>
            <p><strong>Region:</strong> {hospital.region}</p>
          </div>
        ))}
      </div>
      <Spacing md="90" />
    </div>
  );
}
