/**
 * Utillity function to format a number with commas
 * @param {number} num - The number to format
 * @returns {string} The formatted number
 */
export function formatWithCommas(num) {
	const regex = /\B(?=(\d{3})+(?!\d))/g;
	return num.toString().replace(regex, ",");
}
