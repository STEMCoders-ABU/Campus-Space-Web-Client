import * as ReactScroll from 'react-scroll';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export const animateScroll = ReactScroll.animateScroll;

export const scrollToTop = () => {
    animateScroll.scrollToTop({
        duration: 700,
        delay: 0,
        smooth: true,
    });
};