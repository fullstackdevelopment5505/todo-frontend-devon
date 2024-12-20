import React from 'react';
import Link from 'next/link';

type Task = {
  id: number;
  title: string;
  color: string;
  completed: boolean;
};

type TaskCardProps = {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onToggle }) => {
  return (
    <li className="flex items-center p-4 border-b border-gray-200">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id, task.completed)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      <span className={`ml-2 flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`} style={{ color: task.color }}>
        {task.title}
      </span>
      <Link href={`/edit/${task.id}`} legacyBehavior>
        <a className="ml-4 text-blue-500 hover:underline">Edit</a>
      </Link>
      <button
        className="ml-4 text-red-500 hover:underline"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskCard;