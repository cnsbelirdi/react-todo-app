import './App.css';
import Section from './components/Section';
import { ContextProvider } from './context/Context';

function App() {
  return (
    <ContextProvider>
      <Section />
    </ContextProvider>
  );
}

export default App;
