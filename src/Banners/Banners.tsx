import { Spinner } from '@fms/salesmgmt-layout';
import axios from 'axios';
import { parse } from 'query-string';
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { Banner, initBanner, initState, State } from '../components/types';
import './Banners.css';
import BannersDisplay from './BannersDisplay';
import BannersForm from './BannersForm';
import BannersTable from './tables/BannersTable';

const Banners = ({ history, location }: any) => {
  const { pathname, search } = location;
  const [state, setState] = useState<State>(initState);
  const [data, setData] = useState<Banner>(initBanner);
  const newMode = pathname === '/ui/banner/new'
  const listMode = pathname === '/ui/banner/list'
  const { id } = parse(search);
  const { date } = parse(search);


  useEffect(() => {
    setState(initState)
    if (pathname !== '/ui/banner/new') {
      fetchBanners()
      return;
    }
    setData(initBanner)
    setState({ ...state, loading: false });
  }, [location, history]); // eslint-disable-line

  const determinePath = (): string => {
    if (pathname === '/ui/banner/list') {
      return 'list'
    }
    if(date) return `?date=${date}`
    if(id) return id.toString()
    return '';
  }

  const fetchBanners = () => {
    return axios
      .get(`http://localhost:5000/api/banner/${determinePath()}`)
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

  const handleSubmit = () => {
    if (newMode) {
      const postData = {...data, id: null}
      return axios
      .post('http://localhost:5000/api/banner/', postData)
      .then(() => {
        history.push('/ui/banner/list')
      })
      .catch((err: any) => {
        console.error(err)
      });
    } 
    return axios
    .put(`http://localhost:5000/api/banner/${data.id}`, data)
    .then(() => {
      history.push(`/ui/banner?id=${data.bannerId}`)
    })
    .catch((err: any) => {
      console.error(err)
    });
  }

  const handleDelete = (deleteId: number) => { 
    return axios
    .delete(`http://localhost:5000/api/banner/${deleteId ? deleteId : ''}`)
    .then(response => {
      setData(initBanner)
      history.push('/ui/banner/list')
    })
    .catch((err: any) => {
      console.error(err)
    });
  }
  const renderData = () => {
    return !data.length ? (
      <BannersDisplay banner={data} handleDelete={handleDelete}listMode={listMode}/> 
    ) : (
    data
      .sort((a: Banner, b: Banner) => (a.bannerId || 0) - (b.bannerId || 0))
      .map((b:any, k: number) => <BannersDisplay key={k} handleDelete={handleDelete} banner={b} listMode={listMode} />)
    )
  }
  return (
    <>
      <h3 className='banner_header'>Banners</h3>
      {state.loading ? <Spinner /> : <></>}
      {state.error || state.message ? (
        renderMessage(state.error, state.message)
      ) : (
        <></>
      )}
      <Button.Group className='banner_listButtons' floated='left' size='tiny' >
        <Button onClick={() => history.push('/ui/banner/list')} content='List View' />
        <Button onClick={() => history.push('/ui/banner/new')} color='vk' content='+ New Banner' />
      </Button.Group>
      <div className='banner_container'>
      {data ? (
        <>
        {data.id ? (
          <BannersForm 
            banner={data} 
            handleSubmit={handleSubmit}
            onFormValueChange={onFormValueChange}
          />
          ) : (
            <></>
          )}
          {newMode ? (
          <BannersForm 
            banner={initBanner} 
            handleSubmit={handleSubmit}
            onFormValueChange={onFormValueChange}
          />
          ) : (
            <></>
          )}
          {listMode && data.length ? <BannersTable banners={data} /> : <></>}
          {!newMode && !listMode ? renderData() : <></>}
        </>
        ) : (
        <></>
      )}
    </div>
    </>
  );
};

export default Banners;
