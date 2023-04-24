import { api } from "./api";
import { Notepad } from "../../../shared/types";

type GetNotepadsOutput = {
  count: number;
  notepads: Notepad[];
};

export async function getNotepads(): Promise<GetNotepadsOutput> {
  const res = await api.get("/notepads");
  const notepads = res.data;
  return notepads;
}
