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
// Actions
import { setSnackbar } from '../../../../redux/actions/snackbarAction';
import { addArmada } from '../../../../redux/actions/armadaAction';
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
  cabang: '',
  no_body_kendaraan: '',
  no_kode_kendaraan: '',
  no_body: '',
  merk_kendaraan: '',
  model_kendaraan: '',
  jenis: '',
  kode_jenis: '',
  status_kepemilikan: '',
  kode_status_kepemilikan: '',
  tahun: '',
  no_polisi: '',
  fungsi: ''
};

const validationSchema = Yup.object({
  cabang: Yup.string().required('Wajib diisi!'),
  no_body_kendaraan: Yup.string().required('Wajib diisi!'),
  no_kode_kendaraan: Yup.string().nullable(),
  no_body: Yup.string().required('Wajib diisi!'),
  merk_kendaraan: Yup.string().required('Wajib diisi!'),
  model_kendaraan: Yup.string().required('Wajib diisi!'),
  jenis: Yup.string().required('Wajib diisi!'),
  kode_jenis: Yup.string().nullable(),
  status_kepemilikan: Yup.string().nullable(),
  kode_status_kepemilikan: Yup.string().nullable(),
  tahun: Yup.number()
    .positive('Angka Harus Positif!')
    .nullable()
    .transform((v, o) => (o === '' ? null : v)),
  no_polisi: Yup.string().required('Wajib diisi!'),
  fungsi: Yup.string().nullable()
});

export default function AddArmada() {
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
    return dispatch(addArmada(data))
      .then(() => {
        navigate('/data-master/armada');
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
    <Page title="Tambah Armada | Sarana Mulya">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Tambah Armada</Typography>
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
                    No. Body Kendaraan <RedAsterisk />
                  </Typography>
                  <InputText
                    name="no_body_kendaraan"
                    label="No. Body Kendaraan"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>No. Kode Kendaraan</Typography>
                  <InputText
                    name="no_kode_kendaraan"
                    label="No. Kode Kendaraan"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Nomor Body <RedAsterisk />
                  </Typography>
                  <InputText
                    name="no_body"
                    label="Nomor Body"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Merk Kendaraan <RedAsterisk />
                  </Typography>
                  <InputText
                    name="merk_kendaraan"
                    label="Merk Kendaraan"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Model Kendaraan <RedAsterisk />
                  </Typography>
                  <InputText
                    name="model_kendaraan"
                    label="Model Kendaraan"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Jenis <RedAsterisk />
                  </Typography>
                  <InputText name="jenis" label="Jenis" control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Kode Jenis</Typography>
                  <InputText
                    name="kode_jenis"
                    label="Kode Jenis"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Status Kepemilikan</Typography>
                  <InputText
                    name="status_kepemilikan"
                    label="Status Kepemilikan"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Kode Status Kepemilikan</Typography>
                  <InputText
                    name="kode_status_kepemilikan"
                    label="Kode Status Kepemilikan"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Tahun</Typography>
                  <InputText
                    type="number"
                    name="tahun"
                    label="Tahun"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    No Polisi <RedAsterisk />
                  </Typography>
                  <InputText
                    name="no_polisi"
                    label="No Polisi"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Fungsi</Typography>
                  <InputText name="fungsi" label="Fungsi" control={control} />
                </Grid>
                <BtnWrapperGrid item xs={12}>
                  <Button
                    size="large"
                    variant="contained"
                    color="warning"
                    style={{ color: 'white' }}
                    component={Link}
                    to="/data-master/armada"
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
