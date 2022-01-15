import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ReplayIcon from '@mui/icons-material/Replay';

const ReplayIconStyled = styled(
  ReplayIcon,
  {}
)({
  fontSize: '4rem'
});

const CenteredGrid = styled(
  Grid,
  {}
)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '2rem'
});

const Blue = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main
}));

export default function ErrorBox({ actions, actionWithParam, idParam }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log('actions => ', actions);
    console.log('actionWithParam => ', actionWithParam);

    if (actions) {
      actions.forEach((action) => {
        dispatch(action());
        console.log('actions running => ');
      });
    } else if (actionWithParam) {
      dispatch(actionWithParam(idParam));
      console.log('actionWithParam running => ');
    }
  };

  return (
    <CenteredGrid container>
      <IconButton aria-label="retry" onClick={handleClick}>
        <ReplayIconStyled color="primary" />
      </IconButton>
      <Typography variant="body1">
        Gagal memuat data. Klik <Blue>tombol</Blue> untuk memuat ulang...
      </Typography>
    </CenteredGrid>
  );
}
