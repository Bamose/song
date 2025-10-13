import styled from "@emotion/styled";

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.background.dark};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

export const Sidebar = styled.aside`
  width: 256px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-right: 1px solid ${({ theme }) => theme.colors.border.primary};
  background: ${({ theme }) => theme.colors.background.sidebar};
  padding: 1rem;
`;

export const UserInfo = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    #2bad5e 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.background.dark};
  font-weight: 700;
  font-size: 1.25rem;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
`;

export const UserEmail = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  margin: 0;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NavItem = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, active }) =>
    active ? theme.colors.background.input : "transparent"};
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  font-family: ${({ theme }) => theme.fonts.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.background.input};
  }

  .material-symbols-outlined {
    font-size: 20px;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
