import React, { FC } from 'react';
import { Table } from 'semantic-ui-react';
import { Banner } from '../../components/types';
import BannersTableRow from './BannersTableRow';

const BannersTable: FC<{
  banners: Banner[] | Banner;
  onDeleteBanner: any;
}> = ({ banners, onDeleteBanner }) => {
  const renderRows = () => {
    return banners.map((b: Banner, k: number) => (
      <BannersTableRow key={k} onDeleteBanner={onDeleteBanner} banner={b} />
    ));
  };
  return (
    <Table selectable={true} celled={true}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>Banner ID</Table.HeaderCell>
          <Table.HeaderCell width={8}>Period</Table.HeaderCell>
          <Table.HeaderCell width={1} />
        </Table.Row>
      </Table.Header>
      <Table.Body>{renderRows()}</Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan={3} />
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default BannersTable;
