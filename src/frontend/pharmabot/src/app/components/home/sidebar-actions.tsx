"use client";

import {
  PillBottle,
  Clipboard,
  Clock4,
  FileClock,
  PackageOpen,
  User,
} from "lucide-react";
import ButtonSidebar from "./button-sidebar";
import { useRouter } from "next/navigation";

const routes = [
  "fitas-de-medicamentos",
  "estoque",
  "historico-de-prescricoes",
  "historico-logs",
  "bins",
  "usuarios",
];

export default function SidebarActions() {
  const router = useRouter(); // Inicializa o hook para navegação

  return (
    <div className="bg-white rounded-md shadow-md w-[100%] h-[100%] pb-4 justify-center items-center">
      <div className="flex flex-col space-y-4 w-[100%]">
        <h1 className="self-start text-3xl p-6">
          <strong>AÇÕES:</strong>
        </h1>
      </div>

      <div className="flex flex-col space-y-4 justify-center items-center">
        <ButtonSidebar
          icon={Clipboard}
          label="FITAS DE MEDICAMENTOS"
          onClick={() => router.push(routes[0])}
        />
        <ButtonSidebar
          icon={PackageOpen}
          label="ESTOQUE"
          onClick={() => router.push(routes[1])}
        />
        <ButtonSidebar
          icon={Clock4}
          label="HISTÓRICO DE PRESCRIÇÕES"
          onClick={() => router.push(routes[2])}
        />
        <ButtonSidebar
          icon={FileClock}
          label="HISTÓRICO DE LOGS"
          onClick={() => router.push(routes[3])}
        />
        <ButtonSidebar
          icon={PillBottle}
          label="BINS"
          onClick={() => router.push(routes[4])}
        />
        <ButtonSidebar
          icon={User}
          label="USUÁRIOS"
          onClick={() => router.push(routes[5])}
        />
      </div>
    </div>
  );
}