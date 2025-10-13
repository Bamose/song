import React from "react";
import {
  LayoutContainer,
  Sidebar,
  UserInfo,
  UserAvatar,
  UserDetails,
  UserName,
  UserEmail,
  Nav,
  NavItem,
  MainContent,
} from "../styles/Layout.styles";

interface LayoutProps {
  children: React.ReactNode;
  currentView: "songs" | "statistics";
  onNavigate: (view: "songs" | "statistics") => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  currentView,
  onNavigate,
}) => {
  return (
    <LayoutContainer>
      <Sidebar>
        <UserInfo>
          <UserAvatar>JD</UserAvatar>
          <UserDetails>
            <UserName>John Doe</UserName>
            <UserEmail>john.doe@example.com</UserEmail>
          </UserDetails>
        </UserInfo>

        <Nav>
          <NavItem
            active={currentView === "songs"}
            onClick={() => onNavigate("songs")}
          >
            <span className="material-symbols-outlined">music_note</span>
            <span>Songs</span>
          </NavItem>
          <NavItem
            active={currentView === "statistics"}
            onClick={() => onNavigate("statistics")}
          >
            <span className="material-symbols-outlined">bar_chart</span>
            <span>Statistics</span>
          </NavItem>
        </Nav>
      </Sidebar>

      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;
