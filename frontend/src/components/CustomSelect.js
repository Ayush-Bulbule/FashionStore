import React from 'react'

const CustomSelect = (props) => {
    return (
        <select name={props.name} className="custom-select" value={props.value} onChange={(e) => props.handleChange(props.orderId, e.target.value)}>
            <option value="processing" >
                Processing
            </option>
            <option value="shipped">
                Shipped
            </option>
            <option value="transit" >
                In Transit
            </option>
            <option value="delivered">
                Delivered
            </option>
        </select>
    )
}

export default CustomSelect
