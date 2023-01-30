import React, { useState, useEffect, useContext } from 'react'
import './addproduct.css'
import add from './add.png'
import { FaUserCircle } from "react-icons/fa";
export default function Addproduct(props) {
  const [state, setState] = useState(false)
  const [image, setImage] = useState(null)
  const [product, setProduct] = useState(
    {
      title: "",
      details: "",
      image: "",
      stockQuantity: "",
      categories: ""
    }
  )
  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    // console.log(reader)
    reader.onloadend = () => {
      setImage(reader.result);
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
            <input onChange={(e) => { setProduct({...product, [e.target.name] : e.target.value}) }} name="title" type="text" placeholder='Title' />
          </div>
          <div className=''>
            <p>Details</p>
            <textarea maxLength="500" id="w3review" name="w3review" rows="10" cols="59">
            </textarea>
          </div>
        </div>

        <label className='Addproduct_left_middle'>
          <h3>Image</h3>
          <input  style={{ display: 'none' }} onChange={handleChange} type='file' />
        </label>

        <div className='Addproduct_left_bottom'>
          <div className='Addproduct_left_bottom_input'>
            <p>Price</p>
            <input onChange={(e) => { setProduct({...product, [e.target.name] : e.target.value}) }} name="price" />
          </div>
          <div className='Addproduct_left_bottom_input'>
            <p>Stock Quantity</p>
            <input onChange={(e) => { setProduct({...product, [e.target.name] : e.target.value}) }} name="stockQuantity" />
          </div>
          <div className='Addproduct_left_bottom_input'>
            <p>Categories</p>
            <input onChange={(e) => { setProduct({...product, [e.target.name] : e.target.value}) }} name="categories" />
          </div>
        </div>
      </div>



      <div className='Addproduct_right'>
        <div className='Addproduct_right_top'>
          <div className='Addproduct_right_top_image1'>
            {image ? <img className='' src={image} /> : < FaUserCircle fontSize={300} />}
          </div>
        </div>

        <div className='Addproduct_right_buttom'>
          <div className='Addproduct_right_buttom_text'>
            <h3>Mordern Fort Chair For Living Room</h3>
            <h3>$1500</h3>
            <p>This Quality Cushion Chair  Tables comes fitted in the perfect material that lasts a long time. It comes with  pillow that gives you or your visitors the comfort and flexibility that you desire.
              You don't have to worry about it getting torn. These Cushion Chairs were made with the best leather material you can ever think of.

              The Elite Vibe would certainly reverberate all over your living room or wherever you might want to put it.

              Get this affordable Quality Cushion Chair at the best prices in Nigeria only on at Safe Home Online Store.
            </p>
          </div>
          <button onClick={()=>{console.log(product)}} className='Addproduct_right_buttom_button'>Commit</button>
        </div>
      </div>
    </div>
  )
}
