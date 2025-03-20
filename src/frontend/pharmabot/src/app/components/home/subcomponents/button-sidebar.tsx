import { LucideIcon } from "lucide-react";

// Tipagem para as props do componente
interface ButtonSidebarProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

// Componente de botão reutilizável
export default function ButtonSidebar({ icon: Icon, label, onClick }: ButtonSidebarProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-4 w-[90%] ">
      <button
        onClick={onClick}
        className="flex justify-center items-center gap-2 bg-[#0099e5] text-white py-3 px-4 w-[100%] rounded-md font-medium hover:bg-[#0088cc] transition-colors"
      >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </button>
    </div>
  );
}

// Exemplo de uso
// <ButtonSidebar icon={Clipboard} label="FITAS DE MEDICAMENTOS" onClick={handleClick} />