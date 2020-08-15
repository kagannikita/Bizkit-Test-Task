import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

const useStyles = makeStyles(theme => ({
  tableRoot: {
    boxShadow: 'none'
  }
}));

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function BankDetailsTable(props) {
  const [state, setState] = useState({
    columns: [
      { title: 'Банк', field: 'bank' },
      { title: 'БИК', field: 'bank_id_code' },
      { title: 'Номер счета', field: 'account_number', type: 'numeric' },
      {
        title: 'Валюта',
        field: 'currency'
      }
    ],
    data: []
  });

  useEffect(() => {
    setState(prevState => {
      const data = props.data.bank_details;
      return { ...prevState, data };
    });
  }, [props.data]);

  const addNewRow = data => {
    props.addBankData(props.data.id, data);
  };

  const updateRow = (id, data) => {
    props.updateBankData(props.data.id, id, data);
  };

  const deleteRow = id => {
    props.deleteBankData(props.data.id, id);
  };

  const classes = useStyles();

  return (
    <MaterialTable
      classes={{ root: classes.tableRoot }}
      icons={tableIcons}
      title="Банковские реквизиты компании"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              addNewRow(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                updateRow(oldData.id, newData);
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              deleteRow(oldData.id);
            }, 600);
          })
      }}
      localization={{
        body: {
          emptyDataSourceMessage: 'Нет данных',
          addTooltip: 'Добавить',
          deleteTooltip: 'Удалить',
          editTooltip: 'Редактировать',
          filterRow: {
            filterTooltip: 'Filter'
          },
          editRow: {
            deleteText: 'Подтвердите удаление?',
            cancelTooltip: 'Отмена',
            saveTooltip: 'Удалить'
          }
        },
        grouping: {
          placeholder: 'Drag columns',
          groupedBy: 'Grouped by:'
        },
        header: {
          actions: 'Действия'
        },
        pagination: {
          labelDisplayedRows: '{from}-{to} из {count}',
          labelRowsSelect: 'Entries per page',
          labelRowsPerPage: 'Lines per page:',
          firstAriaLabel: 'First page',
          firstTooltip: 'First page',
          previousAriaLabel: 'Previous page',
          previousTooltip: 'Previous page',
          nextAriaLabel: 'Next page',
          nextTooltip: 'Next page',
          lastAriaLabel: 'Last page',
          lastTooltip: 'Last page'
        },
        toolbar: {
          addRemoveColumns: 'Add or delete columns',
          nRowsSelected: '{0} Line (s) selected',
          showColumnsTitle: 'Show columns',
          showColumnsAriaLabel: 'Show columns',
          exportTitle: 'Export',
          exportAriaLabel: 'Export',
          exportName: 'Export in CSV',
          searchTooltip: 'Search',
          searchPlaceholder: 'Search'
        }
      }}
    />
  );
}
