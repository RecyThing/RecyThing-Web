import * as yup from "yup";

export const schema = yup.object().shape({
  trash_type: yup
    .string()
    .required("Nama jenis sampah tidak boleh kosong")
    .max(25, "Nama jenis sampah tidak boleh lebih dari 25 karakter")
    .min(1, "Nama jenis sampah tidak boleh kurang dari 5 karakter")
    .matches(/^[a-zA-Z ]*$/, "Nama jenis sampah tidak boleh mengandung simbol & angka"),
  point: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue.trim() === "" ? undefined : value;
    })
    .required("Poin reward tidak boleh kosong")
    .min(1, "Poin reward tidak boleh kurang dari 1")
    .max(99999, "Poin reward tidak boleh lebih dari 99999"),
  unit: yup
    .string()
    .required("Satuan tidak boleh kosong")
});
