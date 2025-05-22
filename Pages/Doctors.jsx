import React, { useState, useEffect, useMemo } from 'react';
import BannerSectionStyle5 from '../Section/BannerSection/BannerSectionStyle5';
import TeamSectionStyle2 from '../Section/TeamSection/TeamSectionStyle2';
import Section from '../Section';
import Pagination from '../Pagination';
import axios from 'axios'; // Add this import

const ITEMS_PER_PAGE_DEFAULT = 50;
const ITEMS_PER_PAGE_CATEGORY = 30;

export default function Doctors() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [doctors, setDoctors] = useState([]); // State for fetched doctors

  // Fetch doctors from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors/with-hospital')
      .then(res => setDoctors(res.data))
      .catch(() => setDoctors([]));
  }, []);

  // Reset to page 1 whenever region changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRegion]);

  // Filter doctors by region/category
  const filteredData = useMemo(() => {
    if (selectedRegion === 'All') {
      return doctors;
    } else {
      return doctors.filter(item => item.region === selectedRegion || item.category === selectedRegion);
    }
  }, [selectedRegion, doctors]);

  const itemsPerPage = selectedRegion === 'All' ? ITEMS_PER_PAGE_DEFAULT : ITEMS_PER_PAGE_CATEGORY;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  return (
    <div>
      <BannerSectionStyle5
        bgUrl="/images/doctors/banner_bg.svg"
        imgUrl="/images/doctors/banner_img.png"
        title="Introducing Our Accredited Doctors"
        subTitle="A List of GSIS-Accredited Doctors with Extensive <br />Professional Experience"
      />
      <Section topMd={65} bottomMd={200} bottomLg={150} bottomXl={110}>
        <TeamSectionStyle2
          data={currentItems}
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
          fullData={doctors}
        />
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