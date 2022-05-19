import React from 'react';

function ThaiAddressFrom(){

    return(
        <div class="w3-container w3-margin-top">
        <div class="mt-5 w3-content">
          <div class="w3-row w3-margin">
            <h3><i class="fa fa-home"></i> Thailand Search Address</h3>
            <div class="autocomplete">
              <input
                id="search"
                type="text"
                name="address"
                class="w3-input w3-border w3-xlarge"
                placeholder="Enter address..."
              />
            </div>
          </div>
        </div>

        <div class="w3-content">
          <div class="w3-row-padding w3-padding-16">
            <div class="w3-half">
              <label>ตำบล / แขวง</label>
              <input
                id="district"
                type="text"
                name="district"
                class="w3-input w3-border w3-xlarge"
                placeholder="ตำบล / แขวง"
              />
            </div>
            <div class="w3-half">
              <label>อำเภอ / เขต</label>
              <input
                id="amphoe"
                type="text"
                name="amphoe"
                class="w3-input w3-border w3-xlarge"
                placeholder="อำเภอ / เขต"
              />
            </div>
          </div>
          <div class="w3-row-padding w3-padding-16">
            <div class="w3-half">
              <label>จังหวัด</label>
              <input
                id="province"
                type="text"
                name="province"
                class="w3-input w3-border w3-xlarge"
                placeholder="จังหวัด"
              />
            </div>
            <div class="w3-half">
              <label>รหัสไปรษณีย์</label>
              <input
                id="zipcode"
                type="text"
                name="zipcode"
                class="w3-input w3-border w3-xlarge"
                placeholder="รหัสไปรษณีย์"
              />
            </div>
          </div>
        </div>
        {/* <!-- End Address Input Content--> */}
      </div>
    );
}export default ThaiAddressFrom;