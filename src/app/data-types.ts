export interface SingUp{
    name:string,
    password:string,
    email:string
}

export interface login{
    email:string,
    password:string,
}

export interface product {
    imagemLivro: string;
    nomeLivro: string;
    nomeAutor: string;
    categoria: string;
    descricaoLivro: string;
    preco: number;
    estoque: number;
    id:number
    quantity:undefined | number;
  }

export interface cart {
    imagemLivro: string;
    nomeLivro: string;
    nomeAutor: string;
    categoria: string;
    descricaoLivro: string;
    preco: number;
    estoque: number;
    id:number | undefined;
    quantity:undefined | number;
    userId:number;
    productId:number;
  }
  