import Image from "next/image";
import React, {FunctionComponent, useEffect, useState} from "react";

type ImageContainerProps = {
	id?: string;
	alt: string;
	src: string | undefined;
};

const ImageContainer: FunctionComponent<ImageContainerProps> = ({
	id,
	alt,
	src,
	...attrs
}) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		setImageLoaded(false);
	}, [src]);

	return (
		<>
			{src !== "" ? (
				<Image
					id={id}
					src={`data:image/jpg;base64,${src}`}
					alt={alt}
					width={100}
					height={100}
					className="w-full rounded-xl"
					onLoad={() => setImageLoaded(true)}
					{...attrs}
				/>
			) : (
				false
			)}
			{src === "" ? (
				<div
					id={id}
					data-testid="empty-image"
					className="flex justify-center items-center rounded-xl bg-light-20 w-full h-[527px]"
				>
					No Image
				</div>
			) : (
				false
			)}
			{!imageLoaded && !src ? (
				<div
					id={id}
					data-testid="loading-placeholder"
					className="animate-pulse rounded-xl bg-light-20 w-full h-[527px]"
				></div>
			) : (
				false
			)}
		</>
	);
};

export default ImageContainer;
