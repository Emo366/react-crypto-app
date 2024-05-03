import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useEffect, useState, useContext } from "react";
import CoinInfoModal from "../CoinInfoModal";
import CryptoContext from "../../context/crypto-context";
import AddAssetForm from "../AddAssetForm";
const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  gap: "px",
};

//   const options = [
//     {
//       label: 'China',
//       value: 'china',
//       emoji: '🇨🇳',
//       desc: 'China (中国)',
//     },
//     {
//       label: 'USA',
//       value: 'usa',
//       emoji: '🇺🇸',
//       desc: 'USA (美国)',
//     },
//     {
//       label: 'Japan',
//       value: 'japan',
//       emoji: '🇯🇵',
//       desc: 'Japan (日本)',
//     },
//     {
//       label: 'Korea',
//       value: 'korea',
//       emoji: '🇰🇷',
//       desc: 'Korea (韩国)',
//     },
//   ];

export default function AppHeader() {
  const { crypto } = useContext(CryptoContext);
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(true);

  useEffect(() => {
    const keypress = (e) => {
      if ((e.ley = "/")) {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id == value));
    setModal(true);
  }
  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: "250px",
        }}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        open={select}
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
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer  width={600} destroyOnClose title="Add Asset" onClose={() => setDrawer(false)} open={drawer}>
  <AddAssetForm onClose={()=>setDrawer(false)}/>
      </Drawer>
    </Layout.Header>
  );
}