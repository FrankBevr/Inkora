import { useTaskStore } from '../store'
import './Column.css'
import Task from './Task'
import { shallow } from 'zustand/shallow'

const Column = ({ state }) => {
  const tasks = useTaskStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );
  return <div className="column" >
    <p>{state}</p>
    {tasks.map((task) => (
      <Task title={task.title} key={task.title} />
    ))}
  </div>
}

export default Column
