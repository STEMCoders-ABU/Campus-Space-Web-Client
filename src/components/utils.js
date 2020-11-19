import * as ReactScroll from 'react-scroll';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export const animateScroll = ReactScroll.animateScroll;
export const ReactSwal = withReactContent(Swal);

export const scrollToTop = () => {
    animateScroll.scrollToTop({
        duration: 700,
        delay: 0,
        smooth: true,
    });
};

export const showLoading = (title = 'Please wait...') => {
    ReactSwal.fire({
        title: title,
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false,
        onOpen: () => {
            ReactSwal.showLoading();
        }
    });
};

export const showError = (title, body) => {
    ReactSwal.fire({
        title: title,
        html: body,
        icon: 'error',
        confirmButtonText: 'Retry',
    });
};

export const showSuccess = (title, body = '', timeout = 2000) => {
    ReactSwal.fire({
        title: title,
        html: body,
        icon: 'success',
        timer: timeout,
    });
};

export const showInfo = (title, body = '', timeout = 5000) => {
    ReactSwal.fire({
        title: title,
        html: body,
        icon: 'info',
        timer: timeout,
    });
};

export const showNetworkError = () => {
    ReactSwal.fire({
        title: 'Oops!',
        text: 'A network error occured, please try again.',
        icon: 'error',
        confirmButtonText: 'Okay'
    });
};