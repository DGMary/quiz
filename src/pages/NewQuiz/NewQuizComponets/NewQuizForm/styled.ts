import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const InputTextdFile = styled('div')(() => ({
  height: '100%',
  '& .inputError': {
    border: '1px solid #d32f2f'
  },
  '& label': {
    background: 'rgba(0, 0, 0, 0.20)',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    transition: '0.4s linear',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    padding: '16px'
  },
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.10)'
  },
  '& .labelText': {
    cursor: 'pointer',
    zIndex: 1,
    display: 'inline-flex'
  },
  '& .inputErrorText': {
    color: '#d32f2f',
    fontSize: '0.75rem'
  },
  '& input[type="file"]': {
    position: 'absolute',
    cursor: 'pointer',
    opacity: 0,
    zIndex: '-1'
  }
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

const ImageWrapper = styled('div')(() => ({
  borderColor: 'rgba(0, 0, 0, 0.23)',
  width: '100%',
  height: '60px',
  margin: 'auto',
  padding: 0,
  '& *': {
    height: '100%',
    width: '100%'
  }
}));

const BoxWrapper = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '16px',
  marginTop: '20px'
}));

export {
  InputTextdFile, ImageWrapper, ErrorText, BoxWrapper
};
