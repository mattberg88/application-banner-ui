import React, { FC } from 'react';
import { Table } from 'semantic-ui-react';
import { Banner } from '../../components/types';
import BannersTableRow from './BannersTableRow';

const BannersTable: FC<{ banners: Banner[] | Banner }> = ({ banners }) => {
  const renderRows = () => {
    return banners.map((b: Banner) => <BannersTableRow banner={b} />)
  }
  return (
    <Table>
      <Table.Body>
        {renderRows()}
      </Table.Body>
    </Table>
  );
};

export default BannersTable;
