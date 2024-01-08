import React from 'react';
import {
  Box,
  FormControl, FormControlLabel, Radio, RadioGroup
} from '@mui/material';
import { Controller } from 'react-hook-form';
import InputText from '../../../../components/Form/InputText/InputText';
import {
  FieldsWrapper,
  RadioGroupWrapper
} from './styled';

const NestedFields = ({ control, index } : any) => (
  <FieldsWrapper>
  <Box sx={{ width: 'calc(100% - 100px)' }}>
  <InputText
      type="text"
      control={control}
      label="Quiz answer option 1"
      name={`questions.${index}.option1`}
    />
    <InputText
      type="text"
      control={control}
      label="Quiz answer option 2"
      name={`questions.${index}.option2`}
    />
    <InputText
      type="text"
      control={control}
      label="Quiz answer option 3"
      name={`questions.${index}.option3`}
    />
    <InputText
      type="text"
      control={control}
      label="Quiz answer option 4"
      name={`questions.${index}.option4`}
    />
  </Box>
  <RadioGroupWrapper>
<FormControl component="fieldset">
  <Controller
    rules={{ required: true }}
    control={control}
    name={`questions.${index}.answer`}
    defaultValue="option1"
    render={({ field }) => (
      <RadioGroup
        defaultValue="option1"
        {...field}
      >
        <FormControlLabel
          sx={{ margin: '16px 0 8px' }}
          value="option1"
          control={<Radio />}
          label="Correct"
        />
        <FormControlLabel
          sx={{ margin: '16px 0 8px' }}
          value="option2"
          control={<Radio />}
          label="Correct"
        />
        <FormControlLabel
          sx={{ margin: '16px 0 8px' }}
          value="option3"
          control={<Radio />}
          label="Correct"
        />
        <FormControlLabel
          sx={{ margin: '16px 0 8px' }}
          value="option4"
          control={<Radio />}
          label="Correct"
        />
      </RadioGroup>
    )}
  />
</FormControl>
</RadioGroupWrapper>
</FieldsWrapper>
);

export default NestedFields;
