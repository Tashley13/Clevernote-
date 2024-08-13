import { useDispatch, useSelector } from 'react-redux'
import './FeatureTable.css'
import { thunkGetNotebooks } from '../../redux/notebooks'
import { useEffect } from 'react'
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

const NotebookCell = ({notebook}) => {

    return (
        <>
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
        </>
    )
}

const FeatureTable = ({type}) => {

    const { allNotebooks } = useSelector(state => state.notebooks)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(thunkGetNotebooks())

    }, [dispatch])

    return (
        allNotebooks ?
            <div id='table-main-container'>
                <h1>Notebooks</h1>
                <div id='table-top-toolbar'>
                    <h3>{Object.keys(allNotebooks).length} {Object.keys(allNotebooks).length === 1 ? 'notebook' : 'notebooks'}</h3>
                    <OpenModalMenuItem
                        className="toolbar-btn"
                        itemText={"Create a Notebook"}
                        modalComponent={<NotebookAddModal />}
                        />
                </div>
                <table id='feature-table-container'>
                    <tbody>
                        <tr className='feature-tr-properties'>
                            <th>Name</th>
                            <th>Note Count</th>
                            <th>Created at</th>
                        </tr>
                        {Object.values(allNotebooks).map((el, key) => {
                        return (
                            <NotebookCell notebook={el} key={key} />
                        )
                        })}
                    </tbody>

                </table>
            </div>
            :
            <h1>Loading</h1>
    )
}

export default FeatureTable
