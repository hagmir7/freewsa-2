import React from 'react'


const CartLoaidng = (props) => {
    return (
        <div className='mt-2 loading-content' style={{ width: '333.333px', marginRight: props.margin }}>
            <div className="loading">
                <div className="image rounded"></div>
            </div>
        </div>
    )
}


export default function PlayListCartLoading() {
    return (
        <div className='row'>
            <CartLoaidng margin="50px"/>
            <CartLoaidng margin="50px" />
            <CartLoaidng margin="0px" />
        </div>
    )
}







