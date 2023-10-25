
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SliderHomePage from "../../components/slider/SliderHomePage";
import { v4 } from "uuid";
import ProductListCategory from "../../components/product/ProductListCategory";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import ProductItem from "../../components/product/ProductItem";
import { Skeleton } from "antd";
import { IProduct } from "../../interface/Product";
import { useEffect } from "react";
import { getAllProduct } from "../../actions/product";
const HomePage = () => {
  const { products, isLoading } = useAppSelector((state: any) => state.products);
  const dispatch = useAppDispatch();

  // Gọi hàm fetch data products
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <>
      <main className="body">
        <section className="overflow-hidden slider-home page-container">
          <Swiper
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            grabCursor={true}
            slidesPerView={"auto"}
            className="mySwiper"
          >
            {new Array(10).fill(0).map(() => (
              <SwiperSlide key={v4()}>
                <SliderHomePage key={v4()}></SliderHomePage>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        {/* danh mục */}
        <section className="h-[300px] md:h-[700px] bg-white mb-10 z-[100px]">
          <div className="grid grid-cols-1 pt-8 md:pt-[100px] gap-4 lg:grid-cols-4 lg:gap-8 md:w-[1200px] mx-auto mb-5 md:mb-10">
            <div className="rounded-lg bg-gray-100 md:block hidden">
              <div className="flex h-32 flex-col justify-between border-e bg-white">
                <div className="px-4 md:py-6">
                  <ul className="mt-6 space-y-1">
                    <li>
                      <Link
                        to="#"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Phụ nữ
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Nam
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="md:h-32  rounded-lg  lg:col-span-3 px-2" >
              <div className="md:flex justify-between items-center ">
                <div></div>
                <h1 className="md:text-[50px] font-medium pb-3 md:pb-10 text-black">Top danh mục</h1>
              </div>
              <div className="grid grid-cols-3 gap-3 md:grid-cols-3 lg:gap-8">
                <div className="h-32 rounded-lg lg:gap-8">
                  <div className="category-image overflow-hidden">
                    <img className="hover:scale-[1.15] animation-all w-full duration-[300ms] cursor-pointer" src="https://bizweb.dktcdn.net/100/376/737/themes/894814/assets/banner_col_1.jpg?1676271560514" alt="" />
                  </div>
                  <div className="category-content">
                    <Link to="#">
                      <h1 className="font-medium duration-150 animation hover:text-red-500 text-black  text-[14px] md:text-[18px] text-center py-5 hover"># Quần áo</h1>
                    </Link>
                  </div>
                </div>
                <div className="h-32 rounded-lg lg:gap-8">
                  <div className="category-image overflow-hidden">
                    <img className="hover:scale-[1.15] animation-all w-full duration-[300ms] cursor-pointer" src="https://bizweb.dktcdn.net/100/376/737/themes/894814/assets/banner_col_2.jpg?1676271560514" alt="" />
                  </div>
                  <div className="category-content">
                    <Link to="#">
                      <h1 className="font-medium duration-150 animation hover:text-red-500 text-black  text-[14px] md:text-[18px] text-center py-5 hover"># Trang sức</h1>
                    </Link>
                  </div>
                </div>
                <div className="h-32 rounded-lg lg:gap-8">
                  <div className="category-image overflow-hidden">
                    <img className="hover:scale-[1.15] animation-all w-full duration-[300ms] cursor-pointer" src="https://bizweb.dktcdn.net/100/376/737/themes/894814/assets/banner_col_3.jpg?1676271560514" alt="" />
                  </div>
                  <div className="category-content">
                    <Link to="#">
                      <h1 className="font-medium duration-150 animation hover:text-red-500 text-black text-[14px] md:text-[18px] text-center py-5 hover"># Giày dép</h1>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* icon */}
        <section className="grid grid-cols-2 px-2 md:px-0 md:w-[1200px] mx-auto gap-4 lg:grid-cols-4 lg:gap-8 mb-5 md:mb-10">
          <div className="h-32 rounded-lg bg-gray-100 flex items-center gap-3 justify-center hover:shadow-md animation-all duration-300">
            <div>
              <i className="fa-solid fa-rotate-right text-[20px] md:text-[36px] text-[#ed0202] hover:fa-spin"></i>
            </div>
            <div>
              <h1 className="font-medium text-[16px] md:text-[18px] text-black">Đổi trả hàng</h1>
              <p className=" text-black text-[10px] text-gray-600">Trong vòng 24h</p>
            </div>
          </div>
          <div className="h-32 rounded-lg bg-gray-100 flex items-center gap-3 justify-center hover:shadow-md animation-all duration-300">
            <div>
              <i className="fa-solid fa-truck-fast   text-[20px] md:text-[36px] text-[#ed0202] hover:fa-spin"></i>
            </div>
            <div>
              <h1 className="font-medium text-[16px] md:text-[18px] text-black">Miễn phí giao hàng</h1>
              <p className=" text-black text-[10px] text-gray-600">Với đơn hàng {">"} 500k</p>
            </div>
          </div>
          <div className="h-32 rounded-lg bg-gray-100 flex items-center gap-3 justify-center hover:shadow-md animation-all duration-300">
            <div>
              <i className="fa-solid fa-phone   text-[20px] md:text-[36px] text-[#ed0202] hover:fa-spin"></i>
            </div>
            <div>
              <h1 className="font-medium text-[16px] md:text-[18px] text-black">Hỗ trợ trực tuyến</h1>
              <p className=" text-black text-[10px] text-gray-600">1900 6750</p>
            </div>
          </div>
          <div className="h-32 rounded-lg bg-gray-100 flex items-center gap-3 justify-center hover:shadow-md animation-all duration-300">
            <div>
              <i className="fa-solid fa-money-bill    text-[20px] md:text-[36px] text-[#ed0202]"></i>
            </div>
            <div>
              <h1 className="font-medium text-[16px] md:text-[18px] text-black">Thanh toán</h1>
              <p className=" text-black text-[10px] text-gray-600">An toàn, Bảo mật</p>
            </div>
          </div>
        </section>

        {/*  sản phẩm theo danh mục */}
        <section className=" grid-cols-2 md:grid-cols-4 mb-10 md:w-[1200px] mx-auto product-male page-container">
          <ProductListCategory categoryId="64bbad761bf229520476dbfc" />

        </section>
        <section className=" grid-cols-2 md:grid-cols-4 mb-10 md:w-[1200px] mx-auto product-male page-container">
          <ProductListCategory categoryId="64bbada61bf229520476dbff" />
        </section>

        <section className=" md:w-[1200px] mx-auto">
          <h1 className="text-[20px] md:px-0 px-2 md:text-[40px] font-medium text-black">Tất cả sản phẩm</h1>
          <div className="grid grid-cols-2 md:grid-cols-5  gap-2 md:gap-4">
            {products?.docs?.map((item: IProduct) => (
              <div key={item._id} className="flex items-center justify-center">
                {isLoading ? (<Skeleton active paragraph={{ rows: 6 }} />) : (
                  <ProductItem item={item} isLoading={isLoading} />
                )}
              </div>
            ))}
          </div>
        </section>


        <section className="bg-gray-50">
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Liên hệ với chúng tôi
              </h2>

              <p className="hidden text-gray-500 sm:mt-4 sm:block">
                Cảm ơn khách hàng đã ghé thăm shop
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-xl">
              <form action="#" className="sm:flex sm:gap-4">
                <div className="sm:flex-1">
                  <label htmlFor="email" className="sr-only">Email</label>

                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400"
                  />
                </div>

                <button
                  type="submit"
                  className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-rose-600 hover:bg-rose-700 animation-all px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
                >
                  <span className="text-sm font-medium "> Gửi </span>

                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
