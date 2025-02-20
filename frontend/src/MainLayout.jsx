import React from "react";
import Sidenav from "./components/Sidenav";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex h-screen w-screen"> 
          <div className="w-[25%]"> {/* Sidenav width */}
            <Sidenav />
          </div>
          <div className="w-[75%]"> {/* Main content width */}
            <Outlet />              {/* will render the nested route components */}
          </div>
        </div>
    );
  };
  
  export default MainLayout;
  