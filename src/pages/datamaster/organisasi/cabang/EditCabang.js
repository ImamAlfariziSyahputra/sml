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
import jenisCabangOptions from '../../../../data/cabang/jenisCabang.json';
import provinsiOptions from '../../../../data/kantor-cabang/provinsi.json';
// Actions
import {
  getCabang,
  updateCabang,
  resetCabang
} from '../../../../redux/actions/cabangAction';
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

  const { cabang, error, loading } = useSelector((state) => state.cabang);
  const [errSubmit, setErrSubmit] = useState('');

  const onSubmit = (data) => {
    return dispatch(updateCabang(data, id))
      .then(() => {
        navigate('/data-master/cabang');
        dispatch(setSnackbar(true, 'success', 'Data berhasil diubah.'));
      })
      .catch((err) => {
        setErrSubmit(err.message);
        dispatch(setSnackbar(true, 'error', 'Data gagal diubah.'));
      });
  };

  useEffect(() => {
    dispatch(resetCabang());
    dispatch(getCabang(id));
  }, []);

  useEffect(() => {
    if (cabang.length > 0) {
      setValue('kode_cabang', cabang[0].kode_cabang || '');
      setValue('nama_cabang', cabang[0].nama_cabang || '');
      setValue('kode_region', cabang[0].kode_region || '');
      setValue('kode_provinsi', cabang[0].kode_provinsi || '');
      setValue('kode_iata', cabang[0].kode_iata || '');
      setValue('jenis_cabang', cabang[0].jenis_cabang || '');
    }
  }, [cabang]);

  return (
    <Page title="Ubah Cabang | Sarana Mulya">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Ubah Cabang</Typography>
        </Box>
        {/* {} */}
        <Card sx={{ p: 5 }}>
          {loading && <LoadingBox />}
          {error && <ErrorBox idParam={id} actionWithParam={getCabang} />}
          {cabang.length > 0 && !loading && !error && (
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
