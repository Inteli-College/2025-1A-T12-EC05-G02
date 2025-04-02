'use client'

import { Fita } from '../utils/data-task'
import Image from 'next/image'
import React from 'react'

const StatusIcon = React.memo(({ src, alt }: { src: string; alt: string }) => (
    <Image src={src} alt={alt} width={24} height={24} />
))

const PriorityIndicator = ({ priority }: { priority: '3' | '2' | '1' }) => {
    const color = priority == '3' ? 'red' : priority == '2' ? 'orange' : 'green'
    const label = priority == '3' ? 'Alta' : priority == '2' ? 'Média' : 'Baixa'

    return (
        <div className="flex gap-2 items-center py-2">
            <div className="w-6 h-6">
                <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" />
                </svg>
            </div>
            <div className="text-base text-black">{label}</div>
        </div>
    )
}

const FitaCard = ({
    fita,
    updateFita,
}: {
    fita: Fita
    updateFita: (task: Fita) => void
}) => {

    const statusProgress = {
        fila: '1/3',
        'em-preparo': '2/3',
        separado: '3/3',
    }

    function classNames(baseClass: string, conditionalClasses: { [key: string]: boolean }): string {
        const conditionalClassNames = Object.entries(conditionalClasses)
            .filter(([_, condition]) => condition)
            .map(([className]) => className)
            .join(' ')

        return `${baseClass} ${conditionalClassNames}`.trim()
    }
    return (
        <div
            draggable
            onDragStart={(e) => e.dataTransfer.setData('id', fita.id)}
            className={classNames('rounded-lg m-2 ', {
                'border-4 border-red-500': fita.priority == '3',
            })}
        >
            <div
                className={classNames('border-2 px-4 py-2', {
                    'rounded-sm': fita.priority == '3',
                    'rounded-lg': fita.priority != '3',
                })}
            >
                <div className="flex flex-col text-black text-sm">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col">
                            <div className="text-2xl font-base">{fita.nomePaciente}</div>
                            <div className="text-xs text-[19191B] yt-2 font-light">
                                Leito: {fita.leito}
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-center py-2">
                            <div className="flex gap-2 items-center text-xl">
                                <div>{statusProgress[fita.status]}</div>
                            </div>
                            <PriorityIndicator priority={fita.priority} />
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
    )
}

export default React.memo(FitaCard)