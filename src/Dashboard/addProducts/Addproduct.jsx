import React, { useState, useEffect, useContext } from 'react'
import './addproduct.css'
import add from './add.png'
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import {addProduct} from '../../REDUX/features'
export default function Addproduct(props) {
  const dispach = useDispatch()
  const [state, setState] = useState(false)
  const [image, setImage] = useState(null)
  const [product, setProduct] = useState(
    {
      title: "",
      description: "",
      image: "",
      price:"",
      stockQuantity: "",
      categories: ""
    }
  )
  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    // console.log(reader)
    reader.onloadend = () => {
      setProduct(reader.result);
      setProduct({ ...product, image:reader.result});
    }
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    // console.log(product.title)
    // console.log(product.details)
    // console.log(product.price)
    // console.log(product.stockQuantity)
    // console.log(product.categories)
    // console.log(product)
  }, [product])

  return (
    <div className='Addproduct'>
      <div className='Addproduct_left'>

        <div className='Addproduct_left_top'>
          <div className='Addproduct_left_top_input'>
            <p>Title</p>
            <input onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} name="title" type="text" placeholder='Title' />
          </div>

          <div className=''>
            <p>description</p>
            <textarea onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} type="text" maxLength="500" id="w3review" name="description" rows="10" cols="59">
            </textarea>
          </div>
        </div>

        <label className='Addproduct_left_middle'>
          <h3>Image</h3>
          <input style={{ display: 'none' }} onChange={handleChange} type='file' />
        </label>

        <div className='Addproduct_left_bottom'>
          <div className='Addproduct_left_bottom_input'>
            <p>Price</p>
            <input onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} name="price" />
          </div>
          <div className='Addproduct_left_bottom_input'>
            <p>Stock Quantity</p>
            <input onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} name="stockQuantity" />
          </div>
          <div className='Addproduct_left_bottom_input'>
            <p>Categories</p>
            <input onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} name="categories" />
          </div>
        </div>
      </div>

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
          <button onClick={()=>{dispach(addProduct(product)) }} className='Addproduct_right_buttom_button'>Commit</button>
        </div>
      </div>
    </div>
  )
}
