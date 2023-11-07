import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';

import './index.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Carousel(data) {
    register();
    const images = data.data;

    return(
        <Swiper
            navigation
            className="container-carousel"
        >
            {images.map((image) => (
                <SwiperSlide className="container-carousel-img" key={image.name}>
                    <img
                        src={image.url}
                        className="img-carousel"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Carousel;