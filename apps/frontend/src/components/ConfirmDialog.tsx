import React from "react";
import Modal from "./Modal";
import {
  Container,
  Title,
  ButtonGroup,
  Button,
} from "../styles/SongForm.styles";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title = "Confirm",
  description = "Are you sure?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <Container>
        <Title>{title}</Title>
        <p style={{ color: "#96c5a9", marginBottom: "1rem" }}>{description}</p>
        <ButtonGroup>
          <Button type="button" variant="cancel" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </ButtonGroup>
      </Container>
    </Modal>
  );
};

export default ConfirmDialog;

