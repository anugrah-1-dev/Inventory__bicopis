import { router } from "@inertiajs/react";
import { PropsWithChildren } from "react";

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({length}, (_, idx) => idx + start);
}

function paginationRange(totalPage: number, currentPage: number) {
  if (totalPage <= 5) return range(1, totalPage);
  const leftSiblingIndex = Math.max(currentPage, 1);
  const rightSiblingIndex = Math.min(currentPage, totalPage);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    let leftItem = 3;
    let leftRange = range(1, leftItem);
    return [...leftRange, '...', totalPage];
  }

  if (showLeftDots && !showRightDots) {
    let rightItem = 3;
    let rightRange = range(totalPage - rightItem + 1, totalPage);
    return [1, '...', ...rightRange];
  }

  if (showLeftDots && showRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, '...', ...middleRange, '...', totalPage];
  }
}

export default function Pagination({page = 1, totalPage = 1}: PropsWithChildren<{page?: number, totalPage?: number}>) {
    if (totalPage < 2) return
    return (
        <nav>
        <ul className="flex items-center -space-x-px h-10 text-sm">
            <li>
            <button onClick={() => router.get('', {page: page - 1}, {preserveState: true, preserveScroll:true})} disabled={page === 1} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                <span className="sr-only">Previous</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
            </button>
            </li>
            {
              paginationRange(totalPage, page)?.map(pagination => (
                <li>
                  <button onClick={() => router.get('', {page: pagination}, {preserveState: true, preserveScroll: true})} className={`flex items-center justify-center px-4 h-10 font-medium leading-tight border ${page === pagination ? 'text-white border-primary-500 bg-primary-500 hover:bg-primary-600 hover:border-primary-600' : 'text-gray-500 bg-white border-gray-300 hover:bg-primary-500 hover:text-white hover:border-primary-500'}`} disabled={page === pagination || pagination === '...'}>{pagination}</button>
                </li>
              ))
            }
            <li>
            <button onClick={() => router.get('', {page: page + 1}, {preserveState: true, preserveScroll: true})} disabled={page === totalPage} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                <span className="sr-only">Next</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
            </button>
            </li>
        </ul>
        </nav>
    )
}