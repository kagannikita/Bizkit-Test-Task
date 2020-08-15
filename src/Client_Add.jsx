import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Input from './GUI_Elements/Input';
import Textarea from './GUI_Elements/Textarea';

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: '38px 42px 39px 37px',
    maxWidth: '524px',
    borderRadius: '0'
  },
  title: {
    color: '#3D5170',
    fontSize: '24px',
    padding: '0',
    fontWeight: 'normal'
  },
  closeIcon: {
    position: 'absolute',
    top: '19px',
    right: '22px',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '25px',
    justifyContent: 'space-between'
  },
  addButton: {
    marginTop: '23px'
  }
}));

export default function Client_Add(props) {
  const [name, setName] = useState('');
  const [registered_type, setRegistered_type] = useState('');
  const [region, setRegion] = useState('');
  const [email, setEmail] = useState('');
  const [shortname, setShortname] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [workscope, setWorkscope] = useState('');

  const addClient = () => {
    let data = {
      name,
      registered_type,
      region,
      email,
      shortname,
      city,
      phone,
      description,
      workscope
    };
    props.addClient(data);
  };

  const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValid = !regEmail.test(String(email).toLowerCase());

  const isAllData =
    name === '' ||
    registered_type === '' ||
    region === '' ||
    email === '' ||
    shortname === '' ||
    city === '' ||
    phone === '' ||
    description === '' ||
    workscope === '' ||
    isValid;

  const classes = useStyles();
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{ paper: classes.dialog }}
    >
      <CloseIcon onClick={props.close} className={classes.closeIcon} />
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        Добавить клиента
      </DialogTitle>
      <form className={classes.form}>
        <Input
          styles={{ marginBottom: '25px' }}
          placeholder="Наименование компании"
          handleChange={setName}
          value={name}
        />
        <Input
          styles={{ marginBottom: '25px' }}
          placeholder="Короткое название"
          handleChange={setShortname}
          value={shortname}
        />
        <Input
          styles={{ marginBottom: '25px' }}
          placeholder="Тип юр.лица"
          handleChange={setRegistered_type}
          value={registered_type}
        />
        <Input
          styles={{ marginBottom: '25px' }}
          placeholder="Сфера деятельности"
          handleChange={setWorkscope}
          value={workscope}
        />
        <Input
          styles={{ marginBottom: '25px' }}
          placeholder="Регион"
          handleChange={setRegion}
          value={region}
        />
        <Input
          styles={{ marginBottom: '25px' }}
          placeholder="Город"
          handleChange={setCity}
          value={city}
        />
        <Input
          styles={{ marginBottom: '25px' }}
          placeholder="Email"
          handleChange={setEmail}
          value={email}
        />
        <Input
          styles={{ marginBottom: '25px' }}
          placeholder="Телефон"
          handleChange={setPhone}
          value={phone}
        />
      </form>
      <Textarea
        styles={{ width: '100%' }}
        placeholder="Дополнительно (описание)"
        handleChange={setDescription}
        value={description}
      />

      <DialogActions>
        <Button
          onClick={addClient}
          color="primary"
          variant="contained"
          className={classes.addButton}
          disabled={isAllData}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
