import { useState } from 'react'
import './NotebookAdd.css'
import { thunkAddNotebook, thunkEditANotebook, thunkGetNotebooks } from '../../redux/notebooks'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'

const NotebookAddModal = ({notebook}) => {

    const [data, setData] = useState({
        title: notebook ? notebook.title : ''
    })
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({
        title: ''
    });
    const { closeModal } = useModal();

    const handleChange = (e) => {
        setData(prev => ({...prev, title: e.target.value}))
        if(errors.title){
            setErrors('')
        }
    }

    const submitAddNotebook = async (e) => {
        e.preventDefault()
        setErrors({title: ''})
        const isSuccessfulData = async (notebook) => {
            if(notebook?.errors){
                setErrors(notebook.errors)
            }else{
                    await dispatch(thunkGetNotebooks())
                    closeModal()
            }
        }
        if(data.title){

            if(!notebook){
                const newNotebook = await dispatch(thunkAddNotebook({title: data.title}))

                await isSuccessfulData(newNotebook)
            }else{
                const updatedNotebook = await dispatch(thunkEditANotebook(notebook.id, data.title))
                await isSuccessfulData(updatedNotebook)
            }
        }else{
            setErrors({title: "Cannot be empty"})
        }

    }

    return (
        <form id='notebook-add-form'>
            <h2>{notebook ? 'Edit a Notebook' : "Add a Notebook"}</h2>
            <div>
                <label>Name</label>
                <input value={data.title} onChange={handleChange} type='text' />
                <p className='error'>{errors.title}</p>
            </div>
            <button onClick={submitAddNotebook}>Submit</button>
        </form>
    )
}

export default NotebookAddModal
