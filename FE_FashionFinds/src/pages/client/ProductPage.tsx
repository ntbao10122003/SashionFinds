import { Link } from "react-router-dom";
import ProductItem from "../../components/product/ProductItem";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getAllProduct, getProductByCategoryId } from "../../actions/product";
import { IProduct } from "../../interface/Product";
import { getAllCategory } from "../../actions/category";
import { ICategory } from "../../interface/Category";
import { Skeleton } from "antd";
const ProductPage = () => {
  /// context
  const { products, isLoading } = useAppSelector((state: any) => state.products);
  const { categories } = useAppSelector((state: any) => state.categories);
  const dispatch = useAppDispatch();

  // state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Gọi hàm fetch data products
  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategory());
    setCurrentPage(products.page);
    setTotalPages(products.totalPages);
  }, [dispatch]);

  const getProductByCategory = async (categoryId: any) => {
    dispatch(getProductByCategoryId(categoryId));
  };
  return (
    <main className="product md:w-[1200px] mx-auto">
      <div className="product_heading page-container px-2 md:px-5">
        <nav aria-label="Breadcrumb" className="flex w-[180px] mt-5 mx-auto">
          <ol
            className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600"
          >
            <li className="flex items-center">
              <Link to="/"
                className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>

                <span className="ms-1.5 text-xs font-medium"> Home </span>
              </Link>
            </li>

            <li className="relative flex items-center">
              <span
                className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"
              >
              </span>

              <Link
                to="#"
                className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900"
              >
                Shirts
              </Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="product_content page-container px-2 md:px-5">
        <div className="grid md:grid-cols-5 gap-4">
          <div className="col-span-1 w-full">
            <div className="product_category mb-5">
              <h4 className="text-xl mb-5 md:ml-3 mt-3 font-bold">
                Danh mục
              </h4>
              <ul className="grid grid-cols-4 md:grid-cols-1 gap-3 w-[350px] md:w-[200px] md:ml-3">
                {categories?.docs?.map((item: ICategory) => (
                  <li
                    key={item._id}
                    className="bg-[#F2F2F2] cursor-pointer px-1 md:text-[15px] text-[10px] md:px-3 py-1 duration-300 transition-all text-[#7A7A9D] hover:bg-white hover:text-secondary hover:border hover:border-secondary rounded-md"
                    onClick={() => getProductByCategory(item._id)}
                  >
                    <Link to="">{item.category_name?.length > 15 ? item.category_name?.slice(0, 15).concat("...") : item.category_name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="color_product mb-5">
              <h4 className="text-xl mb-5 md:ml-3 font-bold">Sản phẩm nổi bật</h4>
              <ul className="flex flex-wrap gap-2">
                <li className="bg-[#F2F2F2] ml-3 px-3 duration-300 transition-all text-[#7A7A9D] hover:bg-white hover:text-secondary hover:border hover:border-secondary rounded-md">
                  <Link to="">XS</Link>
                </li>
              </ul>
            </div> */}

          </div>
          <div className="col-span-4">
            <div className="flex items-center  md:py-3 justify-between px-3 md:px-4">
              <span className="text-[#7A7A9D] md:text-[15px] text-[12px]">{products?.docs?.length} sản phẩm</span>
              <div className="sort-cate-right">
                <label className="title mr-2 md:text-[15px] text-[12px]">Sắp xếp theo</label>
                <select className="px-2 py-2   md:text-[15px] text-[12px] rounded outline-none hover:border-yellow-300 duration-300 transition-all border">
                  <option value="">Từ A {"->"} Z</option>
                  <option value="">Từ Z {"->"} A</option>
                  <option value="">Giá thấp đến cao</option>
                  <option value="">Giá từ cao đến thấp</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {products?.docs?.map((item: IProduct) => (
                <div key={item._id} className="flex items-center justify-center">
                  {isLoading ? (<Skeleton active paragraph={{ rows: 6 }} />) : (
                    <ProductItem item={item} isLoading={isLoading} />
                  )}
                </div>
              ))}
            </div>
            <div className="col-span-4 py-2">
              <div className="col-span-4 py-2">
                <ul className="flex items-center justify-center gap-x-2">
                  <li className="px-3 py-1 border duration-300 transition-all border-[#7A7A9D] bg-white text-[#7A7A9D] hover:bg-secondary hover:text-white">
                    <button
                      onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                      disabled={currentPage === 1}
                    >
                      {"<"}
                    </button>
                  </li>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <li
                      key={index + 1}
                      className={`px-3 py-1 border duration-300 transition-all border-[#7A7A9D] bg-white text-[#7A7A9D] hover:bg-secondary hover:text-white ${index + 1 === currentPage
                        ? "bg-secondary text-black"
                        : ""
                        }`}
                    >
                      <button onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  {/* paginate */}
                  <li className="px-3 py-1 border duration-300 transition-all border-[#7A7A9D] bg-white text-[#7A7A9D] hover:bg-secondary hover:text-white">
                    <button
                      onClick={() => setCurrentPage((nextPage) => nextPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      {">"}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
