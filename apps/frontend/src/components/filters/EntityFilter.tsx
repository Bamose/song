import React from "react";
import {
  FiltersContainer,
  FilterGroup,
  FilterControl,
  FilterLabel,
  FilterInput,
  ControlsRow,
  ResetButton,
} from "../../styles/SongList.styles";

interface FilterField {
  key: string;
  label: string;
  placeholder: string;
  value: string;
}

interface EntityFilterProps {
  filters: FilterField[];
  onFilterChange: (key: string, value: string) => void;
  onReset: () => void;
  isResetDisabled?: boolean;
  children?: React.ReactNode;
}

const EntityFilter: React.FC<EntityFilterProps> = ({
  filters,
  onFilterChange,
  onReset,
  isResetDisabled = false,
  children,
}) => {
  const handleFilterChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim();
      onFilterChange(key, value || "");
    };

  return (
    <FiltersContainer>
      <FilterGroup>
        {filters.map((filter) => (
          <FilterControl key={filter.key}>
            <FilterLabel htmlFor={`${filter.key}-filter`}>
              {filter.label}
            </FilterLabel>
            <FilterInput
              id={`${filter.key}-filter`}
              type="text"
              placeholder={filter.placeholder}
              value={filter.value}
              onChange={handleFilterChange(filter.key)}
            />
          </FilterControl>
        ))}
      </FilterGroup>

      <ControlsRow>
        {children}
        <ResetButton type="button" onClick={onReset} disabled={isResetDisabled}>
          Reset
        </ResetButton>
      </ControlsRow>
    </FiltersContainer>
  );
};

export default EntityFilter;
