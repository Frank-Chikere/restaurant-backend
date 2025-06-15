// src/pages/CustomerDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/customers/${id}`)
      .then((res) => {
        console.log("Fetched customer detail:", res.data);
        setCustomer(res.data);
      })
      .catch((err) => {
        console.error('Error fetching customer details:', err);
        setError('Customer not found.');
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!customer) return <p>Loading customer data...</p>;

  return (
   <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Customer Details</h2>

         <div style={rowStyle}>
          <label style={labelStyle}>First Name:</label>
          <span style={valueStyle}>{customer.first_name}</span>
        </div>

        <div style={rowStyle}>
          <label style={labelStyle}> Surname:</label>
          <span style={valueStyle}>{customer.surname}</span>
        </div>

         <div style={rowStyle}>
          <label style={labelStyle}> Middle Name:</label>
          <span style={valueStyle}>{customer.middle_name}</span>
        </div>

        <div style={rowStyle}>
          <label style={labelStyle}>Date of Birth:</label>
          <span style={valueStyle}>{customer.date_of_birth}</span>
        </div>

        <div style={rowStyle}>
          <label style={labelStyle}>Date of Registration:</label>
          <span style={valueStyle}>{customer.date_of_registration}</span>
        </div>

        <div style={rowStyle}>
          <label style={labelStyle}>Home Address:</label>
          <span style={valueStyle}>{customer.home_address}</span>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  maxWidth: '700px',
  margin: '2rem auto',
  padding: '1rem',
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '16px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '1.5rem',
  color: '#e67e22', // orange highlight
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.5rem 0',
  borderBottom: '1px solid #eee',
};

const labelStyle = {
  fontWeight: 'bold',
  color: '#333',
};

const valueStyle = {
  color: '#555',
};

export default CustomerDetail;