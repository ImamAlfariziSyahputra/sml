import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import cubeFill from '@iconify/icons-eva/cube-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Executive Information Summary',
    path: '/summarys',
    icon: getIcon(pieChart2Fill),
    children: [
      {
        title2: 'EIS',
        // title2: 'Executive Information Summary',
        path2: '/summary',
        icon2: getIcon(pieChart2Fill)
      },
      {
        title2: 'EISC',
        // title2: 'Executive Information Summary Customer',
        path2: '/summary/customer',
        icon2: getIcon(pieChart2Fill)
      },
      {
        title2: 'ESIS',
        // title2: 'Executive Sales Information Sales',
        path2: '/summary/sales',
        icon2: getIcon(pieChart2Fill)
      }
    ]
  },
  {
    title: 'Data Master',
    path: '/data-master',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Pengguna',
        path2: '/data-master/pengguna',
        icon2: getIcon(peopleFill),
        children2: [
          {
            title3: 'Pengguna',
            path3: '/data-master/pengguna'
          }
        ]
      },
      {
        title2: 'System',
        path2: '/data-master/system',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Grup Menu',
            path3: '/data-master/grup-menu'
          }
        ]
      },
      {
        title2: 'Organisasi',
        path2: '/data-master/organisasi',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Cabang',
            path3: '/data-master/cabang'
          },
          {
            title3: 'Kantor Cabang',
            path3: '/data-master/kantor-cabang'
          },
          {
            title3: 'Karyawan',
            path3: '/data-master/karyawan'
          },
          {
            title3: 'Coverage Area',
            path3: '/data-master/coverage-area'
          },
          {
            title3: 'Kurir / Driver',
            path3: '/data-master/kurir'
          },
          {
            title3: 'Helper',
            path3: '/data-master/helper'
          },
          {
            title3: 'Armada',
            path3: '/data-master/armada'
          },
          {
            title3: 'Penanggung Jawab Faktur',
            path3: '/data-master/pic-faktur'
          }
        ]
      },
      {
        title2: 'Vendor',
        path2: '/data-master/vendor',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Data Vendor',
            path3: '/data-master/vendor'
          }
        ]
      },
      {
        title2: 'Pelanggan',
        path2: '/data-master/pelanggan',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Data Pelanggan',
            path3: '/data-master/pelanggan'
          },
          {
            title3: 'Kontrak Pelanggan',
            path3: '/data-master/kontrak-pelanggan'
          }
        ]
      }
    ]
  },
  {
    title: 'Tarif',
    path: '/tarif',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Simulasi Tarif',
        path2: '/simulasi-tarif',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Simulasi Tarif Customer',
        path2: '/simulasi-tarif-customer',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Daftar Harga Publish',
        path2: '/daftar-harga-publish',
        icon2: getIcon(cubeFill)
      }
    ]
  },
  {
    title: 'Tracing (Lacak Pengiriman)',
    path: '/tracing',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Lacak Resi',
        path2: '/lacak-resi',
        icon2: getIcon(cubeFill)
      }
    ]
  },
  {
    title: 'Pick up',
    path: '/pick-up',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Pick up Order',
        path2: '/pick-up-order',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Pick up Order',
            path3: '/entri-pick-up-order'
          },
          {
            title3: 'Booking Pick up Order',
            path3: '/booking-pick-up-order'
          },
          {
            title3: 'Penugasan Pick up',
            path3: '/penugasan-pick-up'
          },
          {
            title3: 'Cetak Ulang Pick up Order',
            path3: '/cetak-ulang-pick-up-order'
          },
          {
            title3: 'Entri Pick up Order Pelanggan',
            path3: '/entri-pick-up-order-pelanggan'
          }
        ]
      },
      {
        title2: 'Missed Pick up',
        path2: '/missed-pick-up',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Missed Pick up',
            path3: '/entri-missed-pick-up'
          },
          {
            title3: 'Booking Missed Pick up',
            path3: '/booking-missed-pick-up'
          },
          {
            title3: 'Cetak Ulang Missed Pick up',
            path3: '/cetak-ulang-missed-pick-up'
          },
          {
            title3: 'Pembatalan Missed Pick up',
            path3: '/pembatalan-missed-pick-up'
          }
        ]
      },
      {
        title2: 'Pick up Confirmation',
        path2: '/pick-up-confirmation',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Pick up Confirmation',
            path3: '/entri-pick-up-confirmation'
          },
          {
            title3: 'Booking Pick up Confirmation',
            path3: '/booking-pick-up-confirmation'
          },
          {
            title3: 'Cetak Ulang Pick up Confirmation',
            path3: '/cetak-ulang-pick-up-confirmation'
          }
        ]
      },
      {
        title2: 'Laporan Pick up',
        path2: '/laporan-pick-up',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Laporan Pick up Order Harian',
            path3: '/laporan-pick-up-order-harian'
          },
          {
            title3: 'Laporan Pick up Confirmation Harian',
            path3: '/laporan-pick-up-confirmation-harian'
          },
          {
            title3: 'Laporan Missed Pick up',
            path3: '/laporan-missed-pick-up'
          }
        ]
      }
    ]
  },
  {
    title: 'Pick up Runsheet',
    path: '/pick-up-runsheet',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Pick up Request Runsheet',
        path2: '/pick-up-request-runsheet',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Pick up Runsheet',
            path3: '/entri-pick-up-runsheet'
          },
          {
            title3: 'Booking Pick up Runsheet',
            path3: '/booking-pick-up-runsheet'
          },
          {
            title3: 'Cetak Ulang Pick up Runsheet',
            path3: '/cetak-ulang-pick-up-runsheet'
          },
          {
            title3: 'Batalkan Pick up Runsheet',
            path3: '/batalkan-pick-up-runsheet'
          },
          {
            title3: 'Penugasan Pick up Runsheet',
            path3: '/penugasan-pick-up-runsheet'
          }
        ]
      }
    ]
  },
  {
    title: 'Entri Data Resi (POS)',
    path: '/entri-data-resi',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Entri Resi Domestic',
        path2: '/entri-resi-domestic',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Resi Cash Domestic',
            path3: '/resi-cash-domestic'
          },
          {
            title3: 'Resi Credit Domestic',
            path3: '/resi-credit-domestic'
          },
          {
            title3: 'Resi COD Domestic',
            path3: '/resi-cod-domestic'
          },
          {
            title3: 'Cetak Ulang Resi Domestic',
            path3: '/cetak-ulang-resi-domestic'
          },
          {
            title3: 'Batalkan Resi Domestic',
            path3: '/batalkan-resi-domestic'
          },
          {
            title3: 'Booking Resi Domestic',
            path3: '/booking-resi-domestic'
          }
        ]
      },
      {
        title2: 'Entri Resi Project',
        path2: '/entri-resi-project',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Resi Cash Project',
            path3: '/resi-cash-project'
          },
          {
            title3: 'Resi Credit Project',
            path3: '/resi-credit-project'
          },
          {
            title3: 'Resi COD Project',
            path3: '/resi-cod-project'
          },
          {
            title3: 'Cetak Ulang Resi Project',
            path3: '/cetak-ulang-resi-project'
          },
          {
            title3: 'Batalkan Resi Project',
            path3: '/batalkan-resi-project'
          },
          {
            title3: 'Booking Resi Project',
            path3: '/booking-resi-project'
          }
        ]
      },
      {
        title2: 'Entri Resi House Mall',
        path2: '/entri-resi-house-mall',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Resi House Mall',
            path3: '/resi-house-mall'
          },
          {
            title3: 'Cetak Ulang Resi House Mall',
            path3: '/cetak-ulang-resi-house-mall'
          },
          {
            title3: 'Batalkan Resi House Mall',
            path3: '/batalkan-resi-house-mall'
          },
          {
            title3: 'Booking Resi House Mall',
            path3: '/booking-resi-house-mall'
          }
        ]
      },
      {
        title2: 'Entri Resi Trucking',
        path2: '/entri-resi-trucking',
        icon2: getIcon(cubeFill)
        // children2: [
        //   {
        //     title3: '',
        //     path3: ''
        //   }
        // ]
      },
      {
        title2: 'Rest API',
        path2: '/rest-api',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Booking Rest API Shipment',
            path3: '/booking-rest-api-shipment'
          }
        ]
      }
    ]
  },
  {
    title: 'Cash Register',
    path: '/cash-register',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Generate Cash Register',
        path2: '/generate-cash-register',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Cetak ulang Cash Register',
        path2: '/cetak-ulang-cash-register',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Pembatalan Cash Register',
        path2: '/pembatalan-cash-register',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Laporan',
        path2: '/laporan',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Laporan Outstanding Cash Register',
            path3: '/laporan-outstanding-cash-register'
          }
        ]
      }
    ]
  },
  {
    title: 'Laporan Transaksi',
    path: '/laporan-transaksi',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Lap Transaksi Harian Rinci',
        path2: '/lap-transaksi-harian-rinci',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Lap Cash Register',
        path2: '/lap-cash-register',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Lap Transaksi Harian Global',
        path2: '/lap-transaksi-harian-global',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Lap Cetak Ulang Resi',
        path2: '/lap-cetak-ulang-resi',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Lap Data Transaksi',
        path2: '/lap-data-transaksi',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Lap Pengembalian Barang',
        path2: '/lap-pengembalian-barang',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Lap Hasil Pengantaran',
        path2: '/lap-hasil-pengantaran',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Laporan Jatuh Tempo',
        path2: '/laporan-jatuh-tempo',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Laporan Outstanding Resi Journal',
        path2: '/laporan-outstanding-resi-jurnal',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Laporan Penjualan vs Piutang',
        path2: '/laporan-penjualan-vs-piutang',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Laporan Konsolidasi Data Vendor',
        path2: '/laporan-konsolidasi-data-vendor',
        icon2: getIcon(cubeFill)
      }
    ]
  },
  {
    title: 'Outgoing',
    path: '/outgoing',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Generate Shipping Bag',
        path2: '/generate-shipping-bag',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Generate Shipping Bag',
            path3: '/generate-shipping-bag'
          },
          {
            title3: 'Daftar Shipping Bag',
            path3: '/daftar-shipping-bag'
          },
          {
            title3: 'Cetak Ulang Shipping Bag',
            path3: '/cetak-ulang-shipping-bag'
          }
        ]
      },
      {
        title2: 'Outgoing',
        path2: '/outgoing',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Outgoing',
            path3: '/entri-outgoing'
          },
          {
            title3: 'Cetak Ulang Outgoing',
            path3: '/cetak-ulang-outgoing'
          },
          {
            title3: 'Pembatalan Outgoing',
            path3: '/pembatalan-outgoing'
          },
          {
            title3: 'Booking Outgoing',
            path3: '/booking-outgoing'
          }
        ]
      },
      {
        title2: 'Outgoing Consol',
        path2: '/outgoing-consol',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Outgoing Konsul',
            path3: '/entri-outgoing-konsul'
          },
          {
            title3: 'Cetak Ulang Outgoing Konsul',
            path3: '/cetak-ulang-outgoing-konsul'
          },
          {
            title3: 'Pembatalan Outgoing Konsul',
            path3: '/pembatalan-outgoing-konsul'
          },
          {
            title3: 'Booking Outgoing Konsul',
            path3: '/booking-outgoing-konsul'
          }
        ]
      },
      {
        title2: 'Laporan Outgoing',
        path2: '/laporan-outgoing',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Laporan Outstanding Outgoing',
            path3: '/laporan-outstanding-outgoing'
          },
          {
            title3: 'Laporan Outgoing',
            path3: '/laporan-outgoing'
          },
          {
            title3: 'Laporan Barang Titipan',
            path3: '/laporan-barang-titipan'
          },
          {
            title3: 'Laporan Rekap Disbag Manifest',
            path3: '/laporan-rekap-disbag-manifest'
          }
        ]
      }
    ]
  },
  {
    title: 'Transit',
    path: '/transit',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Penerimaan Transit',
        path2: '/penerimaan-transit',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Penerimaan Transit',
            path3: '/entri-penerimaan-transit'
          },
          {
            title3: 'Ubah Penerimaan Transit',
            path3: '/ubah-penerimaan-transit'
          },
          {
            title3: 'Pembatalan Penerimaan Transit',
            path3: '/pembatalan-penerimaan-transit'
          },
          {
            title3: 'Cetak Ulang Penerimaan Transit',
            path3: '/cetak-ulang-penerimaan-transit'
          }
        ]
      },
      {
        title2: 'Laporan Penerimaan Transit',
        path2: '/laporan-penerimaan-transit',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Laporan Harian Penerimaan Transit',
            path3: '/laporan-harian-penerimaan-transit'
          }
        ]
      },
      {
        title2: 'Transit',
        path2: '/transit',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Transit',
            path3: '/entri-transit'
          },
          {
            title3: 'Pembatalan Transit',
            path3: '/pembatalan-transit'
          },
          {
            title3: 'Cetak Ulang Transit',
            path3: '/cetak-ulang-transit'
          },
          {
            title3: 'Daftar Transit',
            path3: '/daftar-transit'
          }
        ]
      },
      {
        title2: 'Laporan Transit',
        path2: '/laporan-transit',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Laporan Harian Transit',
            path3: '/laporan-harian-transit'
          },
          {
            title3: 'Laporan Outstanding Transit',
            path3: '/laporan-outstanding-transit'
          }
        ]
      }
    ]
  },
  {
    title: 'Incoming',
    path: '/incoming',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Incoming',
        path2: '/incoming',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Incoming',
            path3: '/entri-incoming'
          },
          {
            title3: 'Batal / Tunda Incoming',
            path3: '/batal-tunda-incoming'
          },
          {
            title3: 'Daftar Incoming',
            path3: '/daftar-incoming'
          },
          {
            title3: 'Cetak Ulang Incoming',
            path3: '/cetak-ulang-incoming'
          }
        ]
      },
      {
        title2: 'Laporan',
        path2: '/laporan',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Laporan Harian Incoming',
            path3: '/laporan-harian-incoming'
          },
          {
            title3: 'Laporan Outstanding Incoming',
            path3: '/laporan-outstanding-incoming'
          }
        ]
      }
    ]
  },
  {
    title: 'Delivery',
    path: '/delivery',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Delivery',
        path2: '/delivery',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Delivery',
            path3: '/entri-delivery'
          },
          {
            title3: 'Booking Delivery',
            path3: '/booking-delivery'
          },
          {
            title3: 'Batal Delivery',
            path3: '/batal-delivery'
          },
          {
            title3: 'Cetak Ulang Delivery',
            path3: '/cetak-ulang-delivery'
          }
        ]
      },
      {
        title2: 'Delivery Sub Resi',
        path2: '/delivery-sub-resi',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Delivery Sub Resi',
            path3: '/entri-delivery-sub-resi'
          },
          {
            title3: 'Booking Delivery Sub Resi',
            path3: '/booking-delivery-sub-resi'
          },
          {
            title3: 'Batal Delivery Sub Resi',
            path3: '/batal-delivery-sub-resi'
          },
          {
            title3: 'Cetak Ulang Delivery Sub Resi',
            path3: '/cetak-ulang-delivery-sub-resi'
          }
        ]
      },
      {
        title2: 'Delivery Vendor',
        path2: '/delivery-vendor',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Delivery Vendor',
            path3: '/entri-delivery-vendor'
          },
          {
            title3: 'Booking Delivery Vendor',
            path3: '/booking-delivery-vendor'
          },
          {
            title3: 'Batal Delivery Vendor',
            path3: '/batal-delivery-vendor'
          },
          {
            title3: 'Cetak Ulang Delivery Vendor',
            path3: '/cetak-ulang-delivery-vendor'
          }
        ]
      },
      {
        title2: 'Konfirmasi Delivery',
        path2: '/konfirmasi-delivery',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Laporan',
        path2: '/laporan',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Laporan Delivery Record',
            path3: '/laporan-delivery-record'
          },
          {
            title3: 'Laporan Outstanding Delivery Record',
            path3: '/laporan-outstanding-delivery-record'
          }
        ]
      }
    ]
  },
  {
    title: 'POD',
    path: '/pod',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Entri Delivery Status',
        path2: '/entri-delivery-status',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Delivery Status',
            path3: '/entri-delivery-status'
          },
          {
            title3: 'Entri Delivery Take Away',
            path3: '/entri-delivery-take-away'
          },
          {
            title3: 'Entri Delivery Status By Resi',
            path3: '/entri-delivery-status-by-resi'
          }
        ]
      },
      {
        title2: 'Laporan POD',
        path2: '/laporan-pod',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Laporan POD',
            path3: '/laporan-pod'
          }
        ]
      },
      {
        title2: 'POD Balik',
        path2: '/pod-balik',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri POD Balik',
            path3: '/entri-pod-balik'
          },
          {
            title3: 'Daftar POD Balik',
            path3: '/daftar-pod-balik'
          },
          {
            title3: 'Cetak Ulang POD Balik',
            path3: '/cetak-ulang-pod-balik'
          },
          {
            title3: 'Batal POD Balik',
            path3: '/batal-pod-balik'
          },
          {
            title3: 'Penerimaan POD Balik',
            path3: '/penerimaan-pod-balik'
          }
        ]
      }
    ]
  },
  {
    title: 'AP (Utang)',
    path: '/ap',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Verifikasi Biaya Angkut dan Pengantaran',
        path2: '/verifikasi-biaya-angkut-dan-pengantaran',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Verifikasi Biaya Surat Muatan',
            path3: '/verifikasi-biaya-surat-muatan'
          },
          {
            title3: 'Verifikasi POD & Biaya Vendor Pengantaran Massal',
            path3: '/verifikasi-pod-dan-biaya-vendor-pengantaran-massal'
          },
          {
            title3: 'Verifikasi POD & Biaya Vendor Pengantaran',
            path3: '/verifikasi-pod-dan-biaya-vendor-pengantaran'
          },
          {
            title3: 'Verifikasi POD & Biaya Cabang Pengantaran',
            path3: '/verifikasi-pod-dan-biaya-cabang-pengantaran'
          },
          {
            title3: 'Verifikasi POD & Biaya Cabang Pengantaran By Connote',
            path3: '/verifikasi-pod-dan-biaya-cabang-pengantaran-by-connote'
          }
        ]
      },
      {
        title2: 'Invoice Register Vendor',
        path2: '/invoice-register-vendor',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Invoice Register Surat Muatan',
            path3: '/invoice-register-surat-muatan'
          },
          {
            title3: 'Invoice Register Register Vendor Pengantaran',
            path3: '/invoice-register-register-vendor-pengantaran'
          }
        ]
      },
      {
        title2: 'Pembayaran Invoice Register Vendor',
        path2: '/pembayaran-invoice-register-vendor',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Pembayaran Invoice Register',
            path3: '/pembayaran-invoice-register'
          },
          {
            title3: 'daftar Pembayaran Invoice Register',
            path3: '/daftar-pembayaran-invoice-register'
          }
        ]
      },
      {
        title2: 'Laporan Data Vendor',
        path2: '/laporan-data-vendor',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Laporan Data Vendor Pengantaran',
            path3: '/laporan-data-vendor-pengantaran'
          }
        ]
      }
    ]
  },
  {
    title: 'Surat Muatan',
    path: '/surat-muatan',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Surat Muatan',
        path2: '/surat-muatan',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Surat Muatan',
            path3: '/entri surat-muatan'
          },
          {
            title3: 'Daftar Surat Muatan',
            path3: '/daftar surat-muatan'
          },
          {
            title3: 'Cetak Ulang Surat Muatan',
            path3: '/cetak-ulang surat-muatan'
          }
        ]
      }
    ]
  },
  {
    title: 'AR (Piutang)',
    path: '/ar',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Pelunasan Cash Register',
        path2: '/pelunasan-cash-register',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Pelunasan Cash Register - Cash',
            path3: '/entri-pelunasan-cash-register-cash'
          },
          {
            title3: 'Entri Pelunasan Cash Register - Bank',
            path3: '/entri-pelunasan-cash-register-bank'
          },
          {
            title3: 'Cetak Ulang Pelunasan Outlet',
            path3: '/cetak-ulang-pelunasan-outlet'
          },
          {
            title3: 'Kartu Piutang Outlet',
            path3: '/kartu-piutang-outlet'
          }
        ]
      },
      {
        title2: 'Laporan Data Pelanggan',
        path2: '/laporan-data-pelanggan',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Posting Laporan Data Pelanggan',
            path3: '/posting-laporan-data-pelanggan'
          },
          {
            title3: 'Daftar (List) Laporan Data Pelanggan',
            path3: '/daftar-list-laporan-data-pelanggan'
          },
          {
            title3: 'Batalkan Laporan Data Pelanggan',
            path3: '/batalkan-laporan-data-pelanggan'
          },
          {
            title3: 'Laporan "Data Pelanggan LDP" - Pusat',
            path3: '/laporan-data-pelanggan-ldp-pusat'
          },
          {
            title3: 'Rubah Akun Pelanggan Resi',
            path3: '/rubah-akun-pelanggan-resi-pelanggan'
          }
        ]
      },
      {
        title2: 'Invoice',
        path2: '/invoice',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Generate Draft Invoice',
            path3: '/generate-draft-invoice'
          },
          {
            title3: 'Cetak Draft Invoice',
            path3: '/cetak-draft-invoice'
          },
          {
            title3: 'Cetak Invoice',
            path3: '/cetak-invoice'
          },
          {
            title3: 'Batalkan Invoice',
            path3: '/batalkan-invoice'
          },
          {
            title3: 'Batalkan Draft Invoice',
            path3: '/batalkan-draft-invoice'
          },
          {
            title3: 'Laporan Invoice',
            path3: '/laporan-invoice'
          },
          {
            title3: 'Laporan Invoice Kolektor',
            path3: '/laporan invoice kolektor'
          },
          {
            title3: 'Laporan Konfirmasi Piutang',
            path3: '/laporan-konfirmasi-piutang'
          }
        ]
      },
      {
        title2: 'Pelunasan Credit',
        path2: '/pelunasan-credit',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Pelunasan Bank',
            path3: '/entri-pelunasan-bank'
          },
          {
            title3: 'Entri Pelunasan Kas',
            path3: '/entri-pelunasan-kas'
          },
          {
            title3: 'Laporan Pelunasan Invoice',
            path3: '/laporan-pelunasan-invoice'
          },
          {
            title3: 'Batalkan Pelunasan Invoice',
            path3: '/batalkan-pelunasan-invoice'
          }
        ]
      },
      {
        title2: 'Collector Management',
        path2: '/collector-management',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Delivery Sheet Invoice',
            path3: '/delivery-sheet-invoice'
          },
          {
            title3: 'POD Invoice',
            path3: '/pod-invoice'
          }
        ]
      }
    ]
  },
  {
    title: 'Penyetoran COD',
    path: '/penyetoran-cod',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Penyetoran COD Kurir ke Kasir',
        path2: '/penyetoran-cod-kurir-ke-kasir',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Entri Penyetoran COD Kurir ke Kasir',
            path3: '/entri-penyetoran-cod-kurir-ke-kasir'
          },
          {
            title3: 'Cetak Ulang Penyetoran COD Kurir ke Kasir',
            path3: '/cetak-ulang-penyetoran-cod-kurir-ke-kasir'
          },
          {
            title3: 'Pembatalan Penyetoran COD Kurir ke Kasir',
            path3: '/pembatalan-penyetoran-cod-kurir-ke-kasir'
          },
          {
            title3: 'Laporan',
            path3: '/laporan'
          }
        ]
      },
      {
        title2: 'Penyetoran COD Cabang ke Pusat',
        path2: '/penyetoran-cod-cabang-ke-pusat',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: 'Konfirmasi Penyetoran COD Cabang ke Pusat',
            path3: '/konfirmasi-penyetoran-cod-cabang-ke-pusat'
          },
          {
            title3: 'Laporan',
            path3: '/laporan'
          }
        ]
      }
    ]
  },
  {
    title: 'Informasi',
    path: '/informasi',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Cetak Ulang Resi Dometic V2',
        path2: '/cetak-ulang-resi-dometic-v2',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Cetak Ulang Resi House Mall V2',
        path2: '/cetak-ulang-resi-house-mall-v2',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Cetak Ulang Resi Project V2',
        path2: '/cetak-ulang-resi-project-v2',
        icon2: getIcon(cubeFill)
      }
    ]
  },
  {
    title: 'Helpdesk Tools',
    path: '/helpdesk-tools',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: 'Rubah Alamat',
        path2: '/rubah-alamat',
        icon: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Keterangan Barang',
        path2: '/rubah-keterangan-barang',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Layanan',
        path2: '/rubah-layanan',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Destinasi',
        path2: '/rubah-destinasi',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Tanggal',
        path2: '/rubah-tanggal',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Berat',
        path2: '/rubah-berat',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Akun',
        path2: '/rubah-akun',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Transaksi Cash ke Credit',
        path2: '/rubah-transaksi-cash-ke-credit',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Status POD',
        path2: '/rubah-status-pod',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Biaya Kirim',
        path2: '/rubah-biaya-kirim',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Biaya Tambahan',
        path2: '/rubah-biaya-tambahan',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Nama Penerima',
        path2: '/rubah-nama-penerima',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Nama Pengirim',
        path2: '/rubah-nama-pengirim',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Alamat Pengirim',
        path2: '/rubah-alamat-pengirim',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Tracking Penggunaan Helpdesk Tools',
        path2: '/rubah',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Transaksi Credit ke COD',
        path2: '/rubah-transaksi-credit-ke-cod',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Rubah Asuransi',
        path2: '/rubah-asuransi',
        icon2: getIcon(cubeFill)
      },
      {
        title2: 'Laporan Penggunaan Helpdesk Tools',
        path2: '/laporan-penggunaan-helpdesk-tools',
        icon2: getIcon(cubeFill)
      }
    ]
  },
  {
    title: 'Download',
    path: '/download',
    icon: getIcon(cubeFill),
    children: [
      {
        title2: '',
        path2: '/',
        icon2: getIcon(cubeFill),
        children2: [
          {
            title3: '',
            path3: '/'
          }
        ]
      }
    ]
  }
];

export default sidebarConfig;
