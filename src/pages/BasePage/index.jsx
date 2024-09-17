import Header from "../../components/Header";
import LeftNav from "../../components/LeftNavigation";
import Accomadation from "../Accomadation";
import AddPost from "../AddPost";
import Budget from "../Budget";
import Contact from "../Contact";
import Home from "../Home";

export default function BasePage() {

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
  
    }

    return(
        <div> 
            <div>
                <Header />
            </div>

            <div className="flex gap-2">
                <div className="w-[17%]">
                    <LeftNav />
                </div>

                <div>
                    {currentPage}
                </div>
            </div>
        </div>
    )
}