import { Spinner } from '@fms/salesmgmt-layout';
import axios from 'axios';
import moment from 'moment';
import { parse } from 'query-string';
import React, { useEffect, useState } from 'react';
import { Segment, Button } from 'semantic-ui-react';
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

  const handlePost = () => {
    const objToSend = {
      bannerid: 12121,
      content: 'new post',
      dateshow: '2019-09-09', 
      datehide: '2019-09-09',
      showeverywhere: true
    }
    return axios
    .post('http://localhost:5000/api/banner/', objToSend)
    .then(response => {
      console.log(response)
    })
    .catch((err: any) => {
      console.log(err)
    });
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
        <Segment className='banner_segment' floated='right'>
          <h4>Banners:</h4>
          <p>ID: {data.id}</p>
          <p>BannerID: {data.bannerid}</p>
          <p>Content: {data.content} </p>
          <p>Period: {moment(data.dateshow).format('YYYY/DD/MM')} ~ {moment(data.datehide).format('YYYY/MM/DD')}</p>
          <p>Display: {data.showeverywhere ? 'show' : 'hide'}</p>
          <Button content='POST' onClick={handlePost}/>
          <Button content='PUT' onClick={handlePut}/>
          <Button content='DELETE' onClick={handleDelete}/>

        </Segment>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Banners;
