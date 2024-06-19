import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store/dataSlice';
import Filter from './Filter/Filter';
import Table from './Table/Table';
import Create from './Create/Create';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState('');
  const { data } = useSelector((state) => state.data);
  const [filteredData, setFilteredData] = useState([]);
  const [message, setMessage] = useState('');
  var timeoutId;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (!filterText) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
      ));
    }
  }, [data, filterText]);

  const showMessage = (msg) => {
    setMessage(msg);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  return (
    <div className="App">
      <div className="outer-container">
        <Filter
          onFilterChange={setFilterText}
        />
        <Table
          filteredData={filteredData}
          showMessage={showMessage}
        />
        <Create
          data={data}
          filterText={filterText}
          showMessage={showMessage}
        />
        <div className="message-container">
          {message}
        </div>
      </div>
    </div>
  );
}

export default App;
