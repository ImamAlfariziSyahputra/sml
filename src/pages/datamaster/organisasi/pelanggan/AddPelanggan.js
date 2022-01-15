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
import InputCheckbox from '../../../../components/form-components/InputCheckbox';
import InputRadio from '../../../../components/form-components/InputRadio';
import InputDate from '../../../../components/form-components/InputDate';
import RedAsterisk from '../../../../components/RedAsterisk';
import LoadingBox from '../../../../components/box/LoadingBox';
import ErrorBox from '../../../../components/box/ErrorBox';
// Json
import exampleOptions from '../../../../data/example.json';
import pilihanTransaksiOptions from '../../../../data/pelanggan/pilihanTransaksi.json';
import jenisPembayaranOptions from '../../../../data/pelanggan/jenisPembayaran.json';
import pembulatanKiloOptions from '../../../../data/pelanggan/pembulatanKilo.json';
// Actions
import { setSnackbar } from '../../../../redux/actions/snackbarAction';
import { addPelanggan } from '../../../../redux/actions/pelangganAction';
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
  kode_pelanggan: '',
  jenis_akun: '',
  cabang_asal: '',
  kantor_asal: '',
  kode_resi: '',
  jenis_industri: '',
  vendor_integration: '',
  pilihan_transaksi: [],
  pembulatan_kilo: '',
  diskon_pelanggan: '',
  logo_perusahaan: '',
  single_akun: '',
  pelanggan_nasional: '',
  kode_grup: '',
  distribusi_stok_awb: '',
  masa_efektif: new Date(),
  masa_berakhir: new Date(),
  nama_pelanggan: '',
  divisi: '',
  departemen: '',
  alamat: '',
  kota: '',
  kode_pos: '',
  telepon: '',
  no_fax: '',
  email: '',
  website: '',
  npwp: '',
  nppkp: '',
  nama_kontak: '',
  pekerjaan_kontak: '',
  telepon_kontak: '',
  email_kontak: '',
  periode_penagihan: '',
  top: '',
  penagihan_dengan_pod_balik: '',
  penagihan_dengan_email: '',
  jenis_pembayaran: [],
  no_virtual_account: '',
  hari_kerja: '',
  jam_kerja: '',
  penjemputan: '',
  jadwal_penjemputan: '',
  waktu_penjemputan: '',
  sales: '',
  periode_awal: new Date(),
  periode_akhir: new Date(),
  target_nilai: '',
  telepon_sales: '',
  email_sales: '',
  dibuat_oleh: '',
  diajukan_oleh: '',
  tanggal_dibuat: new Date()
};

const PHONE_NO_REGEX =
  /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;
const WEBSITE_REGEX =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const validationSchema = Yup.object({
  kode_pelanggan: Yup.string().required('Wajib diisi!'),
  jenis_akun: Yup.string().required('Wajib diisi!'),
  cabang_asal: Yup.string().required('Wajib diisi!'),
  kantor_asal: Yup.string().required('Wajib diisi!'),
  kode_resi: Yup.string().nullable(),
  jenis_industri: Yup.string().nullable(),
  vendor_integration: Yup.string().nullable(),
  pilihan_transaksi: Yup.array().min(1, 'Wajib Diisi!'),
  pembulatan_kilo: Yup.string().nullable(),
  diskon_pelanggan: Yup.string().nullable(),
  logo_perusahaan: Yup.string().nullable(),
  single_akun: Yup.string().required('Wajib diisi!'),
  pelanggan_nasional: Yup.string().required('Wajib diisi!'),
  kode_grup: Yup.string().nullable(),
  distribusi_stok_awb: Yup.string().nullable(),
  masa_efektif: Yup.date()
    .nullable()
    .transform((v, o) => (o === '' ? null : v))
    .typeError('Format Tanggal Salah!')
    .required('Wajib diisi!'),
  masa_berakhir: Yup.date()
    .nullable()
    .transform((v, o) => (o === '' ? null : v))
    .typeError('Format Tanggal Salah!')
    .required('Wajib diisi!'),
  nama_pelanggan: Yup.string().required('Wajib diisi!'),
  divisi: Yup.string().nullable(),
  departemen: Yup.string().nullable(),
  alamat: Yup.string().required('Wajib diisi!'),
  kota: Yup.string().nullable(),
  kode_pos: Yup.string().nullable(),
  telepon: Yup.string().matches(PHONE_NO_REGEX, {
    message: 'Nomor Telepon Tidak Valid!',
    excludeEmptyString: true //! false kalo Required
  }),
  no_fax: Yup.string().nullable(),
  email: Yup.string().email('Format Email Tidak Valid!').nullable(),
  website: Yup.string().matches(WEBSITE_REGEX, 'Enter correct url!').nullable(),
  npwp: Yup.string().nullable(),
  nppkp: Yup.string().nullable(),
  nama_kontak: Yup.string().nullable(),
  pekerjaan_kontak: Yup.string().nullable(),
  telepon_kontak: Yup.string().matches(PHONE_NO_REGEX, {
    message: 'Nomor Telepon Tidak Valid!',
    excludeEmptyString: true //! false kalo Required
  }),
  email_kontak: Yup.string().email('Format Email Tidak Valid!').nullable(),
  periode_penagihan: Yup.string().nullable(),
  top: Yup.string().nullable(),
  penagihan_dengan_pod_balik: Yup.string().nullable(),
  penagihan_dengan_email: Yup.string().nullable(),
  jenis_pembayaran: Yup.array().nullable(),
  no_virtual_account: Yup.string().required('Wajib diisi!'),
  hari_kerja: Yup.string().nullable(),
  jam_kerja: Yup.string().nullable(),
  penjemputan: Yup.string().nullable(),
  jadwal_penjemputan: Yup.string().nullable(),
  waktu_penjemputan: Yup.string().nullable(),
  sales: Yup.string().nullable(),
  periode_awal: Yup.date().typeError('Format Tanggal Salah!').nullable(),
  periode_akhir: Yup.date().typeError('Format Tanggal Salah!').nullable(),
  target_nilai: Yup.string().nullable(),
  telepon_sales: Yup.string().matches(PHONE_NO_REGEX, {
    message: 'Nomor Telepon Tidak Valid!',
    excludeEmptyString: true //! false kalo Required
  }),
  email_sales: Yup.string().email('Format Email Tidak Valid!').nullable(),
  dibuat_oleh: Yup.string().nullable(),
  diajukan_oleh: Yup.string().nullable(),
  tanggal_dibuat: Yup.date().typeError('Format Tanggal Salah!').nullable()
});

export default function AddPelanggan() {
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
    data.pilihan_transaksi = data.pilihan_transaksi
      .map((d) => JSON.stringify(d))
      .join();
    data.jenis_pembayaran = data.jenis_pembayaran
      .map((d) => JSON.stringify(d))
      .join();
    console.log('data => ', data);
    return dispatch(addPelanggan(data))
      .then(() => {
        navigate('/data-master/pelanggan');
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
    <Page title="Tambah Pelanggan | Sarana Mulya">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Tambah Pelanggan</Typography>
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
                    Cabang Asal <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="cabang_asal"
                    label="Pilih Cabang Asal..."
                    options={cabangOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Kantor Asal <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="kantor_asal"
                    label="Pilih Kantor Asal..."
                    options={cabangOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Kode Pelanggan <RedAsterisk />
                  </Typography>
                  <InputText
                    name="kode_pelanggan"
                    label="Kode Pelanggan..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Jenis Akun Pelanggan <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="jenis_akun"
                    label="Pilih Jenis Akun Pelanggan..."
                    options={cabangOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Kode Resi</Typography>
                  <InputDropdown
                    name="kode_resi"
                    label="Pilih Kode Resi..."
                    options={cabangOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Jenis Industri Pelanggan</Typography>
                  <InputDropdown
                    name="jenis_industri"
                    label="Pilih Jenis Industri Pelanggan..."
                    options={cabangOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Vendor Integration</Typography>
                  <InputDropdown
                    name="vendor_integration"
                    label="Pilih Vendor Integration..."
                    options={cabangOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Pilihan Transaksi Pelanggan
                    <RedAsterisk />
                  </Typography>
                  <InputCheckbox
                    name="pilihan_transaksi"
                    control={control}
                    options={pilihanTransaksiOptions}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Pembulatan Kilo</Typography>
                  <InputRadio
                    name="pembulatan_kilo"
                    control={control}
                    options={pembulatanKiloOptions}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography gutterBottom>Diskon Pelanggan</Typography>
                  <InputDropdown
                    name="diskon_pelanggan"
                    label="Diskon Pelanggan..."
                    control={control}
                    options={exampleOptions}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Upload Logo Pelanggan</Typography>
                  <InputDropdown
                    name="logo_perusahaan"
                    label="Pilih Upload Logo Pelanggan..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Single Akun <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="single_akun"
                    label="Pilih Single Akun..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Pelanggan Nasional <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="pelanggan_nasional"
                    label="Pilih Pelanggan Nasional..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Kode Grup Pelanggan</Typography>
                  <InputDropdown
                    name="kode_grup"
                    label="Pilih Kode Grup Pelanggan..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Distribusi Stok AWB</Typography>
                  <InputDropdown
                    name="distribusi_stok_awb"
                    label="Pilih Distribusi Stok AWB..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    Masa Aktif Pelanggan <RedAsterisk />
                  </Typography>
                  <InputDate name="masa_efektif" control={control} />
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    Masa Berakhir Pelanggan <RedAsterisk />
                  </Typography>
                  <InputDate name="masa_berakhir" control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Nama Pelanggan <RedAsterisk />
                  </Typography>
                  <InputText
                    name="nama_pelanggan"
                    label="Nama Pelanggan..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Divisi</Typography>
                  <InputText
                    name="divisi"
                    label="Divisi..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Departemen</Typography>
                  <InputText
                    name="departemen"
                    label="Departemen..."
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
                    Kota <RedAsterisk />
                  </Typography>
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
                    label="Kode Pos..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Telepon</Typography>
                  <InputText
                    type="number"
                    name="telepon"
                    label="Telepon..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>No Fax</Typography>
                  <InputText
                    name="no_fax"
                    label="No Fax..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Email</Typography>
                  <InputText name="email" label="Email..." control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Website</Typography>
                  <InputText
                    name="website"
                    label="Website..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>NPWP</Typography>
                  <InputText name="npwp" label="NPWP..." control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>NPPKP</Typography>
                  <InputText name="nppkp" label="NPPKP..." control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Nama Kontak</Typography>
                  <InputText
                    name="nama_kontak"
                    label="Nama Kontak..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Pekerjaan Kontak</Typography>
                  <InputText
                    name="pekerjaan_kontak"
                    label="Pekerjaan Kontak..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Telepon Kontak</Typography>
                  <InputText
                    name="telepon_kontak"
                    label="Telepon Kontak..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Email Kontak</Typography>
                  <InputText
                    name="email_kontak"
                    label="Email Kontak..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Periode Penagihan</Typography>
                  <InputDropdown
                    name="periode_penagihan"
                    label="Pilih Periode Penagihan..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Top</Typography>
                  <InputText name="top" label="Top..." control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Penagihan dengan POD Balik
                  </Typography>
                  <InputDropdown
                    name="penagihan_dengan_pod_balik"
                    label="Pilih Penagihan dengan POD Balik..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Penagihan dengan Email</Typography>
                  <InputDropdown
                    name="penagihan_dengan_email"
                    label="Pilih Penagihan dengan Email..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Jenis Pembayaran</Typography>
                  <InputCheckbox
                    name="jenis_pembayaran"
                    control={control}
                    options={jenisPembayaranOptions}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Nomor Virtual Account <RedAsterisk />
                  </Typography>
                  <InputText
                    name="no_virtual_account"
                    label="Nomor Virtual Account"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Hari Kerja</Typography>
                  <InputDropdown
                    name="hari_kerja"
                    label="Pilih Hari Kerja..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Jam Kerja</Typography>
                  <InputDropdown
                    name="jam_kerja"
                    label="Pilih Jam Kerja..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Penjemputan</Typography>
                  <InputDropdown
                    name="penjemputan"
                    label="Pilih Penjemputan..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Jadwal Penjemputan</Typography>
                  <InputDropdown
                    name="jadwal_penjemputan"
                    label="Pilih Jadwal Penjemputan..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Waktu Penjemputan</Typography>
                  <InputDropdown
                    name="waktu_penjemputan"
                    label="Pilih Waktu Penjemputan..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Sales</Typography>
                  <InputDropdown
                    name="sales"
                    label="Pilih Sales..."
                    options={exampleOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Periode Awal</Typography>
                  <InputDate name="periode_awal" control={control} />
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Periode Akhir</Typography>
                  <InputDate name="periode_akhir" control={control} />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Target Nilai</Typography>
                  <InputText
                    name="target_nilai"
                    label="Target Nilai..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Telepon Sales</Typography>
                  <InputText
                    type="number"
                    name="telepon_sales"
                    label="Telepon Sales..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Email Sales</Typography>
                  <InputText
                    name="email_sales"
                    label="Email Sales..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Dibuat Oleh</Typography>
                  <InputText
                    name="dibuat_oleh"
                    label="Dibuat Oleh..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Diajukan oleh</Typography>
                  <InputText
                    name="diajukan_oleh"
                    label="Diajukan oleh..."
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Tanggal Dibuat <RedAsterisk />
                  </Typography>
                  <InputDate name="tanggal_dibuat" control={control} />
                </Grid>
                <BtnWrapperGrid item xs={12}>
                  <Button
                    size="large"
                    variant="contained"
                    color="warning"
                    style={{ color: 'white' }}
                    component={Link}
                    to="/data-master/pelanggan"
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
