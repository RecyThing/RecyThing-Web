import * as yup from "yup";

export const schema = yup.object().shape({
	reward_name: yup
		.string()
		.required("Nama voucher tidak boleh kosong")
		.max(25, "Nama voucher tidak boleh lebih dari 25 karakter")
		.min(5, "Nama voucher tidak boleh kurang dari 5 karakter")
		.matches(/^[a-zA-Z0-9 ]*$/, "Nama voucher tidak boleh mengandung simbol"),
	point: yup
		.number()
		.required("Poin voucher tidak boleh kosong")
		.min(1, "Poin voucher tidak boleh kurang dari 1")
		.max(99999, "Poin voucher tidak boleh lebih dari 99999"),
	image: yup
		.mixed()
		.required("Gambar voucher tidak boleh kosong")
		.test("fileFormat", "Format gambar tidak valid", (value) => {
			const validTypes = ["image/jpeg", "image/jpg", "image/png"];
			return value && validTypes.includes(value[0].type);
		})
		.test("fileSize", "Ukuran gambar tidak boleh lebih dari 5 MB", (value) => {
			return value && value[0].size <= 5000000;
		}),
	description: yup
		.string()
		.required("Deskripsi voucher tidak boleh kosong")
		.max(100, "Deskripsi voucher tidak boleh lebih dari 100 karakter"),
	start_date: yup
		.date()
		.required("Tanggal mulai voucher tidak boleh kosong")
		.test(
			"start-date",
			"Tanggal mulai voucher harus sebelum tanggal berakhir voucher",
			function (value) {
				const { end_date } = this.parent;
				if (value && end_date) {
					return new Date(value) < new Date(end_date);
				}
				return true;
			}
		),
	end_date: yup
		.date()
		.required("Tanggal berakhir voucher tidak boleh kosong")
		.test(
			"end-date",
			"Tanggal berakhir voucher harus setelah tanggal mulai voucher",
			function (value) {
				const { start_date } = this.parent;
				if (value && start_date) {
					return new Date(value) > new Date(start_date);
				}
				return true;
			}
		),
});
