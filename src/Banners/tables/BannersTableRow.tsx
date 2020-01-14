import moment from 'moment';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';
import { Banner } from '../../components/types';

const BannersTableRow: FC<{
  banner: Banner;
  onDeleteBanner: any;
}> = ({ banner, onDeleteBanner }) => {
  const history = useHistory();
  return (
    <Table.Row>
      <Table.Cell>{banner.bannerId}</Table.Cell>
      <Table.Cell>
        {moment(banner.startDate).format('YYYY年MM月DD日(dd)')} ~{' '}
        {moment(banner.endDate).format('YYYY年MM月DD日(dd)')}
      </Table.Cell>
      <Table.Cell>
        <Button.Group size='tiny'>
          <Button
            onClick={() => history.push(`/ui/banner?id=${banner.bannerId}`)}
            color='vk'
            content='Edit'
          />
          <Button onClick={() => onDeleteBanner(banner.id)} content='Delete' />
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
};

export default BannersTableRow;
