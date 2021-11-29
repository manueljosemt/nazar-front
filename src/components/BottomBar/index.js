import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import "./styles.css"

function BottomBar(props) {

    const { goBack, enviarRutas } = props;


    return (
        <Row className="mt10 height-box bottombar">
            <Col span={6} className="">
                <Button size="large" onClick={() => goBack()} block>
                    VOLVER
                </Button>
            </Col>
            <Col span={18}>
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
    );
}

export default BottomBar; 