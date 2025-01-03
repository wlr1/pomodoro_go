import React from "react";
import { FaUser } from "react-icons/fa";
import { PiGithubLogo } from "react-icons/pi";
import { VscSettings } from "react-icons/vsc";

import { UserMenuProps } from "@/app/utility/types/types";

const UserMenu: React.FC<UserMenuProps> = ({
  setOpenUISettings,
  setOpenAccSettings,
}) => {
  return (
    <div className="bg-main rounded-md w-[155px] h-[150px] absolute top-[45px] right-2 shadow-xl shadow-gray-700   z-[9999]">
      {/* account settings */}
      <div
        className="flex gap-2 cursor-pointer p-2 z-[9999]"
        onClick={setOpenAccSettings}
      >
        <FaUser size={12} className="my-auto" />
        <span className="">My account</span>
      </div>
      {/* divider */}
      <div className="h-[1px] w-full bg-white/25"></div>

      {/* appearance settings */}
      <div
        className="flex gap-2 cursor-pointer p-2"
        onClick={setOpenUISettings}
      >
        <VscSettings className="my-auto" />
        <span className="">Appearance</span>
      </div>

      {/* divider */}
      <div className="h-[1px] w-full bg-white/25"></div>

      <div className="flex justify-center p-6 ">
        <a href="https://github.com/wlr1" target="_blank">
          <PiGithubLogo />
        </a>
      </div>
    </div>
  );
};

export default UserMenu;
