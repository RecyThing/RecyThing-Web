import * as yup from "yup";

export const schema = yup.object().shape({
  image: yup
    .mixed()
    .required("Gambar admin tidak boleh kosong")
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
  fullname: yup
    .string()
    .required("Nama lengkap tidak boleh kosong")
    .max(25, "Nama lengkap tidak boleh lebih dari 25 karakter")
    .min(5, "Nama lengkap tidak boleh kurang dari 5 karakter")
    .matches(/^[a-zA-Z0-9 ]*$/, "Nama admin tidak boleh mengandung simbol"),
  email: yup
    .string()
    .required("Email tidak boleh kosong")
    .min(5, "Email tidak boleh kurang dari 5 karakter")
    .email("Email tidak valid"),
  password: yup
    .string()
    .required("Password tidak boleh kosong")
    .min(8, "Password tidak boleh kurang dari 8 karakter")
    .test(
      "password",
      "Password dan Konfirmasi Password harus sesuai",
      function (value) {
        const { confirm_password } = this.parent;
        if (value && confirm_password) {
          return value === confirm_password;
        }
        return true;
      }
    ),
  confirm_password: yup
    .string()
    .required("Konfirmasi password tidak boleh kosong")
    .min(8, "Konfirmasi password tidak boleh kurang dari 8 karakter")
    .test(
      "confirm_password",
      "Password dan Konfirmasi Password harus sesuai",
      function (value) {
        const { password } = this.parent;
        if (value && password) {
          return value === password;
        }
        return true;
      }
    ),
  status: yup.string().required("Status tidak boleh kosong"),
});
