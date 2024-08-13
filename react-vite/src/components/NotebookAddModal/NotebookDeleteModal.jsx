import './NotebookAdd.css'

import { useModal } from '../../context/Modal'
import { thunkDeleteANotebook, thunkGetNotebooks } from '../../redux/notebooks';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const NotebookDeleteModal = ({notebookId}) => {
    const { closeModal } = useModal();

    const [errors, setErrors] = useState({
        delete: ''
    });

    const dispatch = useDispatch()

    const deleteANotebook = async (e) => {
        e.preventDefault()

        const data = await dispatch(thunkDeleteANotebook(notebookId))

        if(data?.errors){
            setErrors(prev => ({...prev, delete: data.errors}))
        }else{
                await dispatch(thunkGetNotebooks())
                closeModal()
        }
    }

    return (
        <form id='notebook-add-form'>
            <h2>Are you sure?</h2>
            <p className='error'>{errors.delete}</p>
            <button style={{backgroundColor: '#ff7272'}} onClick={deleteANotebook}>Delete</button>
            <button onClick={closeModal}>No</button>
        </form>
    )
}

export default NotebookDeleteModal
