import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// Material
import { Button, Container, Typography, Box, Card, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
// components
import Page from '../../../../components/Page';
import InputText from '../../../../components/form-components/InputText';
import InputDropdown from '../../../../components/form-components/InputDropdown';
import RedAsterisk from '../../../../components/RedAsterisk';
import LoadingBox from '../../../../components/box/LoadingBox';
import ErrorBox from '../../../../components/box/ErrorBox';
// Json
import tugasOptions from '../../../../data/kurir/tugas.json';
// Actions
import { setSnackbar } from '../../../../redux/actions/snackbarAction';
import { addHelper } from '../../../../redux/actions/helperAction';
import { getCabangs } from '../../../../redux/actions/cabangAction';

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
  kode_kurir: '',
  nama_kurir: '',
  cabang: '',
  tugas: ''
};

const validationSchema = Yup.object({
  kode_kurir: Yup.string().required('Wajib diisi!'),
  nama_kurir: Yup.string().required('Wajib diisi!'),
  cabang: Yup.string().required('Wajib diisi!'),
  tugas: Yup.string().required('Wajib diisi!')
});

export default function AddHelper() {
  const methods = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(validationSchema)
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting }
  } = methods;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errSubmit, setErrSubmit] = useState('');
  const cabang = useSelector((state) => state.cabang);

  const kodeCabangOptions = cabang.cabangs.map((cabang) => cabang.kode_cabang);

  const onSubmit = (data) => {
    // console.log('data => ', data);
    return dispatch(addHelper(data))
      .then(() => {
        navigate('/data-master/helper');
        dispatch(setSnackbar(true, 'success', 'Data berhasil ditambahkan.'));
      })
      .catch((err) => {
        setErrSubmit(err.message);
        dispatch(setSnackbar(true, 'error', 'Data gagal ditambahkan.'));
      });
  };

  useEffect(() => {
    dispatch(getCabangs());
  }, []);

  return (
    <Page title="Tambah Helper | Sarana Mulya">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Tambah Helper</Typography>
        </Box>
        <Card sx={{ p: 5 }}>
          {cabang.loading ? <LoadingBox /> : null}
          {cabang.error ? <ErrorBox actions={[getCabangs]} /> : null}
          {cabang.cabangs.length > 0 &&
            // loading
            !cabang.loading &&
            // error
            !cabang.error && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Kode Kurir <RedAsterisk />
                  </Typography>
                  <InputText
                    name="kode_kurir"
                    label="Kode Kurir"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Nama Kurir <RedAsterisk />
                  </Typography>
                  <InputText
                    name="nama_kurir"
                    label="Nama Kurir"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Cabang <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="cabang"
                    label="Pilih Cabang..."
                    options={kodeCabangOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Tugas <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="tugas"
                    label="Pilih Tugas..."
                    options={tugasOptions}
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
                    to="/data-master/helper"
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
                    Submit
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
