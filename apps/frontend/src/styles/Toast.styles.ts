import styled from "@emotion/styled";

export const ToastContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 1100;
`;

export const ToastItem = styled.div<{ type: "success" | "error" | "info" }>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 0.75rem 1rem;
  border-left: 4px solid
    ${({ theme, type }) =>
      type === "success"
        ? theme.colors.primary
        : type === "error"
        ? "#e04838"
        : theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  min-width: 260px;
  max-width: 380px;
`;

export const ToastContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ToastTitle = styled.div`
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

export const ToastMessage = styled.div`
  font-size: 0.9rem;
  line-height: 1.25rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background.input};
  }
`;

