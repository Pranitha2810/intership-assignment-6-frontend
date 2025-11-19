import { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Input, Select, Table, Space, Button, Modal, Form } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../API/api.jsx';
import { useNavigate } from 'react-router-dom';
import '../styles/page1.css';

export const Page1 = () => {
  const [startdate, setStartdate] = useState(dayjs().subtract(7, "day"));
  const [enddate, setEnddate] = useState(dayjs());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const disableEndDates = (current) => {
    return current && current <= startdate;
  };

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  const filteredProducts = products?.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  let finalProducts = filteredProducts;

  if (filter === "price-low") {
    finalProducts = [...finalProducts].sort((a, b) => a.price - b.price);
  }
  if (filter === "price-high") {
    finalProducts = [...finalProducts].sort((a, b) => b.price - a.price);
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error in fetching...</p>

  return (
    <div className="page1-wrapper">

      <div className="page1-header">
        <h2>Products Dashboard</h2>
        <p className="subtitle">Search, filter, and add new products</p>
      </div>

      {/* Filters section */}
      <div className="filters-container">
        <DatePicker 
          value={startdate}
          format="DD-MM-YYYY"
          onChange={(d) => setStartdate(d)}
        />

        <DatePicker 
          value={enddate}
          format="DD-MM-YYYY"
          onChange={(d) => setEnddate(d)}
          disabledDate={disableEndDates}
        />

        <Input 
          className="search-input"
          placeholder="Search products..."
          allowClear
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select 
          placeholder="Filter"
          onChange={(value) => setFilter(value)}
          allowClear
          className="filter-select"
        >
          <Select.Option value="price-low">Price: Low → High</Select.Option>
          <Select.Option value="price-high">Price: High → Low</Select.Option>
        </Select>

        <Button type="primary" onClick={() => setOpen(true)}>
          + Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <Table 
            rowKey="id"
            dataSource={finalProducts}
            className="styled-table"
            columns={[
              { 
                title: "Image",
                dataIndex: "thumbnail",
                render: (_, record) => (
                  <img 
                    src={record.thumbnail || record.image} 
                    className="product-img"
                  />
                )
              },
              { title: "Title", dataIndex: "title" },
              { title: "Price", dataIndex: "price" },
              { title: "Brand", dataIndex: "brand" },
              { title: "Category", dataIndex: "category" }
            ]}
          />
      </div>

      {/* Modal */}
      <Modal 
        title="Add New Product" 
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        className="styled-modal"
      >
        <Form 
          layout="vertical" 
          onFinish={(values) => {
            setOpen(false);
            navigate("/confirm", { state: values });
          }}
        >
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Brand" name="brand" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item 
          label="Image URL" 
          name="image"
          rules={[{ required: true, message: "Please enter an image URL" }]}
        >
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Continue
          </Button>
        </Form>
      </Modal>

    </div>
  );
};
