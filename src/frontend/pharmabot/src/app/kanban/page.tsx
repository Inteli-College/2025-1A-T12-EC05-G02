"use client"
import { useState, useEffect } from 'react';
import TaskCard from './components/TaskCard'
import { Status, statuses, Task } from './utils/data-task'


export default function Kanban() {

    const [tasks, setTasks] = useState<Task[]>([])
    const columns = statuses.map((status) => {
        const tasksInColumn = tasks.filter((task) => task.status === status)
        return {
            status,
            tasks: tasksInColumn
        }
    })
    const tasksMock: Task[] = [
        {
            title: 'task 1',
            id: '1',
            status: 'todo',
            priority: 'low',
            points: 1,
            order: 0
        },
        {
            title: 'task 2',
            id: '2',
            status: 'in-progress',
            priority: 'medium',
            points: 2,
            order: 0
        },
        {
            title: 'task 3',
            id: '3',
            status: 'done',
            priority: 'high',
            points: 3,
            order: 0
        }
    ]

    useEffect(() => {
        // fetch('http://localhost:3000/tasks').then((res) => res.json()).then((data) => {
        //     setTasks(data)
        // })
        // Task = {
        //     title: string;
        //     id: string;
        //     status: Status;
        //     priority: Priority;
        //     points?: number;
        // }

        // mock data

        setTasks(tasksMock)
    }, [])

    const updateTask = (task: Task) => {
        fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const updatedTasks = tasks.map((t) => {
            return t.id === task.id ? task : t
        })
        setTasks(updatedTasks)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
        e.preventDefault()
        setCurrentlyHoveringOver(null)
        const id = e.dataTransfer.getData("id")
        const task = tasks.find((task) => task.id === id)
        if (task) {
            updateTask({ ...task, status })
        }
    }

    const handleTaskReorder = (e: React.DragEvent<HTMLDivElement>, columnStatus: Status, targetTaskId: string) => {
        e.preventDefault();
        const draggedTaskId = e.dataTransfer.getData("id");
        if (draggedTaskId === targetTaskId) return;

        const columnTasks = tasks.filter((task) => task.status === columnStatus).sort((a, b) => a.order - b.order);

        const draggedTaskIndex = columnTasks.findIndex((task) => task.id === draggedTaskId);
        const targetTaskIndex = columnTasks.findIndex((task) => task.id === targetTaskId);

        if (draggedTaskIndex !== -1 && targetTaskIndex !== -1) {
            const updatedColumnTasks = [...columnTasks];
            const [draggedTask] = updatedColumnTasks.splice(draggedTaskIndex, 1);
            updatedColumnTasks.splice(targetTaskIndex, 0, draggedTask);

            // Atualizar o campo `order` das tarefas
            updatedColumnTasks.forEach((task, index) => {
                task.order = index;
            });

            // Atualizar o estado global das tarefas
            const updatedTasks = tasks.map((task) => {
                if (task.status === columnStatus) {
                    return updatedColumnTasks.find((t) => t.id === task.id) || task;
                }
                return task;
            });

            setTasks(updatedTasks);
        }
    };

    const [currentlyHoveringOver, setCurrentlyHoveringOver] = useState<Status | null>(null)
    const handleDragEnter = (status: Status) => {
        setCurrentlyHoveringOver(status)
    }

    return (
        <div className='flex flex-col h-screen w-full '>
            <header className='flex w-full justify-between items-center h-24 bg-black'>
                <img className="h-10 ml-4" src="./pharmatech-logo.png"></img>
                <div className='flex gap-4 text-white p-4'>
                    <p className='hover:text-gray-300 cursor-pointer'>Home</p>
                    <p className='hover:text-gray-300 cursor-pointer'>Dashboard</p>
                    <p className='hover:text-gray-300 cursor-pointer'>Histórico Prescrições</p>
                    <p className='hover:text-gray-300 cursor-pointer'>FAQ</p>
                </div>
            </header>

            <div className="flex justify-center py-4 w-full font-inter bg-[#FFFBFF]">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x w-full">
                    {columns.map((column, index) => (
                        <div
                            key={index}
                            className="flex-1 h-screen"
                            onDrop={(e) => handleDrop(e, column.status)}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={() => handleDragEnter(column.status)}
                        >
                            <div className="flex text-xl md:text-3xl p-2 font-bold text-white justify-center">
                                <h2 className="capitalize bg-[#3F3047] p-3 rounded-xl">{column.status}</h2>
                            </div>
                            <div className={`h-full mt-4 ${currentlyHoveringOver === column.status ? 'bg-gray-100' : ''}`}>
                                {column.tasks
                                    .sort((a, b) => a.order - b.order) // Ordena as tarefas antes de renderizar
                                    .map((task, index) => (
                                        <div
                                            key={task.id}
                                            draggable
                                            onDragStart={(e) => e.dataTransfer.setData("id", task.id)}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => handleTaskReorder(e, column.status, task.id)}
                                        >
                                            <TaskCard
                                                task={task}
                                                updateTask={updateTask}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
}