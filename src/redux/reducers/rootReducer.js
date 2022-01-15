import { combineReducers } from 'redux';
import snackbarReducers from './SnackbarReducers';
import penggunaReducers from './PenggunaReducers';
import cabangReducers from './CabangReducers';
import kantorCabangReducers from './KantorCabangReducers';
import grupMenuReducers from './GrupMenuReducers';
import karyawanReducers from './KaryawanReducers';
import kurirReducers from './KurirReducers';
import helperReducers from './HelperReducers';
import armadaReducers from './ArmadaReducers';
import picFakturReducers from './PicFakturReducers';
import vendorReducers from './VendorReducers';
import pelangganReducers from './PelangganReducers';

const rootReducer = combineReducers({
  snackbar: snackbarReducers,
  pengguna: penggunaReducers,
  cabang: cabangReducers,
  kantorCabang: kantorCabangReducers,
  grupMenu: grupMenuReducers,
  karyawan: karyawanReducers,
  kurir: kurirReducers,
  helper: helperReducers,
  armada: armadaReducers,
  picFaktur: picFakturReducers,
  vendor: vendorReducers,
  pelanggan: pelangganReducers
});

export default rootReducer;
