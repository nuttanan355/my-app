import React from 'react';

import NotFound from "../error_404";
// <------------------------Pages USER-------------------------->

import HomeUser from "../components/user/HomeUser";
import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";
import Logout from "../components/login/Logout";


// <------------------------Pages SELLER------------------------>
import HomeSeller from "../components/seller/HomeSeller";
import SellerProduct from "../components/seller/SellerProduct"
import AddNewProduct from "../components/seller/AddNewProduct";
import EditNewProduct from "../components/seller/EditNewProduct";
import ViewNewProduct from "../components/seller/ViewNewProduct"





export const RouteUser = [
    // ------------------------------------------------------------- User -------------------------------------------------
    {
        path: "*",
        element: <NotFound />,
      },
    {
      path: "/",
      element: <HomeUser />,
    },
    {
      path: "/user/sign-in",
      element: <SignIn />,
    },
    {
      path: "/user/sign-up",
      element: <SignUp />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
        path: "/ViewData/:id",
        element: <ViewNewProduct />,
      },

   
    // ------------------------------------------------------------- Seller -------------------------------------------------
 
    {
        path: "/HomeSeller",
        element: <HomeSeller />,
      },
      {
        path:"/user/seller-product",
        element:<SellerProduct />
      },
      {
        path: "/seller/seller-product/add-product",
        element: <AddNewProduct />,
      },
          {
        path: "/EditData/:id",
        element: <EditNewProduct />,
      },


];


// const handleonSubmit = (e) => {
//   e.preventDefault();
//   const dowUrls = [];
//   Images.map((Imgs) => {
//     const sotrageRef = ref(firebaseStorage,`product/product-${dateKey}/${Imgs.name}`);
//     const uploadTask = uploadBytesResumable(sotrageRef, Imgs);

//     getDownloadURL(uploadTask.snapshot.ref)
//       .then((downloadURL) => {
//         console.log("File available at", downloadURL);
//         dowUrls.push(downloadURL);
       
//       })
//       .catch((error) => console.log(error));
//   });
//   setValues({ ...values, productImg: dowUrls });
//   firebaseDB
//     .child("product")
//     .child(dateKey)
//     .set(values)
//     .then(() => {
//       console.log("add data success");
//     })
//     .catch((error) => console.log(error));
// };

  // ----------------------------ADD IMAGE----------------------------
  // const [ShowImages, setShowImages] = useState([]);
  // const [Images, setImages] = useState([]);

  // const ImgOnChange = (ever) => {
  //   const selectedFIles = [];
  //   const targetFilesObject = [...ever.target.files];
  //   setImages([...ever.target.files]);
  //   targetFilesObject.map((file) => {
  //     return selectedFIles.push(URL.createObjectURL(file));
  //   });
  //   setShowImages(selectedFIles);
  // };

 // ----------------------------END IMAGE----------------------------


//  const [values, setValues] = useState({
//   sellerUid: "",
//   productName: "",
//   productCategory: "",
//   productPrice: "",
//   productAllow: false,
//   productImg: [],
//   productDetails: "",
//   produtcDate: saveCurrentDate,
//   produtcTime: saveCurrentTime,
//   produtcCost3: [],
// });