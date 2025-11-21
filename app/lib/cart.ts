export interface CartItemType {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number; // Kita butuh ini untuk CRUD update
}