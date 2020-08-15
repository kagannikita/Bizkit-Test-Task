import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from './images/logo.png';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


import {
  getClients,
  deleteClient,
  addClient,
  getClientById,
  updateClient,
  addBankData,
  updateBankData,
  deleteBankData,
  logOut
} from './actions/actions';

import Clients from './Clients';
import Client_Add from './Client_Add';
import Client_Edit from './Client_Edit';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '&.selected': {
      backgroundColor: 'red'
    }
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    backgroundColor: '#fff',
    boxShadow: 'none'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    background: '#f0f0f0',
    minHeight: '100vh'
  },
  logo: {
    width: '169px',
    margin: '26px 0 18px 38px'
  },
  listItem: {
    backgroundColor: ' red'
  },
  header: {
    color: '#3D5170',
    fontSize: '24px',
    marginTop: '27px',
    marginBottom: '23px',
    lineHeight: '26px'
  },
  preloader: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    zIndex: '2000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgba(237, 240, 244, 0.9)'
  },
  addButton: {
    marginLeft: 'auto'
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  listText: {
    fontSize: '14px',
    fontWeight: '500'
  }
}));

function Client_Page(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const openAdd = () => {
    setIsAddOpen(true);
  };

  const closeAdd = () => {
    setIsAddOpen(false);
  };

  const addClient = data => {
    props.addClient(data);
    setIsAddOpen(false);
  };

  const isDataFetching =
    props.isClientsPending ||
    props.isDeletePending ||
    props.isAddPending ||
    props.isClientPending ||
    props.isUpdateClientPending ||
    props.bankDataPending;

  const {
    getClientById,
    client,
    updateClient,
    addBankData,
    updateBankData,
    deleteBankData
  } = props;
  const drawer = (
    <div>
      <img className={classes.logo} src={logo} alt="logo" />
      <List>
        <Link to={`/clients`} className={classes.link}>
          <ListItem button selected className={classes.root}>
            <ListItemIcon>
              <AssignmentIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Клиенты" className={classes.listText} />
          </ListItem>
        </Link>
        <ListItem button onClick={props.logOut}>
          <ListItemIcon>
            <ExitToAppIcon color="error" />
          </ListItemIcon>
          <ListItemText primary="Выход" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      {isAddOpen && (
        <Client_Add isOpen={isAddOpen} close={closeAdd} addClient={addClient} />
      )}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon color="primary" />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.header}>
            {props.client.name ? props.client.name : 'Клиенты'}
          </Typography>
          <Button
            variant="contained"
            className={classes.addButton}
            startIcon={<AddIcon />}
            color="primary"
            onClick={openAdd}
          >
            Добавить
          </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {isDataFetching && (
          <div className={classes.preloader}>
            <CircularProgress />
          </div>
        )}
        <Switch>
          <Route exact path="/clients">
            <Clients
              clients={props.clients}
              getClients={props.getClients}
              deleteClient={props.deleteClient}
            />
          </Route>
          <Route
            exact
            path="/client/:id"
            render={props => (
              <Client_Edit
                {...props}
                getClientById={getClientById}
                client={client}
                updateClient={updateClient}
                addBankData={addBankData}
                updateBankData={updateBankData}
                deleteBankData={deleteBankData}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    isClientsPending: state.main.isClientsPending,
    clients: state.main.clients,
    isDeletePending: state.main.isDeletePending,
    isAddPending: state.main.isAddPending,
    client: state.main.client,
    isClientPending: state.main.isClientPending,
    isUpdateClientPending: state.main.isUpdateClientPending,
    bankDataPending: state.main.bankDataPending
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClients: () => dispatch(getClients()),
    deleteClient: id => dispatch(deleteClient(id)),
    addClient: data => dispatch(addClient(data)),
    getClientById: id => dispatch(getClientById(id)),
    updateClient: (id, data) => dispatch(updateClient(id, data)),
    addBankData: (id, data) => dispatch(addBankData(id, data)),
    updateBankData: (companyId, id, data) =>
      dispatch(updateBankData(companyId, id, data)),
    deleteBankData: (companyId, id) => dispatch(deleteBankData(companyId, id)),
    logOut: () => dispatch(logOut())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Client_Page);
