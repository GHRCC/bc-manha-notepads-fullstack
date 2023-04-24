import { useState, useEffect } from "react";
import { NotepadList } from "../components/NotepadList";
import { LinkButton } from "../components/LinkButton";
import { getNotepads } from "../api/getNotepads";
import type { Notepad } from "../../../shared/types";

const pageSize = 10;

const initialNotepadList = {
  count: 0,
  notepads: [] as Notepad[],
};

export function Home() {
  const [notepadList, setNotepadList] = useState(initialNotepadList);
  const pageCount = Math.ceil(notepadList.count / pageSize);
  const pageList = Array.from({ length: pageCount }, (_, index) => index + 1);
  console.log(pageList);

  useEffect(() => {
    getNotepads().then((notepadList) => {
      setNotepadList(notepadList);
    });
  }, []);

  return (
    <div className="md:max-w-screen-md md:mx-auto md:m-8">
      <NotepadList notepads={notepadList.notepads} />
      <div className="flex flex-row gap-2 justify-center p-2 bg-white md:p-0 md:bg-transparent md:mt-2 md:justify-start">
        {pageList.map((page) => (
          <LinkButton key={page} to={`/notepads/page/${page}`}>
            {page}
          </LinkButton>
        ))}
      </div>
    </div>
  );
}
