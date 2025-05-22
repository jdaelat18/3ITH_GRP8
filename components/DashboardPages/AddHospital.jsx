import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/hospitals';

const AddHospital = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editHospitalId, setEditHospitalId] = useState(null);
    const [newHospital, setNewHospital] = useState({ hospName: '', city: '', region: '' });
    const [hospitalList, setHospitalList] = useState([]);
    const [menuOpenId, setMenuOpenId] = useState(null);

    // Dynamic dropdown data
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRegion, setFilterRegion] = useState('');
    const [filterCity, setFilterCity] = useState('');
    const [linkFilter, setLinkFilter] = useState('all'); // 'all', 'with', 'without'

    useEffect(() => {
        fetchHospitals();
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

    // Fetch hospitals based on linkFilter
    useEffect(() => {
        let url = API_URL;
        if (linkFilter === 'with') url = 'http://localhost:5000/api/hospitals/with-doctors';
        else if (linkFilter === 'without') url = 'http://localhost:5000/api/hospitals/without-doctors';
        axios.get(url)
            .then(res => setHospitalList(res.data))
            .catch(() => setHospitalList([]));
    }, [linkFilter]);

    const fetchHospitals = async () => {
        try {
            const res = await axios.get(API_URL);
            setHospitalList(res.data);
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch hospitals.' });
        }
    };

    const fetchRegions = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/regions');
            if (res.data.length && typeof res.data[0] === 'object') {
                setRegions(res.data.map(r => r.region));
            } else {
                setRegions(res.data);
            }
        } catch (err) {
            setRegions([]);
        }
    };

    const fetchCities = async (region) => {
        if (!region) return setCities([]);
        try {
            const res = await axios.get('http://localhost:5000/api/cities', { params: { region } });
            if (res.data.length && typeof res.data[0] === 'object') {
                setCities(res.data.map(r => r.city));
            } else {
                setCities(res.data);
            }
        } catch (err) {
            setCities([]);
        }
    };

    const openModal = (hospital = null) => {
        if (hospital) {
            setNewHospital({ hospName: hospital.hospName, city: hospital.city, region: hospital.region });
            setEditHospitalId(hospital.hospitalID);
            fetchCities(hospital.region);
        } else {
            setNewHospital({ hospName: '', city: '', region: '' });
            setEditHospitalId(null);
            setCities([]);
        }
        setIsModalOpen(true);
    };

    const handleAddOrEditHospital = async () => {
        const { hospName, city, region } = newHospital;
        if (!hospName.trim() || !city.trim() || !region.trim()) {
            Swal.fire({ icon: 'warning', title: 'Incomplete Information', text: 'Please fill out all fields.' });
            return;
        }

        if (editHospitalId !== null) {
            Swal.fire({ icon: 'info', title: 'Edit Not Implemented', text: 'Editing hospitals is not implemented.' });
        } else {
            try {
                const res = await axios.post(API_URL, newHospital);
                setHospitalList([res.data, ...hospitalList]);
                Swal.fire({ icon: 'success', title: 'Hospital Added', text: `${newHospital.hospName} added successfully.` });
            } catch (err) {
                Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to add hospital.' });
            }
        }

        setIsModalOpen(false);
        setNewHospital({ hospName: '', city: '', region: '' });
        setEditHospitalId(null);
        setCities([]);
    };

    const handleRemoveHospital = async (hospitalID) => {
        try {
            await axios.delete(`${API_URL}/${hospitalID}`);
            setHospitalList(hospitalList.filter((h) => h.hospitalID !== hospitalID));
            Swal.fire({ icon: 'success', title: 'Removed', text: 'Hospital has been removed.' });
            setMenuOpenId(null);
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to remove hospital.' });
        }
    };

    const toggleMenu = (hospitalID) => setMenuOpenId(menuOpenId === hospitalID ? null : hospitalID);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewHospital((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegionChange = (e) => {
        const region = e.target.value;
        setNewHospital(prev => ({
            ...prev,
            region,
            city: ""
        }));
        setCities([]);
        fetchCities(region);
    };

    const handleCityChange = (e) => {
        setNewHospital(prev => ({
            ...prev,
            city: e.target.value
        }));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewHospital({ hospName: '', city: '', region: '' });
        setEditHospitalId(null);
        setCities([]);
    };

    const handleLogout = () => { window.location.href = '/'; };

    // Filtered hospital list for search and filters
    const filteredHospitals = hospitalList.filter(hospital =>
        (filterRegion === '' || hospital.region === filterRegion) &&
        (filterCity === '' || hospital.city === filterCity) &&
        (
            hospital.hospName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hospital.region.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div style={styles.pageContainer}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>GSIS EduHealth</h2>
                <Link to="/dashboard/homepage" style={styles.navLink}>Home</Link>
                <Link to="/dashboard/appointment-requests" style={styles.navLink}>Appointments</Link>
                <Link to="/dashboard/add-doctor" style={styles.navLink}>Doctors</Link>
                <Link to="/dashboard/add-hospital" style={{ ...styles.navLink, ...styles.activeLink }}>Hospitals</Link>
                <button onClick={handleLogout} style={styles.logoutButton}>
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={styles.mainContent}>
                <div style={styles.titleWrapper}>
                    <h1 style={styles.title}>Accredited Hospitals</h1>
                    <button onClick={() => openModal()} style={styles.addHospitalBtn}>Add Hospital</button>
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
                {/* Hospital-Doctor Link Filter */}
                <div style={{ marginBottom: 16 }}>
                    <label style={{ marginRight: 8 }}>Hospital-Doctor Link:</label>
                    <select value={linkFilter} onChange={e => setLinkFilter(e.target.value)} style={styles.input}>
                        <option value="all">All Hospitals</option>
                        <option value="with">With Doctors</option>
                        <option value="without">Without Doctors</option>
                    </select>
                </div>
                {/* Search Bar */}
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <input
                        type="text"
                        placeholder="Search hospital..."
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
                    {filteredHospitals.map((hospital) => (
                        <div key={hospital.hospitalID} style={styles.listItem}>
                            <span style={styles.hospitalText}>
                                <strong>{hospital.hospName}</strong> — {hospital.city} ({hospital.region})
                            </span>
                            <span style={styles.menuWrapper}>
                                <span onClick={() => toggleMenu(hospital.hospitalID)} style={styles.menuDots}>⋮</span>
                                {menuOpenId === hospital.hospitalID && (
                                    <div style={styles.dropdown}>
                                        {/* <button style={styles.dropdownButton} onClick={() => openModal(hospital)}>Edit</button> */}
                                        <button style={styles.dropdownButton} onClick={() => handleRemoveHospital(hospital.hospitalID)}>Remove</button>
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
                        <h2>{editHospitalId !== null ? 'Edit Hospital' : 'Add Hospital'}</h2>
                        <div style={styles.formGroup}>
                            <label>Hospital Name:</label>
                            <input
                                type="text"
                                name="hospName"
                                value={newHospital.hospName}
                                onChange={handleInputChange}
                                style={styles.input}
                                placeholder="Enter hospital name"
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label>Region:</label>
                            <select
                                name="region"
                                value={newHospital.region}
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
                        {newHospital.region && (
                            <div style={styles.formGroup}>
                                <label>City:</label>
                                <select
                                    name="city"
                                    value={newHospital.city}
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
                        <div style={styles.modalButtons}>
                            <button style={{ ...styles.modalBtn, ...styles.submitBtn }} onClick={handleAddOrEditHospital}>
                                {editHospitalId !== null ? 'Save Changes' : 'Add Hospital'}
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
    addHospitalBtn: {
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

export default AddHospital;