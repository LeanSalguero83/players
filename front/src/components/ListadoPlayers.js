import React from 'react';

const ListadoPlayers = ({ lista }) => {
  
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Nickname</th>
            <th>IP Address</th>
            <th>Age</th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
             <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.full_name}</td>
              <td>{item.email}</td>
              <td>{item.nickname}</td>
              <td>{item.ip_address}</td>
              <td>{item.age}</td>
              <td><img src={item.avatar} alt="Avatar" style={{width: "50px", height: "50px"}} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default ListadoPlayers;
