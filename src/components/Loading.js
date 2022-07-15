import React from "react";

 
const LoadingSingle = ()=> {
  return (
    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 animate__animated animate__zoomIn'>
    <div className="card loading">
      <div className="image"></div>
      <div className="content"><h4></h4></div>
    </div>
  </div>
  )
}



const Loading = () => {
    return (
      <div className="row">
        <LoadingSingle />
        <LoadingSingle />
        <LoadingSingle />
      </div>
    )
};



export default Loading;