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
import jenisDokumenOptions from '../../../../data/pic-faktur/jenisDokumen.json';
// Actions
import { setSnackbar } from '../../../../redux/actions/snackbarAction';
import { addPicFaktur } from '../../../../redux/actions/picFakturAction';
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
  jenis_dokumen: '',
  penanggung_jawab: '',
  jabatan: '',
  cabang: '',
  kantor: ''
};

const validationSchema = Yup.object({
  jenis_dokumen: Yup.string().required('Wajib diisi!'),
  penanggung_jawab: Yup.string().required('Wajib diisi!'),
  jabatan: Yup.string().required('Wajib diisi!'),
  cabang: Yup.string().required('Wajib diisi!'),
  kantor: Yup.string().required('Wajib diisi!')
});

export default function AddPicFaktur() {
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
  const kantorCabangOptions = kantorCabang.kantorCabangs.map(
    (kantorCabang) => kantorCabang.nama_kantor
  );

  const onSubmit = (data) => {
    // console.log('data => ', data);
    return dispatch(addPicFaktur(data))
      .then(() => {
        navigate('/data-master/pic-faktur');
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
    <Page title="Tambah PIC Faktur | Sarana Mulya">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Tambah PIC Faktur</Typography>
        </Box>
        <Card sx={{ p: 5 }}>
          {cabang.loading || kantorCabang.loading ? <LoadingBox /> : null}
          {cabang.error || kantorCabang.error ? (
            <ErrorBox actions={[getCabangs, getKantorCabangs]} />
          ) : null}
          {kantorCabang.kantorCabangs.length > 0 &&
            cabang.cabangs.length > 0 &&
            // loading
            !kantorCabang.loading &&
            !cabang.loading &&
            // error
            !kantorCabang.error &&
            !cabang.error && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Jenis Dokumen <RedAsterisk />
                  </Typography>
                  <InputDropdown
                    name="jenis_dokumen"
                    label="Pilih Jenis Dokumen..."
                    options={jenisDokumenOptions}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Penanggung Jawab <RedAsterisk />
                  </Typography>
                  <InputText
                    name="penanggung_jawab"
                    label="Penanggung Jawab"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Jabatan <RedAsterisk />
                  </Typography>
                  <InputText name="jabatan" label="Jabatan" control={control} />
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
                    label="Pilih Kantor ..."
                    options={kantorCabangOptions}
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
                    to="/data-master/pic-faktur"
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
