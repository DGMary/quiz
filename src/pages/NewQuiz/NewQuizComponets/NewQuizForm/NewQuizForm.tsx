import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Button, CardMedia
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PanoramaIcon from '@mui/icons-material/Panorama';
import InputText from '../../../../components/Form/InputText/InputText';
import {
  ImageWrapper, InputTextdFile, ErrorText, BoxWrapper
} from './styled';
import { ValidationSchema, validationSchema } from './shemaValidation';

const NewQuizForm = () => {
  const [picture, setPicture] = useState<any>('');
  const {
    control, handleSubmit, watch, formState: { errors }, register
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref } = register('picture');

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    console.log('data', data, data.picture[0]);
  };
  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'picture' && inputRef.current && inputRef.current.files?.length) {
        convertToBase64(inputRef.current.files[0]);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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

      <BoxWrapper>
        <InputTextdFile>
          <label htmlFor="picture" className={errors.picture ? 'inputError' : ''}>
            <span className='labelText'>Choose picture</span>
            <input
              type="file"
              {...register('picture')}
              ref={(e) => {
                ref(e);
                inputRef.current = e;
              }}
              id="picture"
              accept="image/jpeg, image/jpg, image/png, image/bmp, image/gif, image/tiff, image/svg"
            />
          </label>
        </InputTextdFile>
        <ImageWrapper>
          {picture ? <CardMedia
            component="img"
            image={picture}
            alt="Quiz image"
          /> : <PanoramaIcon/>}

        </ImageWrapper>
      </BoxWrapper>
      {errors.picture && <ErrorText>{`${errors.picture.message}`}</ErrorText>}
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
