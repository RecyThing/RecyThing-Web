import * as yup from "yup";

export const schema = yup.object().shape({
	missionTitle: yup
		.string()
		.required("Nama misi tidak boleh kosong")
		.max(100, "Nama misi tidak boleh lebih dari 100 karakter")
		.min(5, "Nama misi tidak boleh kurang dari 5 karakter")
		.matches(/^[a-zA-Z0-9 ]*$/, "Nama misi tidak boleh mengandung simbol"),
	missionPoint: yup
		.number()
		.transform((value, originalValue) => {
			return originalValue.trim() === "" ? undefined : value;
		})
		.required("Poin misi tidak boleh kosong")
		.min(1, "Poin misi tidak boleh kurang dari 1")
		.max(99999, "Poin misi tidak boleh lebih dari 99999"),
	missionImage: yup
		.mixed()
		.required("Gambar misi tidak boleh kosong")
		.test("fileFormat", "Format gambar tidak valid", (value) => {
			const validTypes = ["image/jpeg", "image/jpg", "image/png"];
			return value && validTypes.includes(value.type);
		})
		.test("fileSize", "Ukuran gambar tidak boleh lebih dari 5 MB", (value) => {
			return value && value.size <= 5000000;
		}),
	missionDescription: yup
		.string()
		.required("Deskripsi misi tidak boleh kosong")
		.max(100, "Deskripsi misi tidak boleh lebih dari 100 karakter"),
	missionStartDate: yup
		.date()
		.required("Tanggal mulai misi tidak boleh kosong")
		.test(
			"start-date",
			"Tanggal mulai misi harus sebelum tanggal berakhir misi",
			function (value) {
				const { missionEndDate } = this.parent;
				if (value && missionEndDate) {
					return new Date(value) < new Date(missionEndDate);
				}
				return true;
			}
		),
	missionEndDate: yup
		.date()
		.required("Tanggal berakhir misi tidak boleh kosong")
		.test(
			"end-date",
			"Tanggal berakhir misi harus setelah tanggal mulai misi",
			function (value) {
				const { missionStartDate } = this.parent;
				if (value && missionStartDate) {
					return new Date(value) > new Date(missionStartDate);
				}
				return true;
			}
		),
		missionTitleStage: yup
		.string()
		.required("Tahapan / Tantangan judul misi tidak boleh kosong")
		.max(100, "Tahapan / Tantangan judul misi tidak boleh lebih dari 100 karakter")
		.min(5, "Tahapan / Tantangan juduk misi tidak boleh kurang dari 5 karakter")
		.matches(/^[a-zA-Z0-9 ]*$/, "Tahapan / Tantangan Judul misi tidak boleh mengandung simbol"),
		missionDescriptionStage: yup
		.string()
		.required("Tahapan / Tantangan deskripsi misi tidak boleh kosong")
		.max(250, "Tahapan / Tantangan deskripsi misi tidak boleh lebih dari 250 karakter")
		.min(5, "Tahapan / Tantangan deskripsi misi tidak boleh kurang dari 5 karakter")
		.matches(/^[a-zA-Z0-9 ]*$/, "Tahapan / Tantangan Deskripsi tidak boleh mengandung simbol"),
});
