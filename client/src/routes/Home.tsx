import { useState, useEffect } from "react";
import { NotepadList } from "../components/NotepadList";
import { PaginationButtons } from "../components/PaginationButtons";
import { getNotepads } from "../api/getNotepads";
import type { Notepad } from "../../../shared/types";
import { config } from "../config";

const pageSize = config.pageSize;

const initialNotepadList = {
  count: 0,
  notepads: [] as Notepad[],
};

export function Home() {
  const [notepadList, setNotepadList] = useState(initialNotepadList);
  const pageCount = Math.ceil(notepadList.count / pageSize);

  useEffect(() => {
    getNotepads({
      offset: 0,
      limit: pageSize,
    }).then((notepadList) => {
      setNotepadList(notepadList);
    });
  }, []);

  return (
    <div className="md:max-w-screen-md md:mx-auto md:m-8 m-3">
      <NotepadList notepads={notepadList.notepads} />
      <div className="mt-3">
        <PaginationButtons
          currentPage={1}
          pageCount={pageCount}
          getLink={(page) => {
            if (page === 1) {
              return "/";
            }
            return `/notepads/page/${page}`;
          }}
        />
      </div>
    </div>
  );
}
