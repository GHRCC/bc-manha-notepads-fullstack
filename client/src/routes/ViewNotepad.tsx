import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { LinkButton } from "../components/LinkButton";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { api } from "../api";

export function ViewNotepad() {
  const params = useParams();
  const navigate = useNavigate();
  const [notepad, setNotepad] = useState({
    id: params.id,
    title: "",
    subtitle: "",
    content: "",
    created_at: "",
  });

  useEffect(() => {
    api.get(`/notepads/${params.id}`).then((res) => {
      const notepad = res.data;
      setNotepad(notepad);
    });
  }, []);

  return (
    <div className="bg-white p-4 md:max-w-screen-md md:mx-auto m-4 md:m-8 rounded-lg shadow-lg flex flex-col">
      <Breadcrumbs
        links={[
          { title: "Página inicial", link: "/" },
          { title: notepad.title, link: `/publicacoes/${params.id}` },
        ]}
      />
      <span className="text-gray-500 my-2">#{notepad.id}</span>
      <time className="text-gray-500 text-sm" dateTime={notepad.created_at}>
        {new Date(notepad.created_at).toLocaleDateString()}
      </time>
      <h1 className="text-2xl font-bold">{notepad.title}</h1>
      <p className="mb-4">{notepad.subtitle}</p>
      <p>{notepad.content}</p>
      <div className="mt-4 flex flex-row gap-2">
        <Button
          className="bg-red-500 hover:bg-red-600"
          onClick={async () => {
            const res = await api.delete(`/notepads/${params.id}`);
            const deleteNotepadResponse = res.data;

            if (deleteNotepadResponse.success) {
              toast("O notepad foi deletado com sucesso!");
              navigate("/");
            } else {
              toast("Houve um erro ao deletar o seu notepad. :(");
            }
          }}
        >
          Deletar
        </Button>
        <LinkButton to={`/publicacoes/editar/${params.id}`}>Editar</LinkButton>
      </div>
    </div>
  );
}
