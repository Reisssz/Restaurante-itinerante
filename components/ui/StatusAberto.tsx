"use client";

import { useEffect, useState } from "react";
import { calcularStatus, type StatusFuncionamento } from "@/lib/horario";

export function useStatusFuncionamento(): StatusFuncionamento | null {
  const [status, setStatus] = useState<StatusFuncionamento | null>(null);

  useEffect(() => {
    const atualizar = () => setStatus(calcularStatus());
    atualizar();
    const intervalo = window.setInterval(atualizar, 60_000);
    return () => window.clearInterval(intervalo);
  }, []);

  return status;
}

interface Props {
  className?: string;
}

/** "Aberto agora · até 16h" — calculado no navegador, no fuso de São Paulo. */
export function StatusAberto({ className = "" }: Props) {
  const status = useStatusFuncionamento();

  return (
    <p className={`inline-flex min-h-6 items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className={`pulso relative inline-block size-2.5 rounded-full after:absolute after:inset-0 after:rounded-full after:bg-current ${
          status?.aberto ? "bg-current" : "border-2 border-current after:hidden"
        }`}
      />
      <span className={status ? "" : "opacity-0"}>{status?.texto ?? "Consultando horário"}</span>
    </p>
  );
}
