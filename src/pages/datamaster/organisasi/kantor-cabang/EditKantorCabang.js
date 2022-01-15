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
import RedAsterisk from '../../../../components/RedAsterisk';
import ErrorBox from '../../../../components/box/ErrorBox';
import LoadingBox from '../../../../components/box/LoadingBox';
// Json
import exampleOptions from '../../../../data/example.json';
import yesnoOptions from '../../../../data/yesno.json';
import tipeKantorOptions from '../../../../data/kantor-cabang/tipeKantor.json';
import provinsiOptions from '../../../../data/kantor-cabang/provinsi.json';
// Actions
import {
  getKantorCabang,
  updateKantorCabang,
  resetKantorCabang
} from '../../../../redux/actions/kantorCabangAction';
import { setSnackbar } from '../../../../redux/actions/snackbarAction';
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
  region: '',
  provinsi: '',
  cabang: '',
  tipe_kantor: '',
  ppn: '',
  kode_kantor: '',
  kode_kantor_terakhir: '',
  nama_kantor: '',
  nama_perusahaan: '',
  alamat: '',
  latitude: '',
  longitude: '',
  npwp: '',
  komisi: '',
  kode_pos: '',
  telepon: '',
  fax: '',
  email: '',
  nama_kepala_cabang: '',
  telepon_kepala_cabang: '',
  email_kepala_cabang: '',
  nama_pic_operasional: '',
  telepon_pic_operasional: '',
  email_pic_operasional: '',
  nama_pic_cs: '',
  telepon_pic_cs: '',
  email_pic_cs: '',
  nama_pic_billing: '',
  telepon_pic_billing: '',
  email_pic_billing: '',
  nama_pic_akunting: '',
  telepon_pic_akunting: '',
  email_pic_akunting: '',
  tipe_perusahaan: ''
};

const PHONE_NO_REGEX =
  /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;

const validationSchema = Yup.object({
  region: Yup.string().required('Wajib diisi!'),
  provinsi: Yup.string().nullable(),
  cabang: Yup.string().required('Wajib diisi!'),
  tipe_kantor: Yup.string().required('Wajib diisi!'),
  ppn: Yup.string().required('Wajib diisi!'),
  kode_kantor: Yup.string().required('Wajib diisi!'),
  kode_kantor_terakhir: Yup.string().nullable(),
  nama_kantor: Yup.string().required('Wajib diisi!'),
  nama_perusahaan: Yup.string().required('Wajib diisi!'),
  alamat: Yup.string().required('Wajib diisi!'),
  latitude: Yup.string().nullable(),
  longitude: Yup.string().nullable(),
  npwp: Yup.number()
    .positive('Angka Harus Positif')
    .typeError('Wajib Diisi / Format Angka Salah!'),
  komisi: Yup.number()
    .positive('Angka Harus Positif')
    .nullable()
    .transform((v, o) => (o === '' ? null : v)),
  kode_pos: Yup.number()
    .positive('Angka Harus Positif')
    .typeError('Wajib Diisi / Format Angka Salah!'),
  telepon: Yup.string()
    .matches(PHONE_NO_REGEX, {
      message: 'Nomor Telepon Tidak Valid!',
      excludeEmptyString: false
    })
    .required('Wajib diisi!'),
  fax: Yup.number()
    .positive('Angka Harus Positif')
    .typeError('Hanya dapat memasukkan angka!'),
  email: Yup.string().email('Format Email tidak valid!').nullable(),
  nama_kepala_cabang: Yup.string().required('Wajib diisi!'),
  telepon_kepala_cabang: Yup.string().matches(PHONE_NO_REGEX, {
    message: 'Nomor Telepon Tidak Valid!',
    excludeEmptyString: false
  }),
  email_kepala_cabang: Yup.string()
    .email('Format Email tidak valid!')
    .nullable(),
  nama_pic_operasional: Yup.string().required('Wajib diisi!'),
  telepon_pic_operasional: Yup.string().matches(PHONE_NO_REGEX, {
    message: 'Nomor Telepon Tidak Valid!',
    excludeEmptyString: true
  }),
  email_pic_operasional: Yup.string()
    .email('Format Email tidak valid!')
    .nullable(),
  nama_pic_cs: Yup.string().required('Wajib diisi!'),
  telepon_pic_cs: Yup.string().matches(PHONE_NO_REGEX, {
    message: 'Nomor Telepon Tidak Valid!',
    excludeEmptyString: true
  }),
  email_pic_cs: Yup.string().email('Format Email tidak valid!').nullable(),
  nama_pic_billing: Yup.string().required('Wajib diisi!'),
  telepon_pic_billing: Yup.string().matches(PHONE_NO_REGEX, {
    message: 'Nomor Telepon Tidak Valid!',
    excludeEmptyString: true
  }),
  email_pic_billing: Yup.string().email('Format Email tidak valid!').nullable(),
  nama_pic_akunting: Yup.string().required('Wajib diisi!'),
  telepon_pic_akunting: Yup.string().matches(PHONE_NO_REGEX, {
    message: 'Nomor Telepon Tidak Valid!',
    excludeEmptyString: true
  }),
  email_pic_akunting: Yup.string()
    .email('Format Email tidak valid!')
    .nullable(),
  tipe_perusahaan: Yup.string().required('Wajib diisi!')
});

export default function EditCabang() {
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
  const { kantorCabang, error, loading } = useSelector(
    (state) => state.kantorCabang
  );
  const cabang = useSelector((state) => state.cabang);

  // Options
  const kodeCabangOptions = cabang.cabangs.map((cabang) => cabang.kode_cabang);

  const onSubmit = (data) => {
    return dispatch(updateKantorCabang(data, id))
      .then(() => {
        navigate('/data-master/kantor-cabang');
        dispatch(setSnackbar(true, 'success', 'Data berhasil diubah.'));
      })
      .catch((err) => {
        setErrSubmit(err.message);
        dispatch(setSnackbar(true, 'error', 'Data gagal diubah.'));
      });
  };

  useEffect(() => {
    dispatch(resetKantorCabang());
    dispatch(getKantorCabang(id));
    dispatch(getCabangs());
  }, []);

  useEffect(() => {
    if (kantorCabang.length > 0) {
      setValue('kode_kantor', kantorCabang[0].kode_kantor || '');
      setValue('region', kantorCabang[0].region || '');
      setValue('provinsi', kantorCabang[0].provinsi || '');
      setValue('cabang', kantorCabang[0].cabang || '');
      setValue('tipe_kantor', kantorCabang[0].tipe_kantor || '');
      setValue('ppn', kantorCabang[0].ppn || '');
      setValue(
        'kode_kantor_terakhir',
        kantorCabang[0].kode_kantor_terakhir || ''
      );
      setValue('nama_kantor', kantorCabang[0].nama_kantor || '');
      setValue('nama_perusahaan', kantorCabang[0].nama_perusahaan || '');
      setValue('alamat', kantorCabang[0].alamat || '');
      setValue('latitude', kantorCabang[0].latitude || '');
      setValue('longitude', kantorCabang[0].longitude || '');
      setValue('npwp', kantorCabang[0].npwp || '');
      setValue('komisi', kantorCabang[0].komisi || '');
      setValue('kode_pos', kantorCabang[0].kode_pos || '');
      setValue('telepon', kantorCabang[0].telepon || '');
      setValue('fax', kantorCabang[0].fax || '');
      setValue('email', kantorCabang[0].email || '');
      setValue('nama_kepala_cabang', kantorCabang[0].nama_kepala_cabang || '');
      setValue(
        'telepon_kepala_cabang',
        kantorCabang[0].telepon_kepala_cabang || ''
      );
      setValue(
        'email_kepala_cabang',
        kantorCabang[0].email_kepala_cabang || ''
      );
      setValue(
        'nama_pic_operasional',
        kantorCabang[0].nama_pic_operasional || ''
      );
      setValue(
        'telepon_pic_operasional',
        kantorCabang[0].telepon_pic_operasional || ''
      );
      setValue(
        'email_pic_operasional',
        kantorCabang[0].email_pic_operasional || ''
      );
      setValue('nama_pic_cs', kantorCabang[0].nama_pic_cs || '');
      setValue('telepon_pic_cs', kantorCabang[0].telepon_pic_cs || '');
      setValue('email_pic_cs', kantorCabang[0].email_pic_cs || '');
      setValue('nama_pic_billing', kantorCabang[0].nama_pic_billing || '');
      setValue(
        'telepon_pic_billing',
        kantorCabang[0].telepon_pic_billing || ''
      );
      setValue('email_pic_billing', kantorCabang[0].email_pic_billing || '');
      setValue('nama_pic_akunting', kantorCabang[0].nama_pic_akunting || '');
      setValue(
        'telepon_pic_akunting',
        kantorCabang[0].telepon_pic_akunting || ''
      );
      setValue('email_pic_akunting', kantorCabang[0].email_pic_akunting || '');
      setValue('tipe_perusahaan', kantorCabang[0].tipe_perusahaan || '');
    }
  }, [kantorCabang]);

  return (
    <Page title="Ubah Kantor Cabang | Sarana Mulya">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Ubah Kantor Cabang</Typography>
        </Box>
        <Card sx={{ p: 5 }}>
          {loading || cabang.loading ? <LoadingBox /> : null}
          {error || cabang.error ? (
            <ErrorBox
              idParam={id}
              actionWithParam={getKantorCabang}
              actions={[getCabangs]}
            />
          ) : null}
          {kantorCabang.length > 0 &&
            cabang.cabangs.length > 0 &&
            // loading
            !cabang.loading &&
            !loading &&
            // error
            !cabang.error &&
            !error && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Region <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="region"
                    label="Pilih region cabang..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Provinsi</Typography>
                  <InputDropdown
                    name="provinsi"
                    label="Pilih provinsi cabang..."
                    options={provinsiOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Cabang <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="cabang"
                    label="Pilih cabang..."
                    options={kodeCabangOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Tipe Kantor <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="tipe_kantor"
                    label="Pilih tipe kantor..."
                    options={tipeKantorOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    PPN <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="ppn"
                    label="Pilih PPN..."
                    options={yesnoOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Kode Kantor <RedAsterisk />
                  </Typography>
                  <InputText
                    name="kode_kantor"
                    label="Kode Kantor"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Kode Kantor Terakhir</Typography>
                  <InputText
                    name="kode_kantor_terakhir"
                    label="Kode Kantor Terakhir"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Nama Kantor <RedAsterisk />
                  </Typography>
                  <InputText
                    name="nama_kantor"
                    label="Nama Kantor"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Nama Perusahaan <RedAsterisk />
                  </Typography>
                  <InputText
                    name="nama_perusahaan"
                    label="Nama Perusahaan"
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
                  <Typography gutterBottom>Posisi Latitude</Typography>
                  <InputText
                    name="latitude"
                    label="Latitude"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Posisi Longitude</Typography>
                  <InputText
                    name="longitude"
                    label="Longitude"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    NPWP <RedAsterisk />
                  </Typography>
                  <InputText
                    type="number"
                    name="npwp"
                    label="NPWP"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Komisi(%)</Typography>
                  <InputText
                    type="number"
                    name="komisi"
                    label="Komisi"
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
                    Telepon <RedAsterisk />
                  </Typography>
                  <InputText name="telepon" label="Telepon" control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Fax <RedAsterisk />
                  </Typography>
                  <InputText
                    type="number"
                    name="fax"
                    label="Fax"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Email</Typography>
                  <InputText name="email" label="Email" control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Nama Kepala Cabang <RedAsterisk />
                  </Typography>
                  <InputText
                    name="nama_kepala_cabang"
                    label="Nama Kepala Cabang"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Telepon Kepala Cabang <RedAsterisk />
                  </Typography>
                  <InputText
                    name="telepon_kepala_cabang"
                    label="Telepon Kepala Cabang"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Email Kepala Cabang</Typography>
                  <InputText
                    name="email_kepala_cabang"
                    label="Email Kepala Cabang"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Nama Pic Operasional <RedAsterisk />
                  </Typography>
                  <InputText
                    name="nama_pic_operasional"
                    label="Nama Pic Operasional"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Telepon Pic Operasional</Typography>
                  <InputText
                    name="telepon_pic_operasional"
                    label="Telepon Pic Operasional"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Email Kepala Operasional</Typography>
                  <InputText
                    name="email_pic_operasional"
                    label="Email Kepala Operasional"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Nama Pic CS <RedAsterisk />
                  </Typography>
                  <InputText
                    name="nama_pic_cs"
                    label="Nama Pic CS"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Telepon Pic CS</Typography>
                  <InputText
                    name="telepon_pic_cs"
                    label="Telepon Pic CS"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Email Pic CS</Typography>
                  <InputText
                    name="email_pic_cs"
                    label="Email Pic CS"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Nama Pic Billing <RedAsterisk />
                  </Typography>
                  <InputText
                    name="nama_pic_billing"
                    label="Nama Pic Billing"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Telepon Pic Billing</Typography>
                  <InputText
                    name="telepon_pic_billing"
                    label="Telepon Pic Billing"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Email Pic Billing</Typography>
                  <InputText
                    name="email_pic_billing"
                    label="Email Pic Billing"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Nama Pic Akunting <RedAsterisk />
                  </Typography>
                  <InputText
                    name="nama_pic_akunting"
                    label="Nama Pic Akunting"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Telepon Pic Akunting</Typography>
                  <InputText
                    name="telepon_pic_akunting"
                    label="Telepon Pic Akunting"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Email Pic Akunting</Typography>
                  <InputText
                    name="email_pic_akunting"
                    label="Email Pic Akunting"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Tipe Perusahaan <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="tipe_perusahaan"
                    label="Pilih tipe perusahaan..."
                    options={tipeKantorOptions}
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
                    to="/data-master/kantor-cabang"
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
