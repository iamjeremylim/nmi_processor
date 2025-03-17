import styled from "styled-components";
import { processNMIReport } from "./utils/processors";
import { FileProcessor } from "./components/FileProcessor";

const AppContainer = styled.div`
  height: 100%;
  padding: var(--base-padding-vertical) var(--base-padding-horizontal);
`;

function App() {
  return (
    <AppContainer>
      <FileProcessor
        fileType={[".csv"]}
        fileProcessor={processNMIReport}
        placeholder="Upload CSV file here"
        cta="Generate Queries"
        process="generate-queries"
      />
    </AppContainer>
  );
}

export default App;
