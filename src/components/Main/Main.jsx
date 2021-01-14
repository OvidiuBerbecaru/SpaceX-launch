import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Grid, Container, Button } from '@material-ui/core'
import { fetchLaunches } from '../../utils/fetchUtils';
import './Main.scss';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import DataCard from '../DataCard/DataCard';
import { useAuth } from '../../providers/AuthProvider';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import logo from '../../assets/spacex-logo.png'

const getDataType = data => {
  if(data.upcoming) {
    return 'upcoming'
  }
  if(data.success) {
    return 'succes'
  }
  if(!data.success) {
    return 'fail'
  }
  return
}

const query = {
  all: null,
  past: { upcoming: false },
  upcoming: { upcoming: true },
  succesfull: { success: true },
  failed: { success: false },
}

const Main = () => {
  const { onLogout } = useAuth();

  const [selectedLaunch, setSelectedLaunch] = useState('all')
  const [cardData, setCardData] = useState([])
  const [recordsToFetch, setRecordsToFetch] = useState(1);
  const [hasMore, setHasMore] = useState(true)


  useEffect(() => {
    toast.success("Login Successful", {
      position:"top-right",
      autoClose: 1000,
    });
  }, [])

  useEffect(() => {
    setHasMore(true);
    fetchLaunches({ query: query[selectedLaunch], page: recordsToFetch })
      .then(res => {
        if(res.docs.length === 0 || res.docs.length < 20) {
          setHasMore(false);
        }
        setCardData([...cardData, ...res.docs])
      })
      .catch(error => {
        toast.error("We couldn't get the data. Please refresh the page", {
          position:"top-right",
          autoClose: 5000,
        });
      });

  }, [selectedLaunch, recordsToFetch])

  return (
    <div className="main">
      <img src={logo} alt="logo" width="400px"/>
      <Button className="logout" onClick={onLogout}>Logout</Button>
      <FormControl variant="outlined" className="select">
        <InputLabel htmlFor="outlined-age-native-simple">Select Launch</InputLabel>
        <Select
          native
          value={selectedLaunch}
          onChange={event => {
            setSelectedLaunch(event.target.value);
            setCardData([]);
            setRecordsToFetch(1);
          }}
          label="Select Launches"
        >
          <option value="all">All</option>
          <option value="past">Past Launches</option>
          <option value="upcoming">Upcoming Launches</option>
          <option value="succesfull">Succesfull</option>
          <option value="failed">Failed</option>
        </Select>
      </FormControl>
      <Container>
        <InfiniteScroll
          dataLength={cardData.length} 
          className="infinite-scroll"
          next={() => setRecordsToFetch(recordsToFetch + 1)}
          hasMore={hasMore}
          loader={<div className="loader"><CircularProgress /></div>}
          height={400}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>There are no more records</b>
            </p>
          }
        >
          <Grid
            container 
            spacing={8}
            direction="row"
            justify="center"
            alignItems="center"
            >
            {
              cardData.length > 0 && cardData.map(data => (
                <Grid container item xs={10} sm={3}>
                  <DataCard
                    name={data.name}
                    date={moment.unix(data['date_unix']).format('D MMMM yy')}
                    type={getDataType(data)}
                    shipType={data?.payloads[0]?.type !== undefined && data.payloads[0].type}
                    mass={data?.payloads[0]?.mass_kg !== undefined && data.payloads[0].mass_kg}
                    orbit={data?.payloads[0]?.orbit !== undefined && data.payloads[0].orbit}
                  />
                </Grid>
              ))
            }
          </Grid>
        </InfiniteScroll>
      </Container>
    </div>
  );
}

export default Main;