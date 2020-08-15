import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from './GUI_Elements/Input';
import Select from './GUI_Elements/Select';

const columns = [
  { id: 'name', label: 'Наименование компании', maxWidth: 150 },
  { id: 'registered_type', label: 'Тип юр.лица', minWidth: 100 },
  {
    id: 'region',
    label: 'Регион',
    minWidth: 100
  },
  {
    id: 'city',
    label: 'Город',
    minWidth: 100
  },
  {
    id: 'actions',
    label: '',
    minWidth: 100
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 490,
    marginTop: '20px'
  },
  input: {
    /*  border: '1px solid rgba(25, 25, 25, 0.32)', */
    minWidth: '211px',
    fontSize: '12px'
  },
  select: {
    borderRadius: 0,
    color: 'rgba(0, 0, 0, 0.87)',
    opacity: '0.38',
    position: 'relative',
    border: '1px solid rgba(25, 25, 25, 0.32)',
    fontSize: 12,
    width: '211px',
    padding: '5px 12px',

    '&:focus': {
      borderColor: '1px solid rgba(25, 25, 25, 0.50)'
    }
  },
  form: {
    display: 'flex',
    paddingTop: '28px',
    paddingLeft: '31px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  icon: {
    cursor: 'pointer'
  },
  deleteIcon: {
    cursor: 'pointer',
    marginLeft: '30px'
  }
}));

export default function ClientsTable(props) {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [registeredType, setRegisteredType] = useState('');
  const [region, setRegion] = useState('');

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [company, setCompany] = useState({ name: '', id: '' });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    props.getClients();
  }, []);

  let clients = props.clients;

  if (name !== '') {
    clients = clients.filter(client =>
      client.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (city !== '') {
    clients = clients.filter(client =>
      client.city.toLowerCase().includes(city.toLowerCase())
    );
  }
  if (registeredType !== '') {
    clients = clients.filter(client =>
      client.registered_type
        .toLowerCase()
        .includes(registeredType.toLowerCase())
    );
  }

  if (region !== '') {
    clients = clients.filter(client =>
      client.region.toLowerCase().includes(region.toLowerCase())
    );
  }

  const resetFilter = () => {
    setName('');
    setRegion('');
    setRegisteredType('');
    setCity('');
  };

  const findFilterOptions = param => {
    let options = [];
    props.clients.map(client => {
      let isInclude = options.some(option => option.name === client[param]);
      if (!isInclude) {
        options.push({ name: client[param], value: client[param] });
      }
    });
    return options;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openDeleteModal = (id, name) => {
    setIsOpenDeleteModal(true);
    setCompany({ name, id });
  };

  const handleClose = () => {
    setIsOpenDeleteModal(false);
    setCompany({ name: '', id: '' });
  };

  const deleteCompany = () => {
    setIsOpenDeleteModal(false);
    props.deleteClient(company.id);
    setCompany({ name: '', id: '' });
  };

  const registeredTypes = findFilterOptions('registered_type');
  const regionTypes = findFilterOptions('region');

  return (
    <>
      <Dialog
        open={isOpenDeleteModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"/>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Вы действительно хотите удалить компанию ${company.name}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteCompany} color="primary">
            Удалить
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
      <Paper className={classes.root}>
        <form className={classes.form}>
          <Input
            placeholder="Наименование компании"
            value={name}
            handleChange={setName}
            styles={{ marginRight: '24px' }}
          />
          <Select
            styles={{ marginRight: '24px' }}
            initialOption={registeredType}
            placeholder="Тип юр.лица"
            options={registeredTypes}
            handleChange={setRegisteredType}
          />
          <Select
            styles={{ marginRight: '24px' }}
            initialOption={region}
            placeholder="Регион"
            options={regionTypes}
            handleChange={setRegion}
          />
          <Input
            styles={{ marginRight: '24px' }}
            placeholder="Город"
            value={city}
            handleChange={setCity}
          />
          <ReplayIcon
            color="secondary"
            onClick={resetFilter}
            className={classes.icon}
          />
        </form>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      maxWidth: column.maxWidth,
                      fontSize: '12px',
                      paddingLeft: '30px'
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map(column => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              maxWidth: column.maxWidth,
                              fontSize: '13px',
                              padding: '13px 0 13px 30px'
                            }}
                          >
                            {column.id === 'actions' ? (
                              <>
                                <Link to={`/client/${row.id}`}>
                                  <EditIcon color="secondary" />
                                </Link>
                                <DeleteIcon
                                  className={classes.deleteIcon}
                                  color="secondary"
                                  onClick={() =>
                                    openDeleteModal(row.id, row.name)
                                  }
                                />
                              </>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={clients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
