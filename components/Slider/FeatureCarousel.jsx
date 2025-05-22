import React, { useRef } from 'react';
import Slider from 'react-slick';
import Spacing from '../Spacing';
import IconBoxStyle10 from '../IconBox/IconBoxStyle10';

export default function FeatureCarousel({ sectionTitle, data }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="container">
      <div className="cs_iconbox_carousel_1 cs_gap_20 position-relative">
        <div className="row">
        <h3 id="Loan Programs" style={{ fontWeight: 600, fontSize: '32px' }}>GSIS Financial & Wellness Programs</h3>
        
        <Spacing md="30"/>
          <div className="col-lg-4">
          <Spacing md="30"/>
          <p style={{ textAlign: 'justify', paddingRight: '50px', color: '#274760', fontSize: '19px', fontWeight: '400' }}>
          GSIS Loan Programs offer members financial assistance through various loan options, including consolidation of multiple loans into one, loans based on life insurance policies, pension loans, emergency loans, and educational loans. These programs come with flexible repayment terms, competitive interest rates, and are designed to meet the diverse financial needs of GSIS members, making it easier to manage and repay loans.
          </p>
            <Spacing md="200" lg="10" xl="150" />
            <Spacing md="30" xl="0" />
          
            <div className="cs_height_0 cs_height_lg_30" />
          </div>
          <div className="col-lg-8">
            <Slider
              ref={sliderRef}
              {...settings}
              className="cs_slider_activate"
            >
              {data?.map((item, index) => (
                <div key={index}>
                  <IconBoxStyle10 {...item} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
