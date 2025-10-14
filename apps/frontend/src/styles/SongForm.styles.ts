import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 2rem;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  font-size: 0.875rem;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.background.input};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: border-color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

export const Button = styled.button<{ variant?: "cancel" | "danger" }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: ${({ theme }) => theme.fonts.primary};
  background: ${({ theme, variant }) =>
    variant === "cancel"
      ? theme.colors.background.input
      : variant === "danger"
      ? "#e04838"
      : theme.colors.primary};
  color: ${({ theme, variant }) =>
    variant === "cancel" || variant === "danger"
      ? theme.colors.text.primary
      : theme.colors.background.dark};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.span`
  color: #ff6b6b;
  font-size: 0.75rem;
  font-weight: 500;
`;
