import { useDispatch, useSelector } from 'react-redux';
import './FeatureTable.css';
import { thunkGetNotebooks } from '../../redux/notebooks';
import { useEffect, useState } from 'react';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import NotebookAddModal from '../NotebookAddModal/NotebookAddModal';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons/faPenToSquare';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import NotebookDeleteModal from '../NotebookAddModal/NotebookDeleteModal';
import CreateTaskModal from '../CreateTaskModal/createTaskModal';
import { fetchTasks } from '../../redux/tasks';
import UpdateTask from '../UpdateTaskModal/UpdateTaskModal';
import TaskDeleteModal from '../TaskDeleteModal/TaskDeleteModal'; // Import the TaskDeleteModal component
import { Navigate } from 'react-router-dom';

const TaskCell = ({ task }) => {
    const PRIORITY = [
        <p id='low' key={1} className='priority-tag'>Low</p>,
        <p id='medium' key={2} className='priority-tag'>Medium</p>,
        <p id='high' key={3} className='priority-tag'>High</p>
    ];
    return (
        <tr className='feature-tr-data child-cell'>
            <th>{task.title}</th>
            <th>{task.due_date}</th>
            <th>{task.status ? "Completed" : "Pending"}</th>
            <th>{PRIORITY[task.priority - 1]}</th>
            <th className='cell-menu'>

                <OpenModalMenuItem
                    className='cell-menu-btn blue'
                    icon={faPenToSquare}
                    modalComponent={<UpdateTask task={task} />} // Use UpdateTask instead of CreateTaskModal
                />

                <OpenModalMenuItem
                    className='cell-menu-btn red'
                    icon={faTrash}
                    modalComponent={<TaskDeleteModal taskId={task.id} />} // Use TaskDeleteModal
                />
            </th>
        </tr>
    );
};

// Title, due-date, status, priority

const NotebookCell = ({ notebook }) => {
    const children = notebook?.notes ? Object.values(notebook?.notes) : [];
    return (
        <>
            <tr className='feature-tr-data'>
                <th>{notebook.title}</th>
                <th>{children.length}</th>
                <th>{notebook.created_at}</th>
                <th className='cell-menu'>
                    <OpenModalMenuItem
                        className='cell-menu-btn blue'
                        icon={faPenToSquare}
                        modalComponent={<NotebookAddModal notebook={notebook} />}
                    />

                    <OpenModalMenuItem
                        className='cell-menu-btn red'
                        icon={faTrash}
                        modalComponent={<NotebookDeleteModal notebookId={notebook?.id} />}
                    />
                </th>
            </tr>
        </>
    );
};

const FeatureTable = ({ type }) => {
    const TASK_PROPERTIES = ['Title', 'Due Date', 'Status', 'Priority'];
    const NOTEBOOK_PROPERTIES = ['Name', 'Note Count', 'Created at', 'Priority'];

    const state = useSelector(state => state);
    const [data, setData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        switch (type) {
            case 'Notebook': {
                setData(state?.notebooks?.allNotebooks);
            }
                break;
            case 'Task': {
                setData(state?.tasks);
            }
                break;
        }
    }, [state, type]);

    useEffect(() => {
        if (type === 'Task') {
            dispatch(fetchTasks());
        }

        if (type === 'Notebook') {
            dispatch(thunkGetNotebooks());
        }

    }, [dispatch, type]);

    return (
        state.session.user ?
            data ?
                <div id='table-main-container'>
                    <h1>{`${type}s`}</h1>
                    <div id='table-top-toolbar'>
                        <h3>{Object.keys(data).length} {Object.keys(data).length === 1 ? type.toLowerCase() : `${type.toLowerCase()}s`}</h3>
                        {type === 'Notebook' ?
                            <OpenModalMenuItem
                                className="toolbar-btn"
                                itemText={"Create a Notebook"}
                                modalComponent={<NotebookAddModal />}
                            /> :
                            <OpenModalMenuItem
                                className="toolbar-btn"
                                itemText={"Create a Task"}
                                modalComponent={<CreateTaskModal />}
                            />
                        }
                    </div>
                    <table id='feature-table-container'>
                        <tbody>
                            <tr className='feature-tr-properties'>
                                {type === 'Notebook' ? NOTEBOOK_PROPERTIES.map((el, key) => (
                                    <th key={key}>{el}</th>
                                )) :
                                    type === 'Task' ? TASK_PROPERTIES.map((el, key) => (
                                        <th key={key}>{el}</th>
                                    )) : ""
                                }

                            </tr>
                            {Object.values(data).map((el, key) => {
                                if (type === 'Notebook') {
                                    return <NotebookCell notebook={el} key={key} />;
                                }
                                if (type === 'Task') {
                                    return <TaskCell task={el} key={key} />;
                                }

                            })}
                        </tbody>

                    </table>
                </div>
                :
                <h1>Loading</h1>
            :
            <Navigate to='/' />
    );
};

export default FeatureTable;
