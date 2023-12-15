import * as yup from "yup";
/**
 * Schema for voucher form
 */
export const schema = yup.object().shape({
	reward_name: yup
		.string()
		.required("Nama voucher tidak boleh kosong")
		.max(25, "Nama voucher tidak boleh lebih dari 25 karakter")
		.min(2, "Nama voucher tidak boleh kurang dari 2 karakter")
		.matches(/^[a-zA-Z0-9 ]*$/, "Nama voucher tidak boleh mengandung simbol"),
	point: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.required("Poin voucher tidak boleh kosong")
		.min(1, "Poin voucher tidak boleh kurang dari 1")
		.max(999999, "Poin voucher tidak boleh lebih dari 999999"),
	image: yup
		.mixed()
		.required("Gambar voucher tidak boleh kosong")
		.test("fileFormat", "Format gambar tidak valid", (value) => {
			const validExtensions = [".jpg", ".png"];
			if (value[0] instanceof File) {
				const extension = "." + value[0].name.split(".").pop();
				return validExtensions.includes(extension);
			} else if (typeof value === "string") {
				return validExtensions.some((ext) => value.toLowerCase().endsWith(ext));
			}
			return false;
		})
		.test("fileSize", "Ukuran gambar tidak boleh lebih dari 5 MB", (value) => {
			if (value[0] instanceof File) {
				return value[0].size <= 5000000;
			}
			return true;
		}),
	description: yup.string().required("Deskripsi voucher tidak boleh kosong").max(250, "Deskripsi voucher tidak boleh lebih dari 250 karakter"),
	start_date: yup
		.date()
		.required("Tanggal mulai voucher tidak boleh kosong")
		.test("start-date", "Tanggal mulai voucher harus sebelum tanggal berakhir voucher", function (value) {
			const { end_date } = this.parent;
			if (value && end_date) {
				return new Date(value) < new Date(end_date);
			}
			return true;
		}),
	end_date: yup
		.date()
		.required("Tanggal berakhir voucher tidak boleh kosong")
		.test("end-date", "Tanggal berakhir voucher harus setelah tanggal mulai voucher", function (value) {
			const { start_date } = this.parent;
			if (value && start_date) {
				return new Date(value) > new Date(start_date);
			}
			return true;
		}),
});
