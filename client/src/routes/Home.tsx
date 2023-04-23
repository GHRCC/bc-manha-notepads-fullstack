import { useState, useEffect } from "react";
import { NotepadList } from "../components/NotepadList";
import { getNotepads } from "../api/getNotepads";
import type { Notepad } from "../../../shared/types";

const initialNotepadList: Notepad[] = [];

export function Home() {
  const [notepadList, setNotepadList] = useState(initialNotepadList);

  useEffect(() => {
    getNotepads().then((notepadList) => {
      setNotepadList(notepadList);
    });
  }, []);

  return (
    <div>
      <NotepadList notepads={notepadList} />
    </div>
  );
}
