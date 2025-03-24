"use client";
import { useState, useEffect } from "react";
import Column from "./components/Column";
import { Status, statuses, Fita } from "./utils/data-task";

export default function Kanban() {
    const [fitas, setTasks] = useState<Fita[]>([]);
    const [draggedFitasId, setDraggedFitasId] = useState<string | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [currentlyHoveringOver, setCurrentlyHoveringOver] =
        useState<Status | null>(null);

        const fitasMock: Fita[] = [
            {
                nomePaciente: "João Silva",
                id: "1",
                status: "fila",
                priority: "low",
                order: 0,
                leito: "101A",
                medicamentos: [
                    { nome: "Paracetamol", quantidade: 2 },
                    { nome: "Ibuprofeno", quantidade: 1 }
                ]
            },
            {
                nomePaciente: "Maria Oliveira",
                id: "2",
                status: "em-preparo",
                priority: "medium",
                order: 1,
                leito: "102B",
                medicamentos: [
                    { nome: "Amoxicilina", quantidade: 3 }
                ]
            },
            {
                nomePaciente: "Carlos Souza",
                id: "3",
                status: "separado",
                priority: "high",
                order: 2,
                leito: "103C",
                medicamentos: [
                    { nome: "Dipirona", quantidade: 1 },
                    { nome: "Omeprazol", quantidade: 2 }
                ]
            },
            {
                nomePaciente: "Ana Costa",
                id: "4",
                status: "separado",
                priority: "high",
                order: 3,
                leito: "104D",
                medicamentos: [
                    { nome: "Losartana", quantidade: 1 }
                ]
            },
            {
                nomePaciente: "Pedro Lima",
                id: "5",
                status: "separado",
                priority: "high",
                order: 4,
                leito: "105E",
                medicamentos: [
                    { nome: "Metformina", quantidade: 2 },
                    { nome: "Insulina", quantidade: 1 }
                ]
            },
            {
                nomePaciente: "Fernanda Alves",
                id: "6",
                status: "separado",
                priority: "high",
                order: 5,
                leito: "106F",
                medicamentos: [
                    { nome: "Atorvastatina", quantidade: 1 }
                ]
            },
        ];

    useEffect(() => {
        setTasks(fitasMock);
    }, []);

    const updateFita = (updatedFita: Fita) => {
        const updatedTasks = fitas.map((t) => (t.id === updatedFita.id ? updatedFita : t));
        setTasks(updatedTasks);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
        e.preventDefault();
        setHoveredIndex(null);
        setCurrentlyHoveringOver(null);
        const id = e.dataTransfer.getData("id");
        const fita = fitas.find((fitas) => fitas.id === id);
        if (fita) {
            updateFita({ ...fita, status });
        }
    };

    const handleFitaReorder = (
        e: React.DragEvent<HTMLDivElement>,
        columnStatus: Status,
        targetFitaId: string
    ) => {
        e.preventDefault();
        const draggedFitaId = e.dataTransfer.getData("id");
        if (draggedFitaId === targetFitaId) return;

        const columnFitas = fitas
            .filter((fita) => fita.status === columnStatus)
            .sort((a, b) => a.order - b.order);

        const draggedFitasIndex = columnFitas.findIndex(
            (fita) => fita.id === draggedFitaId
        );
        const targetFitasIndex = columnFitas.findIndex(
            (fita) => fita.id === targetFitaId
        );

        if (draggedFitasIndex !== -1 && targetFitasIndex !== -1) {
            const updatedColumnFitas = [...columnFitas];
            const [draggedTask] = updatedColumnFitas.splice(draggedFitasIndex, 1);
            updatedColumnFitas.splice(targetFitasIndex, 0, draggedTask);

            updatedColumnFitas.forEach((fita, index) => {
                fita.order = index;
            });

            const updatedFitas = fitas.map((fita) => {
                if (fita.status === columnStatus) {
                    return (
                        updatedColumnFitas.find((t) => t.id === fita.id) || fita
                    );
                }
                return fita;
            });

            setTasks(updatedFitas);
        }
    };

    const handleDragEnter = (status: Status) => {
        setCurrentlyHoveringOver(status);
    };

    const columns = statuses.map((status) => ({
        status,
        fitas: fitas.filter((fita) => fita.status === status),
    }));

    return (
        <div className="flex flex-col h-screen w-full">
            <header className="flex w-full justify-between items-center h-24 bg-black">
                <img
                    className="h-10 ml-4"
                    src="./pharmatech-logo.png"
                    alt="Pharmatech Logo"
                />
                <div className="flex gap-4 text-white p-4">
                    <p className="hover:text-gray-300 cursor-pointer">Home</p>
                    <p className="hover:text-gray-300 cursor-pointer">Dashboard</p>
                    <p className="hover:text-gray-300 cursor-pointer">Histórico Prescrições</p>
                    <p className="hover:text-gray-300 cursor-pointer">FAQ</p>
                </div>
            </header>

            <div className="flex flex-1 justify-center py-4 w-full font-inter bg-[#FFFBFF]">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x w-full">
                    {columns.map((column, index) => (
                        <Column
                            key={index}
                            status={column.status}
                            fitas={column.fitas}
                            currentlyHoveringOver={currentlyHoveringOver}
                            handleDrop={handleDrop}
                            handleDragEnter={handleDragEnter}
                            handleTaskReorder={handleFitaReorder}
                            setDraggedTaskId={setDraggedFitasId}
                            setHoveredIndex={setHoveredIndex}
                            hoveredIndex={hoveredIndex}
                            draggedTaskId={draggedFitasId}
                            updateTask={updateFita}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}