import { useState, useContext,useRef } from "react";
import CryptoContext from "../context/crypto-context";
import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result
} from "antd";
import Coin from "./Coin";



const validateMessages = {
    required: "${label}' is required!",
    types:{
        number:'{label} in not valid number'
    },
    number:{
        range:'${label} must be between ${min} and ${max}'
    }
  };
export default function AddAssetForm({onClose}) {
  const [coin, setCoin] = useState(null);
  const { crypto,addAsset } = useContext(CryptoContext);
  const [form]=Form.useForm()
  const [submitted,setSubmitted]=useState(false)
  const assetRef=useRef()

  if(submitted){
    return <Result
    status="success"
    title="New Asset Added"
    subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
    extra={[
      <Button type="primary" key="console" onClick={onClose}>
        Go Console
      </Button>,

    ]}
  />
  }

  if (!coin) {
    return (
      <Select
        style={{
          width: "100%",
        }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id == v))}
        placeholder="Select coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
    );
  }
  function onFinish(values) {
   const newAsset={
    id: coin.id,
    amount: values.amount, 
    date: values.date?.$d ?? new Date(),
   }

   assetRef.current = newAsset; 
   
    setSubmitted(true)
    addAsset(newAsset)
  }
  function handleAmountChange(value){
    const price=form.getFieldValue('price')
    console.log(price)
 form.setFieldsValue({
    total:+(value*price).toFixed(2),
 })
  }

  function handlePriceChange(value){
    const amount=form.getFieldValue('amount')
    console.log(amount)
    form.setFieldsValue({
       total:+(amount*value).toFixed(2),
    })
     }

  return (
    <Form
    form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{price:+coin.price.toFixed(2)}}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
    <Coin coin={coin}/>
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0
          },
        ]}

      >
        <InputNumber placeholder="Enter coin amount" onChange={handleAmountChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
      </Form.Item>


      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime/>
      </Form.Item>


      <Form.Item label="Total" name="total" >
      
        <InputNumber disabled  style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
