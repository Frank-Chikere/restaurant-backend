import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '2rem' }}>
        TastyBites Corp. Customer Management System
      </h1>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/customers">
          <button style={buttonStyle}>View Customers</button>
        </Link>
        <Link to="/add-customer">
          <button style={buttonStyle}>Add Customer</button>
        </Link>
      </div>
    </div>
  );
}

// Button style object
const buttonStyle = {
  backgroundColor: '#0a2868',
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};
