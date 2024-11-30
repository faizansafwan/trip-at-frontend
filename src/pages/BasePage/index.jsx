import { FaBars } from "react-icons/fa";
import Header from "../../components/Header";
import LeftNav from "../../components/LeftNavigation";
import Accomadation from "../Accomadation";
import AddPost from "../AddPost";
import Budget from "../Budget";
import Contact from "../Contact";
import Home from "../Home";
import { useState } from "react";
import BudgetForm from "../BudgetForm";
import BudgetDetail from "../BudgetDetail";

export default function BasePage() {

  const [hideNav, setHideNav] = useState(false);


  const hideAndShow = () => {
    setHideNav(!hideNav);
  }  

    let currentPage;
    switch(window.location.pathname) {
      case "/":
        currentPage = <Home />
        break;
      case "/add-post": 
        currentPage = <AddPost />
        break;
      case "/accomadation":
        currentPage = <Accomadation />
        break;
      case "/contact":
        currentPage = <Contact />
        break;
      case "/budget":
        currentPage = <Budget />
        break;
      case "/budget/budget-detail":
        currentPage = <BudgetDetail />
        break;
      case "/budget/budget-form":
        currentPage = <BudgetForm />
        break;
  
    }

    return(
        <div className="w-full"> 
            <div className="relative">
              <div className="z-[100]">
                 <Header />
              </div>
             
              <div className="fixed top-0 left-4 flex h-[50px] items-center z-[200] lg:hidden">
                  <FaBars size={24} onClick={hideAndShow}  />
              </div>
            </div>

            <div className="flex gap-5 w-full">
                <div className={`mt-[50px]  ${hideNav ? 'block' : 'hidden'} lg:block`}>
                    <LeftNav />
                </div>

                <div className="w-full lg:ml-[17%] z-[50]">
                    {currentPage}
                </div>
            </div>
        </div>
    )
}