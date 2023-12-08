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
    trash_type: yup
        .string()
        .required("Jenis sampah tidak boleh kosong"),
    unit: yup
        .number()
        .transform((value, originalValue) => {
            return originalValue.trim() === "" ? undefined : value;
        })
        .required("Satuan tidak boleh kosong")
        .min(1, "Satuan tidak boleh kurang dari 1")
        .max(99999, "Satuan tidak boleh lebih dari 99999"),
});
