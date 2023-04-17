import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "../components/TextField";
import { TextArea } from "../components/TextArea";
import { api } from "../api";

const initialCreateNotepad = {
  title: "",
  subtitle: "",
  content: "",
};

export function EditNotepad() {
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialCreateNotepad);

  useEffect(() => {
    api.get(`/notepads/${params.id}`).then((results) =>
      setForm({
        title: results.data.title,
        subtitle: results.data.subtitle,
        content: results.data.content,
      })
    );
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Editar notepad</h1>
      <form
        className="flex flex-col gap-2 mx-2 md:mx-auto md:max-w-screen-md"
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await api.put(`/notepads/${params.id}`, form);
          if (response.data.success) {
            toast("O notepad foi editado com sucesso!");
            navigate("/");
          } else {
            toast("Houve um erro ao editar o seu notepad. :(");
          }
        }}
      >
        <TextField
          placeholder="Digite o título"
          value={form.title}
          onChange={(title) => setForm({ ...form, title })}
        />
        <TextField
          placeholder="Digite o subtítulo"
          value={form.subtitle}
          onChange={(subtitle) => setForm({ ...form, subtitle })}
        />
        <TextArea
          placeholder="Digite o conteúdo"
          value={form.content}
          onChange={(content) => setForm({ ...form, content })}
        />
        <button
          type="submit"
          className="bg-green-400 hover:bg-green-500 text-white py-2 px-3 rounded-md uppercase font-bold text-sm shadow-lg"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
