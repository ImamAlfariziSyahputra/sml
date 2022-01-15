import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// Material
import { Button, Container, Typography, Box, Card, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
// components
import Page from '../../../components/Page';
import InputText from '../../../components/form-components/InputText';
import ErrorBox from '../../../components/box/ErrorBox';
import LoadingBox from '../../../components/box/LoadingBox';
import RedAsterisk from '../../../components/RedAsterisk';
// Json
// Actions
import {
  getGrupMenu,
  updateGrupMenu,
  resetGrupMenu
} from '../../../redux/actions/grupMenuAction';
import { setSnackbar } from '../../../redux/actions/snackbarAction';

const BtnWrapperGrid = styled(
  Grid,
  {}
)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 15,
  '& > *': {
    textTransform: 'uppercase !important'
  }
});

const defaultValues = {
  kode_grup: '',
  nama_grup: '',
  keterangan_grup: '',
  status_grup: 'Tidak Aktif'
};

const validationSchema = Yup.object({
  kode_grup: Yup.string().required('Wajib diisi!'),
  nama_grup: Yup.string().nullable(),
  keterangan_grup: Yup.string().nullable()
});

export default function EditGrupMenu() {
  const methods = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(validationSchema)
  });
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { isSubmitting }
  } = methods;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { grupMenu, error, loading } = useSelector((state) => state.grupMenu);
  const [errSubmit, setErrSubmit] = useState('');

  const onSubmit = (data) => {
    return dispatch(updateGrupMenu(data, id))
      .then(() => {
        navigate('/data-master/grup-menu');
        dispatch(setSnackbar(true, 'success', 'Data berhasil diubah.'));
      })
      .catch((err) => {
        setErrSubmit(err.message);
        dispatch(setSnackbar(true, 'error', 'Data gagal diubah.'));
      });
  };

  useEffect(() => {
    dispatch(resetGrupMenu());
    dispatch(getGrupMenu(id));
  }, []);

  useEffect(() => {
    if (grupMenu.length > 0) {
      setValue('kode_grup', grupMenu[0].kode_grup || '');
      setValue('nama_grup', grupMenu[0].nama_grup || '');
      setValue('keterangan_grup', grupMenu[0].keterangan_grup || '');
    }
  }, [grupMenu]);

  return (
    <Page title="Ubah Grup | Sarana Mulya">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Ubah Grup</Typography>
        </Box>
        {/* {} */}
        <Card sx={{ p: 5 }}>
          {loading && <LoadingBox />}
          {error && <ErrorBox idParam={id} actionWithParam={getGrupMenu} />}
          {grupMenu.length > 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography gutterBottom>
                  Kode Menu Grup <RedAsterisk />
                </Typography>
                <InputText
                  name="kode_grup"
                  label="Kode Menu Grup"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Nama Menu Grup</Typography>
                <InputText
                  name="nama_grup"
                  label="Nama Menu Grup"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Keterangan Menu Grup</Typography>
                <InputText
                  name="keterangan_grup"
                  label="Keterangan Menu Grup"
                  control={control}
                />
              </Grid>
              <BtnWrapperGrid item xs={12}>
                <Button
                  size="large"
                  variant="contained"
                  color="warning"
                  style={{ color: 'white' }}
                  component={Link}
                  to="/data-master/grup-menu"
                >
                  Kembali
                </Button>
                <Button
                  type="button"
                  size="large"
                  variant="contained"
                  color="error"
                  onClick={() => reset()}
                >
                  Ulang
                </Button>
                <LoadingButton
                  size="large"
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  loading={isSubmitting}
                >
                  Ubah
                </LoadingButton>
              </BtnWrapperGrid>
            </Grid>
          )}
          {errSubmit && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: 'red',
                mt: '1rem'
              }}
            >
              <Typography>{errSubmit}</Typography>
            </Box>
          )}
        </Card>
      </Container>
    </Page>
  );
}
