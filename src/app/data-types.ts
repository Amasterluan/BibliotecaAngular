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
    id:number;
    quantity:undefined | number;
    productId:undefined|number;
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

  export interface priceSummary{
    price:number;
    discount:number;
    delivery:number;
    total:number;
  }

  export interface order {
    email: string;
    cpf: string; 
    name: string;
    address: string;
    numberPhone: string;
    city: string;
    state: string;
    CEP: string; 
    totalPrice: number;
    userId: number; 
    id: number | undefined;
  }
  
  