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
import Page from '../../../../components/Page';
import InputText from '../../../../components/form-components/InputText';
import InputDropdown from '../../../../components/form-components/InputDropdown';
import InputDate from '../../../../components/form-components/InputDate';
import RedAsterisk from '../../../../components/RedAsterisk';
import ErrorBox from '../../../../components/box/ErrorBox';
import LoadingBox from '../../../../components/box/LoadingBox';
// Json
import exampleOptions from '../../../../data/example.json';
import jenisKelaminOptions from '../../../../data/karyawan/jenisKelamin.json';
import statusPernikahanOptions from '../../../../data/karyawan/statusPernikahan.json';
import statusKaryawanOptions from '../../../../data/karyawan/statusKaryawan.json';
import statusOptions from '../../../../data/status.json';
// Actions
import { setSnackbar } from '../../../../redux/actions/snackbarAction';
import {
  getKaryawan,
  updateKaryawan,
  resetKaryawan
} from '../../../../redux/actions/karyawanAction';
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

export default function EditKaryawan() {
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

  const [errSubmit, setErrSubmit] = useState('');
  const { karyawan, error, loading } = useSelector((state) => state.karyawan);
  const cabang = useSelector((state) => state.cabang);
  const kantorCabang = useSelector((state) => state.kantorCabang);

  // Options
  const kodeCabangOptions = cabang.cabangs.map((cabang) => cabang.kode_cabang);
  const kodeKantorCabangOptions = kantorCabang.kantorCabangs.map(
    (kantorCabang) => kantorCabang.kode_kantor
  );

  const onSubmit = (data) => {
    // data.tanggal_lahir = moment(data.tanggal_lahir).format('DD-MM-YYYY');
    // data.tanggal_masuk_kerja = moment(data.tanggal_masuk_kerja).format(
    //   'DD-MM-YYYY'
    // );
    return dispatch(updateKaryawan(data, id))
      .then(() => {
        navigate('/data-master/karyawan');
        dispatch(setSnackbar(true, 'success', 'Data berhasil diubah.'));
      })
      .catch((err) => {
        setErrSubmit(err.message);
        dispatch(setSnackbar(true, 'error', 'Data gagal diubah.'));
      });
  };

  useEffect(() => {
    dispatch(resetKaryawan());
    dispatch(getKaryawan(id));
    dispatch(getCabangs());
    dispatch(getKantorCabangs());
  }, []);

  useEffect(() => {
    if (karyawan.length > 0) {
      setValue('kode_pekerjaan', karyawan[0].kode_pekerjaan || '');
      setValue('kode_departemen', karyawan[0].kode_departemen || '');
      setValue('kode_karyawan', karyawan[0].kode_karyawan || '');
      setValue('manager', karyawan[0].manager || '');
      setValue('nama_depan', karyawan[0].nama_depan || '');
      setValue('nama_tengah', karyawan[0].nama_tengah || '');
      setValue('nama_akhir', karyawan[0].nama_akhir || '');
      setValue('alamat', karyawan[0].alamat || '');
      setValue('cabang', karyawan[0].cabang || '');
      setValue('kantor', karyawan[0].kantor || '');
      setValue('kode_daerah', karyawan[0].kode_daerah || '');
      setValue('kode_tlc', karyawan[0].kode_tlc || '');
      setValue('tempat_lahir', karyawan[0].tempat_lahir || '');
      setValue('tanggal_lahir', new Date(karyawan[0].tanggal_lahir || ''));
      setValue(
        'tanggal_masuk_kerja',
        new Date(karyawan[0].tanggal_masuk_kerja || '')
      );
      setValue('jenis_kelamin', karyawan[0].jenis_kelamin || '');
      setValue('kode_pos', karyawan[0].kode_pos || '');
      setValue('status_pernikahan', karyawan[0].status_pernikahan || '');
      setValue('tanggungan', karyawan[0].tanggungan || '');
      setValue('pendidikan_terakhir', karyawan[0].pendidikan_terakhir || '');
      setValue('status_karyawan', karyawan[0].status_karyawan || '');
      setValue('deskripsi', karyawan[0].deskripsi || '');
      setValue('nama_istri', karyawan[0].nama_istri || '');
      setValue('nama_anak', karyawan[0].nama_anak || '');
      setValue('no_telepon', karyawan[0].no_telepon || '');
      setValue('email', karyawan[0].email || '');
      setValue('status', karyawan[0].status || '');
      setValue('foto', karyawan[0].foto || '');
    }
  }, [karyawan]);

  return (
    <Page title="Edit Karyawan | Sarana Mulya">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Ubah Karyawan</Typography>
        </Box>
        <Card sx={{ p: 5 }}>
          {loading || cabang.loading || kantorCabang.loading ? (
            <LoadingBox />
          ) : null}
          {error || cabang.error || kantorCabang.error ? (
            <ErrorBox
              idParam={id}
              actionWithParam={getKaryawan}
              actions={[getCabangs, getKantorCabangs]}
            />
          ) : null}
          {karyawan.length > 0 &&
            cabang.cabangs.length > 0 &&
            kantorCabang.kantorCabangs.length > 0 &&
            // loading
            !loading &&
            !cabang.loading &&
            !kantorCabang.loading &&
            // error
            !error &&
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
