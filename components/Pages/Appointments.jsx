import React from 'react';
import BannerSectionStyle3 from '../Section/BannerSection/BannerSectionStyle3';
import AppointmentWithContactInfoSection from '../Section/AppointmentWithContactInfoSection';
import Section from '../Section';

export default function Appointments() {

  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl="/images/appointments/banner_img.png"
        title="Don’t Let Your Health Take a Backseat!"
        subTitle="Fill out the appointment form below to schedule a consultation with one of our healthcare professionals."
      />
      <Section
        topMd={200}
        topLg={150}
        topXl={110}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <AppointmentWithContactInfoSection />
      </Section>
            <Section
                    topMd={200}
                    topLg={150}
                    topXl={10}
                    bottomMd={200}
                    bottomLg={150}
                    bottomXl={1}
                  >
            </Section>

    </>
  );
}
