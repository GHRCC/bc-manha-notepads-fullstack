import { useState } from "react";
import toast from "react-simple-toasts";
import { useNavigate } from "react-router-dom";
import { TextField } from "../components/TextField";
import { TextArea } from "../components/TextArea";
import { api } from "../api";

const initialCreateNotepad = {
  title: "",
  subtitle: "",
  content: "",
};

export function CreateNotepad() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialCreateNotepad);
  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Criar notepad</h1>
      <form
        className="flex flex-col gap-2 mx-2 md:mx-auto md:max-w-screen-md"
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await api.post("/notepads", form);
          if (response.data.success) {
            toast("O notepad foi criado com sucesso!");
            navigate("/");
          } else {
            toast("Houve um erro ao criar o seu notepad. :(");
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
