const { VITE_Base_Url } = import.meta.env;
import axios from "axios";

export const getById = async (data) => {
  const path = data.queryKey[1];
  return await axios.get(`${VITE_Base_Url}/api/get/${path}`);
};

export const getALLCategory = async () => {
  return await axios.get(`${VITE_Base_Url}/api/user`);
};

export const getByCategory = async (data) => {
  const path = data.queryKey[1];
  return await axios.get(`${VITE_Base_Url}/api/category?category=${path}`);
};

export const categoryList = async () => {
  return await axios.get(`${VITE_Base_Url}/api/allCates/category`);
};

export const getByRating = async () => {
  const res = await axios.get(`${VITE_Base_Url}/api/user`);
  const result = res.data.data.filter((i) => {
    return i.rating > 550;
  });
  return result;
};





// function searchProducts(productsarr, query) {
//   const results = [];
//   for (const product of productsarr) {
//     if (product.categories.toLowerCase().includes(query.toLowerCase())) {
//       results.push(product);
//     }
//   }
//   // console.log(results)
//   setSearch(results);
//   results.length !== 0 && setSLoading(true)
// }

// async function search() {
//   console.log('result')
//   try {
//     const response = await axios.get('https://safehomefurniture.onrender.com/api/user')
//     // console.log(response)
//     searchProducts(response.data.data, searchinput)
//     // console.log(response.data.data)
//   } catch (e) {
//     console.log(e)
//   }
// }

// useEffect(() => {
//   searchinput && search()
//   searchresult.length === 0 ? null : setLength(true)
// }, [searchinput])