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
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
`;

const FAB = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  height: 56px;
  width: 56px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background.dark};
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(56, 224, 123, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 700;
  font-size: 1rem;
  padding: 0;

  &:hover {
    width: auto;
    padding: 0 1.5rem;
    box-shadow: 0 15px 35px rgba(56, 224, 123, 0.4);

    .fab-text {
      max-width: 200px;
      margin-left: 0.5rem;
      opacity: 1;
    }
  }

  .material-symbols-outlined {
    font-size: 24px;
    flex-shrink: 0;
  }
`;

const FABText = styled.span`
  max-width: 0;
  opacity: 0;
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
