import { api } from "./api";
import { Notepad } from "../../../shared/types";

export async function getNotepads(): Promise<Notepad[]> {
  const res = await api.get("/notepads");
  const notepads = res.data;
  return notepads;
}
