import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import { ITask } from './Interfaces';
const App: FC = () => {
  const [ task, setTask ] = useState<string>("")
  const [ deadline, setDeadLine ] = useState<number>(0)
  const [ todoList, setTodoList ] = useState<ITask[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    (e.target.name === "task") ? setTask(e.target.value) : setDeadLine(Number(e.target.value))

  }

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline }
    setTodoList([ ...todoList, newTask ])
    console.log(todoList)
    setTask("")
    setDeadLine(0)

  }
  const completeTask = (taskNameToDelete: string): void => {

    setTodoList(todoList.filter((task) => {
      return task.taskName != taskNameToDelete;
    }))

  }

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input name="task" type="text" value={task}
            onChange={handleChange} placeholder="Task..." />
          <input name="deadline" type="number"
            value={deadline}
            onChange={handleChange} placeholder="DeadLine (in days)..." />
        </div>
        <button onClick={addTask} >Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />
        })}
      </div>
    </div>
  );
}

export default App;
