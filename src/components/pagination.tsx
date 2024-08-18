import React from "react";

interface PaginationProps {
    totalProducts: number;
    currentProducts: number;
    productsPerPage: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = 
    ({ totalProducts, currentProducts, productsPerPage, paginate, currentPage }) => {
    const pageNumbers: number[] = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, number: number) => {
        e.preventDefault();
        paginate(number);
    };

    //CANTIDAD MÁXIMA DE BOTONES POR PAGE
    const maxButtons = 5;
    const buttons = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(pageNumbers.length, startPage + maxButtons - 1);

    //Cerca del final se ajusta el inicio
    if (endPage === pageNumbers.length) {
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let index = startPage; index <= endPage; index++) {
        buttons.push(
            <li key={index} className="flex">
                <a onClick={(e) => handleClick(e, index)} href='!#' className={`cursor-pointer
                px-4 py-2 mx-2 my-1 border-[1px] border-solid border-[#ddd] rounded-full ${currentPage === index ? 'bg-box_1-text_primary text-white' 
                    : ''}`}>
                    {index}
                </a>
            </li>
        )
        
    }

    if (startPage > 1) {
        buttons.unshift(
            <li key="start" className="flex">
                <a
                    onClick={(e) => handleClick(e, 1)}
                    href='!#'
                    className="cursor-pointer px-4 py-2 mx-2 my-1 border-[1px] border-solid border-[#ddd] rounded-full"
                >
                    1
                </a>
            </li>,
            <li key="ellipsis-start" className="flex mt-4 text-[#ccc]">...</li>
        )
    }

    if (endPage < pageNumbers.length) {
        buttons.push(
            <li key="ellipsis-end" className="flex mt-4 text-[#ccc]">...</li>,
            <li key="end" className="flex">
                <a
                    onClick={(e) => handleClick(e, pageNumbers.length)}
                    href='!#'
                    className="cursor-pointer px-4 py-2 mx-2 my-1 border-[1px] border-solid border-[#ddd] rounded-full"
                >
                    {pageNumbers.length}
                </a>
            </li>
        )
    }

    return (
        <div className="relative">
            <nav className="pt-[30px] px-[42%]">
                <ul className='flex list-none'>
                    {buttons}
                </ul>
            </nav>
            <div className="absolute w-max top-[50%] right-[12%]">
                Mostrando {currentProducts} de {totalProducts} elementos
            </div>
        </div>
    );
};
