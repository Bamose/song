import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchStatisticsRequest } from "../store/slices/songSlice";
import {
  Container,
  Header,
  Title,
  Content,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  SectionsGrid,
  Section,
  SectionHeader,
  SectionTitleGroup,
  SectionIcon,
  SectionTitle,
  SectionCount,
  List,
  ListItem,
  ItemContent,
  ItemRank,
  ItemName,
  ItemStats,
  ItemBadge,
  ItemCount,
  ItemLabel,
  EmptyState,
  LoadingState,
} from "../styles/Statistics.styles";

const Statistics: React.FC = () => {
  const dispatch = useAppDispatch();
  const { statistics } = useAppSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchStatisticsRequest());
  }, [dispatch]);

  if (!statistics) {
    return (
      <Container>
        <Header>
          <Title>Statistics</Title>
        </Header>
        <LoadingState>Loading statistics...</LoadingState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Statistics</Title>
      </Header>

      <Content>
        <StatsGrid>
          <StatCard>
            <StatValue>{statistics.totalSongs}</StatValue>
            <StatLabel>Total Songs</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{statistics.totalArtists}</StatValue>
            <StatLabel>Artists</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{statistics.totalAlbums}</StatValue>
            <StatLabel>Albums</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{statistics.totalGenres}</StatValue>
            <StatLabel>Genres</StatLabel>
          </StatCard>
        </StatsGrid>

        <SectionsGrid>
          <Section>
            <SectionHeader>
              <SectionTitleGroup>
                <SectionIcon>
                  <span className="material-symbols-outlined">music_note</span>
                </SectionIcon>
                <SectionTitle>Songs by Genre</SectionTitle>
              </SectionTitleGroup>
              <SectionCount>
                {statistics.songsByGenre.length}{" "}
                {statistics.songsByGenre.length === 1 ? "genre" : "genres"}
              </SectionCount>
            </SectionHeader>
            {statistics.songsByGenre.length > 0 ? (
              <List>
                {statistics.songsByGenre.map((item, index) => (
                  <ListItem key={item._id}>
                    <ItemContent>
                      <ItemRank>#{index + 1}</ItemRank>
                      <ItemName>{item._id}</ItemName>
                    </ItemContent>
                    <ItemStats>
                      <ItemBadge>
                        <ItemCount>{item.count}</ItemCount>
                        <ItemLabel>songs</ItemLabel>
                      </ItemBadge>
                    </ItemStats>
                  </ListItem>
                ))}
              </List>
            ) : (
              <EmptyState>
                <span className="material-symbols-outlined">music_off</span>
                <p>No genre data available</p>
              </EmptyState>
            )}
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitleGroup>
                <SectionIcon>
                  <span className="material-symbols-outlined">person</span>
                </SectionIcon>
                <SectionTitle>Top Artists</SectionTitle>
              </SectionTitleGroup>
              <SectionCount>
                {statistics.songsByArtist.length}{" "}
                {statistics.songsByArtist.length === 1 ? "artist" : "artists"}
              </SectionCount>
            </SectionHeader>
            {statistics.songsByArtist.length > 0 ? (
              <List>
                {statistics.songsByArtist.slice(0, 10).map((item, index) => (
                  <ListItem key={item._id}>
                    <ItemContent>
                      <ItemRank>#{index + 1}</ItemRank>
                      <ItemName>{item._id}</ItemName>
                    </ItemContent>
                    <ItemStats>
                      <ItemBadge>
                        <ItemCount>{item.count}</ItemCount>
                        <ItemLabel>songs</ItemLabel>
                      </ItemBadge>
                    </ItemStats>
                  </ListItem>
                ))}
              </List>
            ) : (
              <EmptyState>
                <span className="material-symbols-outlined">person_off</span>
                <p>No artist data available</p>
              </EmptyState>
            )}
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitleGroup>
                <SectionIcon>
                  <span className="material-symbols-outlined">album</span>
                </SectionIcon>
                <SectionTitle>Top Albums</SectionTitle>
              </SectionTitleGroup>
              <SectionCount>
                {statistics.songsByAlbum?.length || 0}{" "}
                {(statistics.songsByAlbum?.length || 0) === 1
                  ? "album"
                  : "albums"}
              </SectionCount>
            </SectionHeader>
            {statistics.songsByAlbum && statistics.songsByAlbum.length > 0 ? (
              <List>
                {statistics.songsByAlbum.slice(0, 10).map((item, index) => (
                  <ListItem key={item._id}>
                    <ItemContent>
                      <ItemRank>#{index + 1}</ItemRank>
                      <ItemName>{item._id}</ItemName>
                    </ItemContent>
                    <ItemStats>
                      <ItemBadge>
                        <ItemCount>{item.count}</ItemCount>
                        <ItemLabel>songs</ItemLabel>
                      </ItemBadge>
                    </ItemStats>
                  </ListItem>
                ))}
              </List>
            ) : (
              <EmptyState>
                <span className="material-symbols-outlined">album</span>
                <p>No album data available</p>
              </EmptyState>
            )}
          </Section>
        </SectionsGrid>
      </Content>
    </Container>
  );
};

export default Statistics;
