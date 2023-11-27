export const formatDateToLocalDate = (date) => {
	if (!date) return null;
	return new Date(date).toLocaleDateString("id-ID", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};
