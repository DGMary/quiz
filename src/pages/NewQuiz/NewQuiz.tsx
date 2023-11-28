import React from 'react';
import {
  Container, Typography, Box, Button
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputText from '../../components/Form/InputText/InputText';

// type Inputs = {
//   example: string,
//   exampleRequired: string,
//   quizname: string,
//   quizname1: string,
// };

// quiz Name (string)
// quiz Description (string)
// quiz Image (save base 64) (string)
// quiz Questions
// quiz Options
// quiz Answers (array strings)
// quiz Time for timer (number)

const validationSchema = z
  .object({
    quizTitle: z.string().min(1, { message: 'Quiz title is required' }),
    quizDescription: z.string().min(1, { message: 'Quiz description is required' }),
    questionTitle: z.string().min(1, { message: 'Question Title is required' }),
    questionOption: z.string().min(1, { message: 'Question Option is required' }),
    answerKey: z.string().min(1, { message: 'Answer Key is required' })
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const NewQuiz = () => {
  const {
    control, handleSubmit, watch
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });
  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  console.log(watch('quizTitle')); // watch input value by passing the name of it

  return (
    <Container>
      <Typography variant="h2" pb={4} pt={4} sx={{ textAlign: 'center' }}>
        Create new quiz
      </Typography>
      <Box sx={{ maxWidth: '400px', margin: '16px auto' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText
            control={control}
            label="Quiz title"
            name="quizTitle"
          />

          <InputText
            control={control}
            label="Quiz description"
            name="quizDescription"
          />

          <InputText
            control={control}
            label="Question Title"
            name="questionTitle"
          />

          <InputText
            type="text"
            control={control}
            label="Question Option"
            name="questionOption"
          />

          <InputText
            type="text"
            control={control}
            label="Answer Key"
            name="answerKey"
          />

          <Box sx={{ marginTop: 3 }}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              size='large'
            >
              Create quiz
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
export default NewQuiz;
