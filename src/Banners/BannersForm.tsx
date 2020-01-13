import React, { FC } from 'react';
import { Button, Form, Grid, Input, Segment, TextArea } from 'semantic-ui-react';
import BannersDatePicker from './BannersDatePicker';

const BannersForm: FC<{ 
  banner:any,
  handleSubmit: any,
  onFormValueChange: any
}> = ({ 
  banner,
  handleSubmit,
  onFormValueChange 
}) => {
  return (
    <Segment clearing={true}>
      <Form>
        <Grid>
          <Grid.Row>
            <Grid.Column verticalAlign='middle' textAlign='center'>
            <h4>Banner Form</h4>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2} verticalAlign='middle'>
              <h4>Banner ID:</h4>
            </Grid.Column>
            <Grid.Column width={3} >
              <Input name='bannerId' type='number' fluid={true} onChange={onFormValueChange} defaultValue={banner.bannerId} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2} verticalAlign='middle'>
              <h4>Start Date:</h4>
            </Grid.Column>
            <Grid.Column width={3}>
              <BannersDatePicker selectedDate={banner.startDate} onChange={(e) => onFormValueChange(e, { name: 'startDate', value: e})}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2} verticalAlign='middle'>
              <h4>End Date:</h4>
            </Grid.Column>
            <Grid.Column width={3}>
            <BannersDatePicker selectedDate={banner.endDate} onChange={(e) => onFormValueChange(e, { name: 'endDate', value: e})}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2} verticalAlign='middle'>
              <h4>Display:</h4>
            </Grid.Column>
            <Grid.Column width={3}>
                <Input type='checkbox' name='display' onChange={onFormValueChange} defaultValue={banner.display} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={2}>
              <h4>Content:</h4>
            </Grid.Column>
            <Grid.Column width={10}>
                <TextArea name='content' defaultValue={banner.content} onChange={onFormValueChange} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button.Group floated='right' size='tiny'>
                <Button color='vk' content='Submit' onClick={handleSubmit}/>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Segment>
  );
};

export default BannersForm;
