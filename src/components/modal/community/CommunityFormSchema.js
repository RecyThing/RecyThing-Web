import * as yup from "yup";

export const schema = yup.object().shape({
	name: yup
		.string()
		.required("Nama komunitas tidak boleh kosong")
		.max(25, "Nama komunitas tidak boleh lebih dari 25 karakter")
		.min(5, "Nama komunitas tidak boleh kurang dari 5 karakter")
		.matches(/^[a-zA-Z0-9 ]*$/, "Nama komunitas tidak boleh mengandung simbol"),
	image: yup
		.mixed()
		.required("Gambar komunitas tidak boleh kosong")
		.test("fileFormat", "Format gambar tidak valid", (value) => {
			const validTypes = ["image/jpeg", "image/jpg", "image/png"];
			if (value[0] instanceof File) {
				return validTypes.includes(value[0].type);
			} else if (typeof value === "string") {
				return validTypes.some((type) =>
					value.toLowerCase().endsWith(type.slice(6))
				);
			}
			return false;
		})
		.test("fileSize", "Ukuran gambar tidak boleh lebih dari 5 MB", (value) => {
			if (value[0] instanceof File) {
				return value[0].size <= 5000000;
			}
			return true;
		}),
	description: yup
		.string()
		.required("Deskripsi komunitas tidak boleh kosong")
		.max(500, "Deskripsi komunitas tidak boleh lebih dari 500 karakter"),
	location: yup
		.string()
		.required("Lokasi komunitas tidak boleh kosong")
		.max(50, "Lokasi komunitas tidak boleh lebih dari 50 karakter")
		.min(5, "Lokasi komunitas tidak boleh kurang dari 5 karakter")
		.matches(
			/^[a-zA-Z0-9 ]*$/,
			"Lokasi komunitas tidak boleh mengandung simbol"
		),
	max_members: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.required("Maksimal anggota komunitas tidak boleh kosong")
		.min(1, "Maksimal anggota tidak boleh kurang dari 1")
		.max(99999, "Poin komunitas tidak boleh lebih dari 99999"),
});
