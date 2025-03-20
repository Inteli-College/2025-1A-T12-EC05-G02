"use client";

import {
  PillBottle,
  Clipboard,
  Clock4,
  FileClock,
  PackageOpen,
  User,
} from "lucide-react";
import ButtonSidebar from "./subcomponents/button-sidebar";

import { redirect } from "next/navigation";

interface StatusCardProps {
  onClick: () => void;
}

const routes = ["fitas-de-medicamentos", "estoque", "historico-de-prescricoes", "historico-logs", "bins", "usuarios"];

// Define a função fora do componente para torná-la acessível
export default function SidebarActions({ onClick }: StatusCardProps) {
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
          onClick={() => redirect(routes[0])}
        />
        <ButtonSidebar icon={PackageOpen} 
        label="ESTOQUE" 
        onClick={() => redirect(routes[1])} 
        />
        <ButtonSidebar
          icon={Clock4}
          label="HISTÓRICO DE PRESCRIÇÕES"
          onClick={() => redirect(routes[2])}
        />
        <ButtonSidebar
          icon={FileClock}
          label="HISTÓRICO DE LOGS"
          onClick={() => redirect(routes[3])}
        />
        <ButtonSidebar 
        icon={PillBottle} 
        label="BINS" 
        onClick={() => redirect(routes[4])} 
        />
        <ButtonSidebar 
        icon={User} 
        label="USUÁRIOS" 
        onClick={() => redirect(routes[5])} 
        />
      </div>
    </div>
  );
}