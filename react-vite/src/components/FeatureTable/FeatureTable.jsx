import { useDispatch, useSelector } from 'react-redux'
import './FeatureTable.css'
import { thunkGetNotebooks } from '../../redux/notebooks'
import { useEffect } from 'react'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import NotebookAddModal from '../NotebookAddModal/NotebookAddModal'

const FeatureTable = () => {

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
                    <tr className='feature-tr-properties'>
                        <th>Name</th>
                        <th>Note Count</th>
                        <th>Created at</th>
                    </tr>
                    {Object.values(allNotebooks).map(el => {
                    return (
                        <tr className='feature-tr-data'>
                            <th>{el.title}</th>
                            <th>{3}</th>
                            <th>{el.created_at}</th>
                        </tr>
                    )
                })}

                </table>
            </div>
            :
            <h1>Loading</h1>
    )
}

export default FeatureTable
