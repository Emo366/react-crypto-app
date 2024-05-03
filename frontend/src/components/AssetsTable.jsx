import { Table } from 'antd';
import CryptoContext from '../context/crypto-context';
import { useContext } from 'react';
const columns = [
    {
        title:'Name',
        dataIndex: 'name',
        sorter:(a,b)=>a.name.length-b.name.length,
        sortDirections:['descend']
    },
  {
    title: 'Price $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
];


 




export default function AssetsTable(){
const{assets}=useContext(CryptoContext)
 
const data=assets.map(a=>({
    key:a.id,
    name:a.name,
    price:a.price,
    amount:a.amount
}))

    return(
     <div>
      <Table
      pagination={false}
    columns={columns}
    dataSource={data}
    showSorterTooltip={{
      target: 'sorter-icon',
    }}
  />
     </div>
    )
}