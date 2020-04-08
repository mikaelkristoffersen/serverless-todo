import React, { useContext } from "react";
import { Router, Link } from "@reach/router";
import { Container, Flex, Heading, Button, NavLink } from "theme-ui";
import { IdentityContext } from "../../identity-context";
import Dash from "../components/dashboard"

let DashLoggedOut = props => {
  const {user, identity: netlifyIdentity } = useContext(IdentityContext);

  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to="/app" p={2}>
          Dashboard
        </NavLink>
        {user && (
          <NavLink href="#!" p={2}>
            {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">TODOs</Heading>
        <Button
          sx={{ marginTop: 2 }}
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          Log In
        </Button>
      </Flex>
    </Container>
  );
};


export default props => {
  const { user } = useContext(IdentityContext);

  if (!user) {
    return (
      <Router>
        <DashLoggedOut path="/app" />
      </Router>
    );
  }
  return (
    <Router>
      <Dash path="/app" />
    </Router>
  );
};
