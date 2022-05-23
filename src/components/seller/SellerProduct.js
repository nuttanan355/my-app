import React from "react";
import ShowDataSeller from "./ShowDataSeller";

function SellerProduct() {
  return (
    <div className="container" >
      <div className="row pt-3" >
        <div className="col-8 md-10" >
          <h1>ประกาศการขาย</h1>
        </div>
        <a
          href="/seller/seller-product/add-product"
          className="btn btn-primary btn-lg col-4 my-3"
          role="button"
        >
          ลงขายสินค้า
        </a>
      </div>
      <hr />
      <div className="container" style={{ padding: "50px", paddingTop: "20px", paddingLeft: "20px", background: "white", border: "1px solid lightgray", borderRadius: "15px" }}>
        <ShowDataSeller />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

    </div>
  );
}
export default SellerProduct;
