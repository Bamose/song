import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import Layout from "./components/Layout";
import SongList from "./components/SongList";
import Statistics from "./components/Statistics";
import Modal from "./components/Modal";
import SongForm from "./components/SongForm";
import { FABContainer, FAB, FABText } from "./styles/FAB.styles";

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

        {currentView === "songs" && (
          <FABContainer>
            <FAB onClick={handleOpenModal}>
              <span className="material-symbols-outlined">add</span>
              <FABText className="fab-text">Add Song</FABText>
            </FAB>
          </FABContainer>
        )}

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <SongForm onClose={handleCloseModal} />
        </Modal>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
