import "./detail.css";
import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Categoriesroute from "../Components/ROUT/Categoriesroute";
import Products from "../Components/PRODUCT/Products";
import { useParams, useNavigate } from "react-router-dom";
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
import { MdOutlineStarOutline } from "react-icons/md";
import { MdGppGood } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../Components/Alert/Alert";
import { addToCart } from "../REDUX/features";
import { CartAlert } from "../Components/Alert/Alert";
import { ThemeContext } from "../Components/ContexApi/Contex";
import { getByCategory } from "../Components/Api/Query";
import { getById } from "../Components/Api/Query";
function Detail({}) {
  const navigate = useNavigate();
  const { changeTheme, display, cartAlert, cartA, activeuser } =
    useContext(ThemeContext);
  const user = useSelector((state) => state.Commerce.user);
  const dispach = useDispatch();
  const recent = useSelector((state) => state.Commerce.RECENT);
  const cartState = useSelector((state) => state.Commerce.cartState);
  const { id, categoryName } = useParams();

  const { data, isLoading } = useQuery(["products", id], getById, {
    refetchOnWindowFocus: false,
  });

  const { data: category_data, isLoading: category_loading } = useQuery(
    ["products", categoryName],
    getByCategory,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    display && changeTheme();
  }, []);
  return (
    <div>
      <Categoriesroute item="DETAIL" />
      {cartAlert && <CartAlert />}
      <div className="detail">
        <div className="detail_wrap">
          <div className="detail_item">
            <img src={data?.data.data.image} />
            <div className="detail_info_wrap">
              <h3>{data?.data.data.title}</h3>
              <p>₦ {data?.data.data.price}</p>
              <span style={{ color: "#FFA903" }}>
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStarHalf />
                <MdOutlineStarOutline />
                <MdOutlineStarOutline />
              </span>
              <span
                style={{
                  color:
                    data?.data.data.stockQuantity >= 1
                      ? "#04A5FF"
                      : "#ff000033",
                }}
                className="detail_info"
              >
                <p>Availability:</p> <MdGppGood />
                {data?.data.data.stockQuantity >= 1 ? (
                  <p>In stock</p>
                ) : (
                  <p>Not In stock</p>
                )}
              </span>
              <div style={{ display: "flex", gap: 5 }}>
                Qty<p>{data?.data.data.stockQuantity}</p>
              </div>
              <span className="detail_info">
                <p>Brand:</p>
                <p>{data?.data.data.brandName}</p>
              </span>
              <div className="button_wrap">
                {data?.data.data.stockQuantity !== 0 ? (
                  <button
                    className="button1 pointer"
                    onClick={() => {
                      if (user[0]?.status === 201) {
                        navigate("/payment");
                        dispach(addToCart(data?.data.data));
                      } else {
                        navigate("/signUp");
                      }
                    }}
                  >
                    Buy now
                  </button>
                ) : (
                  <button className="button1_out pointer">Buy now</button>
                )}

                {data?.data.data.stockQuantity !== 0 && !cartState ? (
                  <button
                    className="button2 pointer"
                    onClick={() => {
                      dispach(addToCart(item));
                      !cartState ? cartA() : NULL;
                    }}
                  >
                    Add to cart
                  </button>
                ) : (
                  <button className="button2_out pointer">Add to cart</button>
                )}
              </div>
            </div>
          </div>
          <div className="detail_description">
            <div className="detail_description_head">
              <h3>Product details</h3>
            </div>
            <div className="detail_description_text">
              <p>{data?.data.data.description}</p>
            </div>
          </div>
        </div>
      </div>
      {recent && (
        <Products
          length={true}
          item={recent}
          loading={false}
          title="Recently Viewed"
        />
      )}
      <Products
        length={true}
        loading={category_loading}
        item={category_data?.data.data}
        title="Related items"
      />
    </div>
  );
}
export default Detail;
