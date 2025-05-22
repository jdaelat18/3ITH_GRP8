import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/doctors';

const DoctorsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editDoctorId, setEditDoctorId] = useState(null);
    const [newDoctor, setNewDoctor] = useState({ name: '', hospital: '', city: '', region: '' });
    const [doctorsList, setDoctorsList] = useState([]);
    const [menuOpenId, setMenuOpenId] = useState(null);

    // Dynamic dropdown data
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [hospitals, setHospitals] = useState([]);

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRegion, setFilterRegion] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const [linkFilter, setLinkFilter] = useState('all'); // 'all', 'with', 'without'

    useEffect(() => {
        fetchDoctors();
        fetchRegions();
    }, []);

    // Fetch cities for filter when filterRegion changes
    useEffect(() => {
        if (filterRegion) {
            fetchCities(filterRegion);
        } else {
            setCities([]);
        }
        setFilterCity('');
    }, [filterRegion]);

    // Fetch doctors based on filter
    useEffect(() => {
        let url = API_URL;
        if (linkFilter === 'with') url = 'http://localhost:5000/api/doctors/with-hospital';
        else if (linkFilter === 'without') url = 'http://localhost:5000/api/doctors/without-hospital';
        axios.get(url)
            .then(res => setDoctorsList(res.data))
            .catch(() => setDoctorsList([]));
    }, [linkFilter]);

    // Fetch all doctors
    const fetchDoctors = async () => {
        try {
            const res = await axios.get(API_URL);
            setDoctorsList(res.data);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch doctors from the server.',
            });
        }
    };

    const fetchRegions = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/regions');
            // Defensive: handle both [{region: "NCR"}] and ["NCR"]
            if (res.data.length && typeof res.data[0] === 'object') {
                setRegions(res.data.map(r => r.region));
            } else {
                setRegions(res.data);
            }
        } catch (err) {
            setRegions([]);
        }
    };

    // Fetch cities for a region
    const fetchCities = async (region) => {
        if (!region) return setCities([]);
        try {
            const res = await axios.get('http://localhost:5000/api/cities', { params: { region } });
            setCities(res.data);
        } catch (err) {
            setCities([]);
        }
    };

    // Fetch hospitals for a city
    const fetchHospitals = async (city, region) => {
        if (!city || !region) return setHospitals([]);
        try {
            const res = await axios.get('http://localhost:5000/api/hospitals', { params: { city, region } });
            setHospitals(res.data);
        } catch (err) {
            setHospitals([]);
        }
    };

    const openModal = (doctor = null) => {
        if (doctor) {
            setNewDoctor({ name: doctor.name, hospital: doctor.hospital, city: doctor.city, region: doctor.region });
            setEditDoctorId(doctor.doctorID);
            fetchCities(doctor.region);
            fetchHospitals(doctor.city);
        } else {
            setNewDoctor({ name: '', hospital: '', city: '', region: '' });
            setEditDoctorId(null);
            setCities([]);
            setHospitals([]);
        }
        setIsModalOpen(true);
    };

    const handleAddOrEditDoctor = async () => {
        const { name, hospital, city, region } = newDoctor;
        if (!name.trim() || !hospital.trim() || !city.trim() || !region.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Information',
                text: 'Please fill out all fields to continue.',
            });
            return;
        }

        if (editDoctorId !== null) {
            Swal.fire({
                icon: 'info',
                title: 'Edit Not Implemented',
                text: 'Editing doctors is not implemented in this version.',
            });
        } else {
            try {
                const res = await axios.post(API_URL, newDoctor);
                setDoctorsList([res.data, ...doctorsList]);
                Swal.fire({
                    icon: 'success',
                    title: 'Doctor Added',
                    text: `${newDoctor.name} added successfully.`,
                });
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add doctor to the database.',
                });
            }
        }

        setIsModalOpen(false);
        setNewDoctor({ name: '', hospital: '', city: '', region: '' });
        setEditDoctorId(null);
    };

    const handleRemoveDoctor = async (doctorID) => {
        try {
            await axios.delete(`${API_URL}/${doctorID}`);
            setDoctorsList(doctorsList.filter((d) => d.doctorID !== doctorID));
            Swal.fire({
                icon: 'success',
                title: 'Removed',
                text: 'Doctor has been removed.',
            });
            setMenuOpenId(null);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to remove doctor from the database.',
            });
        }
    };

    const toggleMenu = (doctorID) => {
        setMenuOpenId(menuOpenId === doctorID ? null : doctorID);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegionChange = (e) => {
        const region = e.target.value;
        setNewDoctor(prev => ({
            ...prev,
            region,
            city: "",
            hospital: ""
        }));
        setCities([]);
        setHospitals([]);
        fetchCities(region);
    };

    const handleCityChange = (e) => {
        const city = e.target.value;
        setNewDoctor(prev => {
            const updated = { ...prev, city, hospital: "" };
            setHospitals([]);
            fetchHospitals(city, updated.region);
            return updated;
        });
    };

    const handleHospitalChange = (e) => {
        setNewDoctor(prev => ({
            ...prev,
            hospital: e.target.value
        }));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewDoctor({ name: '', hospital: '', city: '', region: '' });
        setEditDoctorId(null);
        setCities([]);
        setHospitals([]);
    };

    const handleLogout = () => {
        window.location.href = '/';
    };

    // Filtered doctor list for search and filters
    const filteredDoctors = doctorsList.filter(doctor =>
        (filterRegion === '' || doctor.region === filterRegion) &&
        (filterCity === '' || doctor.city === filterCity) &&
        (
            doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.region.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div style={styles.pageContainer}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>GSIS EduHealth</h2>
                <Link to="/dashboard/homepage" style={styles.navLink}>Home</Link>
                <Link to="/dashboard/appointment-requests" style={styles.navLink}>Appointments</Link>
                <Link to="/dashboard/add-doctor" style={{ ...styles.navLink, ...styles.activeLink }}>Doctors</Link>
                <Link to="/dashboard/add-hospital" style={styles.navLink}>Hospitals</Link>
                <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={styles.mainContent}>
                <div style={styles.titleWrapper}>
                    <h1 style={styles.title}>Accredited Doctors</h1>
                    <button onClick={() => openModal()} style={styles.addDoctorBtn}>Add Doctor</button>
                </div>
                {/* Filter Dropdowns */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', width: '100%' }}>
                    <select
                        value={filterRegion}
                        onChange={e => setFilterRegion(e.target.value)}
                        style={{ ...styles.input, maxWidth: 200 }}
                    >
                        <option value="">All Regions</option>
                        {regions.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                    <select
                        value={filterCity}
                        onChange={e => setFilterCity(e.target.value)}
                        style={{ ...styles.input, maxWidth: 200 }}
                        disabled={!filterRegion}
                    >
                        <option value="">All Cities</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                {/* Doctor-Hospital Link Filter */}
                <div style={{ marginBottom: 16 }}>
                    <label style={{ marginRight: 8 }}>Doctor-Hospital Link:</label>
                    <select value={linkFilter} onChange={e => setLinkFilter(e.target.value)} style={styles.input}>
                        <option value="all">All Doctors</option>
                        <option value="with">With Hospital</option>
                        <option value="without">Without Hospital</option>
                    </select>
                </div>
                {/* Search Bar */}
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <input
                        type="text"
                        placeholder="Search doctor, hospital, city, or region..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '6px',
                            border: '1px solid #ccc',
                            fontSize: '16px'
                        }}
                    />
                </div>
                <div style={styles.hospitalsGrid}>
                    {filteredDoctors.map((doctor) => (
                        <div key={doctor.doctorID} style={styles.listItem}>
                            <span style={styles.hospitalText}>
                                <strong>{doctor.name}</strong> — {doctor.hospital} ({doctor.city}, {doctor.region})
                            </span>
                            <span style={styles.menuWrapper}>
                                <span onClick={() => toggleMenu(doctor.doctorID)} style={styles.menuDots}>⋮</span>
                                {menuOpenId === doctor.doctorID && (
                                    <div style={styles.dropdown}>
                                        {/* <button style={styles.dropdownButton} onClick={() => openModal(doctor)}>Edit</button> */}
                                        <button style={styles.dropdownButton} onClick={() => handleRemoveDoctor(doctor.doctorID)}>Remove</button>
                                    </div>
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2>{editDoctorId !== null ? 'Edit Doctor' : 'Add Doctor'}</h2>
                        <div style={styles.formGroup}>
                            <label>Doctor Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={newDoctor.name}
                                onChange={handleInputChange}
                                style={styles.input}
                                placeholder="Enter doctor name"
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label>Region:</label>
                            <select
                                name="region"
                                value={newDoctor.region}
                                onChange={handleRegionChange}
                                style={styles.input}
                                required
                            >
                                <option value="" disabled>Select region</option>
                                {regions.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                        </div>
                        {newDoctor.region && (
                            <div style={styles.formGroup}>
                                <label>City:</label>
                                <select
                                    name="city"
                                    value={newDoctor.city}
                                    onChange={handleCityChange}
                                    style={styles.input}
                                    required
                                >
                                    <option value="" disabled>Select city</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {newDoctor.city && (
                            <div style={styles.formGroup}>
                                <label>Hospital:</label>
                                <select
                                    name="hospital"
                                    value={newDoctor.hospital}
                                    onChange={handleHospitalChange}
                                    style={styles.input}
                                    required
                                >
                                    <option value="" disabled>Select hospital</option>
                                    {hospitals.map(hospital => (
                                        <option key={hospital.hospitalID || hospital.hospName} value={hospital.hospName}>
                                          {hospital.hospName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div style={styles.modalButtons}>
                            <button style={{ ...styles.modalBtn, ...styles.submitBtn }} onClick={handleAddOrEditDoctor}>
                                {editDoctorId !== null ? 'Save Changes' : 'Add Doctor'}
                            </button>
                            <button style={{ ...styles.modalBtn, ...styles.cancelBtn }} onClick={handleCloseModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    sidebar: {
        width: '240px', backgroundColor: '#274760', color: '#fff', padding: '30px 20px',
        position: 'fixed', height: '100vh', display: 'flex', flexDirection: 'column',
    },
    sidebarTitle: {
        fontSize: '26px', fontWeight: '600', marginBottom: '40px',
        textAlign: 'center', color: 'white'
    },
    navLink: {
        display: 'block', padding: '12px 16px', margin: '10px 0',
        textDecoration: 'none', color: '#e2e8f0', borderRadius: '8px',
        transition: 'all 0.3s ease', fontWeight: '500',
    },
    activeLink: {
        backgroundColor: '#1d3345', borderLeft: '4px solid #38bdf8', color: '#38bdf8',
    },
    logoutButton: {
        marginTop: 'auto', marginBottom: '20px', padding: '12px 16px',
        backgroundColor: 'red', color: '#e2e8f0', border: 'none', borderRadius: '8px',
        cursor: 'pointer', fontWeight: '500',
    },
    mainContent: {
        marginLeft: '240px', padding: '40px', flexGrow: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
    },
    titleWrapper: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', width: '100%', marginBottom: '30px'
    },
    title: { fontSize: '2rem', color: '#0f172a' },
    addDoctorBtn: {
        padding: '12px 16px', backgroundColor: '#16a34a', color: '#fff',
        border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500',
    },
    hospitalsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        width: '100%',
        maxWidth: '1210px',
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '16px',
        backgroundColor: '#fefefe',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    hospitalText: { flex: 1 },
    menuWrapper: { marginLeft: '16px', position: 'relative' },
    menuDots: {
        cursor: 'pointer', fontSize: '25px', padding: '12px 12px', borderRadius: '6px', color: '#1e293b',
    },
    dropdown: {
        position: 'absolute', top: '36px', right: 0, backgroundColor: '#fff',
        border: '1px solid #ccc', borderRadius: '6px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'row', gap: '8px', padding: '8px', zIndex: 999,
    },
    modalOverlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
        justifyContent: 'center', alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff', padding: '24px', borderRadius: '10px',
        maxWidth: '420px', width: '100%', textAlign: 'left',
    },
    formGroup: { marginBottom: '16px' },
    input: {
        width: '100%', padding: '10px', marginTop: '8px',
        borderRadius: '6px', border: '1px solid #ccc',
    },
    modalButtons: { display: 'flex', justifyContent: 'space-between', gap: '12px' },
    modalBtn: { padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' },
    submitBtn: { backgroundColor: '#16a34a', color: '#fff' },
    cancelBtn: { backgroundColor: '#dc2626', color: '#fff' },
    dropdownButton: { background: 'none', border: 'none', color: '#1e293b', cursor: 'pointer', padding: '6px 12px' },
};

export default DoctorsPage;