import * as ReactScroll from 'react-scroll';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { axios } from '../init';

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