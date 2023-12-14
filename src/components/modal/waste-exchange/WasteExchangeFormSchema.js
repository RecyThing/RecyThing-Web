import * as yup from "yup";

export const schema = yup.object().shape({
    username: yup
        .string()
        .required("Nama pengguna tidak boleh kosong")
        .matches(/^[a-zA-Z ]*$/, "Nama Pengguna tidak boleh mengandung simbol & angka")
        .min(2, "Nama tidak boleh kurang dari 2 karakter")
        .max(100, "Nama tidak boleh kurang dari 100 karakter"),
    userEmail: yup
        .string()
        .required("Email tidak boleh kosong")
        .min(5, "Email tidak valid"),
    dropPointLocation: yup
        .string()
        .required("Lokasi drop point tidak boleh kosong")
        .min(5, "Lokasi drop point tidak boleh kurang dari 5 karakter"),
    data: yup.array().of(
        yup.object().shape({
            trash_type: yup
                .string()
                .required("Jenis sampah harus dipilih"),
            amount: yup
                .number()
                .typeError("Satuan tidak boleh kosong")
                .required("Satuan tidak boleh kosong")
                .min(1, "Satuan tidak boleh kurang dari 1")
                .max(99, "Satuan tidak boleh lebih dari 99"),
        })
    ),
});
