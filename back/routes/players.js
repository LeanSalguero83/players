const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op } = require("sequelize");

router.get("/api/players", async function (req, res) {
  try {
    let where = {};
    let order = [];
      
    if (req.query.filtro) {
      where = {
        [Op.or]: [
          {
            full_name: {
              [Op.like]: '%' + req.query.filtro + '%',
            },
          },
          {
            email: {
              [Op.like]: '%' + req.query.filtro + '%',
            },
          },
          {
            nickname: {
              [Op.like]: '%' + req.query.filtro + '%',
            },
          },
        ],
      };
    }

    
    if (req.query.orden) {
      switch(req.query.orden) {
        case 'id':
          order.push(['id', 'ASC']);
          break;
        case 'fullName':
          order.push(['full_name', 'ASC']);
          break;
        case 'nickname':
          order.push(['nickname', 'ASC']);
          break;
        default:
          return res.status(400).send({ error: 'Orden inválido' });
      }
    }
    
    let items = await db.players.findAndCountAll({
      attributes: [
        "id",
        "full_name",
        "email",
        "nickname",
        "ip_address",
        "age",
        "avatar",
      ],
      order,
      where,
    });

    res.json(items.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Ocurrió un error al buscar jugadores' });
  }
});

module.exports = router;


/*Filtro por nombre:

bash
Copy code
http://localhost:4000/api/players?filtro=Nial
Esta consulta devolverá todos los jugadores cuyo nombre completo, email o apodo contenga "Nial".

Orden por nombre completo:

bash
Copy code
http://localhost:4000/api/players?orden=fullName
Esta consulta devolverá todos los jugadores ordenados por su nombre completo en orden ascendente.

Filtro por email y orden por nombre completo:

bash
Copy code
http://localhost:4000/api/players?filtro=kickstarter&orden=fullName
Esta consulta devolverá todos los jugadores cuyo nombre completo, email o apodo contenga "kickstarter", ordenados por su nombre completo en orden ascendente.

Filtro por apodo y orden por apodo:

bash
Copy code
http://localhost:4000/api/players?filtro=dtibols6&orden=nickname
Esta consulta devolverá todos los jugadores cuyo nombre completo, email o apodo contenga "dtibols6", ordenados por su apodo en orden ascendente.

Orden por ID:

bash
Copy code
http://localhost:4000/api/players?orden=id
Esta consulta devolverá todos los jugadores ordenados por su ID en orden ascendente.










*/


