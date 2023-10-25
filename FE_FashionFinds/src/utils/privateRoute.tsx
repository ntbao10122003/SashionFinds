// import { Navigate, Outlet, useNavigate } from 'react-router-dom';

// import { useEffect } from "react";
// import { useAppSelector } from '../store/hook';

// const PrivateRoute = ({ isAuth }: any) => {
//     const navigate = useNavigate();
//     const { users } = useAppSelector((state) => state.auth)
//     useEffect(() => {
//         if (users.user?.user_role !== "admin") {
//             navigate("/signin");
//             isAuth === false
//         }
//         isAuth === true
//         // if (!isAuth) {
//         //     navigate("/signin")
//         // }
//     }, [isAuth])
//     return isAuth ? <Outlet /> : <Navigate to="/signin" />
// }

// export default PrivateRoute;
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useAppSelector } from '../store/hook';

const PrivateRoute = ({ isAuth }: any) => {
    console.log(isAuth);

    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth.users); // Lấy thông tin user từ state.auth
    useEffect(() => {
        if (user?.user_role !== "admin") { // Kiểm tra user_role của user có là "admin" không
            navigate("/checkAdmin");
        }
    }, [user, navigate]);

    return user?.user_role === "admin" ? <Outlet /> : <Navigate to="/checkAdmin" />;
};

export default PrivateRoute;