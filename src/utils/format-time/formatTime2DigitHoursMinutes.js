export const formatTime2DigitHoursMinutes = (value) => {
	let newFormatTime = []
    if (!value) {
		return "";
	}

    for (let index = 0; index < 5; index++) {
        newFormatTime.push(value[index]);
        
    }
	return (
        newFormatTime.join("")
	);
};