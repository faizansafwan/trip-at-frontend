import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AddPost from '../pages/AddPost';
import Accomadation from '../pages/Accomadation';
import Budget from '../pages/Budget';
import Contact from '../pages/Contact';
import BudgetForm from "../pages/BudgetForm";
import UserProfile from "../pages/UserProfile";
import BudgetDetail from "../pages/BudgetDetail";
import AccomadationForm from "../pages/AccomadationForm";


export default function NavLinks() {

    return(
        <Routes>
            <Route path="/" element={<Home /> } />
            <Route path='/add-post' element={ <AddPost /> } />
            <Route path='/accomadation' element={ <Accomadation /> } />
            <Route path='/budget' element={ <Budget /> } />
            <Route path='/contact' element={ <Contact /> } />
            <Route path="/budget/budget-form" element={ <BudgetForm />} />
            <Route path="/budget/accommadation-form" element={ <AccomadationForm />} />
        </Routes>
    )
}