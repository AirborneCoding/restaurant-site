"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const BASE_URL = "";

type ImgProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> &
    Partial<{
        className: string;
        src: string;
        alt: string;
        isStatic: boolean;
        width: number;
        height: number;
    }>;

const Img: React.FC<React.PropsWithChildren<ImgProps>> = ({
    className,
    // src = "/no_img.webp",
    src ='https://www.gasso.com/wp-content/uploads/2017/04/noimage.jpg',
    alt = "defaultImg",
    isStatic = false,
    ...restProps
}) => {
    // const defaultImg = "/no_img.webp";
    const defaultImg = 'https://www.gasso.com/wp-content/uploads/2017/04/noimage.jpg';
    const [imgSrc, setImgSrc] = useState(src || defaultImg);

    useEffect(() => {
        setImgSrc(src || defaultImg);
    }, [src]);

    return (
        <Image
            className={className}
            src={isStatic ? imgSrc : BASE_URL + imgSrc}
            alt={alt}
            width={500}
            height={500}
            // quality={100}
            loading="eager"
            {...restProps}
            onError={() => {
                setImgSrc(defaultImg);
            }}
        />
    );
};

// export { Img };
export default Img;