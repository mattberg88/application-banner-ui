import { Spinner } from '@fms/salesmgmt-layout';
import axios from 'axios';
import moment from 'moment';
import { parse } from 'query-string';
import React, { useEffect, useState } from 'react';
import { Segment, Button, Input, Grid, TextArea, Form } from 'semantic-ui-react';
import './Banners.css';
import BannersDatePicker from './BannersDatePicker';

const Banners = ({ location }: any) => {
  const [state, setState] = useState({
    loading: true,
    error: false,
    message: ''
  });

  const [data, setData] = useState();
  const { id } = parse(location.search);
  const { date } = parse(location.search);

  const fetchBanners = () => {
    return axios
      .get(`http://localhost:5000/api/banner/${id ? id : ''}`)
      .then(response => {
        if (response.data.length < 1) {
          return setState({ ...state, loading: false, message: 'No Banners' });
        }
        console.log(response.data)
        setState({ ...state, loading: false });
        return setData(response.data);
      })
      .catch((err: any) => {
        setState({ loading: false, error: true, message: err.message });
      });
  };

  useEffect(() => {
    fetchBanners();
  }, []); // eslint-disable-line

  const renderMessage = (error: boolean, message: string) => {
    return (
      <div className={`ui ${error ? 'error' : 'warning'} message`}>
        <div className='header'>
          <i className='exclamation triangle icon' />
          {message || 'unknown error'}
        </div>
      </div>
    );
  };
  const onFormValueChange = (e: any, props: any) => {
    const tempData = data;
    tempData[props.name] = props.value;
    setData(tempData)
  }

  const handlePost = () => {
    const postData = {...data, id: null}
    return axios
    .post('http://localhost:5000/api/banner/', postData)
    .then(response => {
      console.log(response)
      window.location.reload()
    })
    .catch((err: any) => {
      console.log(err)
    });
  }
  const handlePut = () => {
    return axios
    .put(`http://localhost:5000/api/banner/${id ? id : data.id}`, data)
    .then(response => {
      console.log(response)
      window.location.reload()
    })
    .catch((err: any) => {
      console.log(err)
    });
  }
  const handleDelete = () => { 
    return axios
    .delete(`http://localhost:5000/api/banner/${id ? id : ''}`)
    .then(response => {
      console.log(response)
      window.location.reload()
    })
    .catch((err: any) => {
      console.log(err)
    });
  }
  return (
    <div className='banner_container'>
      {state.loading ? <Spinner /> : <></>}
      {state.error || state.message ? (
        renderMessage(state.error, state.message)
      ) : (
        <></>
      )}
      {data && data.id ? (
        <>
        <Segment>
          <Form>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                <h4>Banner:</h4>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} verticalAlign='middle'>
                  <h4>ID:</h4>
                </Grid.Column>
                <Grid.Column width={2} verticalAlign='middle'>
                  <div>{data.id}</div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} verticalAlign='middle'>
                  <h4>Banner ID:</h4>
                </Grid.Column>
                <Grid.Column width={3} >
                  <Input name='bannerId' type='number' fluid={true} onChange={onFormValueChange} defaultValue={data.bannerId} />
                </Grid.Column>

              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} verticalAlign='middle'>
                  <h4>Start Date:</h4>
                </Grid.Column>
                <Grid.Column width={3}>
                  <BannersDatePicker selectedDate={data.startDate} onChange={(e) => onFormValueChange(e, { name: 'startDate', value: e})}/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} verticalAlign='middle'>
                  <h4>End Date:</h4>
                </Grid.Column>
                <Grid.Column width={3}>
                <BannersDatePicker selectedDate={data.endDate} onChange={(e) => onFormValueChange(e, { name: 'endDate', value: e})}/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} verticalAlign='middle'>
                  <h4>Display:</h4>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Input type='checkbox' name='display' onChange={onFormValueChange} defaultValue={data.display} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2}>
                  <h4>Content:</h4>
                </Grid.Column>
                <Grid.Column width={10}>
                    <TextArea name='content' defaultValue={data.content} onChange={onFormValueChange} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button.Group floated='left'>
                    <Button content='POST' onClick={handlePost}/>
                    <Button content='PUT' onClick={handlePut}/>
                    <Button content='DELETE' onClick={handleDelete}/>
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
        <Segment>
            <Grid className='banner_display'>
              <Grid.Row>
                <Grid.Column verticalAlign='middle' textAlign='center'>
                  <h4>Banner (ID:{data.bannerId})</h4>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} verticalAlign='middle'>
                  <h4>Period:</h4>
                </Grid.Column>
                <Grid.Column width={8} verticalAlign='middle'>
                 <p>{moment(data.startDate).format('YYYY年MM月DD日(dd)')} ~ {moment(data.endDate).format('YYYY年MM月DD日(dd)')}</p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2}>
                  <h4>Content:</h4>
                </Grid.Column>
                <Grid.Column className='banner_content' width={8}>
                  <div dangerouslySetInnerHTML={{ __html: data.content }}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
        </Segment>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Banners;
