const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const route = './';


/* GET home page. */
router.get('/', function(req, res, next) {
  let pathSFTP = route; //+ __dirname;
  let response = getFileInfoFromFolder(pathSFTP);

  console.log(response);
  res.render('carpetaFTP/index', { response:response, rutaFTP:route });
});

module.exports = router;

function sortJSON(data, key) {
  return data.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
};

function getFileInfoFromFolder(route) {
  const files = fs.readdirSync(route, 'utf8');
  const response = [];
  for (let file of files) {
    let extension = path.extname(file);
    let contenido = null;
    if (extension == '') {
      console.log(file);
      archivos = fs.readdirSync(route + file, 'utf8');
      contenido = [];
      for (let archivo of archivos) {
        let dataArchivo = {
          nombre: archivo,
          extension: path.extname(archivo)
        };
        contenido.push(dataArchivo);
      }
    }
    response.push({ nombre: file, extension, contenido });
  }
  sortJSON(response, 'extension');
  return response;
}
