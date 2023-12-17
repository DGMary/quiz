import React from 'react';
import { Box, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { collection, addDoc } from 'firebase/firestore';
import InputText from '../../../../components/Form/InputText/InputText';
import { ValidationSchema, validationSchema } from './shemaValidation';
import InputFile from '../../../../components/Form/InputFile/InputFile';
import convertFileToBase64 from '../../../../utils/convertFileToBase64';
import { db } from '../../../../config/firebase';

const NewQuizForm = () => {
  const {
    control, handleSubmit, formState: { errors }, register
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });
  const quizId = 9; // TODO fix to dynamic ID

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const imageSrc = await convertFileToBase64(data.picture[0]);
    try {
      const docRef = await addDoc(collection(db, 'quizes'), {
        id: quizId,
        title: data.quizTitle,
        description: data.quizDescription,
        img: imageSrc
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    console.log('data', data, data.picture[0], imageSrc);
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
