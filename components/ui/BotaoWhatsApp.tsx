import { linkWhatsApp } from "@/lib/links";
import { IconeWhatsApp } from "./Icones";
import { Magnetico } from "./Magnetico";

interface Props {
  mensagem?: string;
  rotulo?: string;
  variante?: "tinta" | "chama";
  className?: string;
  magnetico?: boolean;
}

export function BotaoWhatsApp({
  mensagem,
  rotulo = "Pedir no WhatsApp",
  variante = "tinta",
  className = "",
  magnetico = true,
}: Props) {
  const botao = (
    <a
      href={linkWhatsApp(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      className={`botao botao-${variante} ${className}`}
    >
      <IconeWhatsApp className="size-[1.15em] shrink-0" />
      <span>{rotulo}</span>
      <span className="sr-only">(abre o WhatsApp em nova aba)</span>
    </a>
  );
  return magnetico ? <Magnetico>{botao}</Magnetico> : botao;
}
