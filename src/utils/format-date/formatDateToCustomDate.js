export const formatDateToCustomDate = (value) => {
	if (!value) {
		return "";
	}

	return (
		new Date(value).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
		}) +
		" | " +
		new Date(value).toLocaleTimeString("en-GB", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		})
	);
};
