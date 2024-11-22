import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o middleware Multer para lidar com uploads de arquivos
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Importa funções controladoras do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const storage = multer.diskStorage({
  // Configura o armazenamento em disco para arquivos enviados
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads ("uploads/")
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage }); // Linux ou Mac
// Opcional: para outras plataformas, comente a linha anterior e use:
// const upload = multer({ dest: "./uploads" }) // Windows

// Função para configurar rotas da aplicação
const routes = (app) => {
  // Habilita o parser JSON para lidar com requisições com corpo JSON
  app.use(express.json());

  app.use(cors(corsOptions))

  // Rota GET para listar todos os posts (tratada pela função listarPosts)
  app.get('/posts', listarPosts);

  // Rota POST para criar um novo post (tratada pela função postarNovoPost)
  app.post('/posts', postarNovoPost);

  // Rota POST para upload de imagem (usa middleware upload.single('imagem') e é tratada pela função uploadImagem)
  app.post('/upload', upload.single('imagem'), uploadImagem);

  app.put('/upload/:id', atualizarNovoPost)
};

// Exporta a função routes como padrão para ser importada em outros módulos
export default routes;