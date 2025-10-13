import React, { useState } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import Layout from "./components/Layout";
import SongList from "./components/SongList";
import Statistics from "./components/Statistics";
import Modal from "./components/Modal";
import SongForm from "./components/SongForm";

const FABContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
`;

const FAB = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  height: 48px;
  padding: 0 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background.dark};
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(56, 224, 123, 0.3);
  transition: all 0.2s ease-out;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  font-size: 0.875rem;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(56, 224, 123, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  .material-symbols-outlined {
    font-size: 20px;
    flex-shrink: 0;
  }
`;

const FABText = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
`;

function App() {
  const [currentView, setCurrentView] = useState<"songs" | "statistics">(
    "songs"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout currentView={currentView} onNavigate={setCurrentView}>
        {currentView === "songs" ? (
          <SongList onAddClick={handleOpenModal} />
        ) : (
          <Statistics />
        )}

        <FABContainer>
          <FAB onClick={handleOpenModal}>
            <span className="material-symbols-outlined">add</span>
            <FABText className="fab-text">Add Song</FABText>
          </FAB>
        </FABContainer>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <SongForm onClose={handleCloseModal} />
        </Modal>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
