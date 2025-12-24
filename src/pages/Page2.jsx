import { useNavigate , useLocation } from 'react-router-dom';
import { Form , Input , Button , message} from 'antd';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '../API/api.jsx';
import { useState } from 'react';
import '../styles/page2.css';

export const Page2 = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state;
    const [createdProduct, setCreatedProduct] = useState(null);

    const mutation = useMutation({
        mutationFn : createProduct,
        onSuccess : (data)=>{
            data.imageUrl = product.imageUrl;
            setCreatedProduct(data);
            message.success("Product is created successfully");
        },
        onError : ()=>{
            message.error("Failed to create product");
        }
    });

    if(!product) 
        return <p>No product data. Go back and add a product.</p>

    return (
      <div className="page2-wrapper">

        {!createdProduct && (
          <div className="confirm-card">
            <h2>Confirm Product Details</h2>

            <Form
              layout="vertical"
              initialValues={product}
              onFinish={(values)=> mutation.mutate(values)}
            >
              <Form.Item label="Title" name="title">
                <Input disabled />
              </Form.Item>

              <Form.Item label="Price" name="price">
                <Input disabled />
              </Form.Item>

              <Form.Item label="Brand" name="brand">
                <Input disabled />
              </Form.Item>

              <Form.Item label="Image URL" name="imageUrl">
                <Input disabled />
              </Form.Item>

              <Form.Item label="Category" name="category">
                <Input disabled />
              </Form.Item>

              <p className="confirm-text">Are you sure you want to create this product?</p>

              <div className="btn-row">
                <Button onClick={() => navigate("/")}>Cancel</Button>

                <Button 
                  type="primary"
                  htmlType="submit"
                  loading={mutation.isLoading}
                >
                  Submit Product
                </Button>
              </div>
            </Form>
          </div>
        )}

        {createdProduct && (
          <div className="success-card">
            <h2>Product Created Successfully</h2>
            <img 
              src={createdProduct.imageUrl} 
              alt="product" 
              style={{
                width: "150px",
                borderRadius: "10px",
                marginBottom: "15px"
              }}
            />
            <p><b>Title:</b> {createdProduct.title}</p>
            <p><b>Price:</b> {createdProduct.price}</p>
            <p><b>Brand:</b> {createdProduct.brand}</p>
            <p><b>Category:</b> {createdProduct.category}</p>

            <Button 
              type="primary" 
              onClick={() => navigate("/products")}
              block
              style={{ marginTop: 20 }}
            >
              Go to Products Page
            </Button>
          </div>
        )}

      </div>
    );
};
