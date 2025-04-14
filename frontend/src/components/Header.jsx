import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { IoIosMenu } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { MdHome } from "react-icons/md";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  console.log('home page : ', isHomePage);

  return (
    <header className="fixed h-[10%] right-0 left-0 px-6 py-3 flex justify-between items-center bg-[var(--main-background-color)]">
      <div className="text-2xl gap-[2vw] flex items-center justify-between">
        <div className="text-gray-50">
          Hi, <span className="text-white font-semibold">Ahmed</span>
        </div>
        <span>&#x1F44B;</span>
      </div>

      <div className="gap-[5vw] flex items-center justify-between text-2xl">
        {!isHomePage && (
          <Link   to="/">
              
            <IconContext.Provider value={{ size: 32, color: "#915eff", className: "lol" }}>
                
                <div>
                    <MdHome/>
                </div>

            </IconContext.Provider>

          </Link>
        )}
      
        
        <FaBell color='white' size={22}/>
        <IoIosMenu color='white' size={35}/>
      
      </div>
    </header>
  );
};

export default Header;