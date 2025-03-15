import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import * as yup from 'yup'
import { Formik } from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css'
import './products.css'
import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useProductsMutation } from '../../services/product.service'
import { ProductApiQuery, ProductApiResponse } from '../../interfaces/product.interface'
import { useCouponsMutation } from '../../services/cupon.service'
import Modal from 'react-bootstrap/Modal'
import calculateTotalPrice from '../../common/extract-price'

const schema = yup.object().shape({
  limit: yup.string().required(),
  sitename: yup.string().required(),
  start: yup.string().required(),
})

const Products = () => {
  const [products, { data, error, isLoading }] = useProductsMutation()
  const [coupons, { data: dataCoupons }] = useCouponsMutation()
  const [selectedCoupon, setSelectedCoupon] = useState('');
  const [selectedSeller, setSelectedSeller] = useState('');
  const [page, setPage] = useState(0);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cart, setCart] = useState<Array<ProductApiResponse['data'][0]>>([{
    id: 0,
    attributes: {
      updatedAt: '',
      title: '',
      image: '',
      price_from: '',
      price: 'R$ 0,00',
      link: '',
      uuid: '',
      createdAt: '',
      seller: '',
      highlight: false,
      free_shipping: false,
      free_shipping_prime: false,
      coupon: null,
      hidePrice: false,
      extraInfo: null,
      shipping: null,
      installment: null,
      updatedAt_timestamp: null,
      updatedAt_unixTimestamp: 0,
      initial_link: null,
    }
  }]);

  const getProducts = (formValue: ProductApiQuery) => {
    const { limit, sitename } = formValue
    products({
      limit,
      sitename,
      start: page * 10,
      coupon: selectedCoupon,
      sellers: selectedSeller
    });
  }

  useEffect(() => {
    if (!dataCoupons) {
      coupons({ sitename: "espionandopromos", start: 0, limit: 5000 })
    }
    getProducts({
      start: page * 10,
      limit: 10,
      sitename: 'espionandopromos',
      coupon: selectedCoupon,
      sellers: selectedSeller
    });
  }, [page, selectedCoupon, selectedSeller]);



  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleCouponChange = (value: any) => {
    setSelectedCoupon(value);
  };

  const handleSellerChange = (value: any) => {
    setSelectedSeller(value);
  };

  const handleAddToCart = (product: ProductApiResponse['data'][0]) => {
    setCart([...cart, product]);
  }
  const handleRemoveFromCart = (productId: number) => {
    setCart(cart.filter(product => product.id !== productId));
  }

  const handleShowCartModal = () => setShowCartModal(true);
  const handleCloseCartModal = () => setShowCartModal(false);

  const handleClear = () => {
    setSelectedCoupon('')
    setSelectedSeller('')
    setPage(0)
    getProducts({
      start: page * 10,
      limit: 10,
      sitename: 'espionandopromos',
      coupon: selectedCoupon,
      sellers: selectedSeller
    });
  }

  console.log('data', data)
  console.log('cart', cart)


  return (
    <div className='products-container'>
      <header>
        <img className='icon-header' src='https://www.divulgadorinteligente.com/website-assets/img/logo.svg' />
      </header>
      <Formik
        validationSchema={schema}
        onSubmit={getProducts}
        initialValues={{
          start: 0,
          limit: 10,
          sitename: 'espionandopromos',
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
          <div className='filter-form'>
            <Card.Title className="title">Produtos</Card.Title>
            <Form className="form" noValidate onSubmit={handleSubmit}>
              <div>
                <Form.Group as={Col} md="12" controlId="validationFormikCoupon">
                  <Form.Label className='font-labels'>Selecionar cupom</Form.Label>
                  <Form.Control
                    as="select"
                    name="coupon"
                    value={selectedCoupon}
                    onChange={(ev) => handleCouponChange(ev.target.value)}
                  >
                    <option value="">Selecione um cupom</option>
                    {dataCoupons && dataCoupons.data.map((coupon) => (
                      <option key={coupon.id} value={coupon.attributes.code}>
                        {coupon.attributes.title} - {coupon.attributes.code}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group style={{ marginTop: '2rem' }} as={Col} md="12" controlId="validationFormikCoupon">
                  <Form.Label className='font-labels'>Selecionar vendedor</Form.Label>
                  <Form.Control
                    as="select"
                    name="seller"
                    value={selectedSeller}
                    onChange={(ev) => handleSellerChange(ev.target.value)}
                  >
                    <option value="">Selecione um vendedor</option>
                    {dataCoupons && dataCoupons.data.map((coupon) => (
                      <option key={coupon.id} value={coupon.attributes.seller}>
                        {coupon.attributes.seller}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
              <div className='filter-button-container'>
                <Button className='card-button' onClick={handleClear}>Limpar filtro</Button>
                <Button className='card-button' onClick={handlePreviousPage} disabled={page === 0}>Anterior</Button>
                <Button className='card-button' onClick={handleNextPage}>Próximo</Button>
                <Button className='card-button' onClick={handleShowCartModal}>Carrinho ({cart.filter(el => el.id !== 0).length})</Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {
        data && (
          <div className="product-list">
            {data.data.map((product) => (
              <Card key={product.id} className="product-card" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.attributes.image} />
                <Card.Body>
                  <Card.Title>{product.attributes.title}</Card.Title>
                  <Card.Text>
                    Preço: <h3>{product.attributes.price}</h3>
                    <br />
                    Vendedor: {product.attributes.seller}
                  </Card.Text>
                  <div className='product-card-button-container'>
                    <Button className='card-button' variant="primary" href={product.attributes.link} target="_blank">
                      Ir para o produto
                    </Button>
                    <Button className='card-button' onClick={() => handleAddToCart(product)}>
                      Adicionar ao carrinho
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )
      }

      <Modal show={showCartModal} onHide={handleCloseCartModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }}>Carrinho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p style={{ color: 'black' }}>O carrinho está vazio.</p>
          ) : (
            <div style={{
              display: 'flex',
              gap: '2rem'
            }}>
              <ul>
                {cart.filter(el => el.id !== 0).map((item, index) => (
                  <li key={index}>
                    <p style={{ color: 'black' }}>
                      {item.attributes.title}
                    </p>
                    <p style={{ color: 'black' }}>
                      {item.attributes.price}
                    </p>
                    <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
                      Remover
                    </Button>
                  </li>
                ))}
              </ul>
              <h3 style={{ color: 'black' }}>
                Total: R$ {calculateTotalPrice(cart).toFixed(2)}
              </h3>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCartModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}

export default Products
