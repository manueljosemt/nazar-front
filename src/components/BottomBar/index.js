import React, { useState } from "react";
import { Button, Col} from "antd";

function BottomBar(props) {

    const {goBack, enviarRutas} = props;
    

    return (
        <>
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
        </>
    );
}

export default BottomBar;