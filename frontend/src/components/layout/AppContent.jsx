import { Layout, Typography } from "antd";
import CryptoContext from "../../context/crypto-context";
import { useContext } from "react";
import PortfolioCHart from "../PortFolioChart";
import AssetsTable from "../AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
};

export default function AppContent() {
  const { crypto, assets } = useContext(CryptoContext);



 

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio:{""}
        {  assets.map((asset) => {
    const coin = crypto.find((c) => c.id == asset.id);
    return asset.amount * coin.price;
  }).reduce((acc,v)=>(acc+=v),0).toFixed(2)
}$
      </Typography.Title>
      <PortfolioCHart/>
      <AssetsTable/>
    </Layout.Content>
  );
}
