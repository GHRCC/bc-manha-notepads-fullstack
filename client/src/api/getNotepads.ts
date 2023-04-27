import { api } from "./api";
import { Notepad } from "../../../shared/types";

type GetNotepadsInput = {
  limit?: number;
  offset?: number;
  search?: string;
};

type GetNotepadsOutput = {
  count: number;
  notepads: Notepad[];
};

export async function getNotepads(
  params: GetNotepadsInput = {}
): Promise<GetNotepadsOutput> {
  const res = await api.get("/notepads", {
    params,
  });
  const notepads = res.data;
  return notepads;
}
