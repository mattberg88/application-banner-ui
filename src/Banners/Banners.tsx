import { Spinner } from '@fms/salesmgmt-layout';
import axios from 'axios';
import moment from 'moment';
import { parse } from 'query-string';
import React, { useEffect, useState } from 'react';
import { Segment, Button, Input, Grid, Label, TextArea, Form } from 'semantic-ui-react';
import './Banners.css';

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
    console.log(props.name, props.value)
  }
  const handlePost = (e: any, props: any) => {
    e.preventDefault()

    console.log(e)
    // const objToSend = {
    //   bannerid: 12121,
    //   content: 'new post',
    //   dateshow: '2019-09-09', 
    //   datehide: '2019-09-09',
    //   showeverywhere: true
    // }
    // return axios
    // .post('http://localhost:5000/api/banner/', objToSend)
    // .then(response => {
    //   console.log(response)
    // })
    // .catch((err: any) => {
    //   console.log(err)
    // });
  }
  const handlePut = () => {
    const objToUpdate = {
      bannerid: 919191,
      content: 'uodated',
      dateshow: '2019-09-09', 
      datehide: '2019-09-10',
      showeverywhere: true
    }
    return axios
    .put(`http://localhost:5000/api/banner/${id ? id : ''}`, objToUpdate)
    .then(response => {
      console.log(response)
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
      {data && data.content ? (
        <Segment className='banner_container'>
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
                <Grid.Column width={3} >
                  <Input name='id' onChange={onFormValueChange} defaultValue={data.id} />
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
                  <Input name='bannerid' fluid={true} onChange={onFormValueChange} defaultValue={data.bannerid} />
                </Grid.Column>
                <Grid.Column width={2} verticalAlign='middle'>
                  <div>{data.id}</div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} verticalAlign='middle'>
                  <h4>Content:</h4>
                </Grid.Column>
                <Grid.Column width={3}>
                    <TextArea defaultValue={data.content} />
                </Grid.Column>
                <Grid.Column width={3} verticalAlign='middle'>
                  <div dangerouslySetInnerHTML={{ __html: data.content }}/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} verticalAlign='middle'>
                  <h4>Date Show:</h4>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Input fluid={true} defaultValue={moment(data.dateshow).format('YYYY/MM/DD')} />
                </Grid.Column>
                <Grid.Column width={3} verticalAlign='middle'>
                 <p>{moment(data.dateshow).format('YYYY/MM/DD')} </p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} verticalAlign='middle'>
                  <h4>Date Hide:</h4>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Input fluid={true} defaultValue={moment(data.datehide).format('YYYY/MM/DD')} />
                </Grid.Column>
                <Grid.Column width={3} verticalAlign='middle'>
                 <p>{moment(data.datehide).format('YYYY/MM/DD')} </p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2} verticalAlign='middle'>
                  <h4>Show:</h4>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Input type='checkbox' defaultValue={data.showeverywhere} />
                </Grid.Column>
                <Grid.Column>
                  <p>{data.showeverywhere ? 'true' : 'false'}</p>
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default Banners;
