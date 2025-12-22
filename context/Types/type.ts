export type product = {
  code: string;
  id: string;
  image: string;
  name: string;
  sellingPrice: number;
  seqId: number;
  stock: number;
  variantId?: string | null;
};

export type Like = {
  code: string;
  id: string;
  image: string;
  name: string;
  sellingPrice: number;
  seqId: number;
  stock: number;
};
