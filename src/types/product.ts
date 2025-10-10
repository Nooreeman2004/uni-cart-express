// Product type definition to match MongoDB schema
export interface Product {
  _id?: string; // MongoDB ObjectId (optional for new products)
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductFormData = Omit<Product, '_id' | 'createdAt' | 'updatedAt'>;
