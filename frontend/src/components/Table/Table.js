import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../store/dataSlice';
import './Table.css';

const Table = ({ filteredData, showMessage }) => {
  const dispatch = useDispatch();
  
  const handleDeleteButtonClick = async (id) => {
    showMessage('Borrando post...');
    try {
      await dispatch(deletePost(id));
      showMessage('Post borrado exitosamente.');
    } catch (error) {
      showMessage('Post no pudo ser borrado.');
    }
  };

  return (
    <div className="post-table-container">
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
                  <button onClick={() => handleDeleteButtonClick(item.id)} className="delete-button">Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;