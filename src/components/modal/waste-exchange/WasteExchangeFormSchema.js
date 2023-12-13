import * as yup from "yup";

export const schema = yup.object().shape({
    name: yup
        .string()
        .required("Nama pengguna tidak boleh kosong")
        .matches(/^[a-zA-Z ]*$/, "Nama Pengguna tidak boleh mengandung simbol & angka"),
    email: yup
        .string()
        .required("Email tidak boleh kosong"),
    drop_point_name: yup
        .string()
        .required("Lokasi drop point tidak boleh kosong"),  
});
