export function formatDateToISOString(date) {
	if (!date) return null;
	const localDate = new Date(date);
	localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
	return localDate.toISOString().slice(0, 10);
}
