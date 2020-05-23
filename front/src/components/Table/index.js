import React from 'react';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useStyles from './styles';

function CustomTable({
  /**
   * columns - массив объектов вида: {
   *  id: ключ в data, строка,
   *  name: Имя колонки,
   *  align: выравнивание - "left" | "center" | "right", необязательный параметр
   *  getValue: ф-ия которой передаётся данные data[index][column.id]
   *    чтобы она вернула то, что отрисуется в таблице, необязательный параметр
   * }
   */
  columns,
  /**
   * массив объектов, с теми же ключами что в columns
   */
  data,
  /**
   * фи-я которая вызовется по клику на строку, с данными этой строки
   * необязательный пропс
   */
  onRowClick,
  /**
   * необязательный пропс
   */
  className,
}) {
  const classes = useStyles();
  const handleRowClick = (index) => {
    if (onRowClick) {
      onRowClick(data[index]);
    }
  };

  return (
    <TableContainer>
      <Table className={clsx(classes.table, className)} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
                align={column.align || 'left'}
                className={classes.head}
              >
                {column.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              hover={!!onRowClick}
              onClick={() => {
                handleRowClick(index);
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                >
                  {
                    column.getValue
                      ? column.getValue(item[column.id])
                      : item[column.id]
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
