function formatISODateToCustomFormat(isoDate: string): string {
	const date = new Date(isoDate);

	const options: Intl.DateTimeFormatOptions = {
		year: "2-digit",
		month: "short",
		day: "2-digit",
	};

	const formattedDate = date.toLocaleString("en-US", options);

	const hours = date.getUTCHours().toString().padStart(2, "0");
	const minutes = date.getUTCMinutes().toString().padStart(2, "0");
	const time = `${hours}:${minutes}`;

	return `${formattedDate}, ${time}`;
}

export default formatISODateToCustomFormat;
