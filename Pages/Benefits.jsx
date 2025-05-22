import React from 'react';
import Section from '../Section';
import Breadcrumb from '../Breadcrumb';
import Spacing from '../Spacing';
import Post from '../Post';
import FeaturesSectionStyle4 from '../Section/FeaturesSection/FeaturesSectionStyle4';
import FeaturesSectionStyle3 from '../Section/FeaturesSection/FeaturesSectionStyle3';


const tags = [
  { tag: 'Social Insurance', href: '#Social Insurance' },
  { tag: 'Loan Programs', href: '#Loan Programs' },
  { tag: 'Retirement Programs ', href: '#Retirement Programs' },
  { tag: 'Pension Fund Administration', href: '#Pension Administration' },
  { tag: 'GSIS Financial & Wellness Programs', href: '#Financial and Wellness' },
];
const relatedBlog = [
  {
    title:
      'Republic Act No. 8291 (GSIS Act of 1997):',
    thumbUrl: '/images/blog/post_1.png',
    description: 'Provides a comprehensive package of retirement, disability, survivorship, and life insurance benefits to government employees. Eligibility and benefits depend on the member’s age, length of service, and contributions to the GSIS.',
  },
  {
    title: `Republic Act No. 660: `,
    thumbUrl: '/images/blog/post_2.png',
    description: 'Applies to government employees who served before 1977. It offers a pension-based system for those who meet the minimum service and age requirements and includes provisions for those not previously covered by GSIS, ensuring they receive appropriate benefits.',
  },
  {
    title: 'Republic Act No. 1616:',
    thumbUrl: '/images/blog/post_3.png',
    description: 'Covers employees who retired before 1977 and were not GSIS members. It provides a choice between a lump sum or monthly pension, depending on years of service, ensuring they still receive retirement support despite their early exit from government service.',

  },
];

const featureListData = [
  {
    title: 'Financial Literacy Programs',
    subTitle:
      'These are educational initiatives designed to help members manage finances. Topics include budgeting, saving, investing, and planning for retirement, enabling members to make informed decisions about their future.',
  },
  {
    title: 'Wellness Initiatives',
    subTitle:
      'GSIS promotes holistic well-being through programs that support both physical and mental health. This may include access to medical check-ups, mental health support, fitness campaigns, and seminars on stress management and healthy living.',
  },
];

const featureData = [
  {
    title: 'Social Insurance Benefits',
    subTitle:
      'Provides education sector with protection like life, disability, and retirement benefits.',
    iconUrl: '/images/departments/1.svg',
  },
  {
    title: 'Loan Assistance Programs',
    subTitle:
      ' Financial support through various loans, including emergency and educational.',
    iconUrl: '/images/departments/2.svg',
  },
  {
    title: 'Retirement Assistance Programs',
    subTitle:
      'Retirement benefits based on service years, laws, and employee contributions.',
    iconUrl: '/images/departments/3.svg',
  },
  {
    title: 'Pension Fund Administration',
    subTitle:
      'Management of pension funds for education employees, ensuring security after retirement.',
    iconUrl: '/images/departments/4.svg',
  },
  {
    title: 'GSIS Financial & Wellness Assistance',
    subTitle:
      'Support for health, wellness, financial needs, and overall employee well-being.',
    iconUrl: '/images/departments/5.svg',
  },
];


export default function BlogDetails() {
  return (
    <div style={{ backgroundColor: '#abc2d2' }}>
      <Section topMd={170} bottomMd={54} bottomLg={54}>
        <Breadcrumb title="EduHealth Benefits" />
      </Section>

      <div className="container">
        <div className="cs_blog_details_info">
          <div className="cs_blog_details_info_left">
            <div className="cs_blog_details_tags mb-4">
              {tags.map((item, index) => (
                <a key={index} href={item.href}>
                  {item.tag}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Spacing md="55" />
        <img
          src="/images/blog/blog_details_1.png"
          alt="Blog Details"
          className="w-100 cs_radius_20"
        />

        <Section topMd={150} topLg={145} topXl={100}>
        <FeaturesSectionStyle3
          sectionTitle="Government Financial And Insurance Services"
          sectionTitleUp="OVERVIEW OF"
          data={featureData}
        />
      </Section>

      <Spacing md="100" />
        <div className="row" style={{ textAlign: 'justify' }}>
          <div className="col-lg-12">
            <div className="cs_blog_details">
            <h2 id="Pension Administration">Pension Fund Administration</h2>
              <p>
              GSIS is responsible for managing the pension funds of government employees to ensure financial stability and support during their retirement years. This involves careful planning, responsible fund allocation, and efficient delivery of benefits to secure the future of its members. Key responsibilities include:               
              </p>

              <ol>
                <li>
                  <b>Investment Management:</b>
                  <br />
                  This benefit provides financial assistance to the family of the member in case of death. The amount can either be in the form of a lump sum payment or a monthly pension, depending on the member’s service and salary history. This ensures that the member’s beneficiaries are financially supported in their time of loss.

                </li>
                <li>
                <b>Benefit Payments:</b>
                  <br />
                  GSIS ensures the timely and accurate release of monthly pension payments to retired members or their designated beneficiaries. This also includes other retirement-related benefits, such as survivorship and disability payouts.
                </li>
              </ol>
          </div>
        </div>
      </div>


      <Spacing md="100"/>
        <div className="row" style={{ textAlign: 'justify' }}>
          <div className="col-lg-12">
              <div className="cs_blog_details">
                  <h2 id="Retirement Programs">Retirement Programs</h2>
                  <p>
                  These laws serve as the foundation for GSIS in granting retirement benefits to government employees, ensuring that qualified members receive pensions, lump sum payments, or other forms of financial support depending on their service length, age, and retirement status. GSIS offers various retirement options under the following laws:             
                  </p>
            </div>
          </div>
        </div>

        <Spacing md="57" />
        <div className="row cs_gap_y_40">
          {relatedBlog?.map((item, index) => (
            <div className="col-xl-4 col-md-6" key={index}>
              <Post {...item} />
            </div>
          ))}
        </div>


      <Spacing md="100" />
        <div className="row" style={{ textAlign: 'justify' }}>
          <div className="col-lg-12">
            <div className="cs_blog_details">
            <h2 id="Social Insurance">GSIS Benefits for the Education Sector</h2>
              <p>
              These are the core insurance and protection benefits that GSIS members
              from the education sector are entitled to during and after government 
              service. There are several core insurance and protection benefits available to 
              GSIS members from the education sector, including:               
              </p>

              <ol>
                <li>
                  <b>Life Insurance:</b>
                  <br />
                  GSIS provides life insurance to all its members, including 
                  those in the education sector. This is a compulsory benefit, 
                  ensuring financial protection for the family of a member in 
                  the event of their death. The amount of coverage is based on 
                  the member’s salary and years of service, and it includes:
                  <ul style={{ listStyleType: 'none', paddingLeft: '50px', marginTop: '20px', marginBottom: '50px', textAlign: 'justify' }}>
                    <li style={{ marginBottom: '5px' }}>• <b>Death Benefits:</b> This benefit provides financial assistance to the family of the member in case of death. The amount can either be in the form of a lump sum payment or a monthly pension, depending on the member’s service and salary history. This ensures that the member’s beneficiaries are financially supported in their time of loss.</li>
                    <li style={{ marginBottom: '5px' }}>• <b>Funeral Assistance:</b> This benefit offers a one-time payment to help cover the funeral expenses of the member. It aims to ease the financial burden of the family during a difficult time by assisting with the costs of funeral services and related expenses.</li>
                  </ul>
                </li>

              
                <li>
                <b>Retirement Benefits:</b>
                  <br />
                  GSIS provides different retirement benefits tailored to the 
                  length and type of service of its members. For employees in 
                  the education sector, the retirement options are based on their 
                  specific service records under different laws. The available 
                  retirement programs include:
                  <ul style={{ listStyleType: 'none', paddingLeft: '50px', marginTop: '20px', marginBottom: '50px' }}>
                    <li style={{ marginBottom: '5px' }}>• <b>Republic Act No. 8291 (GSIS Act of 1997):</b> This is the retirement plan for government employees who have served under the modern GSIS system. Employees who are covered by this law are eligible for monthly pension benefits after retirement, based on the length of their service and salary. For those who do not qualify for a pension, a lump-sum benefit may be provided.</li>
                    <li style={{ marginBottom: '5px' }}>• <b>Republic Act No. 660:</b> This applies to employees who served in government before 1977. It offers a different set of benefits from RA 8291. Employees under this act can still receive retirement benefits, but the terms and eligibility might differ. The benefits could include a pension or a lump sum, depending on the employee’s length of service and other factors.For those who were employed before 1977, which provi</li>
                    <li style={{ marginBottom: '5px' }}>• <b>Republic Act No. 1616:</b> This retirement option applies to those who were separated from government service before 1977. The benefits under this act are distinct, and employees covered by this law may have different eligibility criteria and benefit structures. Similar to the other options, it provides either a monthly pension or a lump-sum payment based on the employee's years of service.</li>
                  </ul>
                </li>



                <li>
                  <b>Separation Benefits:</b>
                  <br />
                  Separation benefits are given to GSIS members who leave government 
                  service, either voluntarily or due to reasons like redundancy or 
                  position abolition. They include separation pay based on the member’s 
                  years of service and salary. If the member meets the required service 
                  years, they can also choose to convert their separation benefits into 
                  retirement benefits. These benefits includes:
                  <ul style={{ listStyleType: 'none', paddingLeft: '50px', marginTop: '20px', marginBottom: '50px' }}>
                    <li style={{ marginBottom: '5px' }}>• <b>Separation pay:</b> This is the cash benefit given to members who leave government service. The amount depends on how many years the employee has worked and how much their monthly salary is. The longer the service and the higher the salary, the bigger the separation pay they can receive.</li>
                    <li style={{ marginBottom: '5px' }}>• <b>Retirement option:</b> If the employee who is separated from service has already worked the required number of years, they have the option to turn their separation benefits into retirement benefits. This means they may receive monthly pension or a lump sum, just like a regular retiree.</li>
                  </ul>
                </li>



                <li>
                  <b>Disability Benefits:</b>
                  <br />
                  Disability benefits are given to GSIS members who can no longer perform 
                  their duties at work due to a permanent disability. This disability may 
                  be the result of a serious illness, accident, or injury that prevents the 
                  member from continuing their government service. These benefits are intended 
                  to provide financial support during a time when the member is no longer able 
                  to earn a regular income. The support may include:
                  <ul style={{ listStyleType: 'none', paddingLeft: '50px', marginTop: '20px', marginBottom: '50px' }}>
                    <li style={{ marginBottom: '5px' }}>• <b>Disability Pension:</b> This is a monthly financial allowance given to members who have become permanently disabled and can no longer work. The amount they receive depends on how serious or severe the disability is. Members with a higher degree of disability may receive a higher pension to help meet their daily needs and medical expenses.</li>
                    <li style={{ marginBottom: '5px' }}>• <b>Lump Sum:</b> If the member does not meet the requirements for a monthly disability pension—such as lacking the minimum number of service years—they may instead receive a one-time payment. This lump sum is calculated based on the number of years they have served in government. It helps provide some financial relief even if they are not eligible for a monthly pension.</li>
                  </ul>
                </li>


                <li>
                  <b>Survivorship Benefits:</b> <br />
                  In the event of a member’s death, GSIS provides financial assistance to the 
                  family left behind. The surviving spouse and any dependent children are entitled 
                  to receive survivorship benefits. These benefits help ease the financial burden 
                  after the loss of a loved one who was previously earning for the household. The 
                  support may include:
                  <ul style={{ listStyleType: 'none', paddingLeft: '50px', marginTop: '20px', marginBottom: '50px' }}>
                    <li style={{ marginBottom: '5px' }}>• <b>Monthly Survivorship Pension:</b> This is a regular monthly allowance given to the surviving spouse and/or dependent children of the deceased member. The pension continues until the spouse passes away or remarries. For children, it is given until they reach the legal age or complete their education, whichever comes first. This monthly pension ensures that the family can still meet their basic needs even after the member’s passing.</li>
                    <li style={{ marginBottom: '5px' }}>• <b>Lump Sum:</b> If the member does not meet the full requirements for a monthly pension, the beneficiaries may instead receive a one-time payment. This lump sum amount is based on the number of years the deceased member worked in government and the salary they were receiving. It serves as financial support to help cover immediate expenses after the loss.</li>
                  </ul>

                </li>
              </ol>
              
              <blockquote
                style={{
                  backgroundImage: 'url("/images/blog/blog_details_2.png")',
                }}
              >
                <p>
                GSIS loan programs provide financial support through flexible 
                repayment options, competitive interest rates, and various 
                loan choices to meet members' needs.                
                </p>
              </blockquote>



              <h2 id="Loan Programs">GSIS Loan Programs</h2>
              <p>
              GSIS Loan Programs offer members financial assistance through various loan options, including consolidation of multiple loans into one, loans based on life insurance policies, pension loans, emergency loans, and educational loans. These programs come with flexible repayment terms, competitive interest rates, and are designed to meet the diverse financial needs of GSIS members, making it easier to manage and repay loans.
              </p>
              <ol>
                <li>
                    <b>Consolidated Loan (Conso-Loan)</b> <br />
                    The Conso-Loan program is designed to help GSIS members manage multiple loans more effectively by consolidating them into a single loan. This means that instead of keeping track of several separate loan payments, members only need to make one monthly payment, which simplifies the process and reduces the burden of managing different due dates and amounts. This program is particularly helpful for members who have multiple GSIS loans, allowing them to combine their balances into one manageable sum.The benefits of the Conso-Loan include:
                    <ul style={{ listStyleType: 'none', paddingLeft: '50px', marginTop: '20px', marginBottom: '50px' }}>
                      <li style={{ marginBottom: '5px' }}>• <b>Fixed Interest Rates:</b> The loan comes with a competitive and fixed interest rate, which means that the interest rate will remain the same throughout the life of the loan. This makes it easier for members to plan their finances, as they won’t have to worry about fluctuating rates that could increase their monthly payments unexpectedly. The rates are set to be affordable, ensuring that members can repay the loan without excessive financial strain.</li>
                      <li style={{ marginBottom: '5px' }}>• <b>Flexible Repayment Terms:</b> One of the main advantages of the Conso-Loan is the flexibility it offers in repayment terms. Members have the option to extend the repayment period, which reduces the amount of each monthly payment. This is particularly useful for members who need a longer period to pay off their loan due to financial challenges or other personal circumstances. The ability to adjust the payment period helps make the loan more manageable, offering members a sense of financial security and relief.</li>
                    </ul>
                </li>

                <li>
                    <b>Policy Loan</b> <br />
                    The Policy Loan is a financial option for GSIS members who wish to borrow money using the cash value of their life insurance policy. This loan allows you to access funds without the need to go through the typical loan application process, providing a quicker and more convenient solution to your financial needs.
                    <ul style={{ listStyleType: 'none', paddingLeft: '50px', marginTop: '20px', marginBottom: '50px' }}>
                      <li style={{ marginBottom: '5px' }}>• <b>Loan Amount:</b> The loan amount is determined by the cash value of your life insurance policy, meaning that the more valuable your policy is, the more you can borrow. The cash value increases over time, so members can benefit from accessing these funds as needed.</li>
                      <li style={{ marginBottom: '5px' }}>• <b>No Credit Check Required:</b> Unlike traditional loans that require extensive documentation and credit evaluations, the Policy Loan only requires you to submit your policy details. This makes it a simple and hassle-free way for members to obtain financial support without the stress of complicated approval processes.</li>
                    </ul>
                </li>

                <li>
                    <b>Pension Loan</b> <br />
                    The Pension Loan is a special loan available to retired GSIS members. It allows retirees to borrow funds based on their monthly pension, providing a source of financial support after retirement. This loan helps retirees cover any expenses that may arise, including healthcare costs or unexpected bills.
                    <ul style={{ listStyleType: 'none', paddingLeft: '50px', marginTop: '20px', marginBottom: '50px' }}>
                      <li style={{ marginBottom: '5px' }}>• <b>Loan Limit:</b> Retired members are eligible to borrow up to six months' worth of their monthly pension. This gives retirees access to a considerable amount of funds, depending on the size of their pension.</li>
                      <li style={{ marginBottom: '5px' }}>• <b>Repayment Terms:</b> The loan is repaid through automatic deductions from the member’s monthly pension, making the repayment process easy and convenient. Since the payments are deducted directly from the pension, retirees don’t have to worry about missing a payment.</li>
                    </ul>
                </li>

                <li>
                    <b>Emergency Loan</b> <br />
                    The Emergency Loan is designed to assist GSIS members who face urgent financial situations, such as natural disasters (like typhoons, earthquakes, or floods) or personal emergencies. It offers quick access to funds when members are most in need, ensuring they have financial support during challenging times.

                <ul style={{ listStyleType: 'none', paddingLeft: '50px', marginTop: '20px', marginBottom: '50px' }}>
                      <li style={{ marginBottom: '5px' }}>• <b>Loan Amount:</b> Members can borrow up to PHP 20,000, or the amount may vary depending on the severity of the emergency. The loan amount is intended to provide immediate relief, whether it’s for temporary relocation, medical bills, or any other emergency expenses.</li>
                      <li style={{ marginBottom: '5px' }}>• <b>Flexible Terms:</b> The repayment terms for the Emergency Loan are flexible and can be adjusted according to the member's situation. In cases where the emergency is severe or long-lasting, members can request an extension of the loan repayment period to ease the financial burden.</li>
                    </ul>
                </li>


                <li>
                    <b>Educational Assistance Loan</b> <br />
                    The Educational Assistance Loan is a program designed to help GSIS members pay for their children’s education. This loan covers various educational expenses, such as tuition fees, books, school supplies, and other academic necessities, helping members ensure that their children have access to quality education.

                    <ul style={{ listStyleType: 'none', paddingLeft: '50px', marginTop: '20px', marginBottom: '50px' }}>
                      <li style={{ marginBottom: '5px' }}>• <b>Loan Amount</b> The loan amount is based on the actual cost of your child’s education. This means that members can borrow the amount they need to cover tuition and other school-related expenses, ensuring that their child’s academic needs are fully met.</li>
                      <li style={{ marginBottom: '5px' }}>• <b>Low-interest Rates:</b> The Educational Assistance Loan comes with low-interest rates, making it more affordable for families. This helps reduce the financial strain of paying for education, allowing members to prioritize their children's future while managing their financial obligations.</li>
                    </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <Section id="Financial and Wellness" topMd={150} topLg={150} topXl={60}>
        <FeaturesSectionStyle4
          data={featureListData}
        />
        </Section>

      </div>
    </div>
  );
}
