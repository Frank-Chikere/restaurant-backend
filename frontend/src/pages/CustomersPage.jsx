import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('https://restaurant-backend-6evn.onrender.com/customers/')
      .then((res) => { 
        console.log("Fetched customers:", res.data)
        setCustomers(res.data);
  })
      .catch((err) => console.error('Error fetching customers:', err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await axios.delete(`https://restaurant-backend-6evn.onrender.com/customers/${id}`);
      setCustomers(prev => prev.filter(c => c.id !== id));
      alert("Customer deleted successfully.");
    } catch (error) {
      alert("Failed to delete customer.");
    }
  };

  return (
 <div className="container" style={{
      background: 'white',
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#2c3e50' }}>
        Customer List
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
       {customers.map(customer => (
        <div
        key={customer.id}
        style={{
        backgroundColor: '#f2f2f2',
        padding: '14px 18px',
        borderRadius: '10px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      transition: 'background-color 0.3s ease'
    }}
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f2f2f2'}
  >
    <Link
      to={`/customers/${customer.id}`}
      style={{
        textDecoration: 'none',
        color: '#333',
        fontWeight: '500',
        flex: 1
      }}
    >
      {customer.first_name} {customer.surname}
    </Link>

    <div style={{ display: 'flex', gap: '8px' }}>
      <Link
        to={`/edit-customer/${customer.id}`}
        style={{
          backgroundColor: '#ffa500',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          textDecoration: 'none'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#cc8400'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffa500'}
      >
        Edit
      </Link>

      <button
        onClick={() => handleDelete(customer.id)}
        style={{
          backgroundColor: '#e74c3c',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '6px',
          border: 'none',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c0392b'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e74c3c'}
      >
        Delete
      </button>
    </div>
  </div>
))}
      </div>

      {/* Add Customer Button (your original color) */}
      <Link
        to="/add-customer"
        style={{
          textDecoration: 'none',
          padding: '12px 20px',
          borderRadius: '8px',
          fontWeight: 'bold',
          backgroundColor: '#0a2868', // your original orange
          color: 'white',
          transition: 'background-color 0.3s ease, color 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'black';
          e.currentTarget.style.color = 'white';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#ffa500';
          e.currentTarget.style.color = 'white';
        }}
      >
        Add Customer
      </Link>
    </div>
  );
}

export default CustomersPage;
