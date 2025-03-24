"use client";
import { useState, useEffect } from "react";
import Column from "./components/Column";
import { Status, statuses, Fita } from "./utils/data-task";

export default function Kanban() {
    const [fitas, setTasks] = useState<Fita[]>([]);
    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [currentlyHoveringOver, setCurrentlyHoveringOver] =
        useState<Status | null>(null);

    const tasksMock: Fita[] = [
        { title: "task 1", id: "1", status: "fila", priority: "low", points: 1, order: 0 },
        { title: "task 2", id: "2", status: "em-preparo", priority: "medium", points: 2, order: 0 },
        { title: "task 3", id: "3", status: "separado", priority: "high", points: 3, order: 0 },
        { title: "task 3", id: "4", status: "separado", priority: "high", points: 3, order: 0 },
        { title: "task 3", id: "5", status: "separado", priority: "high", points: 3, order: 0 },
        { title: "task 3", id: "6", status: "separado", priority: "high", points: 3, order: 0 },
    ];

    useEffect(() => {
        setTasks(tasksMock);
    }, []);

    const updateFita = (fitas: Fita) => {
        const updatedTasks = fitas.map((t) => (t.id === fitas.id ? fitas : t));
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

        const columnFitaks = fitas
            .filter((task) => task.status === columnStatus)
            .sort((a, b) => a.order - b.order);

        const draggedTaskIndex = columnFitaks.findIndex(
            (task) => task.id === draggedFitaId
        );
        const targetTaskIndex = columnFitaks.findIndex(
            (task) => task.id === targetFitaId
        );

        if (draggedTaskIndex !== -1 && targetTaskIndex !== -1) {
            const updatedColumnTasks = [...columnFitaks];
            const [draggedTask] = updatedColumnTasks.splice(draggedTaskIndex, 1);
            updatedColumnTasks.splice(targetTaskIndex, 0, draggedTask);

            updatedColumnTasks.forEach((task, index) => {
                task.order = index;
            });

            const updatedTasks = fitas.map((task) => {
                if (task.status === columnStatus) {
                    return (
                        updatedColumnTasks.find((t) => t.id === task.id) || task
                    );
                }
                return task;
            });

            setTasks(updatedTasks);
        }
    };

    const handleDragEnter = (status: Status) => {
        setCurrentlyHoveringOver(status);
    };

    const columns = statuses.map((status) => ({
        status,
        tasks: fitas.filter((task) => task.status === status),
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
                            fitas={column.tasks}
                            currentlyHoveringOver={currentlyHoveringOver}
                            handleDrop={handleDrop}
                            handleDragEnter={handleDragEnter}
                            handleTaskReorder={handleFitaReorder}
                            setDraggedTaskId={setDraggedTaskId}
                            setHoveredIndex={setHoveredIndex}
                            hoveredIndex={hoveredIndex}
                            draggedTaskId={draggedTaskId}
                            updateTask={updateFita}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}