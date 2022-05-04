import './App.css';
import CeoPage from './containers/CeoPage'
import WalletView from './containers/WalletView';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import FarmerPage from './containers/FarmerPage';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" exact element={<WalletView/>} />
          <Route path="/admin"  element={<CeoPage/>} />
          <Route path="/farmer" element={<FarmerPage/>} />
        </Routes>
      </Router>
  )
}

export default App;
