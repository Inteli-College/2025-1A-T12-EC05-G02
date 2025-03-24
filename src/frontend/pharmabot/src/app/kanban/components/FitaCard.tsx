'use client'
import { Fita as Fita } from '../utils/data-task'
import Image from 'next/image'

const filaStatusIcon = <Image src="/circle0.svg" alt="low" width={24} height={24} />
const emPreparoIcon = <Image src="/circle1.svg" alt="medium" width={24} height={24} />
const separadoIcon = <Image src="/circle2.svg" alt="high" width={24} height={24} />


const FitaCard = ({ fita: fita, updateFita: updateTask }: {
    fita: Fita
    updateFita: (task: Fita) => void
}) => {

    return <div
        draggable
        onDragStart={(e) => {
            e.dataTransfer.setData("id", fita.id)
        }}
        className={`rounded-lg m-2 bg-gray-50 ${fita.priority === 'high' ? 'border-4 border-red-500' : ''}`}
    >
        <div className={`border-2  px-4 py-2 ${fita.priority === 'high' ? 'rounded-sm' : 'rounded-lg'}`}>

            <div className="flex flex-col text-black text-sm">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <div className="text-2xl font-base">
                            {fita.nomePaciente}
                        </div>
                        <div className="text-xs text-[19191B] yt-2 font-light">
                            Leito: {fita.leito}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center py-2">
                        <div className="flex gap-2 items-center text-xl">
                            {fita.status === 'fila' && filaStatusIcon}
                            {fita.status === 'em-preparo' && emPreparoIcon}
                            {fita.status === 'separado' && separadoIcon}
                            <div >
                                {fita.status === 'fila' && "1/3"}
                                {fita.status === 'em-preparo' && "2/3"}
                                {fita.status === 'separado' && "3/3"}
                            </div>
                        </div>
                        <div className="flex gap-2 items-center py-2">
                            <div className="w-6 h-6">
                                <svg viewBox="0 0 24 24" fill={fita.priority === 'high' ? 'red' : fita.priority === 'medium' ? 'orange' : 'green'} xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                            </div>
                            <div className="text-base text-black ">
                                {fita.priority === 'high' && "Alta"}
                                {fita.priority === 'medium' && "Média"}
                                {fita.priority === 'low' && "Baixa"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col pb-2">
                    <div className="text-base font-semibold">Medicamentos:</div>
                    <ol className="list-decimal list-inside px-4 my-1">
                        {fita.medicamentos.map((medicamento, index) => (
                            <li key={index} className="text-sm mt-1 text-gray-700">
                                {medicamento.nome} - Quantidade: {medicamento.quantidade}
                                {index !== fita.medicamentos.length - 1 && (
                                    <hr className="border-t border-gray-300 my-2" />
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    </div>
}

export default FitaCard