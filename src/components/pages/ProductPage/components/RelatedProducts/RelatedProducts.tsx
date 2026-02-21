import type { Product } from "@/types/product";
import Card from "@/components/UI/Card";
import s from './RelatedProducts.module.scss';


type RelatedProductsProps = {
  relatedProducts: Product[] | undefined;
  navigate: (path: string) => void;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ relatedProducts, navigate }) => {
  return (
    <div className={s.related}>
      {relatedProducts?.map((product) => {
        const image = product.images?.[0].url;
        return (
          <Card
            key={product.documentId}
            image={image}
            captionSlot={product.productCategory?.title}
            title={product.title}
            subtitle={product.description}
            contentSlot={`$${product.price}`}
            onClick={() => navigate(`/product/${product.documentId}`)}
          />
        );
      })}
    </div>
  )
}

export default RelatedProducts