const backend_path = process.env.REACT_APP_BACKEND_PATH;

const be = {
    PLAIN: backend_path,
    API_LOGIN: backend_path + "/courier/login",
    API_REGISTER: backend_path + "/courier/register",
    API_PARCEL_LIST: backend_path + "/courier/parcels",
    API_PARCEL: (id) => backend_path + "/courier/parcel/" + id,
    LOGOUT: backend_path + "/courier/logout",
    NOTIFICATIONS: backend_path + "/notifications"
}

export default be;