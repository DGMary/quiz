import React from 'react';
import { Box, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputText from '../../../../components/Form/InputText/InputText';
import { ValidationSchema, validationSchema } from './shemaValidation';
import InputFile from '../../../../components/Form/InputFile/InputFile';

const NewQuizForm = () => {
  const {
    control, handleSubmit, formState: { errors }, register
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    console.log('data', data, data.picture[0]);
  };

  return (
    <Box sx={{ maxWidth: '400px', margin: '16px auto' }}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        type="text"
        control={control}
        label="Quiz title"
        name="quizTitle"
      />

      <InputText
        type="text"
        control={control}
        label="Quiz description"
        name="quizDescription"
      />

      <InputFile
        name={'picture'}
        register={register}
        errors={errors}
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
  );
};
export default NewQuizForm;
