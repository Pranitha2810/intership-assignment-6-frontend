import { useState } from 'react';
import { DatePicker } from 'antd';
import  dayjs  from 'dayjs';
import { Input ,Select,Table,Space ,Button , Modal , Form} from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../API/api.jsx';
import { useNavigate } from 'react-router-dom';
import './page1.css';

export const Page1 = ()=>{
    const [startdate,setStartdate] = useState(dayjs().subtract(7,"day"));
    const [enddate,setEnddate] = useState(dayjs());
    const [search,setSearch] = useState("");
    const [filter , setFilter] = useState("");
    const [open,setOpen] = useState(false);
    const navigate = useNavigate();

    const disableEndDates = (current)=>{
        return current && current <=startdate
    }

    const { data : products ,isLoading,isError } = useQuery({
        queryKey : ["products"],
        queryFn : fetchProducts
    })

    const filteredProducts = products?.filter((item)=>{
        return item.title.toLowerCase().includes(search.toLowerCase());
    });

    let finalProducts = filteredProducts;

    if (filter === "price-low")
    {
        finalProducts = [...finalProducts].sort((a, b) => a.price - b.price);
    }
    if (filter === "price-high") {
        finalProducts = [...finalProducts].sort((a, b) => b.price - a.price);
    }

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Error in fetching...</p>
    return (
  <div className="page1-container">

    <div className="filters">
      <DatePicker 
        placeholder="start date" 
        value={startdate}
        format="DD-MM-YYYY"
        onChange={(d)=> setStartdate(d)}
      />

      <DatePicker 
        placeholder="end date"
        value={enddate}
        format="DD-MM-YYYY"
        onChange={(d)=> setEnddate(d)}
        disabledDate={disableEndDates}
      />

      <Button 
        type="primary" 
        onClick={() => setOpen(true)}
      >
        Add new product
      </Button>
    </div>

    <div className="input-wrapper">
      <Space.Compact style={{ width: 500 }}>
        <Input
          placeholder="search products.."
          allowClear
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="large"
        />
      </Space.Compact>
    </div>

    <div className="section">
      <Select 
        style={{ width: 300 }} 
        placeholder="Filter"
        onChange={(value)=> setFilter(value)}
        allowClear
      >
        <Select.Option value="price-low">Price: Low to High</Select.Option>
        <Select.Option value="price-high">Price: High to Low</Select.Option>
      </Select>
    </div>

    <div className="section">
      <Table 
        rowKey="id"
        dataSource={finalProducts}
        columns={[
          { title: "Title", dataIndex: "title" },
          { title: "Price", dataIndex: "price" },
          { title: "Brand", dataIndex: "brand" },
          { title: "Category", dataIndex: "category" }
        ]}
      />
    </div>

    <Modal 
      title="Add New Product" 
      open={open} 
      onCancel={()=> setOpen(false)} 
      footer={null}
    >
      <Form 
        layout="vertical" 
        onFinish={(values)=> {
          setOpen(false);
          navigate("/confirm", { state: values });
        }}
        className="modal-form"
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input placeholder="Enter product title" />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <Input placeholder="Enter product price" />
        </Form.Item>

        <Form.Item label="Brand" name="brand" rules={[{ required: true }]}>
          <Input placeholder="Enter product brand" />
        </Form.Item>

        <Form.Item label="Category" name="category" rules={[{ required: true }]}>
          <Input placeholder="Enter product category" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Continue
        </Button>
      </Form>
    </Modal>

  </div>
);

}