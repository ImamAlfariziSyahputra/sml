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
import InputDropdown from '../../../components/form-components/InputDropdown';
import RedAsterisk from '../../../components/RedAsterisk';
import ErrorBox from '../../../components/box/ErrorBox';
import LoadingBox from '../../../components/box/LoadingBox';
// Json
import akunIdOptions from '../../../data/pengguna/akunId.json';
import pegawaiIdOptions from '../../../data/pengguna/pegawaiId.json';
import multipleLoginOptions from '../../../data/pengguna/multipleLogin.json';
import companyIdOptions from '../../../data/pengguna/companyId.json';
// Actions
import { setSnackbar } from '../../../redux/actions/snackbarAction';
import {
  getPengguna,
  updatePengguna,
  resetPengguna
} from '../../../redux/actions/penggunaAction';
import { getCabangs } from '../../../redux/actions/cabangAction';
import { getKantorCabangs } from '../../../redux/actions/kantorCabangAction';
import { getGrupMenus } from '../../../redux/actions/grupMenuAction';

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
  kode_pengguna: '',
  nama_pengguna: '',
  // kata_sandi: '',
  // konfirmasi_kata_sandi: '',
  kode_cabang: '',
  kode_kantor: '',
  akun_id: '',
  pegawai_id: '',
  grup_pengguna: '',
  multiple_login: '',
  company_id: '',
  status: 'Tidak Aktif'
};

const validationSchema = Yup.object({
  kode_pengguna: Yup.string().required('Wajib diisi!'),
  nama_pengguna: Yup.string().required('Wajib diisi!'),
  // kata_sandi: Yup.string().required('Wajib diisi!'),
  // konfirmasi_kata_sandi: Yup.string()
  //   .oneOf([Yup.ref('kata_sandi'), ''], 'Konfirmasi kata sandi tidak cocok.')
  //   .required('Wajib diisi!'),
  kode_cabang: Yup.string().required('Wajib diisi!'),
  kode_kantor: Yup.string().required('Wajib diisi!'),
  akun_id: Yup.string().required('Wajib diisi!'),
  pegawai_id: Yup.string().nullable(),
  grup_pengguna: Yup.string().nullable(),
  multiple_login: Yup.string().nullable(),
  company_id: Yup.string().nullable()
});

export default function EditPengguna() {
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
  const { pengguna, error, loading } = useSelector((state) => state.pengguna);
  const cabang = useSelector((state) => state.cabang);
  const kantorCabang = useSelector((state) => state.kantorCabang);
  const grupMenu = useSelector((state) => state.grupMenu);

  // Options
  const kodeCabangOptions = cabang.cabangs.map((cabang) => cabang.kode_cabang);
  const kodeKantorCabangOptions = kantorCabang.kantorCabangs.map(
    (kantorCabang) => kantorCabang.kode_kantor
  );
  const grupMenuOptions = grupMenu.grupMenus.map(
    (grupMenu) => grupMenu.nama_grup
  );

  const onSubmit = (data) => {
    return dispatch(updatePengguna(data, id))
      .then(() => {
        navigate('/data-master');
        dispatch(setSnackbar(true, 'success', 'Data berhasil diubah.'));
      })
      .catch((err) => {
        setErrSubmit(err.message);
        dispatch(setSnackbar(true, 'error', 'Data gagal diubah.'));
      });
  };

  useEffect(() => {
    dispatch(resetPengguna());
    dispatch(getPengguna(id));
    dispatch(getCabangs());
    dispatch(getKantorCabangs());
    dispatch(getGrupMenus());
  }, []);

  // const fetchRequest = () => {
  //   console.log('aww => ');
  //   dispatch(resetPengguna());
  //   dispatch(getPengguna(id));
  //   dispatch(getCabangs());
  //   dispatch(getKantorCabangs());
  //   dispatch(getGrupMenus());
  // };

  useEffect(() => {
    if (pengguna.length > 0) {
      setValue('kode_pengguna', pengguna[0].kode_pengguna || '');
      setValue('nama_pengguna', pengguna[0].nama_pengguna || '');
      // setValue('kata_sandi', pengguna[0].kata_sandi || '');
      setValue('kode_cabang', pengguna[0].kode_cabang || '');
      setValue('kode_kantor', pengguna[0].kode_kantor || '');
      setValue('akun_id', pengguna[0].akun_id || '');
      setValue('pegawai_id', pengguna[0].pegawai_id || '');
      setValue('grup_pengguna', pengguna[0].grup_pengguna || '');
      setValue('multiple_login', pengguna[0].multiple_login || '');
      setValue('company_id', pengguna[0].company_id || '');
    }
  }, [pengguna]);

  return (
    <Page title="Edit Pengguna | Sarana Mulya">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Ubah Pengguna</Typography>
        </Box>
        <Card sx={{ p: 5 }}>
          {loading ||
          grupMenu.loading ||
          cabang.loading ||
          kantorCabang.loading ? (
            <LoadingBox />
          ) : null}
          {error || grupMenu.error || cabang.error || kantorCabang.error ? (
            <ErrorBox
              // onClick={fetchRequest}
              idParam={id}
              actionWithParam={getPengguna}
              actions={[getGrupMenus, getCabangs, getKantorCabangs]}
            />
          ) : null}
          {pengguna.length > 0 &&
            grupMenu.grupMenus.length > 0 &&
            cabang.cabangs.length > 0 &&
            kantorCabang.kantorCabangs.length > 0 &&
            // loading
            !loading &&
            !grupMenu.loading &&
            !cabang.loading &&
            !kantorCabang.loading &&
            // error
            !error &&
            !grupMenu.error &&
            !cabang.error &&
            !kantorCabang.error && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Kode Pengguna <RedAsterisk />
                  </Typography>
                  <InputText
                    name="kode_pengguna"
                    label="Kode Pengguna"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Nama Pengguna <RedAsterisk />
                  </Typography>
                  <InputText
                    name="nama_pengguna"
                    label="Nama Pengguna"
                    control={control}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <Typography gutterBottom>
                    Kata Sandi <RedAsterisk />
                  </Typography>
                  <InputText
                    type="password"
                    name="kata_sandi"
                    label="Kata Sandi"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Konfirmasi Kata Sandi <RedAsterisk />
                  </Typography>
                  <InputText
                    type="password"
                    name="konfirmasi_kata_sandi"
                    label="Konfirmasi kata sandi"
                    control={control}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Cabang Pengguna <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="kode_cabang"
                    label="Pilih cabang pengguna..."
                    options={kodeCabangOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Kantor Cabang <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="kode_kantor"
                    label="Pilih kantor cabang..."
                    options={kodeKantorCabangOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    ID Akun <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="akun_id"
                    label="Pilih ID akun..."
                    options={akunIdOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>ID Pegawai</Typography>
                  <InputDropdown
                    name="pegawai_id"
                    label="Pilih ID pegawai..."
                    options={pegawaiIdOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Grup Pengguna</Typography>
                  <InputDropdown
                    name="grup_pengguna"
                    label="Pilih grup pengguna..."
                    options={grupMenuOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Multiple Login</Typography>
                  <InputDropdown
                    name="multiple_login"
                    label="Pilih multiple login..."
                    options={multipleLoginOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>Company ID</Typography>
                  <InputDropdown
                    name="company_id"
                    label="Pilih ID company..."
                    options={companyIdOptions}
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
                    to="/data-master"
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
