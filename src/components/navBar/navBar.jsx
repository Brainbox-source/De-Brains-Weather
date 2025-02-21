import React from "react";

const NavBar = ({ renderLinks }) => (
    <div className="bg-black/15 backdrop-blur-sm flex items-center justify-between px-10 py-2 rounded-full">
        <div className="flex items-center gap-1">
            <img src="src/assets/weather.svg" alt="Weather logo" className="w-[45px] h-[45px]" />
            Weather by Brainbox
        </div>

      <nav>
        <ul className="flex gap-5">{renderLinks()}</ul>
      </nav>
    </div>
);

export default NavBar;
