import React from "react";

 
const LoadingSingle = ()=> {
  return (
    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 animate__animated animate__zoomIn'>
    <div className="border-0 loading mt-">
      <div className="image rounded"></div>
      <div className="content"><h4></h4></div>
    </div>
  </div>
  )
}



const PostCardLoading = () => {
    return (
      <div className="row">
        <LoadingSingle />
        <LoadingSingle />
        <LoadingSingle />
      </div>
    )
};



export default PostCardLoading;