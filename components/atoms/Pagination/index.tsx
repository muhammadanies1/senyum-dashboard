import {FC} from "react";
import ReactPaginate, {ReactPaginateProps} from "react-paginate";

type PaginationsProps = ReactPaginateProps & {
	page: number;
};

const Pagination: FC<PaginationsProps> = ({
	className,
	pageCount,
	page,
	...attrs
}) => {
	return (
		<ReactPaginate
			className={"container-pagination".concat(
				className ? " " + className : "",
			)}
			pageCount={pageCount}
			pageLinkClassName="page-link"
			activeClassName="page-active"
			breakLabel="..."
			nextLabel={
				<i
					className={"next-label "
						.concat("fa-solid fa-chevron-right ")
						.concat(
							page === pageCount
								? "outline-light-30 text-light-30 "
								: "outline-blue-80 text-blue-80 ",
						)}
				></i>
			}
			pageRangeDisplayed={5}
			previousLabel={
				<i
					className={"previous-label "
						.concat("fa-solid fa-chevron-left ")
						.concat(
							page === 1
								? "outline-light-30 text-light-30 "
								: "outline-blue-80 text-blue-80 ",
						)}
				></i>
			}
			renderOnZeroPageCount={null}
			{...attrs}
		/>
	);
};

export default Pagination;
