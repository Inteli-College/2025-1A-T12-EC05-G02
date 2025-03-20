"use client"

interface StatusCardProps {
  urgency: number;
  quantity: number;
  onClick: () => void;
}

const urgencyInfos = [
    ["[#80C7A3]", ["Novo(s)", "Pedidos para serem separados"]],
    ["[#1696DE]", ["Separado(s)", "Pedidos aguardando separação"]],
    ["[#DE1619]", ["Recusado(s)", "Pedidos aguardando verificação"]]
]

export default function StatusCard({ urgency, quantity, onClick }: StatusCardProps) {
  // Garante que a urgência esteja dentro do intervalo esperado
  const colorClasses = urgencyInfos[urgency][0] || "border-gray-500 bg-gray-500";
    console.log(urgencyInfos[urgency][1][0]);
  const quantityIndicator = urgencyInfos[urgency][1][0] || [""];
  const description = urgencyInfos[urgency][1][1] || [""];

  return (
    <div
        className={`relative flex flex-col justify-between items-center h-[150px] w-[300px] p-3 rounded-sm bg-${colorClasses}`}
        onClick={onClick}
    >
        <div className="text-left w-[90%]">
            <div className="flex items-center justify-left mb-2 text-white">
                <h2 className="text-4xl font-bold mr-2 text-white">{quantity}</h2>
                <h3 className="text-lg text-white">{quantityIndicator}</h3>
            </div>
            <p className="text-sm text-white">{description}</p>
        </div>
        <button
            className={`bg-white text-${colorClasses} font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-all`}>
            Verificar
        </button>
    </div>
);

}