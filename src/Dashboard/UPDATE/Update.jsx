import './update.css'
import Button from './Button'
import React, { useState, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { CgImage } from "react-icons/cg";
import { BsCardImage } from "react-icons/bs";
import Input from '../addProducts/input';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
export default function Update(props) {
  const user = useSelector((state) => state.Commerce.user)
  const [image, setImage] = useState(false)
  const [title, setTitle] = useState(false)
  const [price, setPrice] = useState(false)
  const [stockQuantity, setStockQuantity] = useState(false)
  const [category, setCategory] = useState(false)
  const [description, setDescription] = useState(false)
  const [List, setList] = useState([])
  const [loader, setLoader] = useState(false)
  const [mageDB, setImageDB] = useState({ image: "" })
  const [product, setProduct] = useState({})
  const { id } = useParams()

  const updateProduct = () => {
    console.log('cliked', id, "-", user?.[0].data.data._id)
    setLoader(true)
    const formData = new FormData();
    { product?.title && formData.append('title', product.title); }
    { product?.description && formData.append('description', product.description); }
    { product?.image && formData.append('image', product.image); }
    { product?.price && formData.append('price', product.price); }
    { product?.stockQuantity && formData.append('stockQuantity', product.stockQuantity); }
    { product?.categories && formData.append('categories', product.categories); }
    axios.patch(`https://safehomefurniture.onrender.com/api/admin/${user?.[0].data.data._id}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response);
        setLoader(false)
        setmessage(response.data.message)
      })
      .catch(error => {
        console.log(error);
        setLoader(false)
        setmessage(error.response.data.message)
      });
  }


  const handleChange = (event) => {
    const file = event.target.files[0];
    const save = URL.createObjectURL(file);
    setImageDB({ image: save });
    setProduct({ ...product, image: file });
  };




  const item = [
    {
      id: 1,
      title: 'Image',
    },
    {
      id: 2,
      title: 'Title',
    },
    {
      id: 3,
      title: 'Price',
    },
    {
      id: 4,
      title: 'Stock Quantity',
    },
    {
      id: 5,
      title: 'Category',
    },
    {
      id: 6,
      title: 'Description',
    }
  ]


  const addinput = (name, status) => {
    //  console.log(name, status)
    if (name === 'Image') {
      setImage(status)
    } else if (name === 'Title') {   // setTitle(status)
      if (status) {
        setList([...List, {
          id: 1,
          title: 'Title',
          name: 'title',
          type: 'text',
          pattern: '^[0-9]{3,20}$',
          required: true,
          err: "Username should be 3-16 caharters and should not include any special charater!",
        }])
      } else {
        const newList = List.filter((i) => i.title !== "Title")
        setList(newList)
      }
    } else if (name === 'Price') {

      if (status) {
        setList([...List, {
          id: 2,
          title: 'Price',
          name: 'price',
          type: 'text',
          pattern: '^[0-9]{3,20}$',
          required: true,
          err: "Price should be a number 3-16 caharters!",
        }])
      } else {
        const newList = List.filter((i) => i.title !== 'Price')
        // console.log(newLis)
        setList(newList)
      }

    } else if (name === 'Stock Quantity') {
      if (status) {
        setList([...List, {
          id: 3,
          title: 'Stock Quantity',
          name: 'stockQuantity',
          type: 'text',
          pattern: "^[0-9]{1,20}$",
          required: true,
          err: "Stock Quantity should be a number 3-16 caharters!",
        }])
      } else {
        const newList = List.filter((i) => i.title !== 'Stock Quantity')
        setList(newList)
      }
    } else if (name === 'Category') {
      setCategory(status)
    } else {
      setDescription(status)
    }
  }

  return (
    <div className='newlink'>
      <div className='newlink_top'>
        <div className='newlink_top_wrap'>
          <div className='newlink_top_text'>
            {item.map((i) => {
              return <Button {...i} addinput={addinput} />
            })}
          </div>
          {/* {!loader && <button className='newlink_top_button' onClick={() => { updateProduct() }} >Update Product</button>} */}
          {/* {herr && <h4>{err}</h4>} */}
          {/* <button className='newlink_top_button' onClick={() => { console.log(product) }} >Create Product</button> */}
        </div>
      </div>
      <div className='newlink_wrap'>
        <div className='newlink_left'>
          <div className='newlink_left_wrap'>
            <div className='newlink_left_top'>
              <h3></h3>
              {image && <div className='newlink_left_top_image'>
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
              </div>}
            </div>

            <form className='newlink_left_wrap_bottom'>
              {List.map((i) => (
                <Input key={i.id} {...i} setProduct={setProduct} product={product} />
              ))
              }

              {category && <label className='label'>
                <select className='label_input' name="categories" onChange={(e) => { setProduct({ ...product, [e.target.name]: e.target.value }) }} >
                  <option value="">select a category</option>
                  <option value="chairs">chairs</option>
                  <option value="tables">tables</option>
                  <option value="wardrobes">wardrobes</option>
                  <option value="desks">desks</option>
                  <option value="beds">beds</option>
                  <option value="cabinets">cabinets</option>
                  <option value="sofas">sofas</option>
                </select>
              </label>}

              {description && <label className='label'>
                <p>description</p>
                <textarea required type="text" id="w3review" name="description" maxLength="50%" rows="5" cols="20" onChange={(e) => { setProduct({ ...product, description: e.target.value }) }}>

                </textarea>
              </label>}
            </form>
          </div>
        </div>
        {loader && <div className='loader_newlink_right'><div className="loader"></div></div>}
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
