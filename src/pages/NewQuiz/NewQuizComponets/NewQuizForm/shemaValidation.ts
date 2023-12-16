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

export const validationSchema = z
  .object({
    quizTitle: z.string().min(1, { message: 'Quiz title is required' }),
    quizDescription: z.string().min(1, { message: 'Quiz description is required' }),
    picture: z
      .any()
      .refine((files) => files?.length >= 1, 'Image is required.')
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
  });

export type ValidationSchema = z.infer<typeof validationSchema>;
