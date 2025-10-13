import React from "react";
import styled from "@emotion/styled";
import SongList from "./components/SongList";
import SongForm from "./components/SongForm";
import Statistics from "./components/Statistics";

const AppContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    color: white;
    font-size: 3rem;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.2rem;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function App() {
  return (
    <AppContainer>
      <Header>
        <h1>🎵 Song Manager</h1>
        <p>Manage your music collection with style</p>
      </Header>

      <MainContent>
        <SongList />
        <Sidebar>
          <SongForm />
          <Statistics />
        </Sidebar>
      </MainContent>
    </AppContainer>
  );
}

export default App;
