"use client"

interface StatusCardProps {
  urgency: number;
  quantity: number;
  onClick: () => void;
}

const urgencyInfos = [
    ["border-green-500 bg-green-400", ["Novo(s)", "Pedidos para serem separados"]],
    ["border-yellow-500 bg-yellow-400", ["Separado(s)", "Pedidos aguardando separação"]],
    ["border-red-500 bg-red-400", ["Recusado(s)", "Pedidos aguardando verificação"]]
]

export default function StatusCard({ urgency, quantity, onClick }: StatusCardProps) {
  // Garante que a urgência esteja dentro do intervalo esperado
  const colorClasses = urgencyInfos[urgency][0] || "border-gray-500 bg-gray-500";
    console.log(urgencyInfos[urgency][1][0]);
  const quantityIndicator = urgencyInfos[urgency][1][0] || [""];
  const description = urgencyInfos[urgency][1][1] || [""];

  return (
    <div
        className={`relative flex flex-col justify-center items-center h-[136px] w-[300px] p-4 border-2 rounded-md ${colorClasses}`}
        onClick={onClick}
    >
        <div className="text-center">
            <div className="flex items-center justify-center">
                <h2 className="text-4xl font-bold mr-2">{quantity}</h2>
                <h3 className="text-lg">{quantityIndicator}</h3>
            </div>
            <p className="text-sm">{description}</p>
        </div>
        <button
            className="absolute bottom-[-20px] bg-white text-green-600 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100"
        >
            Verificar
        </button>
    </div>
);

}