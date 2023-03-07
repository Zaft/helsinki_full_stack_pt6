import { useDispatch } from "react-redux"
import filterReducer, {filterChange} from "../reducers/filterReducer"

const Filter = () => {

    const dispatch = useDispatch()
    const handleChange = (event) => {
        const filter = event.target.value
        console.log("Filter value", filter)
        // dispatch(filterChange(filter))
        dispatch({ type: 'filter/filterChange', payload: filter })
    }

    const style = { marginBottom: 10}

    return (
        <div style={style}>
            filter <input onChange={handleChange}/>
        </div>
    )
}

export default Filter