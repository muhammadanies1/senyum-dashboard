import Image from "next/image";
import React, {FunctionComponent, useEffect, useState} from "react";

type ImageContainerProps = {
	imagePath: string | undefined;
};

const ImageContainer: FunctionComponent<ImageContainerProps> = ({
	imagePath,
}) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		setImageLoaded(false);
	}, [imagePath]);

	return (
		<>
			{imagePath ? (
				<Image
					id="image-selfie"
					data-testid="image-selfie"
					src={`data:image/jpg;base64,${imagePath}`}
					alt="Selfie Photo"
					width={100}
					height={100}
					className="w-full rounded-xl"
					onLoad={() => setImageLoaded(true)}
				/>
			) : (
				false
			)}
			{imagePath === "" ? (
				<div className="flex justify-center items-center rounded-xl bg-light-20 w-full h-[527px]">
					No Image
				</div>
			) : (
				false
			)}
			{!imageLoaded && imagePath !== "" ? (
				<div className="animate-pulse rounded-xl bg-light-20 w-full h-[527px]"></div>
			) : (
				false
			)}
		</>
	);
};

export default ImageContainer;
