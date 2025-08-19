import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/products/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <div className="product-images">
        {product.images && product.images.length > 0 ? (
          product.images.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`${product.name} ${index + 1}`} 
              className="product-image"
            />
          ))
        ) : (
          <img 
            src="/placeholder-image.jpg" 
            alt="No product image available" 
            className="product-image"
          />
        )}
      </div>
      
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>
        
        <div className="product-meta">
          {product.category && <p><strong>Category:</strong> {product.category}</p>}
          {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
          {product.rating && <p><strong>Rating:</strong> {product.rating}/5</p>}
          {product.stock && <p><strong>Availability:</strong> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>}
        </div>

        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetail;