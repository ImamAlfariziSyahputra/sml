import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';

import Pengguna from './pages/datamaster/pengguna/Pengguna';
import AddPengguna from './pages/datamaster/pengguna/AddPengguna';
import EditPengguna from './pages/datamaster/pengguna/EditPengguna';

import GrupMenu from './pages/datamaster/system/GrupMenu';
import AddGrupMenu from './pages/datamaster/system/AddGrupMenu';
import EditGrupMenu from './pages/datamaster/system/EditGrupMenu';

import Cabang from './pages/datamaster/organisasi/cabang/Cabang';
import AddCabang from './pages/datamaster/organisasi/cabang/AddCabang';
import EditCabang from './pages/datamaster/organisasi/cabang/EditCabang';

import KantorCabang from './pages/datamaster/organisasi/kantor-cabang/KantorCabang';
import AddKantorCabang from './pages/datamaster/organisasi/kantor-cabang/AddKantorCabang';
import EditKantorCabang from './pages/datamaster/organisasi/kantor-cabang/EditKantorCabang';

import Karyawan from './pages/datamaster/organisasi/karyawan/Karyawan';
import AddKaryawan from './pages/datamaster/organisasi/karyawan/AddKaryawan';
import EditKaryawan from './pages/datamaster/organisasi/karyawan/EditKaryawan';

// import CoverageArea from './pages/datamaster/organisasi/coverage-area/CoverageArea';
// import AddCoverageArea from './pages/datamaster/coverage-area/karyawan/AddCoverageArea';
// import EditCoverageArea from './pages/datamaster/coverage-area/karyawan/EditKaryawan';

import Kurir from './pages/datamaster/organisasi/kurir/Kurir';
import AddKurir from './pages/datamaster/organisasi/kurir/AddKurir';
import EditKurir from './pages/datamaster/organisasi/kurir/EditKurir';

import Helper from './pages/datamaster/organisasi/helper/Helper';
import AddHelper from './pages/datamaster/organisasi/helper/AddHelper';
import EditHelper from './pages/datamaster/organisasi/helper/EditHelper';

import Armada from './pages/datamaster/organisasi/armada/Armada';
import AddArmada from './pages/datamaster/organisasi/armada/AddArmada';
import EditArmada from './pages/datamaster/organisasi/armada/EditArmada';

import PicFaktur from './pages/datamaster/organisasi/pic-faktur/PicFaktur';
import AddPicFaktur from './pages/datamaster/organisasi/pic-faktur/AddPicFaktur';
import EditPicFaktur from './pages/datamaster/organisasi/pic-faktur/EditPicFaktur';

import Vendor from './pages/datamaster/organisasi/vendor/Vendor';
import AddVendor from './pages/datamaster/organisasi/vendor/AddVendor';
import EditVendor from './pages/datamaster/organisasi/vendor/EditVendor';

import Pelanggan from './pages/datamaster/organisasi/pelanggan/Pelanggan';
import AddPelanggan from './pages/datamaster/organisasi/pelanggan/AddPelanggan';
import EditPelanggan from './pages/datamaster/organisasi/pelanggan/EditPelanggan';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/data-master',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/data-master/pengguna" replace /> },
        // Pengguna
        { path: 'pengguna', element: <Pengguna /> },
        { path: 'add-pengguna', element: <AddPengguna /> },
        { path: 'edit-pengguna/:id', element: <EditPengguna /> },
        // Grup Menu
        { path: 'grup-menu', element: <GrupMenu /> },
        { path: 'add-grup-menu', element: <AddGrupMenu /> },
        { path: 'edit-grup-menu/:id', element: <EditGrupMenu /> },
        // Cabang
        { path: 'cabang', element: <Cabang /> },
        { path: 'add-cabang', element: <AddCabang /> },
        { path: 'edit-cabang/:id', element: <EditCabang /> },
        // Kantor Cabang
        { path: 'kantor-cabang', element: <KantorCabang /> },
        { path: 'add-kantor-cabang', element: <AddKantorCabang /> },
        { path: 'edit-kantor-cabang/:id', element: <EditKantorCabang /> },
        // Kantor Cabang
        { path: 'karyawan', element: <Karyawan /> },
        { path: 'add-karyawan', element: <AddKaryawan /> },
        { path: 'edit-karyawan/:id', element: <EditKaryawan /> },
        // Coverage Area
        // { path: 'coverage-area', element: <CoverageArea /> }
        // { path: 'add-coverage-area', element: <AddCoverageArea /> },
        // { path: 'edit-coverage-area/:id', element: <EditCoverageArea /> }
        // Kurir
        { path: 'kurir', element: <Kurir /> },
        { path: 'add-kurir', element: <AddKurir /> },
        { path: 'edit-kurir/:id', element: <EditKurir /> },
        // Helper
        { path: 'helper', element: <Helper /> },
        { path: 'add-helper', element: <AddHelper /> },
        { path: 'edit-helper/:id', element: <EditHelper /> },
        // Armada
        { path: 'armada', element: <Armada /> },
        { path: 'add-armada', element: <AddArmada /> },
        { path: 'edit-armada/:id', element: <EditArmada /> },
        // PicFaktur
        { path: 'pic-faktur', element: <PicFaktur /> },
        { path: 'add-pic-faktur', element: <AddPicFaktur /> },
        { path: 'edit-pic-faktur/:id', element: <EditPicFaktur /> },
        // Vendor
        { path: 'vendor', element: <Vendor /> },
        { path: 'add-vendor', element: <AddVendor /> },
        { path: 'edit-vendor/:id', element: <EditVendor /> },
        // Pelanggan
        { path: 'pelanggan', element: <Pelanggan /> },
        { path: 'add-pelanggan', element: <AddPelanggan /> },
        { path: 'edit-pelanggan/:id', element: <EditPelanggan /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
    // { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
