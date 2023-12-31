import React, { useEffect, useCallback } from 'react';
import { Grid, Typography } from '@mui/material';
import QuizItem from '../QuizItem/QuizItem';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import { quizesThunks } from '../../../store/services/quiz';
import Preloader from '../../common/Preloader';
import { IQuizItem } from '../../../store/services/quiz/constant';

const QuizItems = () => {
  const { quizes, status, error } = useAppSelector((state) => state.quizesReducer);
  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    try {
      await dispatch(quizesThunks.fetchQuizes());
    } catch (e) {
      console.error(e);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isNetworkOk = error !== 'Network Error' && status !== 'failed';

  if (!isNetworkOk) return <Grid><Typography variant="h3">{error}</Typography></Grid>;
  if (isNetworkOk && status === 'loading') return (<Preloader/>);

  return (
    <Grid container spacing={2} sx={{ alignItems: 'stretch', paddingTop: 2, paddingBottom: 4 }}>
      {quizes.map((item: IQuizItem) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <QuizItem item={item} />
        </Grid>))
      }
    </Grid>
  );
};
export default QuizItems;
