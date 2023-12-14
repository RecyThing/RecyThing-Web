import * as yup from "yup";

export const schema = yup.object().shape({
	title: yup
		.string()
		.required("Nama event komunitas tidak boleh kosong")
		.max(50, "Nama event komunitas tidak boleh lebih dari 50 karakter")
		.min(5, "Nama event komunitas tidak boleh kurang dari 5 karakter")
		.matches(/^[a-zA-Z0-9 ]*$/, "Nama event komunitas tidak boleh mengandung simbol"),
	image: yup
		.mixed()
		.required("Gambar event komunitas tidak boleh kosong")
		.test("fileFormat", "Format gambar tidak valid", (value) => {
			const validTypes = ["image/jpeg", "image/jpg", "image/png"];
			if (value[0] instanceof File) {
				return validTypes.includes(value[0].type);
			} else if (typeof value === "string") {
				return validTypes.some((type) => value.toLowerCase().endsWith(type.slice(6)));
			}
			return false;
		})
		.test("fileSize", "Ukuran gambar tidak boleh lebih dari 5 MB", (value) => {
			if (value[0] instanceof File) {
				return value[0].size <= 5000000;
			}
			return true;
		}),
	description: yup.string().required("Deskripsi event komunitas tidak boleh kosong").max(250, "Deskripsi event komunitas tidak boleh lebih dari 250 karakter"),
	location: yup
		.string()
		.required("Lokasi event komunitas tidak boleh kosong")
		.max(25, "Lokasi event komunitas tidak boleh lebih dari 25 karakter")
		.min(2, "Lokasi event komunitas tidak boleh kurang dari 2 karakter")
		.matches(/^[a-zA-Z0-9 ]*$/, "Lokasi event komunitas tidak boleh mengandung simbol"),
	quota: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.required("Kuota maksimal event komunitas tidak boleh kosong")
		.min(1, "Kuota maksimal event komunitas tidak boleh kurang dari 1")
		.max(9999, "Kuota maksimal event komunitas tidak boleh lebih dari 9999"),
	date: yup.date().required("Tanggal event komunitas tidak boleh kosong").min(new Date(), "Tanggal event komunitas tidak boleh kurang dari hari ini"),
	maplink: yup.string().required("Link Google Maps event komunitas tidak boleh kosong"),
	formlink: yup.string().required("Link Google Form event komunitas tidak boleh kosong"),
	status: yup.string().required("Status event komunitas tidak boleh kosong"),
});
