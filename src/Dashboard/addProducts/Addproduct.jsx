import React, { useState, useEffect, useContext } from 'react'
import './addproduct.css'
import add from './add.png'
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { addProduct } from '../../REDUX/features'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ThemeContext } from '../../Components/ContexApi/Contex';
export default function Addproduct(props) {
  const { changeTheme, display, activeuser, setactiveuser } = useContext(ThemeContext)
  const addProduc = useSelector((state) => state.Commerce.addProduct)
  const dispach = useDispatch()
  const [state, setState] = useState(false)
  const [image, setImage] = useState(null)
  const [mageDB, setImageDB] = useState({ image: "" })
  const [product, setProduct] = useState(
    {
      title: "",
      description: "",
      image: "",
      price: "",
      stockQuantity: "",
      categories: "",
    }
  )


  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const save = URL.createObjectURL(file);
    setImageDB({ image: file });
    setProduct({ ...product, image: save });
  };

  useEffect(() => {
    console.log(mageDB.image)
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('image', mageDB.image);
    formData.append('price', product.price);
    formData.append('stockQuantity', product.stockQuantity);
    formData.append('categories', product.categories);
    formData.append('brandName', "product brandName");
    formData.append('rating', 0);
    
    if (addProduc.length !== 0) {
      axios.post(`https://safehomefurniture.onrender.com/api/admin/${activeuser.data.data._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [addProduc])

  return (
    <div className='Addproduct'>
      <form className='Addproduct_left'
        onSubmit={
          (e) => {
            e.preventDefault()
            dispach(addProduct(product))
          }}

      >

        <div className='Addproduct_left_top'>
          <div className='Addproduct_left_top_input'>
            <p>Title</p>
            <input required onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} name="title" type="text" placeholder='Title' />
          </div>


          <p className='textarea'>description</p>
          <textarea required onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} type="text" id="w3review" name="description" maxLength="50%" rows="10" cols="59">
          </textarea>
        </div>

        <label className='Addproduct_left_middle'>
          <h3>Image</h3>
          <input required style={{ display: 'none' }} onChange={handleChange} type='file' />
        </label>

        <div className='Addproduct_left_bottom'>
          <div className='Addproduct_left_bottom_input'>
            <p>Price</p>
            <input required onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} name="price" />
          </div>
          <div className='Addproduct_left_bottom_input'>
            <p>Stock Quantity</p>
            <input required onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} name="stockQuantity" />
          </div>
          <div className='Addproduct_left_bottom_input'>
            <p>Categories</p>
            <input onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} name="categories" />
          </div>
        </div> <button className='Addproduct_right_buttom_button'>Commit</button>
      </form>

      <div className='Addproduct_right'>
        <div className='Addproduct_right_top'>
          <div className='Addproduct_right_top_image1'>
            {product.image ? <img className='' src={product.image} /> : < FaUserCircle fontSize={300} />}
          </div>
        </div>
        <div className='Addproduct_right_buttom'>
          <div className='Addproduct_right_buttom_text'>
            <h3>{product.title}</h3>
            <h3>{product.price}</h3>
            <p>{product.description}</p>
          </div>

        </div>
      </div>
    </div>
  )
}
