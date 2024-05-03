import { Flex,Typography } from "antd"



export default function Coin({coin,withSymbol}){

    return(
        <Flex align="center">
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        />
        <Typography.Title style={{ margin: 0 }} level={2}>
         {withSymbol && <span>({coin.symbol})</span>}  {coin.name}
        </Typography.Title>
      </Flex>
    )
}