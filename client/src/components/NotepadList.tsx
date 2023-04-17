import { Link } from "react-router-dom";

export type Notepad = {
  id: number;
  title: string;
  subtitle: string;
  created_at: string;
};

export type NotepadListProps = {
  notepads: Notepad[];
};

export function NotepadList({ notepads }: NotepadListProps) {
  return (
    <div className="bg-white p-4 w-full md:max-w-screen-md md:mx-auto md:m-8 md:rounded-lg md:shadow-lg">
      {notepads.map((notepadAtual) => {
        return (
          <Link to={`/publicacoes/${notepadAtual.id}`} key={notepadAtual.id}>
            <div key={notepadAtual.id} className="py-4 border-b">
              <time dateTime={notepadAtual.created_at}>
                {new Date(notepadAtual.created_at).toLocaleDateString()}
              </time>
              <h2 className="font-bold text-lg">{notepadAtual.title}</h2>
              <p>{notepadAtual.subtitle}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
