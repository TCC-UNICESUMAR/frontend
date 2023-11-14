import { useEffect, useState } from "react";
import Lottie from 'react-lottie'

import animationData from './../Animation.json';

function Loading() {

    const [loop, setLoop] = useState(true);

  useEffect(
    () => {
      let timer = setTimeout(() => setLoop(false), 60000);
      return () => {
        clearTimeout(timer);
      };
    },[]);

    const defaultOption = {
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return(
        <Lottie
            options={defaultOption}
            loop={loop}
            width={150}
            height={150}
        />
    )
}

export default Loading;