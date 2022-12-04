import React, { Dispatch, SetStateAction } from 'react';

interface IPageNavigator {
  totalPage: number | null;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
export const PageNavigator: React.FC<IPageNavigator> = ({
  totalPage,
  page,
  setPage,
}) => {
  if (totalPage === null) return <div></div>;

  // const [page, setPage] = useState(1);
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  return (
    <div className="mx-auto mt-10 grid max-w-sm grid-cols-3 items-center text-center">
      {page > 1 ? (
        <button
          onClick={onPrevPageClick}
          className="text-lg font-medium hover:text-lime-600 hover:outline-none "
        >
          &larr;
        </button>
      ) : (
        <div></div>
      )}
      <span>
        Page {page} of {totalPage}
      </span>
      {page !== totalPage ? (
        <button
          onClick={onNextPageClick}
          className="text-lg font-medium hover:text-lime-600 hover:outline-none "
        >
          &rarr;
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};
