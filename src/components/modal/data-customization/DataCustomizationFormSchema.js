import * as yup from "yup";

export const schema = yup.object().shape({
  question: yup
    .string()
    .required("Pertanyaan tidak boleh kosong")
    .max(500, "Pertanyaan tidak boleh lebih dari 500 karakter"),
});
