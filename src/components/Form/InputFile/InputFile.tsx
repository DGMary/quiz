import React, { useState, useRef, ChangeEvent } from 'react';
import { CardMedia } from '@mui/material';
import PanoramaIcon from '@mui/icons-material/Panorama';
import { FieldErrors, FieldValues } from 'react-hook-form';
import {
  ImageWrapper, InputTextdFile, ErrorText, BoxWrapper
} from './styled';

type Props<
  TFieldValues extends FieldValues = FieldValues
> = {
  name: string;
  register: any;
  errors: FieldErrors<TFieldValues>;
}

const InputFile = ({ name, register, errors }: Props) => {
  const [picture, setPicture] = useState<any>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref } = register('picture');

  function convertFileToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }
  const handlerChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      try {
        const uploadedImageBase64 = await convertFileToBase64(event.target.files[0]);
        setPicture(uploadedImageBase64);
        // do something with above data string
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
  <>
  <BoxWrapper>
    <InputTextdFile>
      <label htmlFor="picture" className={errors.picture ? 'inputError' : ''}>
        <span className='labelText'>Choose picture</span>
        <input
          type="file"
          {...register(name, {
            onChange: (e: ChangeEvent<HTMLInputElement>) => handlerChangeFile(e)
          })}
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
  </>);
};

export default InputFile;
