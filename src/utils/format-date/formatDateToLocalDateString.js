export function formatDateToLocalDateString(date) {
	if (!date) return null;
	return new Date(date).toLocaleDateString("id-ID");
}
