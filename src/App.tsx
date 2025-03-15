import styled from "styled-components";
import CSVProcessor from "./components/CSVProcessor";
import { ConfigProvider } from "harmonia-ui";

const AppContainer = styled.div`
  height: 100%;
  padding: var(--base-padding-vertical) var(--base-padding-horizontal);
`;

const config = {
  colors: {
    primary: "#0d6efd",
    secondary: "#6c757d",
    success: "#198754",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#0dcaf0",
    light: "#f8f9fa",
    dark: "#212529",
    white: "#fff",
  },
};

function App() {
  return (
    <ConfigProvider tokens={config}>
      <AppContainer>
        <CSVProcessor />
      </AppContainer>
    </ConfigProvider>
  );
}

export default App;
