import classNames from 'classnames'
import './Task.css'
import { useTaskStore } from '../store'
import trash from '../assets/trash-2.svg'

const STATUS = 'ONGOING'

const Task = ({ title }) => {
  const task = useTaskStore((store) => store.tasks.find(task => task.title === title))
  const deleteTask = useTaskStore(store => store.deleteTask)
  const setDraggedTask = useTaskStore(store => store.setDraggedTask)
  return (
    <div className="task" draggable onDragStart={() => setDraggedTask(task.title)}>
      <div>{task.title}</div>
      <div className='bottomWrapper'>
        <div>
          <img src={trash} onClick={() => deleteTask(task.title)}></img>
        </div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  )
}
export default Task
