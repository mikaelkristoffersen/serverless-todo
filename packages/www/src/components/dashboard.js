import React, { useContext, useRef, useReducer } from "react";
import { Link } from "@reach/router";
import {
  Container,
  Flex,
  Button,
  NavLink,
  Input,
  Label,
  Checkbox
} from "theme-ui";
import { IdentityContext } from "../../identity-context";

const todosReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return [{ done: false, value: action.payload }, ...state];
    case "toggleTodoDone":
      const newState = [...state];
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value
      };
      return newState;
  }
};


export default () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);
  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todosReducer, []);

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
          <NavLink
            href="#!"
            p={2}
            onClick={() => {
              netlifyIdentity.logout();
            }}
          >
            Log out {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <Flex
        as="form"
        onSubmit={e => {
          e.preventDefault();
          dispatch({type: "addTodo", payload: inputRef.current.value });
          inputRef.current.value = "";
        }}
      >
        <Label sx={{ display: "flex" }}>
          <span>Add&nbsp;ToDo</span>
          <Input ref={inputRef} sx={{ marginLeft: 1 }}></Input>
          <Button sx={{ marginLeft: 1 }}>Submit</Button>
        </Label>
      </Flex>
      <Flex sx={{flexDirection: "column"}}>
        <ul sx={{listStyleType: "none"}}>
          {todos.map((todo, i) => 
           <Flex as="li" onClick={e => {dispatch({type: "toggleTodoDone", payload: i })}}>
             <Checkbox checked={todo.done}/>
             <span>{todo.value}</span>
           </Flex> 
          )}
        </ul>
      </Flex>
    </Container>
  );
};
