import React, {  useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import ListadoPlayers from './ListadoPlayers'

const Players = () => {
  const { register, handleSubmit } = useForm();
  
  const [lista, setLista] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.get('http://localhost:4000/api/players', {
        params: data
      });
      
      setLista(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
     <h1>Players</h1>
     <hr />
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Filtro:</label>
              <input type="text" className="form-control" {...register('filtro')} />
            </div>
            <div className="mb-3">
              <label className="form-label">Orden:</label>
              <select className="form-control" {...register('orden')}>
                <option value="">Seleccione...</option>
                <option value="id">ID</option>
                <option value="fullName">Nombre</option>
                <option value="nickname">Nickname</option>
              </select>
            </div>
            
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
      {lista && <ListadoPlayers lista={lista} />}
    </div>
  );
};

export default Players;


/*



{
  filtro: 'adri',
  orden: 'id'
}

http://localhost:4000/api/players?filtro=adri&orden=id


[{"id":438,"full_name":"Adriane Thies","email":"athiesc5@meetup.com","nickname":"athiesc5","ip_address":"183.174.165.202","age":23,"avatar":"https://robohash.org/voluptatemquisquamdoloremque.png?size=50x50&set=set1"}]





*/