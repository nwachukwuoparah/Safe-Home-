import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import "./allcategories.css";
import Products from "../Components/PRODUCT/Products";
import Categoriesroute from "../Components/ROUT/Categoriesroute";
import { TbTruckDelivery } from "react-icons/tb";
import { MdHighQuality } from "react-icons/md";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { ThemeContext } from "../Components/ContexApi/Contex";
import { getALLCategory } from "../Components/Api/Query";
import { getByCategory } from "../Components/Api/Query";
import { useSelector } from "react-redux";
function AllCategories({}) {
  const { categoryName } = useParams();

  const { changeTheme, display, activeuser } = useContext(ThemeContext);

  const user = useSelector((state) => state.Commerce.user);

  const { data: category_data, isLoading: category_loading } = useQuery(
    ["products", categoryName],
    getByCategory,
    {
      refetchOnWindowFocus: false,
      enabled: categoryName !== "2",
    }
  );

  const { data, isLoading } = useQuery(["all_category"], getALLCategory, {
    refetchOnWindowFocus: false,
    enabled: categoryName === "2",
  });

  useEffect(() => {
    display && changeTheme();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <Categoriesroute item="CATEGORY" />
      <Products
        loading={!isLoading ? isLoading : category_loading}
        length={true}
        item={
          categoryName === "2" ? data?.data?.data : category_data?.data.data
        }
      />
      <div className="categories_Promo">
        <div className="categories_Promo_wrap">
          <div className="categories_Promo_text">
            <TbTruckDelivery fontSize={60} color="#FFA903" />
            <div>
              <h4>free delivery</h4>
              <p>on order above $50,000</p>
            </div>
          </div>
          <div className="categories_Promo_text">
            <MdHighQuality fontSize={60} color="#FFA903" />
            <div>
              <h4>Best quality</h4>
              <p>best quality in low price</p>
            </div>
          </div>
          <div className="categories_Promo_text">
            <RiShieldKeyholeFill fontSize={60} color="#FFA903" />
            <div>
              <h4>1 Year warranty</h4>
              <p>Avaliable warranty</p>
            </div>
          </div>
        </div>
      </div>
      {user[0]?.status === 201 ? null : (
        <div className="categories_Call_To_Action">
          <button>Sign in</button>
          <span className="categories_Nav">
            New customers? <p> Start here.</p>
          </span>
        </div>
      )}
    </div>
  );
}

export default AllCategories;
