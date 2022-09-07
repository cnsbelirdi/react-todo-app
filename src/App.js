import './App.css';
import Section from './components/Section';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Section />
    </ThemeProvider>
  );
}

export default App;
