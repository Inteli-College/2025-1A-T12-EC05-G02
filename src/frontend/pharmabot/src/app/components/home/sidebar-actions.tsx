"use client";

import { PillBottle, Clipboard, Clock4, FileClock, PackageOpen, User } from "lucide-react";
import ButtonSidebar from "./subcomponents/button-sidebar";

// Define a função fora do componente para torná-la acessível
const handleClickButton = () => {
  console.log("click");
};

export default function SidebarActions() {
  return (
    <div className="bg-white rounded-md shadow-md w-[100%] h-[100%] pb-4 justify-center items-center">
      <div className="flex flex-col space-y-4 w-[100%]">
        <h1 className="self-start text-3xl p-6"><strong>AÇÕES:</strong></h1>
      </div>

      <div className="flex flex-col space-y-4 justify-center items-center">
        <ButtonSidebar icon={Clipboard} label="FITAS DE MEDICAMENTOS" onClick={handleClickButton} />
        <ButtonSidebar icon={PackageOpen} label="ESTOQUE" onClick={handleClickButton} />
        <ButtonSidebar icon={Clock4} label="HISTÓRICO DE PRESCRIÇÕES" onClick={handleClickButton} />
        <ButtonSidebar icon={FileClock} label="HISTÓRICO DE LOGS" onClick={handleClickButton} />
        <ButtonSidebar icon={PillBottle} label="BINS" onClick={handleClickButton} />
        <ButtonSidebar icon={User} label="USUÁRIOS" onClick={handleClickButton} />
      </div>
    </div>
  );
}

