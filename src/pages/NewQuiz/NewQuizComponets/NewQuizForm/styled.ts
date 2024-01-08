import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const BlockWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingbottom: theme.spacing(2)
}));

const SmallBlock = styled('div')(({ theme }) => ({
  display: 'flex',
  paddingbottom: theme.spacing(2),
  alignItems: 'flex-start',
  gap: '16px',
  '& .MuiFormControl-root': {
    width: '100%'
  }
}));
const InputHolder = styled('div')(() => ({
  width: '100%'
}));

const ErrorText = styled('span')(() => ({
  color: '#d32f2f',
  fontSize: '0.75rem',
  display: 'inline-flex',
  marginLeft: '14px',
  width: '100%',
  marginRight: '14px',
  marginTop: '4px'
}));

const FieldsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  marginBottom: theme.spacing(2)
}));

const RadioGroupWrapper = styled('div')(() => ({
  paddingRight: '8px',
  '& .MuiFormControlLabel-root': {
    height: '56px'
  }
}));

export {
  BlockWrapper,
  SmallBlock,
  InputHolder,
  ErrorText,
  FieldsWrapper,
  RadioGroupWrapper
};

// import React from "react";
// import { useForm, useFieldArray, SubmitHandler, FieldValues, UseFormRegister } from "react-hook-form";
// import { z, ZodError } from "zod";

// // Define Zod validation schema
// const QuestionSchema = z.object({
//   question: z.string().min(1),
//   answers: z.array(z.string().min(0))
// });

// const QuizSchema = z.object({
//   title: z.string().min(1),
//   description: z.string().min(1),
//   image: z.string().min(1),
//   questions: z.array(QuestionSchema),
// });

// // Define types for form data
// interface QuizFormInput {
//   title: string;
//   description: string;
//   image: string;
//   questions: { question: string; answers: string[] }[];
// }

// interface QuizFormProps {
//   onSubmit: SubmitHandler<QuizFormInput>;
// }

// const QuizForm: React.FC<QuizFormProps> = ({ onSubmit }) => {
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<QuizFormInput>({
//     resolver: async (data, context) => {
//       try {
//         // Validate using Zod
//         QuizSchema.parse(data);
//         return { values: data, errors: {} };
//       } catch (error) {
//         if (error instanceof ZodError) {
//           return { values: {}, errors: error.errors.reduce((acc, e) => ({ ...acc, [e.path.join(".")]: e.message }), {}) };
//         }
//         throw error;
//       }
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "questions",
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label>Title:</label>
//         <input {...register("title", { required: "Title is required" })} />
//         {errors.title && <p>{errors.title.message}</p>}
//       </div>

//       <div>
//         <label>Description:</label>
//         <input {...register("description", { required: "Description is required" })} />
//         {errors.description && <p>{errors.description.message}</p>}
//       </div>

//       <div>
//         <label>Image:</label>
//         <input {...register("image", { required: "Image is required" })} />
//         {errors.image && <p>{errors.image.message}</p>}
//       </div>

//       <div>
//         <h2>Questions:</h2>
//         {fields.map((question, index) => (
//           <div key={question.id}>
//             <label>{`Question ${index + 1}:`}</label>
//             <input {...register(`questions.${index}.question`, { required: "Question is required" })} />
//             {errors?.questions?.[index]?.question && <p>{errors.questions[index].question.message}</p>}

//             <h3>Answers:</h3>
//             {question.answers.map((answer, answerIndex) => (
//               <div key={answerIndex}>
//                 <label>{`Answer ${answerIndex + 1}:`}</label>
//                 <input {...register(`questions.${index}.answers.${answerIndex}`, { required: "Answer is required" })} />
//                 {errors?.questions?.[index]?.answers?.[answerIndex] && (
//                   <p>{errors.questions[index].answers[answerIndex].message}</p>
//                 )}
//               </div>
//             ))}

//             <button type="button" onClick={() => remove(index)}>
//               Remove Question
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={() => append({ question: "", answers: ["", "", "", ""] })}>
//           Add Question
//         </button>
//       </div>

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// const QuizCreationPage: React.FC = () => {
//   const handleQuizSubmit: SubmitHandler<QuizFormInput> = (data) => {
//     // Handle quiz submission logic
//     console.log("Quiz Data:", data);
//   };

//   return (
//     <div>
//       <h1>Create Quiz</h1>
//       <QuizForm onSubmit={handleQuizSubmit} />
//     </div>
//   );
// };

// export default QuizCreationPage;
