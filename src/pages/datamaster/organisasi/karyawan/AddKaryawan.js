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
import InputDate from '../../../../components/form-components/InputDate';
import RedAsterisk from '../../../../components/RedAsterisk';
import LoadingBox from '../../../../components/box/LoadingBox';
import ErrorBox from '../../../../components/box/ErrorBox';
// Json
import exampleOptions from '../../../../data/example.json';
import jenisKelaminOptions from '../../../../data/karyawan/jenisKelamin.json';
import statusPernikahanOptions from '../../../../data/karyawan/statusPernikahan.json';
import statusKaryawanOptions from '../../../../data/karyawan/statusKaryawan.json';
import statusOptions from '../../../../data/status.json';
// Actions
import { setSnackbar } from '../../../../redux/actions/snackbarAction';
import { addKaryawan } from '../../../../redux/actions/karyawanAction';
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
  kode_pekerjaan: '',
  kode_departemen: '',
  kode_karyawan: '',
  manager: '',
  nama_depan: '',
  nama_tengah: '',
  nama_akhir: '',
  alamat: '',
  cabang: '',
  kantor: '',
  kode_daerah: '',
  kode_tlc: '',
  tempat_lahir: '',
  tanggal_lahir: new Date(),
  tanggal_masuk_kerja: new Date(),
  jenis_kelamin: '',
  kode_pos: '',
  status_pernikahan: '',
  tanggungan: '',
  pendidikan_terakhir: '',
  status_karyawan: '',
  deskripsi: '',
  nama_istri: '',
  nama_anak: '',
  no_telepon: '',
  email: '',
  status: '',
  foto: ''
};

const PHONE_NO_REGEX =
  /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;

const validationSchema = Yup.object({
  kode_pekerjaan: Yup.string().required('Wajib diisi!'),
  kode_departemen: Yup.string().required('Wajib diisi!'),
  kode_karyawan: Yup.string().required('Wajib diisi!'),
  manager: Yup.string().nullable(),
  nama_depan: Yup.string().required('Wajib diisi!'),
  nama_tengah: Yup.string().nullable(),
  nama_akhir: Yup.string().nullable(),
  alamat: Yup.string().required('Wajib diisi!'),
  cabang: Yup.string().required('Wajib diisi!'),
  kantor: Yup.string().required('Wajib diisi!'),
  kode_daerah: Yup.string().nullable(),
  kode_tlc: Yup.string().nullable(),
  tempat_lahir: Yup.string().required('Wajib diisi!'),
  tanggal_lahir: Yup.date().typeError('Format Tanggal Salah!'),
  tanggal_masuk_kerja: Yup.date().typeError('Format Tanggal Salah!'),
  jenis_kelamin: Yup.string().required('Wajib diisi!'),
  kode_pos: Yup.number()
    .positive('Angka Harus Positif!')
    .typeError('Wajib Diisi / Format Angka Salah'),
  status_pernikahan: Yup.string().required('Wajib diisi!'),
  tanggungan: Yup.string().nullable(),
  pendidikan_terakhir: Yup.string().required('Wajib diisi!'),
  status_karyawan: Yup.string().required('Wajib diisi!'),
  deskripsi: Yup.string().nullable(),
  nama_istri: Yup.string().nullable(),
  nama_anak: Yup.string().nullable(),
  no_telepon: Yup.string().matches(PHONE_NO_REGEX, {
    message: 'Nomor Telepon Tidak Valid!',
    excludeEmptyString: false //! false kalo Required
  }),
  email: Yup.string().email('Format email tidak valid!').nullable(),
  status: Yup.string().required('Wajib diisi!'),
  foto: Yup.string().nullable()
});

export default function AddKaryawan() {
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
  const kodeKantorCabangOptions = kantorCabang.kantorCabangs.map(
    (kantorCabang) => kantorCabang.kode_kantor
  );

  const onSubmit = (data) => {
    // data.tanggal_lahir = moment(data.tanggal_lahir).format('DD-MM-YYYY');
    // data.tanggal_masuk_kerja = moment(data.tanggal_masuk_kerja).format(
    //   'DD-MM-YYYY'
    // );
    console.log('data => ', data);
    return dispatch(addKaryawan(data))
      .then(() => {
        navigate('/data-master/karyawan');
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
    <Page title="Tambah Karyawan | Sarana Mulya">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Tambah Karyawan</Typography>
        </Box>
        <Card sx={{ p: 5 }}>
          {cabang.loading || kantorCabang.loading ? <LoadingBox /> : null}
          {cabang.error || kantorCabang.error ? (
            <ErrorBox actions={[getCabangs]} />
          ) : null}
          {cabang.cabangs.length > 0 &&
            !cabang.loading &&
            !kantorCabang.loading &&
            !cabang.error &&
            !kantorCabang.error && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    No. Identitas <RedAsterisk />
                  </Typography>
                  <InputText
                    name="kode_karyawan"
                    label="No. Identitas"
                    control={control}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    Kode Pekerjaan <RedAsterisk />
                  </Typography>
                  <InputText
                    name="kode_pekerjaan"
                    label="Kode Pekerjaan"
                    control={control}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    Kode Departemen <RedAsterisk />
                  </Typography>
                  <InputText
                    name="kode_departemen"
                    label="Kode Departemen"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Manager</Typography>
                  <InputDropdown
                    name="manager"
                    label="Pilih Manager..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography gutterBottom>
                    Nama Depan <RedAsterisk />
                  </Typography>
                  <InputText
                    name="nama_depan"
                    label="Nama Depan"
                    control={control}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography gutterBottom>Nama Tengah</Typography>
                  <InputText
                    name="nama_tengah"
                    label="Nama Tengah"
                    control={control}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography gutterBottom>Nama Akhir</Typography>
                  <InputText
                    name="nama_akhir"
                    label="Nama Akhir"
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
                    Kantor <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="kantor"
                    label="Pilih Kantor..."
                    options={kodeKantorCabangOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Kode Daerah</Typography>
                  <InputText
                    name="kode_daerah"
                    label="Kode Daerah"
                    control={control}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Kode TLC</Typography>
                  <InputText
                    name="kode_tlc"
                    label="Kode TLC"
                    control={control}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    Tempat Lahir <RedAsterisk />
                  </Typography>
                  <InputText
                    name="tempat_lahir"
                    label="Tempat Lahir"
                    control={control}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    Tanggal Lahir <RedAsterisk />
                  </Typography>
                  <InputDate name="tanggal_lahir" control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Tanggal Masuk Kerja <RedAsterisk />
                  </Typography>
                  <InputDate name="tanggal_masuk_kerja" control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Jenis Kelamin <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="jenis_kelamin"
                    label="Pilih Jenis Kelamin..."
                    options={jenisKelaminOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Kode Pos <RedAsterisk />
                  </Typography>
                  <InputText
                    type="number"
                    name="kode_pos"
                    label="Kode Pos"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Status Pernikahan <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="status_pernikahan"
                    label="Pilih Status Pernikahan..."
                    options={statusPernikahanOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Tanggungan</Typography>
                  <InputText
                    name="tanggungan"
                    label="Tanggungan"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Pendidikan Terakhir <RedAsterisk />
                  </Typography>
                  <InputText
                    name="pendidikan_terakhir"
                    label="Pendidikan Terakhir"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Status Karyawan <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="status_karyawan"
                    label="Pilih Status Karyawan..."
                    options={statusKaryawanOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Deskripsi</Typography>
                  <InputText
                    name="deskripsi"
                    label="Deskripsi"
                    multiline
                    rows={4}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Nama Istri</Typography>
                  <InputText
                    name="nama_istri"
                    label="Nama Istri"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Nama Anak</Typography>
                  <InputText
                    name="nama_anak"
                    label="Nama Anak"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    No Telepon <RedAsterisk />
                  </Typography>
                  <InputText
                    type="number"
                    name="no_telepon"
                    label="No Telepon"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Email</Typography>
                  <InputText name="email" label="Email" control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Status <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="status"
                    label="Pilih Status..."
                    options={statusOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Upload Foto Karyawan</Typography>
                  <InputText
                    name="foto"
                    label="Upload Foto Karyawan"
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
                    to="/data-master/karyawan"
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
