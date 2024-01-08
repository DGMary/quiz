import { z } from 'zod';

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/bmp',
  'image/gif',
  'image/tiff',
  'image/svg'
];

const QuestionSchema = z.object({
  text: z.string().min(1),
  option1: z.string().min(0).optional(),
  option2: z.string().min(0).optional(),
  option3: z.string().min(0).optional(),
  option4: z.string().min(0).optional(),
  answer: z.string().min(0).optional()
});

export const validationSchema = z
  .object({
    quizTitle: z.string().min(1, { message: 'Quiz title is required' }),
    quizDescription: z.string().min(1, { message: 'Quiz description is required' }),
    picture: z
      .any()
      .refine((file) => {
        if (file[0]) {
          return file[0].size <= MAX_FILE_SIZE;
        }
        return true;
      }, 'The file size must not exceed 2 MB.')
      .refine((file) => {
        if (file[0]) {
          return ACCEPTED_IMAGE_TYPES.includes(file[0].type);
        }
        return true;
      }, 'You may use JPEG, TIFF, PNG, BMP, SVG or GIF format only.')
      .optional(),
    questions: z.array(QuestionSchema)
  });

export type ValidationSchema = z.infer<typeof validationSchema>;
