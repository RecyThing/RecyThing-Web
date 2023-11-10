import { ArrowDown2 } from "iconsax-react";
import { ArrowLeftSquare, ArrowRightSquare } from "react-iconly";

// eslint-disable-next-line react/prop-types
export default function TopBar({ onHide, hide }) {
  return (
    <div className="flex items-center bg-white fixed z-50" style={topBarStyle}>
      <nav className="flex items-center w-full my-2 mx-3 h-11 gap-x-1">
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
        <div className="flex justify-end items-center w-full gap-x-1">
          <div className="flex items-center gap-x-2">
            <img
              className="h-8 w-8 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIwRBD9gNuA2GjcOf6mpL-WuBhJADTWC3QVQ&usqp=CAU"
              alt="profile"
            />
            <div className="text-info">
              <p className="text-xs font-medium">Admin Recything</p>
              <p style={emailStyle}>admin123@gmail.com</p>
            </div>
          </div>
          <ArrowDown2 color="gray" size={16} />
        </div>
      </nav>
    </div>
  );
}

const emailStyle = {
  fontSize: "10px",
};
const topBarStyle = {
  width: "-webkit-fill-available",
  borderBottom: "1px solid #C7C9D9",
};
