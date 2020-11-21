import * as ReactScroll from 'react-scroll';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { axios } from '../init';

export const animateScroll = ReactScroll.animateScroll;
export const ReactSwal = withReactContent(Swal);

export const ReactSwalFire = (configs, customClass = {}) => {
    return ReactSwal.fire({
        customClass: {
            container: 'swal-modal-container',
            ...customClass,
        },
        ...configs,
    })
};

export const scrollToTop = () => {
    animateScroll.scrollToTop({
        duration: 700,
        delay: 0,
        smooth: true,
    });
};

export const showLoading = (title = 'Please wait...') => {
    ReactSwalFire({
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
    ReactSwalFire({
        title: title,
        html: body,
        icon: 'error',
        confirmButtonText: 'Retry',
    });
};

export const showSuccess = (title, body = '', timeout = 2000) => {
    ReactSwalFire({
        title: title,
        html: body,
        icon: 'success',
        timer: timeout,
    });
};

export const showInfo = (title, body = '', timeout = 5000) => {
    ReactSwalFire({
        title: title,
        html: body,
        icon: 'info',
        timer: timeout,
    });
};

export const showNetworkError = () => {
    ReactSwalFire({
        title: 'Oops!',
        text: 'A network error occured, please try again.',
        icon: 'error',
        confirmButtonText: 'Okay'
    });
};

export const getErrorsMarkup = (error_messages) => {
    error_messages = error_messages.split('\\n');
    error_messages.pop();
    let error_html = error_messages.map((message) => `<li>${message}</li>`);
    error_html = '<ul style="text-align: left">' + error_html + '</ul>';

    return error_html;
};

export const downloadResource = (resource) => {
    showLoading('Getting Resource...');

    axios.get('resources/download?resource_id=' + resource.id, { responseType: 'blob'})
    .then(response => {
        if (response.status === 200) {
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', resource.file); //any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();

            showSuccess('Success!', 'Downloading resource');
        }
        else if (response.status === 404) {
            showError('Oops!', 'The requested resource does not exist!');
        }
    })
    .catch(() => showNetworkError());
};