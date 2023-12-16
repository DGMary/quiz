import React from 'react';
import {
  Container, Typography
} from '@mui/material';
import NewQuizForm from './NewQuizComponets/NewQuizForm/NewQuizForm';

const NewQuiz = () => (
  <Container>
    <Typography variant="h2" pb={4} pt={4} sx={{ textAlign: 'center' }}>
      Create new quiz
    </Typography>
    <NewQuizForm />
  </Container>
);
export default NewQuiz;
