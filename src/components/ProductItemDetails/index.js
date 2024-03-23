import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import {BsPlusSquare} from 'react-icons/bs'
import {BsDashSquare} from 'react-icons/bs'

import './index.css'

class ProductItemDetails extends Component {
  state = {productItemDetails: {}, similarList: [], isLoading: true, count: 1}

  componentDidMount() {
    const jwtToken = Cookies.get('jwt_token')
    const {history} = this.props

    if (jwtToken === undefined) {
      history.replace('/')
    } else {
      this.getProductDetails()
    }
  }

  onInCreament = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDeCreament = () => {
    if (this.state.count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  handleContinueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  getProductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const updatedData = {
      id: data.id,
      imageUrl: data.image_url,
      title: data.title,
      price: data.price,
      description: data.description,
      brand: data.brand,
      totalReviews: data.total_reviews,
      rating: data.rating,
      availability: data.availability,
    }
    const formattedData = data.similar_products.map(product => ({
      id: product.id,
      imageUrl: product.image_url,
      title: product.title,
      style: product.style,
      price: product.price,
      description: product.description,
      brand: product.brand,
      totalReviews: product.total_reviews,
      rating: product.rating,
      availability: product.availability,
    }))

    this.setState({
      isLoading: false,
      productItemDetails: updatedData,
      similarList: formattedData,
    })
  }

  renderProductItemDetails = () => {
    const {productItemDetails, count} = this.state
    const {
      id,
      imageUrl,
      title,
      brand,
      price,
      description,
      totalReviews,
      rating,
      availability,
    } = productItemDetails

    return (
      <div className="product-details-container" key={id}>
        <img src={imageUrl} alt="product" className="product-image" />
        <div>
          <h1 className="product-details-heading">{title}</h1>
          <p className="product-details-price">Rs {price}/-</p>
          <p className="ratting-btn" type="button">
            {rating}{' '}
            <img
              className="star-img"
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
            />
          </p>
          <p className="review-text">{totalReviews} Reviews</p>
          <p className="product-description">{description}</p>
          <p className="product-texts">Available: {availability}</p>
          <p className="product-texts">Brand: {brand}</p>
          <hr />
          <div className="add-to-cart-contianer">
            <button
              type="button"
              data-testid="minus"
              onClick={this.onDeCreament}
            >
              {' '}
              <BsDashSquare />{' '}
            </button>
            <p> {count} </p>
            <button data-testid="plus" onClick={this.onInCreament}>
              {' '}
              <BsPlusSquare />{' '}
            </button>
          </div>
          <button className="addCart-btn">ADD TO CART</button>
        </div>
      </div>
    )
  }

  renderSimilarProduct = () => {
    const {similarList} = this.state
    return (
      <div>
        <h1 className="similar-product-header">Similar Products</h1>
        <ul className="similar-product-container">
          {similarList.map(product => (
            <SimilarProductItem product={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <button type="button" onClick={this.handleContinueShopping}>
        Continue Shopping
      </button>
    </div>
  )

  render() {
    const {isLoading, productItemDetails} = this.state

    return (
      <div>
        <Header />
        <div>
          {isLoading
            ? this.renderLoader()
            : Object.keys(productItemDetails).length !== 0
            ? this.renderProductItemDetails()
            : this.renderFailure()}
        </div>
        {this.renderSimilarProduct()}
      </div>
    )
  }
}

export default ProductItemDetails
