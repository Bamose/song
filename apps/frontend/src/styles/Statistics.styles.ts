import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.header`
  padding: 1rem;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.033em;
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem 1rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.dark};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.primary};
    border-radius: 4px;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatCard = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background.input} 0%,
    ${({ theme }) => theme.colors.background.cardHover} 100%
  );
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(56, 224, 123, 0.1);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const StatValue = styled.h3`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    #2bad5e 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const StatLabel = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const SectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.div`
  margin-bottom: 0;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

export const SectionTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}20,
    ${({ theme }) => theme.colors.primary}10
  );
  color: ${({ theme }) => theme.colors.primary};

  .material-symbols-outlined {
    font-size: 22px;
  }
`;

export const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
`;

export const SectionCount = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  font-weight: 500;
`;

export const List = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all 0.2s;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleY(0);
    transition: transform 0.2s;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}40;
    transform: translateX(4px);

    &::before {
      transform: scaleY(1);
    }
  }
`;

export const ItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

export const ItemRank = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.input};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 700;
  font-size: 0.875rem;
`;

export const ItemName = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
  font-size: 1rem;
  flex: 1;
`;

export const ItemStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ItemBadge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

export const ItemCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 32px;
  padding: 0 1rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}30,
    ${({ theme }) => theme.colors.primary}20
  );
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;
  font-size: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

export const ItemLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const EmptyState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 3rem 2rem;
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  .material-symbols-outlined {
    font-size: 48px;
    opacity: 0.5;
    margin-bottom: 1rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 3rem;
  font-size: 1.2rem;
`;
