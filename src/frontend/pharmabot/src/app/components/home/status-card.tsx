"use client"

interface StatusCardProps {
  urgency: number;
  quantity: number;
  onClick: () => void;
}

const urgencyInfos: [string, [string, string]][] = [
    ["#80C7A3", ["Novo(s)", "Pedidos para serem separados"]],
    ["#1696DE", ["Separado(s)", "Pedidos aguardando verificação"]],
    ["#DE1619", ["Recusado(s)", "Pedidos com falha na montagem"]],
  ];
  
  export default function StatusCard({urgency, quantity, onClick}: StatusCardProps) {
    const urgencyInfo = urgencyInfos[urgency] ?? ["#gray", ["", ""]];
    const [color, [quantityIndicator, description]] = urgencyInfo;
  
    return (
      <div
        className="relative flex flex-col justify-between items-center h-[175px] w-[340px] p-3 rounded-sm"
        style={{ backgroundColor: color }}
        onClick={onClick}>
        
        <div className="text-left w-[90%]">
            <div className="flex items-center justify-left mb-2 text-white">
                <h2 className="text-4xl font-bold mr-2 text-white">{quantity}</h2>
                <h3 className="text-2xl text-white">{quantityIndicator}</h3>
            </div>
            <p className="text-lg text-white">{description}</p>
        </div>
        <button
            className={`bg-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-all mt-2`}
            style={{color: color}}>
            Verificar
        </button>
    </div>
);
}