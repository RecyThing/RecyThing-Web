import { useState } from "react";
import recyThingLogo from "@/assets/recything-logo.png";
import miniLogo from "@/assets/logo.png";
import { SideBarItem } from "./SideBarItem";
import { sideBarMenuArray } from "./menuData";
import PropTypes from 'prop-types';

export function SideBar({ collapse, setCollapse }) {
	const [expandedMenu, setExpandedMenu] = useState("");

	return (
		<div className={`fixed px-6 pt-8 transition-all ${collapse ? 'w-[96px] min-w-[96px]' : 'w-[312px] min-w-[312px]'} bg-white z-10 min-h-screen border-r border-[#C7C9D9]`}>
			<img onClick={() => setCollapse(prev => !prev)} className="mx-auto transition-all" src={collapse ? miniLogo : recyThingLogo} alt="recyThingLogo" />
			<div className="my-8 h-[1px] w-full bg-[#3BA639]" />
			<div className="flex flex-col gap-4">
				{sideBarMenuArray.map((item, index) => <SideBarItem {...item} expandedMenu={expandedMenu} 
				setExpandedMenu={setExpandedMenu} sideBarCollapse={collapse} setCollapse={setCollapse} key={index} />)}
			</div>
		</div>
	);
}

SideBar.propTypes = {
	collapse: PropTypes.bool,
	setCollapse: PropTypes.func,
}