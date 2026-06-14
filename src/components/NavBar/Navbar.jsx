import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({setIsSidebarOpen}) => {
  return (
    <section className="border border-gray-300">
       <div className="flex justify-between items-center p-2 md:p-4">
         
         {/* {logo and hamburger} */}
         <div className="flex justify-between items-center gap-4">
            <div>
              <button onClick={() => setIsSidebarOpen(prev => !prev)}>
                <GiHamburgerMenu size={24} />
              </button>
              
            </div>
            <div>
              <h1 className="hidden md:block md:text-2xl md:font-bold">Marketing Birbal</h1>
            </div>
         </div>

         {/* {sign-up} */}
         <div>
            <FaUserCircle size={24} />
         </div>
       </div>
    </section>
  )
}

export default Navbar