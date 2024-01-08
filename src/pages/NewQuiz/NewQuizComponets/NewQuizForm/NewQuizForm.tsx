import React from 'react';
import {
  Box, Button, Typography
} from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  useForm, SubmitHandler, useFieldArray
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { collection, addDoc } from 'firebase/firestore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InputText from '../../../../components/Form/InputText/InputText';
import { ValidationSchema, validationSchema } from './shemaValidation';
import InputFile from '../../../../components/Form/InputFile/InputFile';
import convertFileToBase64 from '../../../../utils/convertFileToBase64';
// import { db } from '../../../../config/firebase';
import {
  BlockWrapper,
  SmallBlock,
  InputHolder,
  ErrorText
} from './styled';

import NestedFields from './NestedFields';

const NewQuizForm = () => {
  const {
    control, handleSubmit, formState: { errors }, register
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions' // unique name for your Field Array
  });
  // const quizId = 9; // TODO fix to dynamic ID

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    console.log('test submit');
    let imageSrc;
    if (data.picture[0]) {
      imageSrc = await convertFileToBase64(data.picture[0]);
    }
    // try {
    //   const docRef = await addDoc(collection(db, 'quizes'), {
    //     id: quizId,
    //     title: data.quizTitle,
    //     description: data.quizDescription,
    //     img: imageSrc
    //   });
    //   console.log('Document written with ID: ', docRef.id);
    // } catch (e) {
    //   console.error('Error adding document: ', e);
    // }
    console.log('data', data, data.picture[0], imageSrc);
  };

  const appendFields = () => append({
    text: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: 'option1'
  });

  return (
    <Box sx={{ maxWidth: '500px', margin: '16px auto' }}>
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
      <BlockWrapper>
      {fields.map((field, index) => {
        const errorForField = errors?.questions?.[index]?.text;
        const num = index + 1;
        return (
            <div key={field.id}>
              <Typography variant="h6" mb={0.5}>
                Question #{num}
              </Typography>
              <div>
                <SmallBlock>
                  <InputHolder>
                    <TextField
                      {...register(`questions.${index}.text` as const)}
                      placeholder="Enter a text.."
                      defaultValue={field.text}
                    />
                    <ErrorText>{errorForField?.message ?? <>&nbsp;</>}</ErrorText>
                  </InputHolder>
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="outlined"
                    sx={{ height: '56px' }}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </SmallBlock>
                <NestedFields control={control} index={index}/>
              </div>
            </div>
        );
      })}
      </BlockWrapper>
      <Box sx={{ marginTop: 3 }}>
        <Button
          type='button'
          variant="outlined"
          fullWidth
          size='large'
          onClick={appendFields}
        >
          Create Quiz Questions
        </Button>
      </Box>
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
