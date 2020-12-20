import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ParcelList from "../pages/ParcelList/ParcelList";

export const path_list = {
    LOGIN: "/login",
    REGISTER: "/register",
    PARCEL_LIST: "/me/my-parcels",
    DASHBOARD: "/"
};

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        path: path_list.DASHBOARD,
        component: MainPage,
        exact: true
    },
    {
        path: path_list.LOGIN,
        component: LoginPage,
        exact: true
    },
    {
        path: path_list.REGISTER,
        component: RegisterPage,
        exact: true
    },
    {
        path: path_list.PARCEL_LIST,
        component: ParcelList,
        exact: true
    }
];