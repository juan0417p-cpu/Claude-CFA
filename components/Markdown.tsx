// Muestra texto en Markdown (las respuestas del tutor) con estilos simples.

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed text-slate-800 [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1 [&_h1]:text-base [&_h1]:font-semibold [&_h2]:text-base [&_h2]:font-semibold [&_h3]:font-semibold [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-slate-100 [&_pre]:p-3 [&_table]:w-full [&_table]:text-left [&_td]:border-t [&_td]:border-slate-200 [&_td]:py-1 [&_th]:py-1 [&_ul]:list-disc [&_ul]:pl-5">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
