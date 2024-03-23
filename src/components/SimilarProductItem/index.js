import './index.css'

const SimilarProductItem = props => {
  const {product} = props
  const {id, imageUrl, title, brand, price, rating} = product

  return (
    <li key={id}>
      <img src={imageUrl} alt="similar product" className="similar-product-image" />
      <h1 className="similar-product-heading">{title}</h1>
      <p className="similar-product-brand">by {brand}</p>
      <div className="price-rating container">
        <p className="similar-product-price">Rs {price}/-</p>
        <button className="rating-btn">
          {rating}{' '}
          <img
            className="star-img"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </button>
      </div>
    </li>
  )
}
export default SimilarProductItem
