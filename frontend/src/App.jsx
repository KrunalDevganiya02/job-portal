import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import Login from './components/Login'
import Signup from './components/Signup'
import AddJobForm from './components/AddJobs'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import ViewEdit from './components/ViewEdit'
import EditJobs from './components/EditJobs'
import ApplyJob from './components/ApplyJob'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='main'>
     <Router>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/log" element={<Login />} />
        <Route path="/sign" element={<Signup />} />
        <Route path="/add" element={<AddJobForm />} />
        <Route path="/view" element={<ViewEdit />} />
        <Route path="/edit/:id" element={<EditJobs />} />
        <Route path="/apply/:id" element={<ApplyJob />} />
      </Routes>
    </Router>
    <Footer />

    </div>
  )
}

export default App
