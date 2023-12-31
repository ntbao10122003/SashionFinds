import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getProductById } from "../../actions/product";
import { getCommentByProduct, postComment } from "../../actions/comment";
import { addToCart } from "../../actions/cart";
import { useNavigate } from "react-router-dom";
// ant
import { Tabs, Input, Button, Form, Rate } from "antd";
import { GetProductByCategoryID } from "../../api/Product";
import { useForm } from "react-hook-form";
const { TextArea } = Input;
// const { TabPane } = Tabs;

import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import { Navigation, Pagination } from "swiper/modules";
import ProductItem from "../../components/product/ProductItem";
//data fake
const colors = [
  {
    display: "Trắng",
    color: "white",
  },
  {
    display: "Đen",
    color: "black",
  },
  {
    display: "Xanh",
    color: "blue",
  },
];
const sizes = [
  {
    display: "M",
    size: "m",
  },
  {
    display: "L",
    size: "l",
  },
  {
    display: "Xl",
    size: "xl",
  },
  {
    display: "2Xl",
    size: "2xl",
  },
];


const ProductDetail = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string | any }>();
  const [color, setColor] = useState(undefined);
  const [size, setSize] = useState(undefined);
  const { reset } = useForm();
  // call state
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(
    (state) => state.products
  );
  const [productList, setProductList] = useState([]);
  const { comments } = useAppSelector((state) => state.comments);
  const { bills } = useAppSelector((state) => state.bills);
  console.log(bills);

  const { product } = products;
  const categoryId = product?.categoryId

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getCommentByProduct(id) as any);
    reset(products);
  }, [dispatch, id]);

  useEffect(() => {
    const fetProduct = async () => {
      try {
        const { data } = await GetProductByCategoryID(categoryId);
        // console.log(data.productResponse.docs);
        await setProductList(data?.productResponse.docs);
        // reset(data?.productResponse?.docs)
      } catch (error: any) {
        console.log(error);
      }
    }
    fetProduct();
  }, [categoryId])

  // Input
  const [count, setCount] = useState(1);
  const handleIncrement = () => {
    setCount((count) => count + 1);
  };
  const handleDecrement = () => {
    if (count <= 0) return;
    setCount((count) => count - 1);
  };

  // Lấy ra id user từ localstore
  // const userStr: any = localStorage.getItem("users");
  // const user = userStr ? JSON.parse(userStr) : null;
  // const { _id } = user?.user || {};
  const { users } = useAppSelector((state) => state.auth);
  const _id = users?.user?._id;

  // // Phần đánh giá
  const [activeTab, setActiveTab] = useState("description");
  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };

  const onReviewSubmit = async (values: any) => {
    if (users !== null) {
      const commentData = {
        userId: _id,
        productId: id,
        rating: values.rating,
        review: values.review,
      };

      dispatch(postComment(commentData));
    } else {
      alert("Bạn phải đăng nhập mới được bình luận");
    }
  };

  // add to cart
  const onAddToCart = async () => {
    if (users !== null || users) {
      const cartPro = {
        quantity: count,
        userId: _id,
        color,
        size,
        productId: id,
      };
      await dispatch(addToCart(cartPro)).unwrap().then(() => navigate("/cart"));
    } else {
      alert("Bạn phải đăng nhập mới mua được sản phẩm");
    }
  };

  return (
    <main className="product-detail md:w-[1200px] mx-auto">
      <div className="page-container px-5">
        <ul className="flex mt-8 mb-3">
          <li className="text-sm font-medium hover:text-secondary">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-sm text-[#000] font-bold">
            <span> Áo Sơ Mi Nam Sợi Tre Dài Tay Quốc Dân</span>
          </li>
        </ul>
      </div>
      {product && (
        <div>
          <form className="page-container px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
              <div className="col-span-1 h-[550px] overflow-hidden">
                <img
                  className="w-full h-full cursor-pointer object-cover object-top rounded-md"
                  src={product.product_images}
                  alt=""
                />
              </div>
              <div className="col-span-1">
                <div className="flex flex-col">
                  <h3 className="text-[##17191C] text-[24px] font-bold pt-1">
                    {product.product_name}
                  </h3>
                  <div className="flex space-x-3 items-center mb-3">
                    <span className="text-yellow-400">
                      {product.average_score} sao
                    </span>
                    <span className="text-gray-500 text-[15px]">1k đã bán</span>
                    <span className="text-gray-500 text-[15px]">
                      {comments?.comment?.length} bình luận
                    </span>
                    <span className="text-gray-500 text-[15px]">
                      {product.product_quantity} sản phẩm
                    </span>
                  </div>
                  <p className="text-[#7A7A9D] text-sm mb-4">
                    {product.product_description_long}
                  </p>
                  <div className="flex items-center space-x-3 ">
                    <span className="text-red-400 text-xl font-semibold mb-3">
                      {product.product_price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </span>
                    <del className="text-gray-500 text-xl font-semibold mb-3">
                      {product.product_price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </del>
                  </div>

                  <div className="color mb-5">
                    <span className="mb-2 block">Màu sắc: </span>
                    <ul className="flex items-center gap-x-2">
                      {colors.map((item, index) => (
                        <li
                          key={index}
                          className="py-2 px-3 text-[#7A7A9D] cursor-pointer transition-all duration-300 bg-slate-100 hover:text-secondary hover:bg-yellow-100 rounded-md"
                          onClick={() => setColor(item?.color as any)}
                        >
                          {item.display}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="size mb-5">
                    <span className="mb-2 block">Kích Thước: </span>
                    <ul className="flex items-center gap-x-2">
                      {sizes.map((item, index) => (
                        <li
                          key={index}
                          className="h-[40px] flex items-center justify-center cursor-pointer w-[60px] transition-all duration-300 text-[#7A7A9D] bg-gray-200 hover:text-yellow-700 hover:bg-yellow-200 rounded-md"
                          onClick={() => setSize(item?.size as any)}
                        >
                          {item.display}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="action-addCart mb-8">
                    <div className="grid grid-cols-3">
                      <div className="col-span-1 flex items-center text-center cursor-pointer">
                        <p
                          onClick={handleDecrement}
                          className="w-10 h-10 text-[#7A7A9D] text-xl border border-gray-300 rounded-s"
                        >
                          -
                        </p>
                        <input
                          type="text"
                          value={count}
                          name="quantity"
                          onChange={(e) => e.target.value}
                          id=""
                          className="inline-block  w-10 h-10 text-center border border-t-gray-300  text-[#7A7A9D] text-xl "
                        />

                        <p
                          onClick={handleIncrement}
                          className="w-10 h-10 border border-gray-300 rounded-r text-[#7A7A9D] text-xl"
                        >
                          +
                        </p>
                      </div>
                      <div className="col-span-2">
                        <Link
                          to=""
                          onClick={() => onAddToCart()}
                          className="w-full transition-all flex items-center justify-center duration-300 h-10 bg-secondary inline-block text-white text-sm font-medium rounded-md hover:text-yellow-600 hover:bg-yellow-200"
                        >
                          Thêm vào giỏ hàng
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="ship mb-8">
                    <div className="grid grid-cols-2 gap-y-4">
                      <div className="col-span-1">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-10 h-10 mb-2">
                            <img
                              className="w-full h-full block"
                              src="https://bizweb.dktcdn.net/100/438/408/themes/913235/assets/ic_payment_freeship.svg?1689440468558"
                              alt=""
                            />
                          </div>
                          <p className="text-center text-sm text-[#17191C]">
                            Miễn phí vận chuyển <br></br> với mọi đơn hàng từ
                            498k
                          </p>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-10 h-10 mb-2">
                            <img
                              className="w-full h-full block"
                              src="https://bizweb.dktcdn.net/100/438/408/themes/913235/assets/ic_payment_freechange.svg?1689440468558"
                              alt=""
                            />
                          </div>
                          <p className="text-center text-sm text-[#17191C]">
                            Miễn phí đổi trả tại 230+ <br></br> cửa hàng trong
                            15 ngày
                          </p>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-10 h-10 mb-2">
                            <img
                              className="w-full h-full block"
                              src="https://bizweb.dktcdn.net/100/438/408/themes/913235/assets/empty-wallet-tick.svg?1689440468558"
                              alt=""
                            />
                          </div>
                          <p className="text-center text-sm text-[#17191C]">
                            Đa dạng phương thức
                            <br /> thanh toán
                            <br />
                            (VNPay, Momo, COD)
                          </p>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-10 h-10 mb-2">
                            <img
                              className="w-full h-full block"
                              src="https://bizweb.dktcdn.net/100/438/408/themes/913235/assets/ic_payment_fastship.svg?1689440468558"
                              alt=""
                            />
                          </div>
                          <p className="text-center text-sm text-[#17191C]">
                            Vận chuyển siêu tốc <br /> từ 1 đến 3 ngày
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="page-container px-5">
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
              <Tabs.TabPane tab="MÔ TẢ" key="description">
                <div className="tab-content" id="descriptionContent">
                  <div className="product-box">
                    <div className="product-title">
                      <h3 className="text-xl text-red font-medium">
                        Chi tiết sản phẩm
                      </h3>
                    </div>
                    <div className="product-content">
                      <p>{product.product_description_long}</p>
                    </div>
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="ĐÁNH GIÁ" key="evaluate">
                <div className="tab-content mb-5" id="evaluateContent">
                  {comments?.comment?.length > 0 ? (
                    <ul className="grid grid-cols-1">
                      {comments?.comment?.map((item: any, index: string) => {
                        return (
                          <li key={index} className="col-span-1 mb-5">
                            <div className="flex gap-x-5">
                              <div className="h-10 w-10">
                                <img
                                  className="w-full h-full object-cover rounded-full"
                                  src={item?.user_avatar}
                                  alt=""
                                />
                              </div>
                              <div>
                                <h1 className="font-medium">
                                  {item?.user_fullName}
                                </h1>
                                <div className="flex items-center">
                                  <span className="text-red-500 font-semibold mr-2">
                                    <Form.Item colon={false}>
                                      <Rate value={item?.rating} disabled />
                                    </Form.Item>
                                  </span>
                                  <span>
                                    {item?.createdAt
                                      ?.slice(0, 10)
                                      ?.split("-")
                                      ?.reverse()
                                      ?.join("-")}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="font-thin italic">{item?.review}</p>
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <p className="text-red-500 text-center text-xl">
                      Chưa có đánh giá nào
                    </p>
                  )}
                  {bills ? (
                    <div className="evaluate-box">
                      <Form
                        form={form}
                        name="wrap"
                        labelAlign="left"
                        labelWrap
                        wrapperCol={{ flex: 1 }}
                        colon={false}
                        onFinish={onReviewSubmit}
                      >
                        <div className="form-title">
                          <h1 className="text-xl">
                            Mời bạn để lại nhận xét cho sản phẩm này!
                          </h1>
                        </div>

                        <Form.Item name="rating" label="rating" initialValue={1}>
                          <Rate />
                        </Form.Item>
                        <Form.Item
                          name="review"
                          label="Nhận xét của bạn"
                          rules={[
                            {
                              required: true,
                              message: "Không được bỏ trống bình luận",
                            },
                          ]}
                        >
                          <TextArea
                            showCount
                            maxLength={100}
                            style={{ height: 120, resize: "none" }}
                            placeholder="Hãy bình luận sản phẩm này"
                          />
                        </Form.Item>

                        <Form.Item label=" ">
                          <Button
                            type="primary"
                            className="bg-blue-500"
                            htmlType="submit"
                          >
                            Đánh giá
                          </Button>
                        </Form.Item>
                      </Form>
                    </div >
                  ) : ""}
                </div >
              </Tabs.TabPane >
            </Tabs >
          </div >
        </div >
      )}
      <div className="similar_product page-container px-5 my-10">
        <h4 className="text-xl font-bold">Sản phẩm tương tự</h4>
        {/* <div className="grid grid-cols-5">
          <div className="col-span-5">
            <Swiper
              key={v4()}
              breakpoints={{
                // when window width is >= 640px
                350: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                768: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
                // when window width is >= 768px
                1023: {
                  slidesPerView: 5,
                  slidesPerGroup: 5,
                },
              }}
              spaceBetween={10}
              slidesPerGroup={5}
              loop={true}
              // loopfillgroupwithblank="true"
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="category_list"
            >
              {new Array(20).fill(0).map(() => (
                <SwiperSlide key={v4()}>
                  <ProductItem key={v4()}></ProductItem>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div> */}
        {/* <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-8"> */}
        {/* {productList?.map((pro: any) => {
            return ( */
          // <div key={pro._id} className="flex flex-col md:max-h-[500px] h-full p-3 overflow-hidden rounded-lg select-none movie-cart">
          //   <Link
          //     to={`/products/${_id}`}
          //     className="overflow-hidden rounded-md h-[250px]"
          //   >
          //     <span className="absolute z-10 bg-yellow-300 px-3">
          //       {pro?.product_discount} %
          //     </span>
          //     <div className="md:max-w-[300px]">
          //       <img
          //         src={pro?.product_images}
          //         alt=""
          //         className="w-full  img-main hover:scale-105 h-full duration-300 transition-all  object-cover rounded-md mb-5"
          //       />
          //     </div>
          //   </Link>
          //   <div className="absolute z-10 mt-[100px] hidden hover:block ml-[90px] item-cart">
          //     <i className="fa-solid fa-cart-shopping fa-beat text-[#f0dd0a]"></i>
          //   </div>
          //   <div className="flex flex-col flex-1 mt-4">
          //     <h5 className="mb-2 hover:text-secondary   duration-200 transition-all">
          //       <Link to={`/products/${_id}`}>{pro?.product_name?.length > 15 ? pro?.product_name.slice(0, 35).concat("...") : pro?.product_name}</Link>
          //     </h5>
          //     <div className="flex items-center justify-between mb-10 text-sm ">
          //       <span className="font-bold text-[#CD151C] text-[15px]">
          //         {pro?.product_price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          //       </span>
          //       <span className="text-[14px]">{pro?.product_color}</span>
          //     </div>
          //   </div>
          // </div>

          //   )
          // })}
        }
        <Swiper
          breakpoints={{
            350: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            1023: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
          }}
          spaceBetween={10}
          slidesPerGroup={5}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation, Pagination]}
          className="category_list"
        >
          {productList.map((product) => (
            <SwiperSlide key={uuidv4()}>
              <ProductItem item={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* </div> */}
      </div>
    </main >
  );
};

export default ProductDetail;