import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';

import './index.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Carousel(data) {
    register();

    const images = [
        { id: 1, url: 'https://img.olx.com.br/images/33/332368085444792.jpg' },
        { id: 2, url: 'https://img.olx.com.br/images/17/170359685907571.jpg' }
    ] 

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