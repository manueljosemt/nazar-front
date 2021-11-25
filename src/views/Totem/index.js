import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toggleLoader } from "../../redux/loader/loader.actions";
import { sendRoutes } from "../../services";
import SearchRut from "../../components/SearchRut";
import { List, Row, Col, Card, Button, Modal } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import ruta from "../../assets/ruta.jpg";
import rutb from "../../assets/rutb.jpg";

const TOP_TEXT = [
  "HORARIO DE ATENCION DE RENDICIONES",
  "Lunes a Viernes de 07:30 hasta 08:30 horas.",
  "Sabados desde 09:00 hasta 14:00 horas.",
  "Feriados renunciables desde 10:00 a 16:00 horas.",
];

const STEP_TEXT = [
  "Utilice la pistola para leer su carnet de identidad",
  "Seleccione las rutas que rendirá",
  "Espere que su número sea llamado",
];

const ROUTES_TEXT = [
  "Para una atención más expedita asegúrese que su destino corresponde a su HR, además que ha validado algún gasto extra",
];

function DataText() {
  return (
    <>
      <Col span={14} align="center" className="mb10">
        <List
          size="small"
          bordered
          dataSource={TOP_TEXT}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Col>
      <Col span={14} className="mb10">
        <List
          size="small"
          bordered
          dataSource={STEP_TEXT}
          renderItem={(item) => (
            <List.Item>
              <RightCircleOutlined className="mr10" />
              {item}
            </List.Item>
          )}
        />
      </Col>
      <Col span={14} className="mb10">
        <Row justify="center">
          <Col span={12}>
            <img src={ruta} style={{ width: "100%" }} alt="left-img" />
          </Col>
          <Col span={12}>
            <img
              src={rutb}
              style={{ width: "90%" }}
              alt="right-img"
              className="right"
            />
          </Col>
        </Row>
      </Col>
    </>
  );
}

function Totem() {
  const { routes } = useSelector((state) => state.route);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [rutas, setRutas] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    const newRoutes = routes.map((item) => ({ ...item, selected: false }));
    setRutas(newRoutes);
  }, [routes]);

  const toggleSelect = (id) => {
    const newRutas = rutas.map((item) => {
      if (item.id === id) {
        item.selected = !item.selected;
        return item;
      } else {
        return item;
      }
    });

    setRutas(newRutas);
  };

  const validateRoutes = () => {
    let response = false;

    rutas.forEach((item) => {
      if (item.selected === true) {
        response = true;
      }
    });

    return response;
  };

  const enviarRutas = async () => {
    try {
      if (validateRoutes()) {
        dispatch(toggleLoader());

        const buildRutas = rutas.map((item) => ({
          ruta: 100,
          fecha: moment(item.fecha).format("YYYY-MM-DD"),
          ciudad: item.ciudad,
          codigo: item.codigo.toString(),
        }));

        const { data } = await sendRoutes(token, {
          rutas: buildRutas,
        });
        dispatch(toggleLoader());

        setCode(`${data.cola.nombre}${data.numero}`);
        setIsModalVisible(true);

        setTimeout(function () {
          window.location.reload();
        }, 4000);
      }
    } catch (error) {
      console.error(error);
      dispatch(toggleLoader());
    }
  };

  const goBack = () => {
    window.location.reload();
  };

  return (
    <Row justify="center">
      <Col span={14} className="mb10 mt10">
        <SearchRut />
      </Col>
      {rutas.length === 0 ? (
        <DataText />
      ) : (
        <Col span={14}>
          <Row>
            <Col span={24} className="mb10">
              <List
                size="small"
                bordered
                dataSource={ROUTES_TEXT}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Col>
          </Row>
          <Row>
            {rutas.map((item) => (
              <Col span={6} key={item.id}>
                <Card
                  onClick={() => toggleSelect(item.id)}
                  bodyStyle={
                    item.selected === true ? { background: "#d8ddff" } : {}
                  }
                >
                  <p>{item.codigo}</p>
                  <p>{moment(item.fecha).format("DD-MM-YYYY")}</p>
                  <p>{item.ciudad}</p>
                  {item.rendido && <p>Rendido</p>}
                  {item.razonCierre && (
                    <p>Razon de cierre: {item.razonCierre}</p>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="mt10">
            <Col span={12} className="pr10">
              <Button size="large" onClick={() => goBack()} block>
                VOLVER
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type="primary"
                onClick={() => enviarRutas()}
                size="large"
                block
              >
                ENVIAR
              </Button>
            </Col>
          </Row>

          <Modal visible={isModalVisible} footer={null} closable={false}>
            <h2>{code}</h2>
          </Modal>
        </Col>
      )}
    </Row>
  );
}

export default Totem;
