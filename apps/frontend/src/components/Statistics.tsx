import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchStatisticsRequest } from "../store/slices/songSlice";

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #667eea;
  font-size: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  padding: 1rem;
  color: white;

  h3 {
    font-size: 2rem;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const Section = styled.div`
  margin-top: 1.5rem;

  h3 {
    color: #667eea;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 3px;
  }
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: #f8f8f8;
  border-radius: 6px;

  span:first-of-type {
    color: #333;
    font-weight: 500;
  }

  span:last-of-type {
    color: #667eea;
    font-weight: 600;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #999;
  padding: 1rem;
`;

const Statistics: React.FC = () => {
  const dispatch = useAppDispatch();
  const { statistics } = useAppSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchStatisticsRequest());
  }, [dispatch]);

  if (!statistics) {
    return (
      <Container>
        <Title>📊 Statistics</Title>
        <EmptyState>Loading statistics...</EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Title>📊 Statistics</Title>

      <StatsGrid>
        <StatCard>
          <h3>{statistics.totalSongs}</h3>
          <p>Total Songs</p>
        </StatCard>
        <StatCard>
          <h3>{statistics.totalArtists}</h3>
          <p>Artists</p>
        </StatCard>
        <StatCard>
          <h3>{statistics.totalAlbums}</h3>
          <p>Albums</p>
        </StatCard>
        <StatCard>
          <h3>{statistics.totalGenres}</h3>
          <p>Genres</p>
        </StatCard>
      </StatsGrid>

      <Section>
        <h3>🎼 Songs by Genre</h3>
        <List>
          {statistics.songsByGenre.length > 0 ? (
            statistics.songsByGenre.map((item) => (
              <ListItem key={item._id}>
                <span>{item._id}</span>
                <span>{item.count}</span>
              </ListItem>
            ))
          ) : (
            <EmptyState>No data</EmptyState>
          )}
        </List>
      </Section>

      <Section>
        <h3>👤 Songs by Artist</h3>
        <List>
          {statistics.songsByArtist.length > 0 ? (
            statistics.songsByArtist.slice(0, 5).map((item) => (
              <ListItem key={item._id}>
                <span>{item._id}</span>
                <span>{item.count}</span>
              </ListItem>
            ))
          ) : (
            <EmptyState>No data</EmptyState>
          )}
        </List>
      </Section>
    </Container>
  );
};

export default Statistics;
