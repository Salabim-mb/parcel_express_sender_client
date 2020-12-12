import MainPage from "../pages/MainPage/MainPage";

export const path_list = {
    LOGIN: "/login",
    REGISTER: "/register",
    PROFILE: "/me",
    PARCEL_LIST: "/me/my-parcels",
    DASHBOARD: "/"
};

export default [
    {
        path: path_list.DASHBOARD,
        component: MainPage,
        exact: true
    }
];