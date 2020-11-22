const { default: Axios } = require("axios");

export const IS_DEVELOPMENT_MODE = false;

export const axiosInstance = () => {
    const instance = Axios.create({
        baseURL: IS_DEVELOPMENT_MODE ? 'http://localhost/csapi/1.1/' : 'https://api.campus-space.com.ng/public/index.php/',
        withCredentials: true,
        validateStatus: function (status) {
            return status >= 200 && status < 500;
        },
    });

    return instance;
};

export const axios = axiosInstance();