'use client'
import { useState } from 'react'
import { Fita as Fita } from '../utils/data-task'
import Image from 'next/image'

const filaStatusIcon = <Image src="/circle0.svg" alt="low" width={24} height={24} />
const emPreparoIcon = <Image src="/circle1.svg" alt="medium" width={24} height={24} />
const separadoIcon = <Image src="/circle2.svg" alt="high" width={24} height={24}/>


const FitaCard = ({ fita: fita, updateFita: updateTask }: {
    fita: Fita
    updateFita: (task: Fita) => void
}) => {
    const points = fita.points || 0
    const updatePoints = (direction: 'up' | 'down') => {
        const fib = [0, 1, 2, 3, 5, 8, 13]
        const index = fib.indexOf(points)
        const nextIndex = direction === 'up' ? index + 1 : index - 1
        const newPoints = fib[nextIndex]
        if (newPoints) {
            updateTask({ ...fita, points: newPoints })
        }
    }
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
                    <div className="text-2xl font-base py-2">
                        {fita.title}
                    </div>
                    <div className="flex gap-2">
                        {fita.status === 'fila' && filaStatusIcon}
                        {fita.status === 'em-preparo' && emPreparoIcon}
                        {fita.status === 'separado' && separadoIcon}
                        <div>
                            {}
                            
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => updatePoints('up')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                    <button onClick={() => updatePoints('down')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10h14" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default FitaCard