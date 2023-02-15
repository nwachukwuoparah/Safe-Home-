import React,{useContext,useEffect} from 'react'
import "./order.css"
import Rating from "./Rating"
import { useNavigate } from 'react-router-dom';
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { removeOrders } from '../REDUX/features';
import { ThemeContext } from '../Components/ContexApi/Contex';
export default function Order(props) {
  const addOrder = useSelector((state) => state.Commerce.addOrder)
  const { changeTheme, display } = useContext(ThemeContext)
  const navigate = useNavigate()
  const dispach = useDispatch()

  useEffect(() => {
    !display && changeTheme()
  }, [])
  return (
    <div className='order'>
      <div className='order_wrap'>
        <div className='ordet_title'>
          <div className='ordet_title_wrap'>
            <p>item</p>
            <p>rating</p>
          </div>
        </div>
        <div className='order_item_wrap'>
          {addOrder?.data?.data.product.map((i) => (<Rating key={i._id} id={i._id} title={i.title} />))}
        </div>
        <div className='button_wrap'>
          <button className='order_button'
            onClick={() => {
              dispach(removeOrders())
              navigate("/")
            }}
          >confirm order</button>
        </div>
      </div>

    </div>
  )
}
