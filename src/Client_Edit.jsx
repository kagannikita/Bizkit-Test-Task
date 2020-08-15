import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from './GUI_Elements/Input';
import Textarea from './GUI_Elements/Textarea';
import BankTable from './BankTable';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '25px 40px 35px 37px'
  },
  formWrap: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  form: {
    maxWidth: '445px',
    height: 'fit-content',
    marginTop: '40px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  title: {
    width: '100%',
    fontSize: '18px',
    fontWeight: 'normal'
  },
  saveButton: {
    display: 'block',
    marginLeft: 'auto',
    marginTop: '44px'
  },
  label: {
    color: '#a8a8a8',
    fontSize: '12px'
  },
  labelRoot: {
    marginLeft: 0
  }
}));

export default function Client_Edit(props) {
  const [value, setValue] = useState(0);

  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [email, setEmail] = useState('');
  const [shortname, setShortname] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [workscope, setWorkscope] = useState('');

  const [registered_name, setRegisteredName] = useState('');
  const [registered_type, setRegisteredType] = useState('');
  const [bin_iin, setBinIin] = useState('');
  const [leader, setLeader] = useState('');
  const [leader_position, setLeaderPosition] = useState('');
  const [registered_address, setRegisteredAddress] = useState('');
  const [address, setAddress] = useState('');
  const [tax_payer, setTaxPayer] = useState(false);

  useEffect(() => {
    const { id } = props.match.params;
    props.getClientById(id);
  }, []);

  useEffect(() => {
    const { client } = props;
    setName(client.name);
    setRegion(client.region);
    setEmail(client.email);
    setShortname(client.shortname);
    setCity(client.city);
    setPhone(client.phone);
    setDescription(client.description);
    setWorkscope(client.workscope);

    setRegisteredName(client.registered_name);
    setRegisteredType(client.registered_type);
    setBinIin(client.bin_iin);
    setLeader(client.leader);
    setLeaderPosition(client.leader_position);
    setRegisteredAddress(client.registered_address);
    setAddress(client.address);
    if (client.tax_payer === null) {
      setTaxPayer(false);
    } else {
      setTaxPayer(client.tax_payer);
    }
  }, [props.client]);

  const saveChanges = () => {
    const { id } = props.match.params;
    let data = {
      name,
      registered_type,
      region,
      email,
      shortname,
      city,
      phone,
      description,
      workscope,
      registered_name,
      bin_iin,
      leader,
      leader_position,
      registered_address,
      address,
      tax_payer
    };
    props.updateClient(id, data);
  };

  const isAllData = false;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <Paper square className={classes.paper}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Информация" />
        <Tab label="Банковские реквизиты" />
      </Tabs>
      {value === 0 ? (
        <>
          <div className={classes.formWrap}>
            <form className={classes.form}>
              <Typography variant="h6" noWrap className={classes.title}>
                Основная информация
              </Typography>
              <Input
                styles={{
                  marginBottom: '25px',
                  marginTop: '25px',
                  flexBasis: '100%'
                }}
                placeholder="Наименование компании"
                handleChange={setName}
                value={name}
              />
              <Input
                styles={{ marginBottom: '25px', maxWidth: '211px' }}
                placeholder="Короткое название"
                handleChange={setShortname}
                value={shortname}
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
              <Textarea
                styles={{ width: '100%' }}
                placeholder="Дополнительно (описание)"
                handleChange={setDescription}
                value={description}
              />
            </form>
            <form className={classes.form}>
              <Typography variant="h6" noWrap className={classes.title}>
                Реквизиты компании
              </Typography>
              <Input
                styles={{
                  marginBottom: '25px',
                  marginTop: '25px',
                  flexBasis: '100%'
                }}
                placeholder="Наименование юр.лица"
                handleChange={setRegisteredName}
                value={registered_name}
              />
              <Input
                styles={{ marginBottom: '25px', maxWidth: '211px' }}
                placeholder="Тип юр.лица"
                handleChange={setRegisteredType}
                value={registered_type}
              />
              <Input
                styles={{ marginBottom: '25px' }}
                placeholder="БИН/ИИН"
                handleChange={setBinIin}
                value={bin_iin}
              />
              <Input
                styles={{ marginBottom: '25px' }}
                placeholder="Руководитель"
                handleChange={setLeader}
                value={leader}
              />
              <Input
                styles={{ marginBottom: '25px' }}
                placeholder="Должность руководителя"
                handleChange={setLeaderPosition}
                value={leader_position}
              />
              <Input
                styles={{ marginBottom: '25px' }}
                placeholder="Юридический адрес"
                handleChange={setRegisteredAddress}
                value={registered_address}
              />
              <Input
                styles={{ marginBottom: '25px' }}
                placeholder="Фактический адрес"
                handleChange={setAddress}
                value={address}
              />
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    classes={{ root: classes.labelRoot, label: classes.label }}
                    control={
                      <Switch
                        checked={tax_payer}
                        onChange={e => setTaxPayer(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Плательщик НДС (нет/да)"
                    labelPlacement="start"
                  />
                </FormGroup>
              </FormControl>
            </form>
          </div>
          <Button
            onClick={saveChanges}
            size="large"
            color="primary"
            variant="contained"
            className={classes.saveButton}
            disabled={isAllData}
          >
            Сохранить
          </Button>
        </>
      ) : (
        <BankTable
          data={props.client}
          addBankData={props.addBankData}
          updateBankData={props.updateBankData}
          deleteBankData={props.deleteBankData}
        />
      )}
    </Paper>
  );
}
