import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../store/dataSlice';
import './Create.css';

const Create = ({ data, filterText, showMessage }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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
      name,
      description
    };
    try {
      await dispatch(addPost(newPost));
      if (filterText.length > 0) {
        showMessage('Post creado exitosamente (atención: filtro activo).');
      } else {
        showMessage('Post creado exitosamente.');
      }
    } catch (error) {
      showMessage('Post no pudo ser creado.');
    }
    setName('');
    setDescription('');
  };

  const isCreateButtonDisabled = name.trim() === '' || description.trim() === '';

  return (
    <div className="create-post-container">
      <div className="input-container">
        <input type="text" placeholder="Nombre" value={name} onChange={handleNameChange} className="name-textbox" />
        <input type="text" placeholder="Descripción" value={description} onChange={handleDescriptionChange} />
      </div>
      <button onClick={handleCreateButtonClick} disabled={isCreateButtonDisabled}>Crear</button>
    </div>
  );
};

export default Create;