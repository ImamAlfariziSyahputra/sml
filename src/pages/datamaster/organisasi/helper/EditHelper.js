import React, { useEffect, useState } from 'react';
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
import LoadingBox from '../../../../components/box/LoadingBox';
import ErrorBox from '../../../../components/box/ErrorBox';
// Json
import tugasOptions from '../../../../data/kurir/tugas.json';
// Actions
import { setSnackbar } from '../../../../redux/actions/snackbarAction';
import {
  getHelper,
  updateHelper,
  resetHelper
} from '../../../../redux/actions/helperAction';
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
  kode_kurir: '',
  nama_kurir: '',
  cabang: '',
  tugas: ''
};

const validationSchema = Yup.object({
  kode_kurir: Yup.string().required('Wajib diisi!'),
  nama_kurir: Yup.string().required('Wajib diisi!'),
  cabang: Yup.string().required('Wajib diisi!'),
  tugas: Yup.string().required('Wajib diisi!')
});

export default function EditHelper() {
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

  const { helper, loading, error } = useSelector((state) => state.helper);
  const cabang = useSelector((state) => state.cabang);

  const kodeCabangOptions = cabang.cabangs.map((cabang) => cabang.kode_cabang);

  const onSubmit = (data) => {
    // console.log('data => ', data);
    return dispatch(updateHelper(data, id))
      .then(() => {
        navigate('/data-master/helper');
        dispatch(setSnackbar(true, 'success', 'Data berhasil diubah.'));
      })
      .catch((err) => {
        setErrSubmit(err.message);
        dispatch(setSnackbar(true, 'error', 'Data gagal diubah.'));
      });
  };

  useEffect(() => {
    dispatch(resetHelper());
    dispatch(getHelper(id));
    dispatch(getCabangs());
  }, []);

  useEffect(() => {
    if (helper.length > 0) {
      setValue('kode_kurir', helper[0].kode_kurir || '');
      setValue('nama_kurir', helper[0].nama_kurir || '');
      setValue('cabang', helper[0].cabang || '');
      setValue('tugas', helper[0].tugas || '');
    }
  }, [helper]);

  return (
    <Page title="Ubah Helper | Sarana Mulya">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Ubah Helper</Typography>
        </Box>
        <Card sx={{ p: 5 }}>
          {loading || cabang.loading ? <LoadingBox /> : null}
          {error || cabang.error ? (
            <ErrorBox
              idParam={id}
              actionWithParam={getHelper}
              actions={[getCabangs]}
            />
          ) : null}
          {helper.length > 0 &&
            cabang.cabangs.length > 0 &&
            // loading
            !helper.loading &&
            !cabang.loading &&
            // error
            !cabang.error &&
            !cabang.error && (
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
                    Nama Kurir <RedAsterisk />
                  </Typography>
                  <InputText
                    name="nama_kurir"
                    label="Nama Kurir"
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
                    Tugas <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="tugas"
                    label="Pilih Tugas..."
                    options={tugasOptions}
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
                    to="/data-master/helper"
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
