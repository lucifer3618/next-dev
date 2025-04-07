const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("node:fs");
const mime = require("mime-types");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
};

const codeGenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [
    ],
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
});

export const GenAiCode = model.startChat({
    generationConfig: codeGenerationConfig,
    history: [
        {
            "role": "user",
            "parts": [
                { "text": "Generate a Project in React with js as file extention. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling,\nwithout any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\nalso you can use date-fns for date format and react-chartjs-2 chart, graph library\n\nReturn the response in JSON format with the following schema:\n{\n\"projectTitle\": \"\",\n\"explanation\": \"\",\n\"files\": {\n\"/App.js\": {\n\"code\": \"\"\n},\n...\n},\n\"generatedFiles\": []\n}\n\nHere’s the reformatted and improved version of your prompt:\n\nGenerate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\n\nReturn the response in JSON format with the following schema:\n\njson\nCopy code\n{\n\"projectTitle\": \"\",\n\"explanation\": \"\",\n\"files\": {\n\"/App.js\": {\n\"code\": \"\"\n},\n...\n},\n\"generatedFiles\": []\n}\nEnsure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:\nfiles:{\n\"/App.js\": {\n\"code\": \"import React from 'react';\\nimport './styles.css';\\nexport default function App() {\\n  return (\\n    <div className='p-4 bg-gray-100 text-center'>\\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\\n    </div>\\n  );\\n}\"\n}\n}\nAdditionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.\n\nWhen asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,\"firebase\",\"@google/generative-ai\" ) only when it required\n\nFor placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg\n-Add Emoji icons whenever needed to give good user experinence\n\nall designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags." }
            ]
        },
        {
            "role": "model",
            "parts": [
                { "text": "```json\n{\n  \"projectTitle\": \"Todo App\",\n  \"explanation\": \"This React Todo app allows users to create, manage, and track their tasks. It features a clean and intuitive Tailwind CSS interface, task prioritization, deadline setting, and status tracking. Users can add, edit, delete, and mark tasks as complete. The app is designed to be visually appealing and production-ready, offering a user-friendly experience for efficient task management. date-fns is used for date formatting, and react-chartjs-2 is used for visualizing task progress.\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"import React, { useState, useEffect } from 'react';\\nimport TodoList from './components/TodoList';\\nimport AddTodo from './components/AddTodo';\\nimport ChartComponent from './components/ChartComponent';\\n\\nfunction App() {\\n  const [todos, setTodos] = useState(() => {\\n    const storedTodos = localStorage.getItem('todos');\\n    return storedTodos ? JSON.parse(storedTodos) : [];\\n  });\\n\\n  useEffect(() => {\\n    localStorage.setItem('todos', JSON.stringify(todos));\\n  }, [todos]);\\n\\n  const addTodo = (text, priority, deadline) => {\\n    setTodos([...todos, { id: Date.now(), text, completed: false, priority, deadline }]);\\n  };\\n\\n  const toggleComplete = (id) => {\\n    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));\\n  };\\n\\n  const deleteTodo = (id) => {\\n    setTodos(todos.filter(todo => todo.id !== id));\\n  };\\n\\n  const editTodo = (id, newText, newPriority, newDeadline) => {\\n      setTodos(todos.map(todo =>\\n          todo.id === id ? { ...todo, text: newText, priority: newPriority, deadline: newDeadline } : todo\\n      ));\\n  };\\n\\n\\n  const completedTasksCount = todos.filter(todo => todo.completed).length;\\n  const totalTasksCount = todos.length;\\n\\n  return (\\n    <div className=\\\"container mx-auto p-4\\\">\\n      <h1 className=\\\"text-3xl font-bold text-center mb-4\\\">My Todo List 🚀</h1>\\n      <AddTodo addTodo={addTodo} />\\n      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />\\n      <ChartComponent completed={completedTasksCount} total={totalTasksCount} />\\n    </div>\\n  );\\n}\\n\\nexport default App;\"\n    },\n    \"/components/TodoList.js\": {\n      \"code\": \"import React from 'react';\\nimport TodoItem from './TodoItem';\\n\\nfunction TodoList({ todos, toggleComplete, deleteTodo, editTodo }) {\\n  return (\\n    <ul className=\\\"divide-y divide-gray-200\\\">\\n      {todos.map(todo => (\\n        <TodoItem key={todo.id} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />\\n      ))}\\n    </ul>\\n  );\\n}\\n\\nexport default TodoList;\"\n    },\n    \"/components/TodoItem.js\": {\n      \"code\": \"import React, { useState } from 'react';\\nimport { Trash, Edit, Check } from 'lucide-react';\\nimport { format } from 'date-fns';\\n\\nfunction TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {\\n  const [isEditing, setIsEditing] = useState(false);\\n  const [editText, setEditText] = useState(todo.text);\\n  const [editPriority, setEditPriority] = useState(todo.priority);\\n  const [editDeadline, setEditDeadline] = useState(todo.deadline);\\n\\n  const handleEdit = () => {\\n    setIsEditing(true);\\n  };\\n\\n  const handleSave = () => {\\n    editTodo(todo.id, editText, editPriority, editDeadline);\\n    setIsEditing(false);\\n  };\\n\\n  return (\\n    <li className=\\\"py-2 flex items-center justify-between\\\">\\n      {isEditing ? (\\n        <div className=\\\"flex-grow space-x-2\\\">\\n          <input\\n            type=\\\"text\\\"\\n            value={editText}\\n            onChange={(e) => setEditText(e.target.value)}\\n            className=\\\"border rounded py-1 px-2 w-full\\\"\\n          />\\n          <select\\n            value={editPriority}\\n            onChange={(e) => setEditPriority(e.target.value)}\\n            className=\\\"border rounded py-1 px-2\\\"\\n          >\\n            <option value=\\\"low\\\">Low</option>\\n            <option value=\\\"medium\\\">Medium</option>\\n            <option value=\\\"high\\\">High</option>\\n          </select>\\n          <input\\n            type=\\\"date\\\"\\n            value={editDeadline}\\n            onChange={(e) => setEditDeadline(e.target.value)}\\n            className=\\\"border rounded py-1 px-2\\\"\\n          />\\n        </div>\\n      ) : (\\n        <div className=\\\"flex-grow\\\">\\n          <label className=\\\"flex items-center\\\">\\n            <input\\n              type=\\\"checkbox\\\"\\n              checked={todo.completed}\\n              onChange={() => toggleComplete(todo.id)}\\n              className=\\\"mr-2\\\"\\n            />\\n            <span className={todo.completed ? 'line-through text-gray-500' : ''}>\\n              {todo.text} (Priority: {todo.priority}, Deadline: {format(new Date(todo.deadline), 'yyyy-MM-dd')})\\n            </span>\\n          </label>\\n        </div>\\n      )}\\n\\n      <div>\\n        {isEditing ? (\\n          <button onClick={handleSave} className=\\\"bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2\\\">\\n            <Check className=\\\"inline-block mr-1\\\" /> Save\\n          </button>\\n        ) : (\\n          <button onClick={handleEdit} className=\\\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2\\\">\\n            <Edit className=\\\"inline-block mr-1\\\" /> Edit\\n          </button>\\n        )}\\n        <button onClick={() => deleteTodo(todo.id)} className=\\\"bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded\\\">\\n          <Trash className=\\\"inline-block mr-1\\\" /> Delete\\n        </button>\\n      </div>\\n    </li>\\n  );\\n}\\n\\nexport default TodoItem;\"\n    },\n    \"/components/AddTodo.js\": {\n      \"code\": \"import React, { useState } from 'react';\\nimport { Plus } from 'lucide-react';\\n\\nfunction AddTodo({ addTodo }) {\\n  const [text, setText] = useState('');\\n  const [priority, setPriority] = useState('medium');\\n  const [deadline, setDeadline] = useState('');\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (text.trim() === '') return;\\n    addTodo(text, priority, deadline);\\n    setText('');\\n    setPriority('medium');\\n    setDeadline('');\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className=\\\"mb-4 flex space-x-2\\\">\\n      <input\\n        type=\\\"text\\\"\\n        value={text}\\n        onChange={(e) => setText(e.target.value)}\\n        placeholder=\\\"Add a todo...\\\" className=\\\"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\\\"\\n      />\\n      <select\\n        value={priority}\\n        onChange={(e) => setPriority(e.target.value)}\\n        className=\\\"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\\\"\\n      >\\n        <option value=\\\"low\\\">Low</option>\\n        <option value=\\\"medium\\\">Medium</option>\\n        <option value=\\\"high\\\">High</option>\\n      </select>\\n      <input\\n        type=\\\"date\\\"\\n        value={deadline}\\n        onChange={(e) => setDeadline(e.target.value)}\\n        className=\\\"shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\\\"\\n      />\\n      <button type=\\\"submit\\\" className=\\\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline\\\">\\n        <Plus className=\\\"inline-block mr-1\\\" /> Add\\n      </button>\\n    </form>\\n  );\\n}\\n\\nexport default AddTodo;\"\n    },\n    \"/components/ChartComponent.js\": {\n      \"code\": \"import React from 'react';\\nimport { Doughnut } from 'react-chartjs-2';\\nimport { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';\\n\\nChartJS.register(ArcElement, Tooltip, Legend);\\n\\nfunction ChartComponent({ completed, total }) {\\n  const data = {\\n    labels: ['Completed', 'Remaining'],\\n    datasets: [\\n      {\\n        label: 'Task Completion',\\n        data: [completed, total - completed],\\n        backgroundColor: [\\n          'rgba(54, 162, 235, 0.8)',\\n          'rgba(255, 99, 132, 0.8)',\\n        ],\\n        borderWidth: 0,\\n      },\\n    ],\\n  };\\n\\n  const options = {\\n    responsive: true,\\n    maintainAspectRatio: false,\\n    cutout: '70%',\\n  };\\n\\n  return (\\n    <div className=\\\"w-full max-w-md mx-auto\\\">\\n      <Doughnut data={data} options={options} />\\n      <div className=\\\"text-center mt-4\\\">\\n        <p className=\\\"text-gray-700\\\">\\n          <span className=\\\"font-bold\\\">{completed}</span> Completed / <span className=\\\"font-bold\\\">{total}</span> Total\\n        </p>\\n      </div>\\n    </div>\\n  );\\n}\\n\\nexport default ChartComponent;\"\n    }\n  },\n  \"generatedFiles\": [\n    \"/App.js\",\n    \"/components/TodoList.js\",\n    \"/components/TodoItem.js\",\n    \"/components/AddTodo.js\",\n    \"/components/ChartComponent.js\"\n  ]\n}\n```" }
            ]
        }
    ]
})

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// TODO: Following code needs to be updated for client-side apps.
// const candidates = result.response.candidates;
// for (let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
//     for (let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
//         const part = candidates[candidate_index].content.parts[part_index];
//         if (part.inlineData) {
//             try {
//                 const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
//                 fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
//                 console.log(`Output written to: ${filename}`);
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     }
// }
