import React, { useState, useEffect } from 'react';
import BannerSectionStyle5 from '../Section/BannerSection/BannerSectionStyle5';
import Section from '../Section';
import DepartmentSectionStyle3 from '../Section/DepartmentSection/DepartmentSectionStyle3';
import TeamSectionStyle5 from '../Section/TeamSection/TeamSectionStyle5';
import Pagination from '../Pagination';
import axios from 'axios';

export default function Hospitals() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [hospitals, setHospitals] = useState([]);

  // Fetch hospitals from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/hospitals/with-doctors')
      .then(res => setHospitals(res.data))
      .catch(() => setHospitals([]));
  }, []);

  // Reset to page 1 whenever region changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRegion]);

  const itemsPerPage = selectedRegion === 'All' ? 30 : 21;

  const filteredData = selectedRegion === 'All'
    ? hospitals
    : hospitals.filter(item => item.region === selectedRegion);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <BannerSectionStyle5
        bgUrl="/images/departments/banner_bg.svg"
        imgUrl="/images/departments/banner_img.png"
        title="GSIS EduHealth:<br>Accredited Hospitals and Clinics"
        subTitle="Our network of accredited hospitals provides exceptional healthcare services. Dedicated professionals ensure you receive expert care and attention for all your medical needs."
      />
      <Section topMd={65} bottomMd={200} bottomLg={150} bottomXl={110}>
        <TeamSectionStyle5
          data={currentItems}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          fullData={hospitals}
        />
      </Section>
      <Section>
        <DepartmentSectionStyle3 data={currentItems} />
      </Section>
      <Section>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Section>
    </div>
  );
}