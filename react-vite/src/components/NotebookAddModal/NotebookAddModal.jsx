import { useState } from 'react'
import './NotebookAdd.css'

const NotebookAddModal = () => {
    const [name, setName] = useState('')

    const submitAddNotebook = (e) => {
        e.preventDefault()

        
    }
    return (
        <form>
            <h2>Add a Notebook</h2>
            <div>
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type='text' />
                <p className='error'></p>
            </div>
            <button onClick={submitAddNotebook}>Create</button>
        </form>
    )
}

export default NotebookAddModal
