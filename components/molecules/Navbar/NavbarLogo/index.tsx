import React, {HTMLAttributes} from "react";

type Props = HTMLAttributes<HTMLDivElement>;

const NavbarLogo = (props: Props) => {
	const {className, ...attrs} = props;

	return (
		<div
			className={"flex items-center gap-2".concat(
				className ? ` ${className}` : "",
			)}
			{...attrs}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="28"
				height="28"
				viewBox="0 0 28 28"
				fill="none"
			>
				<path
					d="M22.7864 0.935883H5.21363C2.33422 0.935883 0 3.18674 0 5.96331V22.9085C0 25.685 2.33422 27.9359 5.21363 27.9359H22.7864C25.6658 27.9359 28 25.685 28 22.9085V5.96331C28 3.18674 25.6658 0.935883 22.7864 0.935883Z"
					fill="#00529C"
				/>
				<path
					d="M17.6495 6.64693H15.0826V9.12504H17.6495V6.64693ZM20.8013 10.1163V9.84568H18.2964V10.1305C18.2964 10.2074 18.2964 10.2872 18.2964 10.3641C18.2964 12.7738 16.3498 14.7335 13.9542 14.7335C11.5586 14.7335 9.65334 12.7738 9.65334 10.3527C9.65334 10.2815 9.65334 10.2103 9.65334 10.1391V9.85423H7.18092V10.1391C7.18092 10.2074 7.18092 10.2786 7.18092 10.347C7.18218 10.5963 7.19697 10.8454 7.22523 11.0933V22.2277H9.72423V15.5368C10.9313 16.4932 12.4451 17.016 14.0074 17.016C15.5696 17.016 17.0835 16.4932 18.2905 15.5368V22.2277H20.7895V10.9623C20.8043 10.7686 20.8161 10.572 20.8161 10.3726C20.8073 10.2872 20.8043 10.2017 20.8013 10.1163ZM12.944 6.64693H10.38V9.12504H12.944V6.64693Z"
					fill="#F67F21"
				/>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="59"
				height="18"
				viewBox="0 0 59 18"
				fill="none"
			>
				<path
					d="M3.19015 3.27897C3.08157 3.36787 2.99468 3.48066 2.93614 3.60867C2.8776 3.73668 2.84898 3.87651 2.85247 4.0174C2.8505 4.16506 2.88778 4.31056 2.96043 4.43883C3.03309 4.56709 3.13848 4.67345 3.26568 4.74688C3.86654 5.04539 4.50473 5.26067 5.16289 5.38685C6.0096 5.56424 6.80183 5.94327 7.4733 6.49225C7.75724 6.76945 7.97784 7.1056 8.11979 7.47734C8.26173 7.84907 8.32162 8.24748 8.29528 8.64488C8.30763 9.08347 8.21898 9.51898 8.03629 9.91729C7.8536 10.3156 7.58183 10.6659 7.24226 10.9407C6.45441 11.564 5.47055 11.8816 4.46976 11.8358C2.79504 11.8256 1.19075 11.1558 0 9.96957L1.39069 8.25553C2.5148 9.24905 3.55893 9.74581 4.50087 9.74581C4.85798 9.76536 5.21179 9.66802 5.50945 9.46834C5.62639 9.38239 5.7207 9.26896 5.7842 9.13793C5.8477 9.00689 5.87845 8.86222 5.87379 8.71648C5.8767 8.56801 5.8429 8.42114 5.77542 8.28911C5.70794 8.15708 5.6089 8.04403 5.48724 7.96016C5.00934 7.69759 4.49364 7.51187 3.95881 7.4097C2.99823 7.2321 2.08814 6.84403 1.29294 6.27296C0.727188 5.79857 0.444311 5.06164 0.444311 4.06215C0.421935 3.61887 0.50738 3.1768 0.693219 2.77435C0.879058 2.3719 1.15967 2.02125 1.51066 1.75289C2.28556 1.19223 3.22297 0.905821 4.17652 0.938381C4.88926 0.940962 5.59657 1.06348 6.26922 1.30088C6.9348 1.52459 7.55274 1.87223 8.09089 2.32573L6.90903 4.03978C6.11439 3.38755 5.12585 3.02204 4.10099 3.0015C3.77479 2.98624 3.45327 3.08418 3.19015 3.27897Z"
					fill="#F67F21"
				/>
				<path
					d="M17.0215 10.5424C16.6003 10.9587 16.1017 11.2872 15.5543 11.5091C15.0069 11.731 14.4214 11.8421 13.8314 11.8358C13.2776 11.8559 12.7254 11.7658 12.2062 11.5708C11.687 11.3757 11.2111 11.0795 10.8056 10.6991C10.403 10.3057 10.0881 9.83041 9.88205 9.30491C9.67597 8.77941 9.58337 8.21572 9.61043 7.65136C9.5837 7.08638 9.67867 6.52226 9.88881 5.99773C10.099 5.4732 10.4193 5.00069 10.8278 4.61262C11.6036 3.87333 12.6346 3.46724 13.7025 3.48037C14.7334 3.45488 15.737 3.81524 16.5195 4.49179C16.907 4.83612 17.2125 5.26397 17.4132 5.74357C17.614 6.22317 17.7049 6.74217 17.6791 7.26201V8.46587H11.8187C11.8547 8.68394 11.9343 8.89236 12.0527 9.07852C12.1711 9.26469 12.3258 9.42471 12.5073 9.5489C12.8943 9.83159 13.3623 9.9793 13.8403 9.96958C14.2013 9.98154 14.5608 9.91679 14.8953 9.77954C15.2298 9.64229 15.5319 9.43562 15.7819 9.17297L17.0215 10.5424ZM14.8711 5.7404C14.5539 5.47717 14.1534 5.33741 13.7425 5.34657C13.3037 5.34657 12.8767 5.48942 12.5251 5.75383C12.3465 5.881 12.1968 6.04489 12.0857 6.23467C11.9747 6.42444 11.9048 6.63579 11.8809 6.85476H15.4087C15.3987 6.64006 15.346 6.42957 15.2537 6.23583C15.1613 6.04208 15.0312 5.86902 14.8711 5.72697V5.7404Z"
					fill="#F67F21"
				/>
				<path
					d="M21.5357 7.18593V11.7015H19.3142V3.60567H21.5357V4.50074C21.8255 4.17931 22.1777 3.92129 22.5705 3.74269C22.9634 3.56408 23.3885 3.4687 23.8195 3.46246C24.2174 3.45302 24.6128 3.52781 24.9801 3.68199C25.3475 3.83617 25.6787 4.06631 25.9522 4.35753C26.2454 4.68224 26.4721 5.06208 26.6193 5.47526C26.7664 5.88844 26.8311 6.32682 26.8097 6.76524V11.6881H24.5881V7.12775C24.5881 5.88361 24.1438 5.26154 23.2241 5.26154C23.0062 5.26026 22.7903 5.30274 22.5889 5.3865C22.3875 5.47025 22.2046 5.59361 22.0511 5.74935C21.872 5.94038 21.7338 6.16651 21.6451 6.41365C21.5564 6.66079 21.5192 6.92367 21.5357 7.18593Z"
					fill="#F67F21"
				/>
				<path
					d="M30.0976 14.8924C29.2617 14.8717 28.466 14.527 27.8761 13.9302L28.8802 12.2609C29.028 12.4266 29.207 12.561 29.4069 12.6563C29.6067 12.7516 29.8234 12.8058 30.0443 12.8159C30.1522 12.8128 30.2577 12.783 30.3514 12.7292C30.4452 12.6753 30.5243 12.599 30.5819 12.5071C30.7251 12.3197 30.8031 12.0901 30.8041 11.8537C30.8041 11.621 29.7673 8.87163 27.6939 3.60567H30.0843L32.0437 8.64488L33.9986 3.60567H36.389L32.6568 13.1471C32.4543 13.6727 32.096 14.1228 31.6305 14.4359C31.1753 14.7369 30.642 14.8957 30.0976 14.8924Z"
					fill="#F67F21"
				/>
				<path
					d="M42.7116 7.96911V3.60567H44.9687V11.7015H42.7116V10.6319C42.4812 10.9983 42.1623 11.2998 41.7846 11.508C41.4068 11.7163 40.9828 11.8244 40.5522 11.8224C39.7324 11.8463 38.9356 11.5477 38.3307 10.9899C38.0174 10.6631 37.7763 10.2733 37.6232 9.846C37.47 9.41871 37.4083 8.96362 37.4421 8.51062V3.58777H39.6947V7.99596C39.6947 9.2401 40.1479 9.86217 41.0543 9.86217C41.2682 9.86516 41.4806 9.82514 41.6789 9.74445C41.8773 9.66376 42.0577 9.54403 42.2095 9.39226C42.3848 9.20185 42.5197 8.97745 42.6061 8.73277C42.6924 8.48808 42.7283 8.22824 42.7116 7.96911Z"
					fill="#F67F21"
				/>
				<path
					d="M56.6674 5.07805L53.846 10.8288H52.4553L49.6428 5.07805V11.7015H47.3146V1.18005H50.4648L53.1573 6.96216L55.8632 1.18005H59V11.7015H56.6674V5.07805Z"
					fill="#F67F21"
				/>
				<path
					d="M43.7024 15.4339L42.6538 17.5508H42.1473L41.1165 15.4339V17.8685H40.2545V13.9974H41.4186L42.4094 16.1231L43.4047 13.9974H44.5599V17.8685H43.7024V15.4339Z"
					fill="#00529C"
				/>
				<path
					d="M48.3854 16.3603C48.3901 16.5634 48.3531 16.7652 48.2766 16.9531C48.2002 17.141 48.0859 17.311 47.9411 17.4523C47.6379 17.7322 47.2416 17.8875 46.8303 17.8875C46.4191 17.8875 46.0228 17.7322 45.7196 17.4523C45.4352 17.161 45.2758 16.7689 45.2758 16.3603C45.2758 15.9518 45.4352 15.5596 45.7196 15.2684C46.0218 14.9865 46.4185 14.83 46.8303 14.83C47.2422 14.83 47.6389 14.9865 47.9411 15.2684C48.0855 15.41 48.1995 15.58 48.2759 15.7678C48.3523 15.9557 48.3896 16.1574 48.3854 16.3603ZM46.0839 16.3603C46.0734 16.5778 46.1466 16.791 46.2883 16.9555C46.3557 17.029 46.4375 17.0877 46.5284 17.1278C46.6194 17.1679 46.7177 17.1886 46.817 17.1886C46.9163 17.1886 47.0146 17.1679 47.1056 17.1278C47.1966 17.0877 47.2784 17.029 47.3457 16.9555C47.4806 16.7869 47.5542 16.5769 47.5542 16.3603C47.5542 16.1438 47.4806 15.9337 47.3457 15.7651C47.2791 15.6904 47.1975 15.6307 47.1065 15.5898C47.0154 15.5489 46.9168 15.5277 46.817 15.5277C46.7173 15.5277 46.6187 15.5489 46.5276 15.5898C46.4365 15.6307 46.355 15.6904 46.2883 15.7651C46.1474 15.9301 46.0743 16.143 46.0839 16.3603Z"
					fill="#00529C"
				/>
				<path
					d="M50.7003 14.8387C50.8798 14.8418 51.0566 14.8833 51.219 14.9604C51.3814 15.0376 51.5257 15.1487 51.6422 15.2863C51.7766 15.4321 51.8811 15.6033 51.9497 15.7899C52.0183 15.9765 52.0497 16.1749 52.0421 16.3738C52.0538 16.7852 51.9055 17.1851 51.6289 17.4881C51.514 17.6265 51.3707 17.7382 51.2089 17.8154C51.047 17.8927 50.8705 17.9337 50.6914 17.9356C50.5183 17.9393 50.347 17.9005 50.1922 17.8225C50.0373 17.7445 49.9037 17.6298 49.8028 17.4881V17.8775H48.9763V13.7646H49.8028V15.2281C49.9136 15.0993 50.0519 14.9974 50.2073 14.93C50.3627 14.8626 50.5312 14.8314 50.7003 14.8387ZM49.8116 16.3827C49.8041 16.5984 49.877 16.8092 50.016 16.9734C50.074 17.0467 50.1477 17.1057 50.2316 17.146C50.3155 17.1863 50.4074 17.2069 50.5003 17.2062C50.5958 17.2064 50.6901 17.1857 50.7768 17.1455C50.8635 17.1053 50.9405 17.0466 51.0024 16.9734C51.1478 16.8124 51.2244 16.6002 51.2157 16.3827C51.2238 16.1634 51.1492 15.9491 51.0068 15.783C50.948 15.7065 50.8726 15.6446 50.7863 15.6019C50.7001 15.5593 50.6053 15.537 50.5092 15.5369C50.4141 15.5362 50.3201 15.5576 50.2345 15.5995C50.149 15.6415 50.0742 15.7027 50.016 15.7785C49.8749 15.9471 49.8005 16.1623 49.8072 16.3827H49.8116Z"
					fill="#00529C"
				/>
				<path
					d="M52.7308 14.5075C52.6399 14.4153 52.5889 14.2907 52.5889 14.1607C52.5889 14.0308 52.6399 13.9061 52.7308 13.8139C52.7746 13.7674 52.8278 13.731 52.8869 13.7071C52.9459 13.6831 53.0093 13.6722 53.0729 13.6751C53.1364 13.6722 53.1999 13.6831 53.2589 13.7071C53.3179 13.731 53.3712 13.7674 53.415 13.8139C53.482 13.8827 53.5274 13.9698 53.5457 14.0644C53.564 14.1589 53.5544 14.2569 53.518 14.346C53.4815 14.4351 53.4199 14.5114 53.3408 14.5656C53.2617 14.6198 53.1685 14.6494 53.0729 14.6508C53.009 14.6531 52.9453 14.6415 52.8863 14.6168C52.8273 14.5921 52.7742 14.5548 52.7308 14.5075ZM53.4861 17.8685H52.6597V14.888H53.4861V17.8685Z"
					fill="#00529C"
				/>
				<path
					d="M55.0945 17.8685H54.2725V13.7557H55.0945V17.8685Z"
					fill="#00529C"
				/>
				<path
					d="M58.4402 17.4389C58.1251 17.7472 57.702 17.9176 57.2628 17.9133C56.8512 17.9274 56.4506 17.7779 56.1475 17.4971C55.9985 17.3523 55.8818 17.1773 55.8052 16.9836C55.7286 16.7899 55.6938 16.582 55.7032 16.3738C55.6933 16.1661 55.7279 15.9587 55.8045 15.7656C55.8812 15.5726 55.9982 15.3984 56.1475 15.2549C56.4342 14.9823 56.8152 14.833 57.2094 14.8387C57.5882 14.8298 57.9568 14.9621 58.2447 15.2102C58.3906 15.3353 58.5063 15.4922 58.5833 15.6689C58.6603 15.8457 58.6964 16.0377 58.689 16.2305V16.6781H56.5341C56.5454 16.7589 56.5739 16.8363 56.6176 16.905C56.6613 16.9738 56.7192 17.0322 56.7873 17.0764C56.9265 17.1791 57.0947 17.234 57.2672 17.233C57.401 17.2371 57.5341 17.2129 57.6581 17.162C57.7821 17.1111 57.8941 17.0347 57.987 16.9376L58.4402 17.4389ZM57.6449 15.6711C57.5295 15.5735 57.3822 15.5225 57.2316 15.5279C57.0716 15.5276 56.9158 15.5794 56.7873 15.6756C56.721 15.7214 56.6652 15.7811 56.6238 15.8506C56.5823 15.9201 56.5563 15.9978 56.5474 16.0784H57.8492C57.8444 16.0001 57.8238 15.9236 57.7887 15.8535C57.7536 15.7835 57.7046 15.7215 57.6449 15.6711Z"
					fill="#00529C"
				/>
			</svg>
		</div>
	);
};

export default NavbarLogo;
