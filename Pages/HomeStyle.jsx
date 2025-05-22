import React from 'react';
import HeroStyle2 from '../Hero/HeroStyle2';
import Section from '../Section';
import AboutSectionStyle3 from '../Section/AboutSection/AboutSectionStyle3';
import WorkingProcess from '../Section/WorkingProcess';
import BannerSectionStyle2 from '../Section/BannerSection/BannerSectionStyle2';
import FaqSectionStyle2 from '../Section/FaqSection/FaqSectionStyle2';


const workingProcessData = [
  {
    title: 'Book an Appointment',
    subTitle:
      'Visit our website and fill out the online appointment form.',
    iconUrl: '/images/home_2/calender.png',
    number: '01',
  },
  {
    title: 'Receive Email Notification',
    subTitle:
      'Once submitted, you will receive an email notifying you whether your appointment was approved or disapproved.',
    iconUrl: '/images/home_2/email.png',
    number: '02',
  },
  {
    title: 'Appointment Approval',
    subTitle:
      'A GSIS worker will review your request. If approved, a Reference Number will be included in the email.',
    iconUrl: '/images/home_2/approved.png',
    number: '03',
  },
  {
    title: 'Visit Healthcare Provider',
    subTitle:
      'Go to the GSIS-accredited hospital or physician on your scheduled date. Present your Reference Number so the hospital staff can confirm your appointment.',
    iconUrl: '/images/home_2/hospital.png',
    number: '04',
  },
  {
    title: 'Insurance and Billing',
    subTitle:
      'Assistance will be provided regarding GSIS insurance coverage and billing information. You will be informed of your benefits and any out-of-pocket costs.',
    iconUrl: '/images/home_2/wallet.png',
    number: '05',
  },
];


const faqData = [
  {
    title: 'What is the GSIS Comprehensive Insurance and Health Empowerment System?',
    content:
      ' The GSIS Comprehensive Insurance and Health Empowerment System is a digital platform designed for government workers in the education sector, providing easy access to GSIS insurance coverage and medical benefits. The platform allows users to schedule appointments with GSIS-accredited physicians and hospitals and receive notifications about the approval or disapproval of their requests.',
  },
  {
    title: 'Who can use the platform?',
    content:
      'The platform is available exclusively to government workers in the education sector who are registered with GSIS. Their family members can also access the healthcare services provided through the system.',
  },
  {
    title: 'How do I register for the platform?',
    content:
      'The platform is open for appointment booking, so no formal registration is required for users to book appointments. However, GSIS workers must log in to review and approve requests.',
  },
  {
    title: 'How will I know if my appointment request was approved?',
    content:
      'After submitting your appointment request, the system will automatically send you an email notification to the address you provided, confirming whether your appointment was approved or disapproved.',
  },
  {
    title: 'Is the platform only for appointment scheduling?',
    content:
      'Yes, the platform is specifically designed for users to schedule appointments with GSIS-accredited physicians and hospitals. It does not include other services outside of appointment management.',
  },
];

export default function HomeStyle() {
  return (
    <>
      <HeroStyle2
        title="Empowering Minds, Enriching Health."
        subTitle="The GSIS Comprehensive Insurance and Health Empowerment System offers easy 
        access to insurance, medical benefits, and appointments, supporting SDG 3 (Good Health and Well-Being) on any device."
        bgUrl="/images/home_2/hero_bg.jpeg"
        videoBtnText="See how we work"
        videoUrl="https://www.youtube.com/embed/GpKE9PAVPWU?si=up99E18LGNxyK3zp"
        btnText="GSIS EduHealth"
        btnUrl="/"
        funfactList={[
          { number: '88', title: 'Years of service' },
          { number: '10+', title: 'Insurance and benefit programs offered' },
          { number: '40%', title: 'Of GSIS members are from education sector' },
          { number: '800,000+', title: 'Education sector members benefiting' },
        ]}
      />
     <Section bottomMd={190} bottomLg={145} bottomXl={105}>
      <AboutSectionStyle3
        titleUp="OUR COMMITMENT"
        title="GSIS EduHealth: Supporting Government and Education Workers"
        subTitle="Through the Employees Compensation Program (ECP), GSIS provides government employees, including those in the education sector, with compensation and benefits for work-related illness, injury, or death. Funded entirely by employer contributions, the program ensures protection and support for our nation's workforce."
        imgUrl="/images/home_2/about.jpeg"
      />
    </Section>

      <Section
        topMd={185}
        topLg={140}
        topXl={50}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <WorkingProcess
          sectionTitle="How it Works"
          sectionTitleUp=""
          sectionTitleDown=""
          sectionSubTitle=""
          data={workingProcessData}
        />
      </Section>


      <Section>
        <BannerSectionStyle2
          bgUrl="/images/home_2/2.png"
          title="Secure Your GSIS Health Appointment Today!"
          subTitle="Our platform is open to the education sector. <br />
          Book now with GSIS-accredited hospitals and receive updates via email."
        />
      </Section>
      

      {/* Start FAQ Section */}
      <Section
        topMd={190}
        topLg={145}
        topXl={105}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <FaqSectionStyle2
          data={faqData}
          sectionTitle="Usually Asked"
          sectionTitleUp="What People"
        />
      </Section>
    </>
  );
}
