import React, { useState, useEffect, useContext } from 'react'
import './addproduct.css'
import add from './add.png'
import { RxCross2 } from "react-icons/rx";
import { CgImage } from "react-icons/cg";
import { BsCardImage } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addProduct } from '../../REDUX/features'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ThemeContext } from '../../Components/ContexApi/Contex';
import Input from './input';
export default function Addproduct(props) {
  const navigate = useNavigate()
  const { changeTheme, display, activeuser, setactiveuser } = useContext(ThemeContext)
  const addProduc = useSelector((state) => state.Commerce.addProduct)
  const user = useSelector((state) => state.Commerce.user)
  const dispach = useDispatch()
  const [state, setState] = useState(false)
  const [image, setImage] = useState(null)
  const [mageDB, setImageDB] = useState({ image: "" })
  const [err, setErr] = useState('')
  const [herr, setHerr] = useState(false)
  const [loader, setLoader] = useState(false)
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
    const save = URL.createObjectURL(file);
    setImageDB({ image: save });
    setProduct({ ...product, image: file });
  };


  const addItem = (e) => {
    e.preventDefault()
    console.log('cliked')
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('image', product.image);
    formData.append('price', product.price);
    formData.append('stockQuantity', product.stockQuantity);
    formData.append('categories', product.categories);
    formData.append('brandName', user[0]?.data.data.brandname);
    formData.append('rating', 0);
    axios.post(`https://safehomefurniture.onrender.com/api/admin/${user?.[0].data.data._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response);
        setLoader(false)
      })
      .catch(error => {
        console.log(error);
        setLoader(false)
        setErr(error.response.data.message)
      });
  }
  useEffect(() => {
    setHerr(true)
    setTimeout(() => {
      setHerr(false)
    }, 5000);
  }, [err])

  const List = [
    {
      id: 1,
      title: 'Title',
      name: 'title',
      type: 'text',
      pattern: '^[0-9]{3,20}$',
      required: true,
      err: "Username should be 3-16 caharters and should not include any special charater!",
    },
    {
      id: 2,
      title: 'Price',
      name: 'price',
      type: 'text',
      pattern: '^[0-9]{3,20}$',
      required: true,
      err: "Price should be a number 3-16 caharters!",
    },
    {
      id: 3,
      title: 'Stock Quantity',
      name: 'stockQuantity',
      type: 'text',
      pattern: "^[0-9]{3,20}$",
      required: true,
      err: "Stock Quantity should be a number 3-16 caharters!",
    },
  ]

  return (
    <div className='newlink'>

      <div className='newlink_top'>
        <div className='newlink_top_wrap'>
          <div className='newlink_top_text'>
            <RxCross2 fontSize={25} onClick={() => { navigate('/dashboard') }} />
            <h2>Create new payment link</h2>
          </div>
          {herr && <h4>{err}</h4>}
          {/* <button className='newlink_top_button' onClick={() => { console.log(product) }} >Create Product</button> */}
        </div>
      </div>

      <div className='newlink_wrap'>
        <div className='newlink_left'>
          <div className='newlink_left_wrap'>
            <div className='newlink_left_top'>
              <h3></h3>
              <div className='newlink_left_top_image'>
                <label className='newlink_left_top_file'>
                  <input type='file' onChange={handleChange} />
                  <CgImage fontSize={40} />
                </label>
                <span className='newlink_left_top_image_text'>
                  <h3>
                    Upload Link Image
                  </h3>
                  <p>Recommended size - 512px X 512px Fomart - JPG or PNG, under 1MB in size.</p>
                </span>

              </div>
            </div>

            <form className='newlink_left_wrap_bottom' onSubmit={addItem} >
              {List.map((i) => (
                <Input {...i} setProduct={setProduct} product={product} />
              ))
              }
              <label className='label'>
                <select className='label_input' name="categories" onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} >
                  <option value="">select a category</option>
                  <option value="Small">Small</option>
                  <option value="Family">Family</option>
                  <option value="Luxury">Luxury</option>
                  <option value="small">Small</option>
                  <option value="Family Sedan">Family Sedan</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </label>

              <label className='label'>
                <p>description</p>
                <textarea required type="text" id="w3review" name="description" maxLength="50%" rows="5" cols="20" onChange={(e) => { setProduct({ ...product, description: e.target.value }) }}>
                  Write a brief description about your product
                </textarea>
              </label>

              <button className='newlink_top_button' onClick={() => { }} >Create Product</button>
            </form>
          </div>
        </div>

        <div className='newlink_right'>
          <div className='newlink_right_wrap'>
            <div className='newlink_right_img'>
              {mageDB.image ? <img src={mageDB.image} /> :
                <BsCardImage fontSize={300} color={'grey'} />}
            </div>
            <div className='newlink_right_text'>
              <span><h4>Title:</h4><p>{product.title}</p></span>
              <span><h4>Price:</h4>{product.price && <p>${product.price}</p>}</span>
              <span><h4>Stock Quantity:</h4><p>{product.stockQuantity}</p></span>
              <span><h4>Category:</h4><p>{product.categories}</p></span>
              <span><h4>description:</h4><p>{product.description}</p></span>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
