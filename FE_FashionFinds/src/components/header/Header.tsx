import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Search from "../search";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getCartByUser } from "../../actions/cart";
import { logoutUser } from "../../store/Auth/AuthSlice";
const Header = () => {

  // state
  const navigate = useNavigate();
  const { carts } = useAppSelector((item: any) => item.carts);
  const dispatch = useAppDispatch();
  const productList = carts?.products;
  // get user from loc alstore
  const { users } = useAppSelector((state: any) => state.auth);
  const user = users?.user;
  const _id = user?._id

  const countCart = carts?.products?.length
  useEffect(() => {
    if (user) {
      const fetCart = async () => {
        await dispatch(getCartByUser(_id)).unwrap();
      }
      fetCart();
    }
  }, [])

  // logout
  const logout = () => {
    localStorage.clear();
    dispatch(logoutUser())
    navigate("/")
  };

  const dropdownRef = useRef<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  return (
    <header className="header bg-[#000000] py-5 md:py-10 w-full  md:h-[200px] shadow-lg">
      <div className="flex items-center  md:w-[1200px] mx-auto justify-between px-5 pt-2 mb-2 page-container">
        <div className="flex items-center gap-x-5">
          <div className="w-[300px] md:w-full">
            <Search />
          </div>
        </div>
        <div className="absolute md:max-w-[200px] max-w-[100px] top-[10px] left-[10px]">
          <img
            src="https://bizweb.dktcdn.net/100/376/737/themes/894814/assets/bg_left_header.png?1665394167535"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className=" md:block hidden md:max-w-[1000px]">
          <img
            src="https://bizweb.dktcdn.net/100/376/737/themes/894814/assets/logo.png?1676271560514"
            alt=""
            className="object-cover w-full z-[1000px] relative h-full"
          />
        </div>
        <div className="flex cursor-pointer text-[#acacac] items-center gap-x-5">
          <div className="account menu-item">
            {user ? (
              <div className="flex gap-2 items-center">
                <Link to="#">
                  <img
                    width={20}
                    className="rounded-full"
                    src={user?.user_avatar}
                    alt="Avata"
                  />
                </Link>
                <div className="text-[14px] md:block hidden">{user?.user_fullName}</div>
              </div>
            ) : (
              <Link to="/signin">
                <i className="fa-solid fa-user"></i>
              </Link>
            )}
            {user ? (
              <ul className="submenu">
                <li>
                  <Link to="#">Thông tin tài khoản</Link>
                </li>
                <li>
                  <Link to="/bills/detail">Đơn mua</Link>
                </li>
                <li>
                  <button onClick={logout}>Đăng xuất</button>
                </li>
              </ul>
            ) : (
              <ul className="submenu">
                <li>
                  <Link to="/signin">Đăng nhập</Link>
                </li>
                <li>
                  <Link to="/signup">Đăng ký</Link>
                </li>
              </ul>
            )}
            {user?.user_role === "admin" ? (
              <ul className="submenu">
                <li>
                  <Link to="#">Thông tin tài khoản</Link>
                </li>
                <li>
                  <Link to="/bills/detail">Đơn mua</Link>
                </li>
                <li>
                  <Link to="/admin">Trang quản trị</Link>
                </li>
                <li>
                  <button onClick={logout}>Đăng xuất</button>
                </li>
              </ul>
            ) : (
              <div className="cart"></div>
            )}
          </div>
          {/* <div className="flex  hover:text-secondary transition-all space-x-2 items-center">
            <div className="relative md:mr-20">
              <Link to="/cart">
                <i className="fa-solid fa-bag-shopping fa-bounce  text-[20px] text-[#edda02]"></i>
              </Link>
              <span className="absolute top-[-10px] z-10 md:border rounded-full px-1 md:px-2">
                {countCart || 0}
              </span>
            </div>
          </div> */}
          <div className="flex transition-all space-x-2 items-center relative">
            <div className="relative md:mr-20" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="focus:outline-none"
                aria-label="Open Cart Dropdown"
              >
                <i className="fa-solid fa-bag-shopping fa-bounce text-[20px] text-[#edda02]"></i>
                <span className="absolute top-[-12px]  right-[-10px] z-10 bg-red-500 text-white text-xs px-1 md:px-2 rounded-full">
                  {countCart || 0}
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 top-[40px] right-0  bg-white border border-gray-300 shadow-md rounded-md w-[300px] md:w-[500px] ">
                  {/* Dropdown content */}
                  <div>
                    {productList?.length > 0 ? (
                      <div className="bg-white px-5 shadow-lg py-3">
                        <h1 className=" text-[12px] md:text-[16px]">Sản phẩm mới thêm</h1>
                        {productList?.map((item: any, index: number) => {
                          return (
                            <div className="z-10" key={index}>
                              <Link to={`/products/${item?.productId?._id}`} className="flex justify-between mt-3">
                                <div className="flex gap-3">
                                  <div className="max-w-[25px] md:max-w-[40px]">
                                    <img src={item?.productId?.product_images} alt="" />
                                  </div>
                                  <div className="cart-item-name">
                                    <h1 className="text-black text-[12px] md:text-[16px]">{item?.productId?.product_name.length > 30 ? item?.productId?.product_name?.slice(0, 30).concat("...") : item?.productId?.product_name.slice(0, 15).concat("...")}</h1>
                                  </div>
                                </div>
                                <div className="cart-item-price">
                                  <span className="text-red-400  text-[12px] md:text-[16px]">{item?.productId?.product_price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                        <div className="flex justify-between item-center mt-2">
                          <div className="text-black  text-[12px] md:text-[16px]">
                            Số sản phẩm: {carts?.products?.length}
                          </div>
                          <div>
                            <Link to="/cart" className="bg-red-500  text-[12px] md:text-[16px] text-white rounded-sm px-2 py-2 transition-all hover:bg-red-600 ">
                              Xem giỏ hàng
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2 text-center text-red-500 bg-slate-50">
                        Giỏ hàng trống
                      </div>
                    )}
                    {/* Add more cart content here */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <nav >
        <ul className="flex items-center justify-center py-2 mt-9 md:text-[16px] text-[12px] pb-2 font-medium capitalize  text-[#acacac]">
          <li className="pr-3 transition-all hover:text-secondary  hover:border-b-secondary">
            <Link to="/" className="font-bold active:text-secondary">
              Trang chủ
            </Link>
          </li>
          <li className="px-3 transition-all hover:text-secondary focus:text-red-500 hover:border-b-secondary">
            <Link to="/products" className="font-bold ">
              Sản phẩm
            </Link>
          </li>
          <li className="px-3 transition-all hover:text-secondary  hover:border-b-secondary">
            <Link to="/about" className="font-bold ">
              Giới thiệu
            </Link>
          </li>
          <li className="px-3 transition-all hover:text-secondary  hover:border-b-secondary">
            <Link to="/contact" className="font-bold ">
              Liên hệ
            </Link>
          </li>
          <li className="px-3 transition-all hover:text-secondary  hover:border-b-secondary">
            <Link to="/news" className="font-bold ">
              Tin tức
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
