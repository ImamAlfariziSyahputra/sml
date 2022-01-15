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
import jenisAkunVendorOptions from '../../../../data/vendor/jenisAkunVendor.json';
import modaVendorOptions from '../../../../data/vendor/modaVendor.json';
import exampleOptions from '../../../../data/example.json';
// Actions
import { setSnackbar } from '../../../../redux/actions/snackbarAction';
import { addVendor } from '../../../../redux/actions/vendorAction';
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
  kode_vendor: '',
  jenis_akun_vendor: '',
  moda_vendor: '',
  nama_vendor: '',
  alamat: '',
  kota: '',
  kode_pos: '',
  telepon: '',
  no_fax: '',
  email: '',
  website: '',
  npwp: '',
  nama_kontak: '',
  pekerjaan_kontak: '',
  telepon_kontak: '',
  email_kontak: ''
};

const PHONE_NO_REGEX =
  /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;
const WEBSITE_REGEX =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const validationSchema = Yup.object({
  cabang: Yup.string().required('Wajib diisi!'),
  kode_vendor: Yup.string().required('Wajib diisi!'),
  jenis_akun_vendor: Yup.string().required('Wajib diisi!'),
  moda_vendor: Yup.string().nullable(),
  nama_vendor: Yup.string().required('Wajib diisi!'),
  alamat: Yup.string().required('Wajib diisi!'),
  kota: Yup.string().nullable(),
  kode_pos: Yup.number()
    .positive('Angka Harus Positif!')
    .nullable()
    .transform((v, o) => (o === '' ? null : v)),
  telepon: Yup.string().matches(PHONE_NO_REGEX, {
    message: 'Nomor Telepon Tidak Valid!',
    excludeEmptyString: true //! false kalo Required
  }),
  no_fax: Yup.number()
    .positive('Angka Harus Positif!')
    .nullable()
    .transform((v, o) => (o === '' ? null : v)),
  email: Yup.string().email('Format Email tidak valid!').nullable(),
  website: Yup.string().matches(WEBSITE_REGEX, 'Enter correct url!').nullable(),
  npwp: Yup.string().nullable(),
  nama_kontak: Yup.string().nullable(),
  pekerjaan_kontak: Yup.string().nullable(),
  telepon_kontak: Yup.string().matches(PHONE_NO_REGEX, {
    message: 'Nomor Telepon Tidak Valid!',
    excludeEmptyString: true //! false kalo Required
  }),
  email_kontak: Yup.string().email('Format Email tidak valid!').nullable()
});

export default function AddVendor() {
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

  const cabangOptions = cabang.cabangs.map((cabang) => cabang.nama_cabang);

  const onSubmit = (data) => {
    // console.log('data => ', data);
    return dispatch(addVendor(data))
      .then(() => {
        navigate('/data-master/vendor');
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
    <Page title="Tambah Vendor | Sarana Mulya">
      <Container vendorth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Tambah Vendor</Typography>
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
                    options={cabangOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Kode Vendor <RedAsterisk />
                  </Typography>
                  <InputText
                    name="kode_vendor"
                    label="Pilih Kode Vendor..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Jenis Akun Vendor <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="jenis_akun_vendor"
                    label="Pilih Jenis Akun Vendor..."
                    options={jenisAkunVendorOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Moda Vendor</Typography>
                  <InputDropdown
                    name="moda_vendor"
                    label="Pilih Moda Vendor..."
                    options={modaVendorOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Nama Vendor <RedAsterisk />
                  </Typography>
                  <InputText
                    name="nama_vendor"
                    label="Nama Vendor"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Alamat <RedAsterisk />
                  </Typography>
                  <InputText
                    name="alamat"
                    label="Alamat"
                    multiline
                    rows={4}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Kota</Typography>
                  <InputDropdown
                    name="kota"
                    label="Pilih Kota..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Kode Pos</Typography>
                  <InputText
                    type="number"
                    name="kode_pos"
                    label="Kode Pos"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Telepon</Typography>
                  <InputText
                    type="number"
                    name="telepon"
                    label="Telepon"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>No. Fax</Typography>
                  <InputText
                    type="number"
                    name="no_fax"
                    label="No. Fax"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Email</Typography>
                  <InputText name="email" label="Email" control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Website</Typography>
                  <InputText name="website" label="Website" control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>NPWP</Typography>
                  <InputText name="npwp" label="NPWP" control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Nama Kontak</Typography>
                  <InputText
                    name="nama_kontak"
                    label="Nama Kontak"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Pekerjaan Kontak</Typography>
                  <InputText
                    name="pekerjaan_kontak"
                    label="Pekerjaan Kontak"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Telepon Kontak</Typography>
                  <InputText
                    name="telepon_kontak"
                    label="Telepon Kontak"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Email Kontak</Typography>
                  <InputText
                    name="email_kontak"
                    label="Email Kontak"
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
                    to="/data-master/vendor"
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
