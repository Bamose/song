import React from "react";
import {
  PaginationBar,
  PaginationControls,
  PaginationButton,
  PageInfo,
  PageSizeSelect,
  FilterControl,
  FilterLabel,
} from "../../styles/SongList.styles";
import { calculatePaginationInfo } from "../../utils";

interface EntityPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  itemsCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  isDisabled?: boolean;
  pageSizeOptions?: number[];
}

const defaultPageSizeOptions = [5, 10, 20, 50];

const EntityPagination: React.FC<EntityPaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  itemsCount,
  onPageChange,
  onPageSizeChange,
  isDisabled = false,
  pageSizeOptions = defaultPageSizeOptions,
}) => {
  const { hasPrevPage, hasNextPage, from, to } = calculatePaginationInfo(
    currentPage,
    totalPages,
    pageSize,
    itemsCount,
    totalItems
  );

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage === currentPage) {
      return;
    }
    onPageChange(nextPage);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = Number(event.target.value);
    onPageSizeChange(value);
  };

  return (
    <PaginationBar>
      <PageInfo>
        {totalItems > 0
          ? `Showing ${from}–${to} of ${totalItems} items`
          : "No items to display"}
      </PageInfo>

      <PaginationControls>
        <PaginationButton
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPrevPage || isDisabled}
        >
          Previous
        </PaginationButton>

        <PageInfo>
          Page {currentPage} of {totalPages}
        </PageInfo>

        <PaginationButton
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage || isDisabled}
        >
          Next
        </PaginationButton>

        <FilterControl>
          <FilterLabel htmlFor="page-size">Page Size</FilterLabel>
          <PageSizeSelect
            id="page-size"
            value={String(pageSize)}
            onChange={handlePageSizeChange}
            disabled={isDisabled}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </PageSizeSelect>
        </FilterControl>
      </PaginationControls>
    </PaginationBar>
  );
};

export default EntityPagination;
