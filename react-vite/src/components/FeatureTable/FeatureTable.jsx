import { useDispatch, useSelector } from 'react-redux'
import './FeatureTable.css'
import { thunkGetNotebooks } from '../../redux/notebooks'
import { useEffect, useState } from 'react'

const FeatureTable = () => {

    const {allNotebooks} = useSelector(state => state.notebook)

    const dispatch = useDispatch()
    console.log(allNotebooks)
    useEffect(() => {

        if(!allNotebooks){
            dispatch(thunkGetNotebooks())
        }

    }, [dispatch, allNotebooks])

    return (
        allNotebooks ?
            <div id='table-main-container'>
                <div>
                    <h1>Notebooks</h1>
                    <h3>{Object.keys(allNotebooks).length} {Object.keys(allNotebooks).length === 1 ? 'notebook' : 'notebooks'}</h3>
                </div>
            </div>
            :
            <h1>Loading</h1>
    )
}

export default FeatureTable
