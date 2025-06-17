import { Produto } from "./produto";
export class Carrinho {
    public id: number= 0;
    public total:number= 0;
    public itens:Produto[] = [];
}
