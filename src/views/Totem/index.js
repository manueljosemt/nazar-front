import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toggleLoader } from "../../redux/loader/loader.actions";
import { setMessage, removeMessage } from "../../redux/message/message.actions";
import { sendRoutes } from "../../services";
import SearchRut from "../../components/SearchRut";
import { List, Row, Col, Card, Button, Modal, Alert } from "antd";
import { CheckCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import ruta from "../../assets/ruta.jpg";
import rutb from "../../assets/rutb.jpg";
import "./styles.css"

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
          className="schedule box"
          size="small"
          bordered
          dataSource={TOP_TEXT}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Col>
      <Col span={14} className="mb10">
        <List
          className="steps box"
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
  const { showMessage, message, typeMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [rutas, setRutas] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    const newRoutes = routes.map((item) => ({ ...item, selected: false }));
    setRutas(newRoutes);
  }, [routes]);

  const toggleSelect = (codigo) => {
    const newRutas = rutas.map((item) => {
      if (item.codigo === codigo) {
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
        dispatch(removeMessage())
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
      } else {
        dispatch(
          setMessage({
            showMessage: true,
            message: "Debes seleccionar una ruta.",
            typeMessage: "warning",
          })
        )
      }
    } catch (error) {
      console.error(error);
      dispatch(toggleLoader());
      dispatch(
        setMessage({
          showMessage: true,
          message: "Error en servidor.",
          typeMessage: "error",
        })
      )
    }
  };

  const goBack = () => {
    window.location.reload();
  };

  return (
    <Row justify="center" className="background-header height-box">
      <Col span={14} className="mb10 mt10">
        <SearchRut />
      </Col>
      { 
        showMessage &&
          <Col span={14} className="mb10">
            <Alert
              description={message}
              type={typeMessage}
              showIcon
            />
          </Col>
      }
      {rutas.length === 0 ? (
        <DataText />
      ) : (
        <Col span={14}>
          <Row>
            <Col span={24} className="mb30">
              <List
                className="attention box"
                size="small"
                bordered
                dataSource={ROUTES_TEXT}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Col>
          </Row>
          <Row>
            {rutas.map((item) => (
              <Col span={6} key={item.codigo}>
                <Card
                  onClick={() => toggleSelect(item.codigo)}
                  bodyStyle={
                    item.selected === true ? { background: "#1182BC", fontFamily: "Poppins", fontWeight: 400, fontSize: "16px", color: "#ffffff", border: "1px solid #1182BC" } : { fontFamily: "Poppins", fontWeight: 400, fontSize: "16px", color: "#000000", border: "1px solid #1182BC" }
                  }
                >
                  <p>{item.codigo}</p>
                  <p>{moment(item.fecha).format("DD-MM-YYYY")}</p>
                  <p>{item.ciudad}</p>
                  {item.rendido && <p>Rendido</p>}
                  {item.razonCierre && (
                    <p>Razon de cierre: {item.razonCierre}</p>
                  )}

                  <CheckCircleOutlined  style={{float: "right", color: "#ffffff"}} />
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="mt10 height-box">
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
            <h2 className="modal-text">{code}</h2>
          </Modal>
        </Col>
      )}
    </Row>
  );
}

export default Totem;
