import React from "react";
import styled from "@emotion/styled";
import {
  FilterControl,
  FilterLabel,
  FilterSelect,
} from "../../styles/SongList.styles";
import type { SongSortField, SortOrder } from "@song-app/types";

const SortControlsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
`;

interface SortOption {
  value: string;
  label: string;
}

interface EntitySortProps {
  sortBy: SongSortField;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SongSortField, sortOrder: SortOrder) => void;
  sortOptions?: SortOption[];
  showOrderControl?: boolean;
}

const defaultSortOptions: SortOption[] = [
  { value: "createdAt", label: "Newest" },
  { value: "updatedAt", label: "Recently Updated" },
  { value: "title", label: "Title" },
  { value: "artist", label: "Artist" },
  { value: "album", label: "Album" },
  { value: "genre", label: "Genre" },
];

const EntitySort: React.FC<EntitySortProps> = ({
  sortBy,
  sortOrder,
  onSortChange,
  sortOptions = defaultSortOptions,
  showOrderControl = true,
}) => {
  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = event.target.value as SongSortField;
    onSortChange(newSortBy, sortOrder);
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSortOrder = event.target.value as SortOrder;
    onSortChange(sortBy, newSortOrder);
  };

  return (
    <SortControlsContainer>
      <FilterControl>
        <FilterLabel htmlFor="sort-by">Sort By</FilterLabel>
        <FilterSelect id="sort-by" value={sortBy} onChange={handleSortByChange}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FilterSelect>
      </FilterControl>

      {showOrderControl && (
        <FilterControl>
          <FilterLabel htmlFor="sort-order">Order</FilterLabel>
          <FilterSelect
            id="sort-order"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </FilterSelect>
        </FilterControl>
      )}
    </SortControlsContainer>
  );
};

export default EntitySort;
