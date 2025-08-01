import { createServerFn } from "@tanstack/react-start";
import { fetchWaka } from "~/lib/fetchWaka";

export const getTodayStats = createServerFn({}).handler(async () => {
  const fn = fetchWaka(["status_bar", "today"], []);
  return await (await fn()).json();
});

export const getSevenDayStats = createServerFn({}).handler(async () => {
  const fn = fetchWaka(["stats", "last_7_days"], []);
  return await (await fn()).json();
});

getTodayStats();
