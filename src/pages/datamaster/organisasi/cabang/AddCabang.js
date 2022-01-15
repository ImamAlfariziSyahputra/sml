import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
// Json
import exampleOptions from '../../../../data/example.json';
import jenisCabangOptions from '../../../../data/cabang/jenisCabang.json';
import provinsiOptions from '../../../../data/kantor-cabang/provinsi.json';
// Actions
import { addCabang } from '../../../../redux/actions/cabangAction';
import { setSnackbar } from '../../../../redux/actions/snackbarAction';

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
  kode_cabang: '',
  nama_cabang: '',
  kode_region: '',
  kode_provinsi: '',
  kode_iata: '',
  jenis_cabang: ''
};

const validationSchema = Yup.object({
  kode_cabang: Yup.string().required('Wajib diisi!'),
  nama_cabang: Yup.string().required('Wajib diisi!'),
  kode_region: Yup.string().required('Wajib diisi!'),
  kode_provinsi: Yup.string().required('Wajib diisi!'),
  kode_iata: Yup.string().nullable(),
  jenis_cabang: Yup.string().nullable()
});

export default function AddCabang() {
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

  const onSubmit = (data) => {
    // console.log('data => ', data);
    return dispatch(addCabang(data))
      .then(() => {
        navigate('/data-master/cabang');
        dispatch(setSnackbar(true, 'success', 'Data berhasil ditambahkan.'));
      })
      .catch((err) => {
        setErrSubmit(err.message);
        dispatch(setSnackbar(true, 'error', 'Data gagal ditambahkan.'));
      });
  };

  return (
    <Page title="Tambah Cabang | Sarana Mulya">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Tambah Cabang Baru</Typography>
        </Box>
        <Card sx={{ p: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom>
                Kode Cabang <RedAsterisk />
              </Typography>
              <InputText
                name="kode_cabang"
                label="Kode Cabang"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                Nama Cabang <RedAsterisk />
              </Typography>
              <InputText
                name="nama_cabang"
                label="Nama Cabang"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                Kode Region <RedAsterisk />
              </Typography>
              <InputDropdown
                name="kode_region"
                label="Pilih Kode Region..."
                options={exampleOptions}
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                Kode Provinsi <RedAsterisk />
              </Typography>
              <InputDropdown
                name="kode_provinsi"
                label="Pilih Kode Provinsi..."
                options={provinsiOptions}
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>Kode Iata</Typography>
              <InputDropdown
                name="kode_iata"
                label="Pilih Kode Iata..."
                options={exampleOptions}
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>Jenis Cabang</Typography>
              <InputDropdown
                name="jenis_cabang"
                label="Pilih Jenis Cabang..."
                options={jenisCabangOptions}
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
                to="/data-master/cabang"
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
