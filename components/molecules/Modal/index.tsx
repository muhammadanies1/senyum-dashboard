import React, {HTMLAttributes, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";

import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

type Props = HTMLAttributes<HTMLDivElement> & {
	isShow: boolean;
	onClickBackground?: () => void;
};

const Modal = (props: Props) => {
	const {isShow, onClickBackground, ...attrs} = props;

	const modalBgRef = useRef<HTMLDivElement>(null);

	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isShow) {
			document.body.style.overflow = "hidden";
			modalBgRef.current?.classList.add("block");
			modalRef.current?.classList.add("block");
			setTimeout(() => {
				modalRef.current?.classList.add("opacity-100");
				modalRef.current?.classList.add("translate-y-24");
			}, 100);
		} else {
			setTimeout(() => {
				modalRef.current?.classList.remove("translate-y-24");
				modalRef.current?.classList.remove("opacity-100");
			}, 100);
			setTimeout(() => {
				modalBgRef.current?.classList.remove("block");
				document.body.style.overflow = "unset";
			}, 300);
		}
	}, [isShow]);

	useEffect(() => {
		const keypressHandler = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isShow && onClickBackground) {
				onClickBackground();
			}
		};

		window.addEventListener("keypress", keypressHandler);

		return () => {
			window.removeEventListener("keypress", keypressHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isShow]);

	return (
		<React.Fragment>
			{createPortal(
				<React.Fragment>
					<div
						className="modal-bg"
						onClick={onClickBackground}
						ref={modalBgRef}
					>
						<div
							className="modal"
							ref={modalRef}
							onClick={(e) => e.stopPropagation()}
							{...attrs}
						/>
					</div>
				</React.Fragment>,
				document.body,
			)}
		</React.Fragment>
	);
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
