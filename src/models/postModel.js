import 'dotev/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";


// Conecta ao banco de dados usando a string de conexão fornecida no ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados 'imersao-instabytes'
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção 'posts' dentro do banco de dados
    const coleçao = db.collection("posts");
    // Retorna todos os documentos da coleção como um array
    return coleçao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const coleçao = db.collection("posts");
    return coleçao.insertOne(novoPost);
}

export async function atualizarPost(id, post) {
    const db = conexao.db("imersao-instabytes");
    const coleçao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return coleçao.updateOne({_id: new ObjectId(objID)}, {$set: post})
}