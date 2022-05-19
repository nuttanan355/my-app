import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import refThai from '../../server/thailand.json';




function ThaiAddressFrom(){

  const [addressJson, setAddressJson] = useState(refThai);
  const [searchString, setSearchString] = useState("");
  // const [Address, setAddress] = useState({});






  useEffect(()=>{
    if(searchString.length === 0){
      setAddressJson(refThai);
    }else{
      const searchedObjects = [];
      refThai.forEach((singleHeroObject, index) => {
        Object.values(singleHeroObject).every((onlyValues, valIndex) => {
          if (onlyValues.toLowerCase().includes(searchString.toLowerCase())) {
            searchedObjects.push(singleHeroObject);
            return;
          }
        });
      });
      setAddressJson(searchedObjects);
    }
  },[searchString])

  // const addressSearch = (searchText) => {
  //   // Get matches to current text input
  //   let matchItems = addressJson.filter((addressJson) => {
  //     const regex = new RegExp(`^${searchText}`, "gi");
  //     return (
  //       addressJson.district.match(regex) ||
  //       addressJson.districtEng.match(regex) ||
  //       addressJson.amphoe.match(regex) ||
  //       addressJson.amphoeEng.match(regex) ||
  //       addressJson.province.match(regex) ||
  //       addressJson.provinceEng.match(regex)
  //     );
  //   });
  //   if (searchText.length === 0) {
  //     setAddress(null);
  //   }

  //   setAddress(matchItems);

  // };



// console.log(Address);
console.log(addressJson);



    return(
        <>
           <div className="form-group  mt-3">
            <input id="search" type="text" name="address"placeholder="Thailand Search Address...." className='form-control col'onChange={(e)=>{setSearchString(e.target.value)}}/>
            
        </div>

            <div className="form-group mt-3 row">
              <input id="district" type="text" name="district" className="form-control col" placeholder="ตำบล / แขวง" />
              <input id="amphoe" type="text" name="amphoe" className="form-control col" placeholder="อำเภอ / เขต"/>
            </div>
            <div className="form-group mt-3">
              <input
                id="province"
                type="text"
                name="province"
                className="form-control"
                placeholder="จังหวัด"
              />
            </div>
            <div className="form-group mt-3">
              <input id="zipcode" type="text" name="zipcode" placeholder="รหัสไปรษณีย์" className="form-control"/>
            </div>
      </>
    );
}export default ThaiAddressFrom;