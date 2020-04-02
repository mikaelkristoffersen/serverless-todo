import React, { useEffect } from "react";
import { Container, Heading, Button, Flex } from "theme-ui";
import netlifyiIndentity from "netlify-identity-widget";

export default props => {
  useEffect(() => {
    netlifyiIndentity.init({});
  });
  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">TODOs</Heading>
        <Button sx={{ marginTop: 2 }} onClick={() => netlifyiIndentity.open()}>
          {" "}
          Log In
        </Button>
        <Button sx={{ marginTop: 2 }} 
            onClick={() => 
            console.log(netlifyiIndentity.currentUser())
            }>
          {" "}
          log user
        </Button>
      </Flex>
    </Container>
  );
};
