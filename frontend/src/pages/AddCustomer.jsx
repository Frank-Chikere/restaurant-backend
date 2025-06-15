import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddCustomer() {
  const [formData, setFormData] = useState({
    first_name: '',
    surname: '',
    middle_name: '',
    date_of_birth: '',
    home_address: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    try {
      await axios.post('https://restaurant-backend-6evn.onrender.com/customers/', formData);
      alert('Customer added!');
      navigate('/customers');
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Failed to add customer.');
    }
  };

  return (
     <div className="container" style={{
      maxWidth: '600px',
      margin: '2rem auto',
      background: 'white',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>Add New Customer</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <label style={labelStyle}>First Name</label>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Surname</label>
        <input
          type="text"
          name="surname"
          placeholder="surname"
          value={formData.surname}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Middle Name</label>
        <input
          type="text"
          name="middle_name"
          placeholder="Middle Name"
          value={formData.middle_name}
          onChange={handleChange}
          style={inputStyle}
        />
        
        <label style={labelStyle}>Date of Birth</label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Home Address</label>
        <input
          type="text"
          name="home_address"
          placeholder="Home Address"
          value={formData.home_address}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Date of Registration</label>
        <input
          type="date"
          name="date_of_registration"
          value={formData.date_of_registration}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Keep your existing button style (assumed globally styled via index.css) */}
        <button type="submit" className="add-btn">
          Add Customer
        </button>
      </form>
    </div>
  );
}

// Styled input box
const inputStyle = {
  padding: '10px 14px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '1rem'
};

const labelStyle = {
  fontWeight: 'bold',
  marginTop: '0.5rem',
  color: '#2c3e50'
};


export default AddCustomer;