export const formatDateToLocalDate = (date, monthFormat = "long", dayFormat = "numeric") => {
	if (!date) return null;
	const localDate = new Date(date);
	localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
	return localDate.toLocaleDateString("id-ID", {
		year: "numeric",
		month: monthFormat,
		day: dayFormat,
	});
};
