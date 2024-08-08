import { useState } from 'react'
import './NotebookAdd.css'
import { thunkAddNotebook, thunkGetNotebooks } from '../../redux/notebooks'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'

const NotebookAddModal = () => {
    const [data, setData] = useState({
        title: ''
    })
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({
        title: ''
    });
    const { closeModal } = useModal();

    const handleChange = (e) => {
        setData(e.target.value)
        if(errors.title){
            setErrors('')
        }
    }

    const submitAddNotebook = async (e) => {
        e.preventDefault()
        if(data.title){
           const newNotebook = await dispatch(thunkAddNotebook({title: data.title}))

           if(newNotebook?.errors){
            setErrors(newNotebook.errors)
           }else{
                await dispatch(thunkGetNotebooks())
                closeModal()
           }
        }else{
            setErrors({title: "Cannot be empty"})
        }

    }

    return (
        <form id='notebook-add-form'>
            <h2>Add a Notebook</h2>
            <div>
                <label>Name</label>
                <input value={data.title} onChange={handleChange} type='text' />
                <p className='error'>{errors.title}</p>
            </div>
            <button onClick={submitAddNotebook}>Create</button>
        </form>
    )
}

export default NotebookAddModal
