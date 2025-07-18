
import './App.css'
import Navbar from './Components/Nav'
import SideLeft from './Components/Sideleft'
import HomePage from './Components/MainBox'
import ProfileRight from './Components/Profile'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {Layout} from './pages/Layout'
import Discussion from './Components/Disscusiono'
import Directory from './Components/Directory'
import Notes from './Components/Notes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
         <Route index element={<HomePage />} />
         <Route path="/post" element={<Discussion></Discussion>}></Route>
          <Route path="dir" element={<Directory></Directory>}></Route>
          <Route path="notes" element={<Notes></Notes>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
