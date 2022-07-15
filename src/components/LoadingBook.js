import React from "react";

 
const LoadingSingle = ()=> {
  return (
    <div className='col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2 mt-2 animate__animated animate__zoomIn'>
    <div className="card loading card card-book shadow-sm overflow-hidden h-100 m-0">
      <div className="image"></div>
      <div className="content"><h4></h4></div>
    </div>
  </div>
  )
}



const LoadingBook = () => {
    return (
      <div className="row">
        <LoadingSingle />
        <LoadingSingle />
        <LoadingSingle />
        <LoadingSingle />
        <LoadingSingle />
        <LoadingSingle />
      </div>
    )
};



export default LoadingBook;