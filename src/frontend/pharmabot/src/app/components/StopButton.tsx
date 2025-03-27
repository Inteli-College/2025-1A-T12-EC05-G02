interface StopButtonProps {
    status?: String;
    onClick: () => void;
}

export default function StopButton({ status, onClick }: StopButtonProps) {
    return (
        
    <button
        onClick={onClick}
        className={`w-19 h-19 font-bold rounded-full text-center cursor-pointer ${
            status === "Pausado"
                ? "bg-yellow-500 text-black"
                : status === "Desconectado"
                ? "bg-gray-500 text-white"
                : "bg-red-500 text-white"
        }`}
    >
        PARAR
    </button>

    );
}

