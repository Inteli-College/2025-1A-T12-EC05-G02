"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Column from "./components/Column";
import { Status, statuses, Fita, RobotStatus } from "./utils/data-task";
import Header from "../components/Header";
import { Socket } from "dgram";

export default function Kanban() {
    const [fitas, setTasks] = useState<Fita[]>([]);
    const [draggedFitasId, setDraggedFitasId] = useState<string | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [currentlyHoveringOver, setCurrentlyHoveringOver] =
        useState<Status | null>(null);

    // Base Url backend
    const baseUrl = "http://0.0.0.0:5555";

    const [robotStatus, setRobotStatus] = useState<RobotStatus>({
        x: 0,
        y: 0,
        z: 0,
        status: "Desconectado"
    });

    useEffect(() => {
        fetch(`${baseUrl}/medicine/queue`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Dados de fitas recebidos", data);
                const updatedFitas: Fita[] = data.queue.map((fita: Fita) => ({
                    ...fita,
                    status: mapStatus(fita.status), // Mapeie o status para os valores esperados
                }));
                setTasks(updatedFitas);
            })
            .catch((error) => {
                console.error("Erro ao buscar dados de fitas", error);
            });
    }, []);

    const mapStatus = (status: string): Status => {
        switch (status) {
            case "Pendente":
                return "fila";
            case "Separando":
                return "em-preparo";
            case "Completo":
                return "separado";
            default:
                return "fila"; // Valor padrão
        }
    };

    const socket = io(baseUrl);

    useEffect(() => {

        socket.on("connect", () => {

            console.log("Conectado ao Socket.IO");
        });

        socket.on("fitas", (data) => {
            console.log("Dados de fitas recebidos", data);
            const updatedFitas: Fita[] = data;
            setTasks(updatedFitas);
        });

        socket.on("robotStatusFront", (data) => {
            console.log("Status do robô recebido", data);
            //{status: 'Conectado', x: 275.34912109375, y: 69.3950424194336, z: 80}
            setRobotStatus(data);
        });

        socket.on("medicineResponse", (data) => {
            let idFita = data.idFita;

            let fita = fitas.find((fita) => fita.id === idFita);
            if (fita) {
                switch (data.status) {
                    case "Pendente":
                        updateFita({ ...fita, status: "fila" });
                        break;
                    case "Separando":
                        updateFita({ ...fita, status: "em-preparo" });
                        break;
                    case "Completo":
                        updateFita({ ...fita, status: "separado" });
                        break;
                    default:
                        break;
                }
            }
        });

        socket.on("connect_error", (error) => {
            console.error("Erro na conexão com Socket.IO", error);
        });

        socket.on("disconnect", () => {
            console.log("Conexão Socket.IO fechada");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const updateFita = (updatedFita: Fita) => {
        const updatedTasks = fitas.map((t) => (t.id === updatedFita.id ? updatedFita : t));
        setTasks(updatedTasks);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
        e.preventDefault();
        setHoveredIndex(null);
        setCurrentlyHoveringOver(null);

        const isDraggableColumn = statuses.find((s) => s === status) === "fila";
        if (!isDraggableColumn) return;

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
        <div className=" h-screen w-full overflow-hidden">
            <Header dashboard={true} status={robotStatus.status} coordinates={
                { x: robotStatus!.x, y: robotStatus!.y, z: robotStatus!.z }
            } isActive={robotStatus.status === 'Desconectado' ? false : true} onStopClick={() => {
                socket.emit("stopRobot", { data: "stop" });
            }
            } />

            <div className="justify-center py-4 w-full font-inter bg-[#FFFBFF] h-full">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x w-full h-full">
                    {columns.map((column, index) => (
                        <Column
                            key={index}
                            status={column.status}
                            fitas={column.fitas}
                            currentlyHoveringOver={currentlyHoveringOver}
                            isDraggable={column.status === "fila"}
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