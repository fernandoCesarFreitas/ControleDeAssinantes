import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router(); // Cria um roteador Express
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Define o caminho da pasta onde os arquivos serão salvos
      const dest = path.join(__dirname, '../imgsAssinantes/');
      cb(null, dest);
    },
    filename: function (req, file, cb) {
      // Define o nome do arquivo
      // Aqui estamos usando o nome original do arquivo, mas você pode mudar isso para o que quiser
      cb(null, file.originalname);
    }
});
  
  const upload = multer({ storage: storage });
  
  router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.status(200).json({ message: 'Arquivo enviado com sucesso!' });
  });

export default router; // Exporta o roteador