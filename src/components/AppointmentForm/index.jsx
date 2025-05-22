import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, addMonths } from "date-fns";
import axios from 'axios';
import Swal from 'sweetalert2';

const API_APPOINTMENTS = 'http://localhost:5000/api/appointments';

export default function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // For highlighting missing fields
  const [missingFields, setMissingFields] = useState([]);

  // Dynamic dropdown data
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // Refs for scrolling to first missing field
  const refs = {
    fullName: useRef(),
    email: useRef(),
    phone: useRef(),
    bpNum: useRef(),
    date: useRef(),
    time: useRef(),
    reasonForVisit: useRef(),
    region: useRef(),
    city: useRef(),
    hospital: useRef(),
    doctor: useRef(),
  };

  // Fetch regions on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/regions')
      .then(res => {
        if (res.data.length && typeof res.data[0] === 'object') {
          setRegions(res.data.map(r => r.region));
        } else {
          setRegions(res.data);
        }
      })
      .catch(() => setRegions([]));
  }, []);

  // Fetch cities when region changes
  useEffect(() => {
    setSelectedCity('');
    setCities([]);
    setSelectedHospital('');
    setHospitals([]);
    setSelectedDoctor('');
    setDoctors([]);
    if (selectedRegion) {
      axios.get('http://localhost:5000/api/cities', { params: { region: selectedRegion } })
        .then(res => {
          if (res.data.length && typeof res.data[0] === 'object') {
            setCities(res.data.map(r => r.city));
          } else {
            setCities(res.data);
          }
        })
        .catch(() => setCities([]));
    }
  }, [selectedRegion]);

  // Fetch hospitals when city changes
  useEffect(() => {
    setSelectedHospital('');
    setHospitals([]);
    setSelectedDoctor('');
    setDoctors([]);
    if (selectedCity) {
      axios.get('http://localhost:5000/api/hospitals/with-doctors', { params: { city: selectedCity } })
        .then(res => setHospitals(res.data))
        .catch(() => setHospitals([]));
    }
  }, [selectedCity]);

  // Fetch doctors when hospital changes
  useEffect(() => {
  setSelectedDoctor('');
  setDoctors([]);
  if (selectedHospital) {
    axios.get('http://localhost:5000/api/doctors', { params: { hospital: selectedHospital } })
      .then(res => setDoctors(res.data))
      .catch(() => setDoctors([]));
  }
}, [selectedHospital]);

  // Email validation: must end with @gmail.com or @yahoo.com
  const validateEmail = (value) => {
    if (!value) return "Email is required";
    // Accept any valid email address
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fName = form.fullName.value.trim();
    const pNum = form.phone.value.trim();
    const bPNum = form.bpNum.value.trim();
    const date = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
    const time = form.time.value;
    // For radio group, check if any is checked
    const reason = form.reasonForVisit.value || "";
    const region = selectedRegion;
    const city = selectedCity;
    const hospital = selectedHospital;
    const doctor = selectedDoctor;

    // Check for missing fields using state for controlled fields
    let missing = [];
    if (!fName) missing.push('fullName');
    if (!email) missing.push('email');
    if (!pNum) missing.push('phone');
    if (!bPNum) missing.push('bpNum');
    if (!date) missing.push('date');
    if (!time) missing.push('time');
    if (!reason) missing.push('reasonForVisit');
    if (!region) missing.push('region');
    if (!city) missing.push('city');
    if (!hospital) missing.push('hospital');
    if (!doctor) missing.push('doctor');

    const emailErr = validateEmail(email);
    setEmailError(emailErr);

    if (missing.length > 0) {
      setMissingFields(missing);
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please fill out all required fields.',
      }).then(() => {
        // Scroll to first missing field
        if (refs[missing[0]] && refs[missing[0]].current) {
          refs[missing[0]].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          refs[missing[0]].current.focus();
        }
      });
      return;
    } else {
      setMissingFields([]);
    }

    if (emailErr) {
      setMissingFields(['email']);
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: emailErr,
      }).then(() => {
        if (refs.email.current) {
          refs.email.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          refs.email.current.focus();
        }
      });
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(API_APPOINTMENTS, {
        fName, pNum, bPNum, date, time, reason, region, city, hospital, doctor, email
      });
      Swal.fire({
        icon: 'success',
        title: 'Appointment Submitted!',
        text: 'Your appointment has been submitted. You will receive an email if your appointment is accepted.',
      });
      form.reset();
      setSelectedDate(null);
      setSelectedRegion("");
      setSelectedCity("");
      setSelectedHospital("");
      setSelectedDoctor("");
      setEmail("");
      setEmailError("");
      setMissingFields([]);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'Failed to submit appointment. Please try again later.',
      });
    }
    setSubmitting(false);
  };

  // Helper for highlighting
  const highlight = (field) =>
    missingFields.includes(field)
      ? { border: '2px solid #dc2626', background: '#fff0f0' }
      : {};

  return (
    <form className="row" onSubmit={handleSubmit} autoComplete="off">
      {/* Full Name */}
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Full Name</label>
        <input
          type="text"
          className="cs_form_field"
          name="fullName"
          minLength="10"
          maxLength="30"
          pattern="[A-Za-z\s]{10,30}"
          title="Please enter 10 to 30 alphabetic characters only"
          ref={refs.fullName}
          style={highlight('fullName')}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      {/* Email */}
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Email</label>
        <input
          type="email"
          className="cs_form_field"
          name="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setEmailError(validateEmail(e.target.value));
          }}
          ref={refs.email}
          style={highlight('email')}
        />
        {emailError && <div style={{ color: "red", fontSize: "14px" }}>{emailError}</div>}
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      {/* Phone Number */}
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Phone Number</label>
        <input
          type="text"
          className="cs_form_field"
          name="phone"
          placeholder="09XXXXXXXXX"
          maxLength="11"
          pattern="09\d{9}"
          title="Please enter a valid 11-digit phone number starting with 09"
          inputMode="numeric"
          ref={refs.phone}
          style={highlight('phone')}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      {/* Business Partner Number */}
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Business Partner Number</label>
        <input
          type="text"
          className="cs_form_field"
          name="bpNum"
          placeholder="1234-56-7890"
          maxLength="10"
          pattern="\d{10}"
          title="Please enter exactly 10 digits"
          ref={refs.bpNum}
          style={highlight('bpNum')}
        />
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      {/* Preferred Date */}
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Preferred Date</label>
        <div className="cs_with_icon_input">
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            minDate={addDays(new Date(), 3)}
            maxDate={addMonths(new Date(), 5)}
            isClearable
            placeholderText="yyyy-mm-dd"
            ref={refs.date}
            customInput={
              <input
                className="cs_form_field"
                style={highlight('date')}
                readOnly
              />
            }
          />
        </div>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      {/* Preferred Time */}
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Preferred Time</label>
        <div className="cs_with_icon_input">
          <select
            className="cs_form_field cs_timepicker"
            name="time"
            defaultValue=""
            ref={refs.time}
            style={highlight('time')}
          >
            <option value="" disabled>Select time</option>
            <option value="07:00">7:00 AM</option>
            <option value="08:00">8:00 AM</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
          </select>
        </div>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      {/* Reason for Visit */}
      <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">Reason for Visit</label>
        <div
          className="cs_radio_group"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px 24px",
            marginTop: "12px",
            ...(missingFields.includes('reasonForVisit') ? { border: '2px solid #dc2626', background: '#fff0f0', borderRadius: 8, padding: 8 } : {})
          }}
          ref={refs.reasonForVisit}
        >
          <div className="cs_radio_wrap">
            <input className="cs_radio_input" type="radio" name="reasonForVisit" id="annualPhysical" value="Annual Physical Examination" />
            <label className="cs_radio_label" htmlFor="annualPhysical">Annual Physical Examination</label>
          </div>
          <div className="cs_radio_wrap">
            <input className="cs_radio_input" type="radio" name="reasonForVisit" id="medicalCertificate" value="Medical Certificate / Fit-to-Work Clearance" />
            <label className="cs_radio_label" htmlFor="medicalCertificate">Medical Certificate / Fit-to-Work Clearance</label>
          </div>
          <div className="cs_radio_wrap">
            <input className="cs_radio_input" type="radio" name="reasonForVisit" id="specificIllness" value="Consultation for Specific Illness or Symptoms" />
            <label className="cs_radio_label" htmlFor="specificIllness">Consultation for Specific Illness or Symptoms</label>
          </div>
          <div className="cs_radio_wrap">
            <input className="cs_radio_input" type="radio" name="reasonForVisit" id="labTests" value="Laboratory and Diagnostic Tests" />
            <label className="cs_radio_label" htmlFor="labTests">Laboratory and Diagnostic Tests</label>
          </div>
          <div className="cs_radio_wrap">
            <input className="cs_radio_input" type="radio" name="reasonForVisit" id="mentalHealth" value="Mental Health Consultation" />
            <label className="cs_radio_label" htmlFor="mentalHealth">Mental Health Consultation</label>
          </div>
          <div className="cs_radio_wrap">
            <input className="cs_radio_input" type="radio" name="reasonForVisit" id="vaccination" value="Vaccination / Immunization Services" />
            <label className="cs_radio_label" htmlFor="vaccination">Vaccination / Immunization Services</label>
          </div>
          <div className="cs_radio_wrap">
            <input className="cs_radio_input" type="radio" name="reasonForVisit" id="preRetirement" value="Pre-Retirement Medical Clearance" />
            <label className="cs_radio_label" htmlFor="preRetirement">Pre-Retirement Medical Clearance</label>
          </div>
          <div className="cs_radio_wrap">
            <input className="cs_radio_input" type="radio" name="reasonForVisit" id="followUp" value="Follow-Up Checkup" />
            <label className="cs_radio_label" htmlFor="followUp">Follow-Up Checkup</label>
          </div>
          <div className="cs_radio_wrap">
            <input className="cs_radio_input" type="radio" name="reasonForVisit" id="workInjury" value="Work-Related Injury or Illness Assessment" />
            <label className="cs_radio_label" htmlFor="workInjury">Work-Related Injury or Illness Assessment</label>
          </div>
          <div className="cs_radio_wrap">
            <input className="cs_radio_input" type="radio" name="reasonForVisit" id="wellnessProgram" value="Participation in Government-Mandated Wellness Programs" />
            <label className="cs_radio_label" htmlFor="wellnessProgram">Participation in Government-Mandated Wellness Programs</label>
          </div>
        </div>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      {/* Region Selection */}
      <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">Region</label>
        <select
          className="cs_form_field"
          name="region"
          value={selectedRegion}
          onChange={e => setSelectedRegion(e.target.value)}
          ref={refs.region}
          style={highlight('region')}
        >
          <option value="" disabled>Select region</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
        <div className="cs_height_42 cs_height_xl_25" />
      </div>
      {/* City Selection */}
      {selectedRegion && (
        <div className="col-lg-12">
          <label className="cs_input_label cs_heading_color">City</label>
          <select
            className="cs_form_field"
            name="city"
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            ref={refs.city}
            style={highlight('city')}
          >
            <option value="" disabled>Select city</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <div className="cs_height_42 cs_height_xl_25" />
        </div>
      )}
      {/* Hospital Selection */}
      {selectedCity && (
        <div className="col-lg-12">
          <label className="cs_input_label cs_heading_color">Hospital</label>
          <select
            className="cs_form_field"
            name="hospital"
            value={selectedHospital}
            onChange={e => setSelectedHospital(e.target.value)}
            ref={refs.hospital}
            style={highlight('hospital')}
          >
            <option value="" disabled>Select hospital</option>
            {hospitals.map(hospital => (
              <option key={hospital.hospitalID || hospital.hospName} value={hospital.hospName}>
                {hospital.hospName}
              </option>
            ))}
          </select>
          <div className="cs_height_42 cs_height_xl_25" />
        </div>
      )}
      {/* Doctor Selection (from database) */}
      {selectedHospital && (
        <div className="col-lg-12">
          <label className="cs_input_label cs_heading_color">Doctor</label>
          <select
            className="cs_form_field"
            name="doctor"
            value={selectedDoctor}
            onChange={e => setSelectedDoctor(e.target.value)}
            ref={refs.doctor}
            style={highlight('doctor')}
          >
            <option value="" disabled>Select doctor</option>
            {doctors.length === 0 && <option value="">No doctors available</option>}
            {doctors.map((doc) => (
              <option key={doc.doctorID} value={doc.name}>{doc.name}</option>
            ))}
          </select>
          <div className="cs_height_42 cs_height_xl_25" />
        </div>
      )}
      {/* Submit Button */}
      <div className="col-lg-12 mt-5">
        <button className="cs_btn cs_style_1" type="submit" disabled={submitting}>
          <span>{submitting ? "Submitting..." : "Submit"}</span>
          <i>
            <img src="/images/icons/arrow_white.svg" alt="Icon" />
            <img src="/images/icons/arrow_white.svg" alt="Icon" />
          </i>
        </button>
      </div>
    </form>
  );
}