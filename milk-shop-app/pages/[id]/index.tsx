import { useCartContext } from '@/helpers/CartContext';
import { colors } from '@/helpers/colors';
import { HOST, fetchById } from '@/helpers/productsApi';
import { ProductType } from '@/types';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function ProductPage() {
  const [product, setProduct] = useState<ProductType>();
  const [storageCount, setStorageCount] = useState(1);
  const router = useRouter();
  const id = router.query.id as string;
  const { addProductToCart, setIsCartOpen } = useCartContext();

  const handleOrder = () => {
    if (!product) return;
    addProductToCart(product, storageCount);
    setIsCartOpen(true);
  };

  useEffect(() => {
    const getProduct = async () => {
      const result = await fetchById(id);
      setProduct(result);
    };
    if (!id) {
      return;
    }
    getProduct();
  }, [id]);

  return (
    <ContentContainer>
      <BackToMain onClick={() => router.back()}>
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          style={{ width: 15, paddingRight: 10 }}
        />{' '}
        Back to All Products
      </BackToMain>
      {!product ? (
        <NoProduct>Sorry, this product no longer exist</NoProduct>
      ) : (
        <ProductContainer>
          <ImageContainer>
            <Image src={`${HOST}/${product.image}`} />
          </ImageContainer>
          <DetailContainer>
            <ProductName>{product.name}</ProductName>
            <ProductText>{product.type}</ProductText>
            <ProductStorage>{product.storage} liters</ProductStorage>
            <InputRange
              type="range"
              name="storage"
              min="0"
              max={product.storage}
              step="1"
              value={storageCount}
              onChange={(e) => setStorageCount(parseInt(e.target.value))}
            />
            <ProductText>
              Qty:{'  '}
              <InputNumber
                type="number"
                value={storageCount}
                onChange={(e) => setStorageCount(parseInt(e.target.value))}
              />
              {'  '}Liter(s)
            </ProductText>
            <OrderButton disabled={storageCount <= 0} onClick={handleOrder}>
              Add to cart
            </OrderButton>
          </DetailContainer>
        </ProductContainer>
      )}
    </ContentContainer>
  );
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  margin-top: 50px;
`;

const BackToMain = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
`;

const NoProduct = styled.p`
  width: 90%;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-top: 150px;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 100px;
  justify-content: center;

  @media screen and (min-width: 800px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.darkPink};
  border-radius: 8px;
`;

const Image = styled.img`
  width: 200px;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.h4`
  color: #000;
  font-weight: bold;
  margin: 4px;
  margin-bottom: 10px;
`;

const ProductText = styled.p`
  color: ${colors.grey};
  margin: 2px;
  font-size: 0.9em;
`;

const ProductStorage = styled.p`
  color: ${colors.brownIsh};
  margin: 2px;
  font-size: 0.9em;
  margin-bottom: 80px;
`;

const InputRange = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  border-radius: 16px;

  &::-webkit-slider-runnable-track {
    height: 15px;
    background: ${colors.light};
    border-radius: 16px;
  }

  &::-moz-range-track {
    height: 15px;
    background: ${colors.light};
    border-radius: 16px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    width: 15px;
    background-color: #fff;
    border-radius: 50%;
    border: 2px solid ${colors.darkPink};
    box-shadow: -407px 0 0 400px ${colors.darkPink};
  }

  &::-moz-range-thumb {
    height: 15px;
    width: 15px;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid ${colors.darkPink};
    box-shadow: -407px 0 0 400px ${colors.darkPink};
  }
`;

const InputNumber = styled.input`
  width: 40px;
  padding: 5px;
  padding-left: 10px;
  border: 2px solid ${colors.darkPink};
  border-radius: 8px;
`;

const OrderButton = styled.button`
  align-self: start;
  border: 0;
  padding: 8px 100px;
  margin-top: 20px;
  background-color: ${colors.light};
  color: ${colors.dark};
  font-weight: 600;
  border-radius: 8px;
  border: 2px solid ${colors.lightPink};
  cursor: pointer;

  &:hover {
    border: 2px solid ${colors.dark};
  }
`;
