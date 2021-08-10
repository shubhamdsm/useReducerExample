import "./styles.css";
import { useEffect, useReducer, useState } from "react";
import { Input, Button, Alert, Form, Card } from "react-ui";

const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newItems = [...state.items, action.payload];
    return {
      ...state,
      items: newItems,
      alert: true,
      variant: "success"
    };
  }
  if (action.type === "NO_VALUE") {
    return {
      ...state,
      alert: true,
      variant: "warning"
    };
  }
  if (action.type === "CLOSE_ALERT") {
    return {
      ...state,
      alert: false
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const newItem = state.items.filter((item) => item.id !== action.payload);
    return {
      ...state,
      items: newItem
    };
  } else {
    return state;
  }
};
const initialState = {
  items: [],
  alert: false,
  variant: ""
};
export default function App() {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const closeAlert = () => {
    dispatch({ type: "CLOSE_ALERT" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = { id: new Date().getTime().toString(), name };
      dispatch({ type: "ADD_ITEM", payload: newItem });
      setName("");
    } else {
      dispatch({ type: "NO_VALUE" });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      closeAlert();
    }, 3000);
  });
  return (
    <div className="App">
      <h1>useReducer Working Example</h1>
      {state.alert && <Alert variant={state.variant}>{state.variant}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Input
          value={name}
          type="text"
          placeholder="enter something"
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit">Add Item </Button>
      </Form>

      {state.items.map((item) => {
        return (
          <Card key={item.id}>
            <h1>{item.name}</h1>
            <Button
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM", payload: item.id })
              }
              variant="destructive"
            >
              REMOVE
            </Button>
          </Card>
        );
      })}
    </div>
  );
}
