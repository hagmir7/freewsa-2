import React from "react";

 
const LoadingSingle = ()=> {
  return (
    <div style={{ height:'290px'}} className='col-6 col-sm-6 col-md-3 col-lg-2 col-xl-2 mt-2 animate__animated animate__zoomIn'>
    <div className="rounded loading card-book shadow-sm overflow-hidden h-100 m-0">
      <div className="h-100 image"></div>
    </div>
  </div>
  )
}



const BookCardLoading = () => {
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



export default BookCardLoading;