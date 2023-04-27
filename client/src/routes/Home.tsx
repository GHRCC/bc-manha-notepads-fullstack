import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { NotepadList } from "../components/NotepadList";
import { PaginationButtons } from "../components/PaginationButtons";
import { getNotepads } from "../api/getNotepads";
import type { Notepad } from "../../../shared/types";
import { config } from "../config";
import { createUrlParams } from "../createUrlParams";

const texts = {
  searchPlaceholder: "Pesquisar notepads...",
};

const pageSize = config.pageSize;

const initialNotepadList = {
  count: 0,
  notepads: [] as Notepad[],
};

export function Home() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || undefined;
  const [search, setSearch] = useState(initialSearch ?? "");
  const [notepadList, setNotepadList] = useState(initialNotepadList);
  const pageCount = Math.ceil(notepadList.count / pageSize);
  const pageParams = createUrlParams({ search });

  useEffect(() => {
    getNotepads({
      offset: 0,
      limit: pageSize,
      search: search.length > 0 ? search : undefined,
    }).then((notepadList) => {
      setNotepadList(notepadList);
    });
  }, [search]);

  return (
    <div className="md:max-w-screen-md md:mx-auto md:m-8 m-3">
      <div className="mb-3 flex flex-row items-center gap-2 py-2 px-4 rounded-3xl border shadow-lg bg-white">
        <FaSearch />
        <input
          className="outline-none flex-1 bg-transparent"
          type="search"
          value={search}
          placeholder={texts.searchPlaceholder}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      <NotepadList notepads={notepadList.notepads} />
      <div className="mt-3">
        <PaginationButtons
          currentPage={1}
          pageCount={pageCount}
          getLink={(page) => {
            if (page === 1) {
              return "/";
            }
            return `/notepads/page/${page}${pageParams}`;
          }}
        />
      </div>
    </div>
  );
}
