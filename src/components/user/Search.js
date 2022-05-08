import React from 'react'
import * as BiIcons from 'react-icons/bi'
function Search() {
  return (
    <div className='container' style={{marginBottom:"20px" ,marginTop:"20px" , textAlign:"right" }}>
        <BiIcons.BiSearchAlt style={{color:"white" , marginRight:"10px" , fontSize:"20px"}}/><input placeholder=' Search' style={{border:"2px solid black" ,width:"18vw", borderRadius:"5px",paddingLeft:"5px" , boxShadow:"2px 2px 3px #2B2B2B"}} />
    </div>
  )
}

export default Search