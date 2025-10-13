import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.header`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.033em;
`;

export const SearchContainer = styled.div`
  padding: 0.75rem 1rem;
`;

export const SearchWrapper = styled.label`
  display: flex;
  height: 48px;
  width: 100%;
  max-width: 448px;
`;

export const SearchIconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  background: ${({ theme }) => theme.colors.background.input};
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md} 0 0
    ${({ theme }) => theme.borderRadius.md};

  .material-symbols-outlined {
    font-size: 20px;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.input};
  border: none;
  border-radius: 0 ${({ theme }) => theme.borderRadius.md}
    ${({ theme }) => theme.borderRadius.md} 0;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 0 1rem;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &:focus {
    outline: none;
  }
`;

export const FiltersContainer = styled.div`
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

export const FilterGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.75rem;
  width: 100%;
`;

export const FilterControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const FilterLabel = styled.label`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const FilterInput = styled.input`
  padding: 0.625rem 0.75rem;
  background: ${({ theme }) => theme.colors.background.input};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.fonts.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FilterSelect = styled.select`
  padding: 0.625rem 0.75rem;
  background: ${({ theme }) => theme.colors.background.input};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ControlsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const ResetButton = styled.button`
  padding: 0.625rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-family: ${({ theme }) => theme.fonts.primary};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background.input};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TableContainer = styled.div`
  padding: 0.75rem 1rem;
  flex: 1;
  overflow: auto;
`;

export const TableWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.background.card};
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background: ${({ theme }) => theme.colors.background.cardHover};
`;

export const TableRow = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};

  &:first-of-type {
    border-top: none;
  }
`;

export const TableHeader = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 500;
`;

export const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  height: 72px;
`;

export const TitleCell = styled(TableCell)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 400;
  width: 30%;
`;

export const ArtistCell = styled(TableCell)`
  color: ${({ theme }) => theme.colors.text.secondary};
  width: 25%;
`;

export const AlbumCell = styled(TableCell)`
  color: ${({ theme }) => theme.colors.text.secondary};
  width: 25%;
`;

export const GenreCell = styled(TableCell)`
  width: 10%;
`;

export const GenreBadge = styled.button`
  min-width: 84px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  height: 32px;
  padding: 0 1rem;
  background: ${({ theme }) => theme.colors.background.input};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.75rem;
  font-weight: 500;
  border: none;
  font-family: ${({ theme }) => theme.fonts.primary};
  width: 100%;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ActionsCell = styled(TableCell)`
  width: 10%;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  .material-symbols-outlined {
    font-size: 20px;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  p {
    font-size: 1.2rem;
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.2rem;
`;

export const PaginationBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0 1rem 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PaginationButton = styled.button`
  padding: 0.5rem 0.85rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.background.input};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-family: ${({ theme }) => theme.fonts.primary};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background.dark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageInfo = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
`;

export const PageSizeSelect = styled(FilterSelect)`
  width: auto;
`;
