import * as yup from "yup";

export const schema = yup.object().shape({
    username: yup
        .string()
        .required("Nama pengguna tidak boleh kosong")
        .matches(/^[a-zA-Z ]*$/, "Nama Pengguna tidak boleh mengandung simbol & angka"),
    userEmail: yup
        .string()
        .required("Email tidak boleh kosong"),
    dropPointLocation: yup
        .string()
        .required("Lokasi drop point tidak boleh kosong"),

      
});
