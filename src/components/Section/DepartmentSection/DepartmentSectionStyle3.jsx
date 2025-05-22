import React from 'react';

export default function DepartmentSectionStyle3({ data }) {
  return (
    <div className="container cs_mt_minus_110">
      <div className="row justify-content-end">
        {data?.map((item, index) => (
          <div className="col-xl-4 col-md-6" key={index}>
            <div style={{ marginTop: index < 3 ? '80px' : '0px' }}>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
