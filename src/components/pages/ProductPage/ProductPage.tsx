import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/api/getProductById";
import type { Product } from "@/types/product";
import Loader from "@/components/UI/Loader";
import s from './ProductPage.module.scss';
import { getProductsByCategory } from "@/api/getProductCategory";
import RelatedProducts from "./components/RelatedProducts";
import ChangedProduct from "./components/ChangedProduct";

const ProductPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[] | undefined>(undefined)

  useEffect(() => {
    if (!documentId) return;
    setLoading(true);
    getProductById(documentId)
      .then((data) => {
        setProduct(data)
        console.log(data, 'одна сущность')
      })
      .finally(() => setLoading(false));
  }, [documentId]);

  useEffect(() => {
    if (!product?.productCategory?.documentId) return;
    getProductsByCategory(product.productCategory.documentId)
      .then((data) => {
        setRelatedProducts(data.data)
        console.log(data, 'related')
      })
  }, [product?.productCategory?.documentId])

  if (loading) {
    return (
      <div className={s.loader}>
        <Loader size="l" />
      </div>
    );
  }

  if (!product) {
    return <div className={s.notFound}>Товар не найден</div>;
  }

  const image = product.images?.[0]?.url || '';

  return (
    <div className={s.page}>
      <button className={s.back} onClick={() => navigate(-1)}>← Назад</button>
      <ChangedProduct product={product} image={image} />
      <RelatedProducts relatedProducts={relatedProducts} navigate={navigate} />
    </div>
  );
};

export default ProductPage