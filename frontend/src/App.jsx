import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CustomerDetail from './pages/CustomerDetail';
import CustomersPage from "./pages/CustomersPage";
import AddCustomer from './pages/AddCustomer';
import EditCustomer from './pages/EditCustomer';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
        <Route path="/add-customer" element={<AddCustomer />} /> 
       <Route path="/edit-customer/:id" element={<EditCustomer />} />    
      </Routes>
    </Router>
  );
}

export default App;
