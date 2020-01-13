import moment from 'moment';
import React, { FC } from 'react';
import { Route } from 'react-router-dom'
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Banner } from '../components/types';

const BannersDisplay: FC<{ banner: Banner, handleDelete: any, listMode: boolean }> = ({ banner, handleDelete, listMode }) => {
  const handleClick = (history: any) => {
    history.push(`/ui/banner?id=${banner.bannerId}`)
  }
  return (
    <Segment clearing={true}>
        <Grid className='banner_display'>
          <Grid.Row>
            <Grid.Column verticalAlign='middle' textAlign='center'>
              <h4>Banner (ID:{banner.bannerId})</h4>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2} verticalAlign='middle'>
              <h4>Period:</h4>
            </Grid.Column>
            <Grid.Column width={8} verticalAlign='middle'>
              <p>{moment(banner.startDate).format('YYYY年MM月DD日(dd)')} ~ {moment(banner.endDate).format('YYYY年MM月DD日(dd)')}</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}>
              <h4>Content:</h4>
            </Grid.Column>
            <Grid.Column className='banner_content' width={8}>
              <div dangerouslySetInnerHTML={{ __html: banner.content }}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column >
              <Button.Group floated='right' size='tiny' >
                <Button onClick={() => handleDelete(banner.id)} content='Delete' />
                {listMode ? (
                  <Route render={({ history }: any) => (
                    <Button onClick={() => handleClick(history)} color='vk' content='Edit' />
                  )} />
                ) : (
                  <></>
                )}
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </Segment>
  );
};

export default BannersDisplay;
