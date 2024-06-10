import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, addPost, deletePost } from '../store/dataSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState('');
  const [tempFilterText, setTempFilterText] = useState('');
  const { data } = useSelector((state) => state.data);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  // Get posts on startup

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // Filter

  useEffect(() => {
    if (!filterText) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
      ));
    }
  }, [data, filterText]);

  const handleFilterChange = (event) => {
    setTempFilterText(event.target.value);
  };

  const handleFilterButtonClick = () => {
    setFilterText(tempFilterText);
  };

  const handleClearButtonClick = () => {
    setFilterText('');
    setTempFilterText('');
  };

  // Messages

  let timeoutId;
  
  const showMessage = (msg) => {
    setMessage(msg);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  // Delete

  const handleDeleteButtonClick = async (id) => {
    showMessage('Borrando post...');
    try {
      await dispatch(deletePost(id));
      showMessage('Post borrado exitosamente.');
    } catch (error) {
      showMessage('Post no pudo ser borrado.');
    }
  };

  // Create

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCreateButtonClick = async () => {
    showMessage('Creando post...');
    const nameExists = data.some(item => item.name === name);
    if (nameExists) {
      showMessage('Ya existe un post con ese nombre.');
      return;
    }
    const newPost = {
      name: name,
      description: description
    };
    setName('');
    setDescription('');
    try {
      await dispatch(addPost(newPost));
      if (filterText.length > 0) {
        showMessage('Post creado exitosamente (filtro impide verlo).');
      } else {
        showMessage('Post creado exitosamente.');
      }
    } catch (error) {
      showMessage('Post no pudo ser creado.');
    }
  };

  const isFilterButtonDisabled = tempFilterText.length === 0;
  const isRemoveFilterButtonDisabled = filterText.length === 0;
  const isCreateButtonDisabled = name.trim() === '' || description.trim() === '';

  return (
    <div className="App">
      <div className="outer-container">
        <div className="inner-container">
          <input type="text" placeholder="Filtro de nombre" value={tempFilterText} onChange={handleFilterChange} />
          <div id="filter-container">
            <button onClick={handleFilterButtonClick} disabled={isFilterButtonDisabled}>Filtrar</button>
            <button onClick={handleClearButtonClick} id="remove-filter-button" disabled={isRemoveFilterButtonDisabled}>Quitar filtro</button>
          </div>
        </div>
        <div className="inner-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="no-data">(sin datos)</td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td className="word-break">{item.name}</td>
                    <td>{item.description}</td>
                    <td>
                      <button onClick={() => handleDeleteButtonClick(item.id)} id="delete-button">Eliminar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="inner-container">
          <div id="create-container">
            <input type="text" placeholder="Nombre" value={name} onChange={handleNameChange} id="name-textbox" />
            <input type="text" placeholder="Descripción" value={description} onChange={handleDescriptionChange} />
          </div>
          <button onClick={handleCreateButtonClick} disabled={isCreateButtonDisabled}>Crear</button>
        </div>
        <div id="message-container">
          {message}
        </div>
      </div>
    </div>
  );
}

export default App;
