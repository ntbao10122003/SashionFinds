import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { ISignin } from "../../interface/Auth"
import { useAppDispatch } from "../../store/hook"
import { Login } from "../../actions/auth"

const SigninPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ISignin>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onHandleSubmit = async (value: any) => {
        const data = await dispatch(Login(value)).unwrap();
        localStorage.setItem("users", JSON.stringify(data));
        if (data.user.user_role === "admin") {
            navigate("/admin")
        } else { navigate("/") }
    }

    return (
        <div className="md:bg-[url('https://bizweb.dktcdn.net/100/438/408/themes/915505/assets/bg_login.jpg?1690016531690')] md:py-12">
            <form action="" className="md:w-[600px] px-5 mx-auto py-10 md:px-[100px] bg-white" onSubmit={handleSubmit(onHandleSubmit)}>
                <p className="text-center mb-10">Chào mừng bạn đến với Yody!</p>
                <h1 className="text-center font-bold text-[30px]">ĐĂNG NHẬP</h1>
                <div className="text-[16px] mt-5">
                    <div>
                        <input
                            type=""
                            {...register("user_email", {
                                required: "Email không được bỏ trống ",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email Không đúng định rạng"
                                }
                            })}
                            placeholder="Địa chỉ Email"
                            className="w-full border outline-none rounded-sm px-5 py-2 mb-5 focus:duration-300 focus:border-b-secondary" />
                        <div className="text-red-500">{errors?.user_email && errors?.user_email.message}</div>
                    </div>
                    <div>
                        <div className="relative flex ">
                            <input
                                id="pwd"
                                {...register("user_password", { required: "Password không được bỏ trống ", minLength: { value: 6, message: "Tối thiểu 6 kí tự " } })}
                                type="password"
                                placeholder="Mật khẩu"
                                className="w-full border outline-none rounded-sm px-5 py-2 mb-5 focus:duration-300 focus:border-b-secondary" />
                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4 pb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-9 w-5 text-gray-400 cursor-pointer hover:text-yellow-300 duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    id="chk"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </span>
                        </div>
                        <div className="text-red-500">{errors?.user_password && errors?.user_password.message}</div>
                    </div>
                    <div className="text-center">
                        <button className="text-center w-full bg-[#ffb801] hover:bg-yellow-500 transition-all  duration-300 text-white py-2 rounded-sm mb-5">Đăng nhập</button>
                    </div>
                    <div className="text-center">
                        <Link
                            to="#"
                            className="text-[#ffb801] hover:text-yellow-500 transition-all">Quên mật khẩu</Link>
                        <p className="mt-5 text-[17px] text-gray-700">Hoặc đăng nhập bằng</p>
                        <div className="flex items-center justify-center space-x-5 mt-5 mb-[80px]">
                            <Link
                                to=""
                                className="flex items-center space-x-2 border px-3 py-2 rounded-full">
                                <i className="fa-brands fa-google fa-bounce"></i>
                                <p>Google</p>
                            </Link>
                            <Link
                                to=""
                                className="flex items-center space-x-2 border px-3 py-2 rounded-full">
                                <i className="fa-brands fa-facebook fa-bounce"></i>
                                <p>Facebook</p>
                            </Link>
                        </div>
                        <div>
                            Bạn đã có tài khoản? <Link to="/signup" className="text-[#ffb801] hover:text-yellow-500 transition-all"> Đăng ký ngay!</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SigninPage