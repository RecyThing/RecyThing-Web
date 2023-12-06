import * as yup from "yup";

export const schema = yup.object().shape({
  category: yup
    .string()
    .required("Topik harus dipilih"),
  question: yup
    .string()
    .required("Pertanyaan tidak boleh kosong")
    .max(500, "Pertanyaan tidak boleh lebih dari 500 karakter"),
});
