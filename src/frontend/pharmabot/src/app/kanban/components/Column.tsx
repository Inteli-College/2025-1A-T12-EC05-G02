import React from "react";
import FitaCard from "./FitaCard";
import { Fita, Status } from "../utils/data-task";

interface ColumnProps {
    status: Status;
    fitas: Fita[];
    currentlyHoveringOver: Status | null;
    handleDrop: (e: React.DragEvent<HTMLDivElement>, status: Status) => void;
    handleDragEnter: (status: Status) => void;
    handleTaskReorder: (
        e: React.DragEvent<HTMLDivElement>,
        columnStatus: Status,
        targetFitaId: string
    ) => void;
    setDraggedTaskId: (id: string | null) => void;
    setHoveredIndex: (index: number | null) => void;
    hoveredIndex: number | null;
    draggedTaskId: string | null;
    updateTask: (task: Fita) => void;
    isDraggable: boolean;
}

const Column: React.FC<ColumnProps> = ({
    status,
    fitas: fitas,
    currentlyHoveringOver,
    handleDrop,
    handleDragEnter,
    handleTaskReorder,
    setDraggedTaskId,
    setHoveredIndex,
    hoveredIndex,
    draggedTaskId,
    updateTask: updateFita,
    isDraggable, // Nova prop
}) => {
    return (
        <div
            className="flex-1 h-full flex flex-col"
            onDrop={(e) => handleDrop(e, status)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter(status)}
        >
            <div className="flex text-xl md:text-3xl p-2 font-bold text-white justify-center">
                <h2 className="capitalize bg-[#3F3047] p-3 rounded-xl">
                    {status}
                </h2>
            </div>
            <div
                className={`flex-1 mt-4 overflow-y-auto h-0 flex-grow ${
                    currentlyHoveringOver === status ? "bg-gray-100" : ""
                }`}
            >
                {fitas
                    .sort((a, b) => a.order - b.order)
                    .map((fita, index) => (
                        <div
                            key={index}
                            draggable={isDraggable} // Controla se o item é "draggable"
                            onDragStart={(e) => {
                                if (isDraggable) {
                                    e.dataTransfer.setData("id", fita.id);
                                    setDraggedTaskId(fita.id);
                                }
                            }}
                            onDragOver={(e) => {
                                if (isDraggable) {
                                    e.preventDefault();
                                    setHoveredIndex(index);
                                }
                            }}
                            onDragLeave={() => {
                                if (isDraggable) {
                                    setHoveredIndex(null);
                                }
                            }}
                            onDrop={(e) => {
                                if (isDraggable) {
                                    handleTaskReorder(e, status, fita.id);
                                    setHoveredIndex(null);
                                }
                            }}
                            className={`transition-all duration-200 ${
                                hoveredIndex === index &&
                                draggedTaskId !== fita.id && status == 'fila'
                                    ? "mt-8"
                                    : ""
                            }`}
                        >
                            <FitaCard fita={fita} updateFita={updateFita} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Column;