import React from 'react';
import SectionHeading from '../../SectionHeading';
import Spacing from '../../Spacing';
import IconBoxStyle8 from '../../IconBox/IconBoxStyle8';

export default function FeaturesSectionStyle3({
  sectionTitle,
  sectionTitleUp,
  data,
}) {
  return (
    <div className="container">
      <SectionHeading title={sectionTitle} titleUp={sectionTitleUp} />
      <Spacing md="72" lg="50" />
      <div className="cs_iconbox_8_wrap cs_radius_30">
        <div
          className="d-flex justify-content-between flex-wrap"
          style={{ gap: '20px' }}
        >
          {data?.map((item, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 calc(20% - 16px)', // Adjust for spacing
                minWidth: '200px',
              }}
            >
              <IconBoxStyle8 {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
