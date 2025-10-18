import React from "react";
import { useDebounce } from "use-debounce";
import {
  SearchContainer,
  SearchIconWrapper,
  SearchInput,
  SearchWrapper,
} from "../../styles/SongList.styles";

interface EntitySearchProps {
  value: string;
  onSearchChange: (value: string) => void;
  onDebouncedSearch: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

const EntitySearch: React.FC<EntitySearchProps> = ({
  value,
  onSearchChange,
  onDebouncedSearch,
  placeholder = "Search...",
  debounceMs = 400,
}) => {
  const [debouncedValue] = useDebounce(value, debounceMs);

  React.useEffect(() => {
    onDebouncedSearch(debouncedValue);
  }, [debouncedValue, onDebouncedSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onSearchChange(newValue);
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        <SearchIconWrapper>
          <span className="material-symbols-outlined">search</span>
        </SearchIconWrapper>
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </SearchWrapper>
    </SearchContainer>
  );
};

export default EntitySearch;
