import ReactDOM from "react-dom";
import { ThemeProvider } from "react-ui";
import { tokens, components } from "react-ui/themes/light";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ThemeProvider tokens={tokens} components={components}>
    <App />
  </ThemeProvider>,
  rootElement
);
