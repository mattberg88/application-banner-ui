import React, { FC } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Banner } from '../../components/types';
import moment from 'moment';

const BannersTableRow: FC<{ banner: Banner }> = ({ banner }) => {
  return (
    <Table.Row>
      <Table.Cell>
        {banner.bannerId}
      </Table.Cell>
      <Table.Cell>
        {moment(banner.startDate).format('YYYY年MM月DD日(dd)')} ~ {moment(banner.endDate).format('YYYY年MM月DD日(dd)')}
      </Table.Cell>
      <Table.Cell>
        <Button content='Edit' />
        <Button content='Delete' />
      </Table.Cell>
    </Table.Row>
  );
};

export default BannersTableRow;
