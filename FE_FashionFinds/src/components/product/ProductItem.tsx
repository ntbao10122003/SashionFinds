import { Link } from "react-router-dom";
import "./css/productItem.css";
const ProductItem = (item: any) => {
  const {
    _id,
    product_images,
    product_name,
    product_price,
    product_color,
    product_discount,
  } = item?.item || {};
  return (
    <div className="flex flex-col md:max-h-[500px] h-full p-3 overflow-hidden rounded-lg select-none movie-cart">
      <Link
        to={`/products/${_id}`}
        className="overflow-hidden rounded-md h-[250px]"
      >
        <span className="absolute z-10 bg-yellow-300 px-3">
          {product_discount} %
        </span>
        <div className="md:max-w-[300px]">
          <img
            src={product_images}
            alt=""
            className="w-full  img-main hover:scale-110 h-full duration-300 transition-all  object-cover rounded-md mb-5"
          />
        </div>
      </Link>
      <div className="absolute z-10 mt-[100px] hidden hover:block ml-[90px] item-cart">
        <i className="fa-solid fa-cart-shopping fa-beat text-[#f0dd0a]"></i>
      </div>
      <div className="flex flex-col flex-1 mt-4">
        <h5 className="mb-2 hover:text-secondary   duration-200 transition-all">
          <Link to={`/products/${_id}`}>{product_name?.length > 15 ? product_name.slice(0, 35).concat("...") : product_name}</Link>
        </h5>
        <div className="flex items-center justify-between mb-10 text-sm ">
          <span className="font-bold text-[#CD151C] text-[15px]">
            {product_price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </span>
          <span className="text-[14px]">{product_color}</span>
        </div>
        {/* <Link to={`/products/${_id}`} className="w-full py-2 text-white text-center duration-300 transition-all  rounded-lg cursor-pointer hover:text-primary bg-[#fcaf17] hover:bg-white hover:border border border-secondary mt-auto">
          Xem chi tiết
        </Link> */}
      </div>
    </div>
  );
}
export default ProductItem;
