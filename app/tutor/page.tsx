// Chat con el tutor (conoce mis estadísticas).

import ChatUI from "@/components/ChatUI";
import { allRows } from "@/lib/db";
import { getTodayISO } from "@/lib/data";
import { listReadings } from "@/lib/tutor-context";

export default async function TutorChatPage() {
  await getTodayISO(); // marca la página como dinámica (lee la base de datos)
  const messages = allRows<{ role: "user" | "assistant"; content: string }>(
    "SELECT role, content FROM chat_messages ORDER BY id"
  );
  const readings = listReadings().map((r) => ({
    id: r.id,
    label: r.topicName ? `${r.name} — ${r.topicName}` : r.name,
  }));
  return <ChatUI initialMessages={messages} readings={readings} />;
}
