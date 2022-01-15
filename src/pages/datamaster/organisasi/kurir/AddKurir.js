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
import exampleOptions from '../../../../data/example.json';
import kendaraanOptions from '../../../../data/kurir/kendaraan.json';
import tugasOptions from '../../../../data/kurir/tugas.json';
import statusOptions from '../../../../data/kurir/status.json';
// Actions
import { setSnackbar } from '../../../../redux/actions/snackbarAction';
import { addKurir } from '../../../../redux/actions/kurirAction';
import { getCabangs } from '../../../../redux/actions/cabangAction';
import { getKantorCabangs } from '../../../../redux/actions/kantorCabangAction';

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
  kata_sandi: '',
  konfirmasi_kata_sandi: '',
  nama_kurir: '',
  no_telepon: '',
  cabang: '',
  kantor: '',
  area: '',
  tugas: '',
  kendaraan: '',
  status: '',
  company_id: ''
};

const PHONE_NO_REGEX =
  /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;

const validationSchema = Yup.object({
  kode_kurir: Yup.string().required('Wajib diisi!'),
  kata_sandi: Yup.string().required('Wajib diisi!'),
  konfirmasi_kata_sandi: Yup.string()
    .oneOf([Yup.ref('kata_sandi'), ''], 'Konfirmasi kata sandi tidak cocok.')
    .required('Wajib diisi!'),
  nama_kurir: Yup.string().required('Wajib diisi!'),
  no_telepon: Yup.string().matches(PHONE_NO_REGEX, {
    message: 'Nomor Telepon Tidak Valid!',
    excludeEmptyString: true //! false kalo Required
  }),
  cabang: Yup.string().required('Wajib diisi!'),
  kantor: Yup.string().nullable(),
  area: Yup.string().required('Wajib diisi!'),
  tugas: Yup.string().required('Wajib diisi!'),
  kendaraan: Yup.string().required('Wajib diisi!'),
  status: Yup.string().required('Wajib diisi!'),
  company_id: Yup.string().nullable()
});

export default function AddKurir() {
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
  const kantorCabang = useSelector((state) => state.kantorCabang);

  const kodeCabangOptions = cabang.cabangs.map((cabang) => cabang.kode_cabang);
  const kodeKantorOptions = kantorCabang.kantorCabangs.map(
    (kantorCabang) => kantorCabang.kode_kantor
  );

  const onSubmit = (data) => {
    // console.log('data => ', data);
    return dispatch(addKurir(data))
      .then(() => {
        navigate('/data-master/kurir');
        dispatch(setSnackbar(true, 'success', 'Data berhasil ditambahkan.'));
      })
      .catch((err) => {
        setErrSubmit(err.message);
        dispatch(setSnackbar(true, 'error', 'Data gagal ditambahkan.'));
      });
  };

  useEffect(() => {
    dispatch(getCabangs());
    dispatch(getKantorCabangs());
  }, []);

  return (
    <Page title="Tambah Kurir | Sarana Mulya">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Tambah Kurir</Typography>
        </Box>
        <Card sx={{ p: 5 }}>
          {cabang.loading || kantorCabang.loading ? <LoadingBox /> : null}
          {cabang.error || kantorCabang.error ? (
            <ErrorBox actions={[getCabangs, getKantorCabangs]} />
          ) : null}
          {cabang.cabangs.length > 0 &&
            kantorCabang.kantorCabangs.length > 0 &&
            // loading
            !cabang.loading &&
            !kantorCabang.loading &&
            // error
            !cabang.error &&
            !kantorCabang.error && (
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
                    Kurir/Driver Password <RedAsterisk />
                  </Typography>
                  <InputText
                    type="password"
                    name="kata_sandi"
                    label="Kurir/Driver Password"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Ulang Password <RedAsterisk />
                  </Typography>
                  <InputText
                    type="password"
                    name="konfirmasi_kata_sandi"
                    label="Ulang Password"
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
                  <Typography gutterBottom>No Telepon</Typography>
                  <InputText
                    name="no_telepon"
                    label="No Telepon"
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
                  <Typography gutterBottom>Kantor</Typography>
                  <InputDropdown
                    name="kantor"
                    label="Pilih Kantor..."
                    options={kodeKantorOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Area <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="area"
                    label="Pilih Area..."
                    options={exampleOptions}
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
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Kendaraan <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="kendaraan"
                    label="Pilih Kendaraan..."
                    options={kendaraanOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Status Kurir <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="status"
                    label="Pilih Status Kurir..."
                    options={statusOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Company ID</Typography>
                  <InputDropdown
                    name="company_id"
                    label="Pilih Company ID..."
                    options={exampleOptions}
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
                    to="/data-master/kurir"
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
