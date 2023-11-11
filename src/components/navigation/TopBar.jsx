import { ArrowDown2 } from "iconsax-react";
import { ArrowLeftSquare, ArrowRightSquare } from "react-iconly";

// eslint-disable-next-line react/prop-types
export default function TopBar({ onHide, hide }) {
  return (
    <div className="flex items-center bg-white fixed z-50" style={topBarStyle}>
      <nav className="flex items-center w-full my-2 mx-4 h-11 gap-x-1">
        {hide ? (
          <ArrowRightSquare
            className="cursor-pointer"
            color="gray"
            onClick={() => onHide(false)}
          />
        ) : (
          <ArrowLeftSquare
            className="cursor-pointer"
            color="gray"
            onClick={() => onHide(true)}
          />
        )}
        <div className="flex justify-end items-center w-full gap-x-2">
          <div className="flex items-center gap-x-2">
            <img
              className="h-9 w-9 rounded-full"
              src="https://i.ibb.co/4s1Pzd9/image.png"
              alt="profile"
            />
            <div className="text-info">
              <p className="text-xs font-medium" style={nameStyle}>Admin Recything</p>
              <p style={emailStyle}>admin123@gmail.com</p>
            </div>
          </div>
          <ArrowDown2 color="gray" size={16} />
        </div>
      </nav>
    </div>
  );
}
const nameStyle = {
  lineHeight: "1.2rem"
}

const emailStyle = {
  fontSize: "10px",
  color: "#828282",
  lineHeight: "1rem"
};
const topBarStyle = {
  width: "-webkit-fill-available",
  borderBottom: "1px solid #C7C9D9",
};
