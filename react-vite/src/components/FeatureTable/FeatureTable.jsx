import { useDispatch, useSelector } from 'react-redux'
import './FeatureTable.css'
import { thunkGetNotebooks, thunkGetNotesForNotebook } from '../../redux/notebooks'
import { useEffect, useState } from 'react'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import NotebookAddModal from '../NotebookAddModal/NotebookAddModal'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons/faPenToSquare'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import NotebookDeleteModal from '../NotebookAddModal/NotebookDeleteModal'

const NoteCell = ({note}) => {
    return (
        <tr className='feature-tr-data'>
            <th>{note.title}</th>
            <th>{3}</th>
            <th>{note.created_at}</th>
        </tr>
    )
}
//title, created_at

const TaskCell = ({task}) => {
    return (
        <tr className='feature-tr-data'>
            <th>{task.title}</th>
            <th>{task.dueDate}</th>
            <th>{task.status}</th>
            <th>{task.priority}</th>
        </tr>
    )
}
// Title, due-date, status, priority

const NotebookCell = ({notebook}) => {

    return (
        <tr className='feature-tr-data'>
            <th>{notebook.title}</th>
            <th>{3}</th>
            <th>{notebook.created_at}</th>
            <th id='cell-menu'>
            <OpenModalMenuItem
                    className='cell-menu-btn blue'
                    icon={faPenToSquare}
                    modalComponent={<NotebookAddModal notebook={notebook} />}
                    />

            <OpenModalMenuItem
                className='cell-menu-btn red'
                icon={faTrash}
                modalComponent={<NotebookDeleteModal notebookId={notebook.id} />}
                />

            </th>
        </tr>
    )
}

const FeatureTable = ({type}) => {
    const TASK_PROPERTIES = ['Title', 'Due Date', 'Status', 'Priority']
    const NOTEBOOK_PROPERTIES = ['Name', 'Note Count', 'Created at', 'Priority']
    const NOTE_PROPERTIES = ['Title', '', 'Created at', 'Priority']

    const state = useSelector(state => state)
    const [data, setData] = useState({})
    const dispatch = useDispatch()


    useEffect(() => {
        switch(type){
            case 'Notebook': {
                setData(state?.notebooks?.allNotebooks)
            }
            break;
            case 'Task': {
                setData(state?.tasks)
            }
            break;
            default:
                setData(state?.notes)
            break;
        }
    }, [state])

    useEffect(() => {
        dispatch(thunkGetNotebooks())
    }, [dispatch])

    return (
        data ?
            <div id='table-main-container'>
                <h1>{`${type}s`}</h1>
                <div id='table-top-toolbar'>
                    <h3>{Object.keys(data).length} {Object.keys(data).length === 1 ? type.toLowerCase() : `${type.toLowerCase()}s`}</h3>
                    <OpenModalMenuItem
                        className="toolbar-btn"
                        itemText={"Create a Notebook"}
                        modalComponent={<NotebookAddModal />}
                        />
                </div>
                <table id='feature-table-container'>
                    <tbody>
                        <tr className='feature-tr-properties'>
                            {type === 'Notebook' ? NOTEBOOK_PROPERTIES.map(el =>(
                                <th>{el}</th>
                            )):
                            type === 'Task' ? TASK_PROPERTIES.map(el => (
                                <th>{el}</th>
                            )):
                            NOTE_PROPERTIES.map(el => (
                                <th>{el}</th>
                            ))
                            }

                        </tr>
                        {Object.values(data).map((el, key) => {
                            if(type === 'Notebook'){
                                return <NotebookCell notebook={el} key={key} />
                            }
                            if(type === 'Task'){
                                return <TaskCell task={el} key={key}/>
                            }else{
                                return <NoteCell note={el} key={key}/>
                            }

                        })}
                    </tbody>

                </table>
            </div>
            :
            <h1>Loading</h1>
    )
}

export default FeatureTable
