interface StopButtonProps {
    status?: String;
    onClick: () => void;
}

export default function StopButton({ status, onClick }: StopButtonProps) {
    return (
        
    <button
        onClick={onClick}
        className={`w-19 h-19 font-bold rounded-full text-center cursor-pointer text-white ${
            status === "Pausado"
                ? "bg-green-600"
                : status === "Desconectado"
                ? "bg-gray-500"
                : "bg-red-500"
        }`}
    >
        {status === "Pausado" ? "INICIAR" : status === "Desconectado" ? "-" : "PARAR"}
    </button>

    );
}

