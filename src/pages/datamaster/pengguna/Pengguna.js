/* eslint-disable camelcase */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// Icons
import plusFill from '@iconify/icons-eva/plus-fill';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import {
  TableListHead,
  TableListToolbar,
  TableActionMenu
} from '../../../components/table/data-master/pengguna';
import ErrorBox from '../../../components/box/ErrorBox';
import LoadingBox from '../../../components/box/LoadingBox';
import { getPenggunas } from '../../../redux/actions/penggunaAction';

const TABLE_HEAD = [
  { id: 'kode_pengguna', label: 'Kode Pengguna', alignRight: false },
  { id: 'nama_pengguna', label: 'Nama Pengguna', alignRight: false },
  { id: 'kode_cabang', label: 'Kode Cabang', alignRight: false },
  { id: 'kode_kantor', label: 'Kode Kantor', alignRight: false },
  { id: 'grup_pengguna', label: 'Grup Pengguna', alignRight: false },
  { id: 'status', label: 'Status Aktif', alignRight: false },
  { id: '' }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.nama_pengguna.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Pengguna() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('nama_pengguna');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { penggunas, loading, error } = useSelector((state) => state.pengguna);

  const newData = [];
  penggunas.map((item, index) => {
    newData.push({ id: index + 1, ...item });
  });

  useEffect(() => {
    dispatch(getPenggunas());
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = newData.map((n) => n.nama_pengguna);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, nama_pengguna) => {
    const selectedIndex = selected.indexOf(nama_pengguna);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, nama_pengguna);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - newData.length) : 0;

  const filteredUsers = applySortFilter(
    newData,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Pengguna | Sarana Mulya">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Pengguna
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/data-master/add-pengguna"
            startIcon={<Icon icon={plusFill} />}
          >
            Tambah Pengguna
          </Button>
        </Stack>

        <Card>
          <TableListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          {loading && <LoadingBox />}
          {error && <ErrorBox actions={[getPenggunas]} />}
          {penggunas.length > 0 && !error && !loading && (
            <>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <TableListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={newData.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const {
                            id,
                            kode_pengguna,
                            nama_pengguna,
                            kode_cabang,
                            kode_kantor,
                            grup_pengguna,
                            status
                          } = row;
                          const isItemSelected =
                            selected.indexOf(nama_pengguna) !== -1;

                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) =>
                                    handleClick(event, nama_pengguna)
                                  }
                                />
                              </TableCell>
                              <TableCell align="left">
                                {kode_pengguna}
                              </TableCell>
                              <TableCell align="left">
                                {nama_pengguna}
                              </TableCell>
                              <TableCell align="left">{kode_cabang}</TableCell>
                              <TableCell align="left">{kode_kantor}</TableCell>
                              <TableCell align="left">
                                {grup_pengguna}
                              </TableCell>
                              <TableCell align="left">
                                <Label
                                  variant="ghost"
                                  color={
                                    (status === 'Tidak Aktif' && 'error') ||
                                    'success'
                                  }
                                >
                                  {sentenceCase(status)}
                                </Label>
                              </TableCell>

                              <TableCell align="right">
                                <TableActionMenu
                                  id={kode_pengguna}
                                  name={nama_pengguna}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={newData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Card>
      </Container>
    </Page>
  );
}
