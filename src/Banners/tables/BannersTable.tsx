import React, { FC } from 'react';
import { Table } from 'semantic-ui-react';
import { Banner } from '../../components/types';
import BannersTableRow from './BannersTableRow';

const BannersTable: FC<{ banners: Banner[] | Banner }> = ({ banners }) => {
  const renderRows = () => {
    return banners.map((b: Banner) => <BannersTableRow onEditBanner={onEditBanner} onDeleteBanner={onDeleteBanner} banner={b} />)
  }
  const onEditBanner = () => {
    
  }
  const onDeleteBanner = () => {
    
  }
  return (
    <Table selectable={true} celled={true} columns={3}>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell width={1}>
          Banner ID
        </Table.HeaderCell>
        <Table.HeaderCell width={8}>
          Period
        </Table.HeaderCell>
        <Table.HeaderCell width={4} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {renderRows()}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan={3}/>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default BannersTable;
