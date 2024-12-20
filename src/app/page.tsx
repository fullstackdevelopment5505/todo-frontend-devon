"use client";

import { useEffect, useState } from 'react';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import Link from 'next/link';

type Task = {
  id: number;
  title: string;
  color: string;
  completed: boolean;
};

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await api.get('/tasks');
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleToggle = async (id: number, completed: boolean) => {
    await api.put(`/tasks/${id}`, { completed: !completed });
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !completed } : task
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <Link href="/create" className="text-blue-500">
        Create Task
      </Link>
      <ul>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;