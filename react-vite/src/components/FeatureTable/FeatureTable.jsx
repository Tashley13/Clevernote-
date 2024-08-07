import { useSelector } from 'react-redux'
import './FeatureTable.css'

const FeatureTable = () => {
    const notebooks = useSelector(state => state.notebook)

    console.log(notebooks)
    return (
        <div className='table-main-container'>
        </div>
    )
}

export default FeatureTable
