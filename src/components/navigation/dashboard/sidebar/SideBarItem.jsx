import { PiCaretDown, PiCaretUp } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import recycleWhite from "@/assets/recycle-white.png";
import recycle from "@/assets/recycle.png";
import PropTypes from "prop-types";
import { authService } from "@/configs";

export function SideBarItem({
	name,
	logo,
	path,
	subMenu: _subMenu,
	sideBarCollapse,
	setCollapse,
	expandedMenu,
	setExpandedMenu,
}) {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	// filter sub menu based on admin role
	const role = authService.getAdminRole().role;
	const subMenu = _subMenu?.filter(
		(item) => item.role === role || role === "super_admin"
	);

	function handleClickMenu() {
		if (path) {
			navigate(path);
			setExpandedMenu("");
		} else setExpandedMenu((prev) => (prev === name ? "" : name));
		setCollapse(false);
	}

	const isSubMenuSelected =
		subMenu?.filter((e) => pathname.startsWith(e.path)).length > 0;


	if (sideBarCollapse)
		return (
			<div
				onClick={handleClickMenu}
				className={`cursor-pointer p-3 rounded-lg ${
					pathname.startsWith(path) || isSubMenuSelected
						? "bg-[#35CC33] text-white"
						: "hover:bg-slate-100"
				}`}
			>
				{name === "Transaksi Drop Point" ? (
					<img
						src={
							pathname.startsWith(path) || isSubMenuSelected ? recycleWhite : recycle
						}
						alt=""
						className="shrink-0 w-6 h-6"
					/>
				) : (
					logo
				)}
			</div>
		);

	return (
		<div className="cursor-pointer min-w-[263px]">
			<div
				onClick={handleClickMenu}
				className={`pl-4 pr-3 py-3 flex justify-between rounded-lg
      ${
				pathname === path || isSubMenuSelected
					? "bg-[#35CC33] text-white"
					: "hover:bg-slate-100"
			}`}
			>
				<div className="flex gap-4">
					{name === "Transaksi Drop Point" ? (
						<img
							src={
								pathname.startsWith(path) || isSubMenuSelected ? recycleWhite : recycle
							}
							alt=""
							className="shrink-0 w-6 h-6"
						/>
					) : (
						logo
					)}
					<p className="font-medium">{name}</p>
				</div>
				{!path ? (
					expandedMenu === name ? (
						<PiCaretUp className="my-auto" />
					) : (
						<PiCaretDown className="my-auto" />
					)
				) : (
					<></>
				)}
			</div>

			<div
				className={`overflow-hidden transition-all duration-[350ms] ${
					!path && expandedMenu === name
						? `mt-2 ${subMenu.length > 2 ? "h-[120px]" : "h-20"}`
						: "w-0 h-0"
				}`}
			>
				{subMenu?.map((item, index) => (
					<div
						onClick={() => navigate(item.path)}
						key={index}
						className={`pl-12 flex gap-4 py-2 rounded-lg 
          ${
						pathname.startsWith(item.path)
							? "text-white bg-[#35CC33]"
							: "hover:bg-slate-100"
					}`}
					>
						<div
							className={`rounded-full my-auto w-2 h-2 ${
								pathname.startsWith(item.path) ? "bg-white" : "bg-black"
							}`}
						/>
						<p className="overflow-hidden">{item.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}

SideBarItem.propTypes = {
	name: PropTypes.string.isRequired,
	logo: PropTypes.any.isRequired,
	path: PropTypes.string,
	subMenu: PropTypes.array,
	sideBarCollapse: PropTypes.bool,
	setCollapse: PropTypes.func,
	expandedMenu: PropTypes.string,
	setExpandedMenu: PropTypes.func,
};
