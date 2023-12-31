import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getDesignTokens from './theme';
import ColorModeContext from './config/color-context';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Quiz from './pages/Quiz/Quiz';
import NewQuiz from './pages/NewQuiz/NewQuiz';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import QuizResult from './pages/QuizResult/QuizResult';
import routes from './routes/routes';
import './App.css';

const App = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }
  }), []);

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={routes.homepage} element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={`${routes.quiz.key}/:id`} element={<Quiz />} />
              <Route path={routes.about} element={<About />} />
              <Route path={`${routes.quiz.key}/:id/${routes.quiz.resultPage}`} element={<QuizResult />} />
              <Route path={routes.newquiz} element={<NewQuiz />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
export default App;
