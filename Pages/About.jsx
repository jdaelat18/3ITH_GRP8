import React from 'react';
import BannerSectionStyle3 from '../Section/BannerSection/BannerSectionStyle3';
import Section from '../Section';
import DepartmentSectionStyle2 from '../Section/DepartmentSection/DepartmentSectionStyle2';
import FunFactSection from '../Section/FunFactSection';
import TeamSection from '../Section/TeamSection';
import GallerySection from '../Section/GallerySection';
import Spacing from '../Spacing';


const departmentData = [
  {
    title: 'Health Appointment Booking',
    subTitle:
      'Conveniently book health appointments with trusted hospitals and doctors across the Philippines specifically for the education sector.',
    iconUrl: '/images/icons/calendar_white.svg',
  },
  {
    title: 'Insurance Coverage Overview',
    subTitle:
      'Access and view your health insurance coverage details, including benefits specific to government workers in the education field.',
    iconUrl: '/images/icons/calendar_white.svg',
  },
  {
    title: 'List of Accredited Doctors and Hospitals',
    subTitle:
      'Browse a comprehensive list of doctors and hospitals that are part of the GSIS EduHealth network, tailored for the education sector.',
    iconUrl: '/images/icons/calendar_white.svg',
  },
  {
    title: 'Appointment Status Notifications',
    subTitle:
      'Receive real-time email notifications regarding the approval or disapproval of your health appointment request.',
    iconUrl: '/images/icons/calendar_white.svg',
  },
  {
    title: 'Medical Reimbursement Assistance',
    subTitle:
      'Streamlined support for processing medical reimbursements for eligible treatments, hospitalizations, and health-related services.',
    iconUrl: '/images/icons/calendar_white.svg',
  },
];


const funFactData = [
  { number: '20', title: 'Years of trusted service.' },
  { number: '95%', title: 'Patient satisfaction education sector employees.' },
  { number: '5000+', title: 'Patients served annually' },
  { number: '10+', title: 'Healthcare providers dedicated to the education workforce.' },
  { number: '200+', title: 'Convenient hospital and clinic locations nationwide.' },
];

const teamData = [
  {
    imgUrl: 'images/about/1.png',
    name: 'Geno Andrew Macavinta',
    designation: 'Back-End',
  },
  {
    imgUrl: 'images/about/3.png',
    name: 'Jeffrey Daniel Guevara',
    designation: 'Database',
  },
  {
    imgUrl: 'images/about/2.png',
    name: 'Danica Marie Alano',
    designation: 'Front-End',
  },
];

const galleryData = [
  { imgUrl: '/images/about/portfolio_2_lg.png' },
  { imgUrl: '/images/about/portfolio_3_lg.png' },
  { imgUrl: '/images/about/portfolio_1_lg.png' },
  { imgUrl: '/images/about/portfolio_4_lg.png' },
  { imgUrl: '/images/about/portfolio_5_lg.png' },
];

export default function About() {
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/about/banner_img.png"
        title="Welcome to <br />GSIS EduHealth"
        subTitle=" Your Reliable Partner in Insurance and Healthcare Support."
      />
      <Section topMd={200} topLg={150} topXl={110}>
        <DepartmentSectionStyle2
          sectionTitle="Provides Our Best Services"
          sectionTitleUp="SERVICES"
          data={departmentData}
        />
      </Section>
      <Spacing md="100" />

      <Section>
        <FunFactSection
          bgUrl="images/about/fun_fact_bg.jpeg"
          data={funFactData}
        />
      </Section>
      <Section topMd={190} topLg={145} topXl={105}>
        <TeamSection
          sectionTitle="IT EXPERTS"
          sectionTitleUp="MEET OUR TEAM"
          data={teamData}
        />
      </Section>
      <Section topMd={170} topLg={120} topXl={80}>
        <GallerySection
          sectionTitle="Our Facilities and <br />Latest Activities"
          sectionTitleUp="HAVE A LOOK AT"
          data={galleryData}
        />
      </Section>
      <Spacing md="100" />
    </>
  );
}
