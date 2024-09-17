import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AddPost from '../pages/AddPost';
import Accomadation from '../pages/Accomadation';
import Budget from '../pages/Budget';
import Contact from '../pages/Contact';


export default function NavLinks() {

    return(
        <Routes>
            <Route path="/" element={<Home /> } />
            <Route path='/add-post' element={ <AddPost /> } />
            <Route path='/accomadation' element={ <Accomadation /> } />
            <Route path='/budget' element={ <Budget /> } />
            <Route path='/contact' element={ <Contact /> } />
        </Routes>
    )
}