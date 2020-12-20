const backend_path = process.env.REACT_APP_BACKEND_PATH;

const be = {
    PLAIN: backend_path,
    API_LOGIN: backend_path + "/login",
    API_REGISTER: backend_path + "/register",
    API_PARCEL_LIST: backend_path + "/parcels",
    API_PARCEL: (id) => backend_path + "/parcel/" + id,
    LOGOUT: backend_path + "/logout"
}

export default be;