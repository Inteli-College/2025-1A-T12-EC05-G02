"use client";

import { Box, Clipboard, Clock4, FileClock, PackageOpen, User } from "lucide-react";
import ButtonSidebar from "./subcomponents/button-sidebar";

// Define a função fora do componente para torná-la acessível
const handleClickButton = () => {
  console.log("click");
};

export default function SidebarActions() {
  return (
    <div className="sidebar-actions h-[688px] w-[373px] bg-white rounded-md shadow-md">
      <div className="flex flex-col items-center justify-center h-[8%] " >
        <h1 className="self-start pl-4"><strong>AÇÕES:</strong></h1>
      </div>

      <div className="flex flex-col space-y-4 p-4">
        <ButtonSidebar icon={Clipboard} label="FITAS DE MEDICAMENTOS" onClick={handleClickButton} />
        <ButtonSidebar icon={PackageOpen} label="ESTOQUE" onClick={handleClickButton} />
        <ButtonSidebar icon={Clock4} label="HISTÓRICO DE PRESCRIÇÕES" onClick={handleClickButton} />
        <ButtonSidebar icon={FileClock} label="HISTÓRICO DE LOGS" onClick={handleClickButton} />
        <ButtonSidebar icon={Box} label="BINS" onClick={handleClickButton} />
        <ButtonSidebar icon={User} label="USUÁRIOS" onClick={handleClickButton} />
      </div>
    </div>
  );
}

