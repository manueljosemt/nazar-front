import React from "react";
import { List, Row, Col, Image } from "antd";
import SearchRut from "../../components/SearchRut";
import { RightCircleOutlined } from "@ant-design/icons";
import ruta from "../../assets/ruta.jpg";
import rutb from "../../assets/rutb.jpg";

const TOP_DATA = [
  "HORARIO DE ATENCION DE RENDICIONES",
  "Lunes a Viernes de 07:30 hasta 08:30 horas.",
  "Sabados desde 09:00 hasta 14:00 horas.",
  "Feriados renunciables desde 10:00 a 16:00 horas.",
];

const STEP_DATA = [
  "Utilice la pistola para leer su carnet de identidad",
  "Seleccione las rutas que rendirá",
  "Espere que su número sea llamado",
];

function Totem() {
  return (
    <Row justify="center">
      <Col span={14} className="mb10 mt10">
        <SearchRut />
      </Col>
      <Col span={14} align="center" className="mb10">
        <List
          size="small"
          bordered
          dataSource={TOP_DATA}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Col>
      <Col span={14} className="mb10">
        <List
          size="small"
          bordered
          dataSource={STEP_DATA}
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
            <Image src={ruta} width={300} />
          </Col>
          <Col span={12}>
            <Image src={rutb} width={300} className="right" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Totem;
