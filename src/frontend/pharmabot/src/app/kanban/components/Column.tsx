import React from "react";
import FitaCard from "./FitaCard";
import { Fita, Status } from "../utils/data-task";

interface ColumnProps {
    status: Status;
    fitas: Fita[];
    currentlyHoveringOver: Status | null;
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
    fitas,
    handleTaskReorder,
    setDraggedTaskId,
    setHoveredIndex,
    hoveredIndex,
    draggedTaskId,
    updateTask: updateFita,
}) => {
    return (
        <div className="flex-1 h-full flex flex-col">
            <div className="flex text-xl md:text-3xl p-2 font-bold text-white justify-center">
                <h2 className="capitalize bg-[#3F3047] p-3 rounded-xl">
                    {status}
                </h2>
            </div>
            <div
                className="flex-1 mt-4 overflow-y-auto max-h-[calc(100vh-200px)] flex-grow"
            >
                {fitas
                    .sort((a, b) => a.order - b.order)
                    .map((fita, index) => (
                        <div
                            key={index}
                            draggable={status === "fila"} // Apenas itens na coluna "fila" podem ser arrastados
                            onDragStart={(e) => {
                                if (status === "fila") {
                                    e.dataTransfer.setData("id", fita.id);
                                    setDraggedTaskId(fita.id);
                                }
                            }}
                            onDragOver={(e) => {
                                if (status === "fila") {
                                    e.preventDefault();
                                    setHoveredIndex(index);
                                }
                            }}
                            onDragLeave={() => {
                                if (status === "fila") {
                                    setHoveredIndex(null);
                                }
                            }}
                            onDrop={(e) => {
                                if (status === "fila") {
                                    handleTaskReorder(e, status, fita.id);
                                    setHoveredIndex(null);
                                }
                            }}
                            className={`transition-all duration-200 ${
                                hoveredIndex === index &&
                                draggedTaskId !== fita.id &&
                                status === "fila"
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
