import React, { useState } from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/loader/loader.actions";
import { setUserToken } from "../../redux/user/user.actions";
import { setRoutes } from "../../redux/routes/routes.actions";
import { setMessage, removeMessage } from "../../redux/message/message.actions";
import { validateID, getPending } from "../../services";

function SearchRut() {
  const { Search } = Input;
  const dispatch = useDispatch();
  const [searchButtonState, setSearchButtonState] = useState(false);
  const [rut, setRut] = useState("");

  const onSearch = async () => {
    try {
      if(Fn.validaRut(rut)) {
        dispatch(removeMessage());
        dispatch(toggleLoader());
        const validateResponse = await validateID({
          rut,
        });

        dispatch(
          setUserToken({
            token: validateResponse.data.token,
            name: validateResponse.data.nombre,
          })
        );

        const pendingResponse = await getPending(validateResponse.data.token);

        dispatch(
          setRoutes({
            routes: pendingResponse.data,
          })
        );

        dispatch(toggleLoader());
        setSearchButtonState(true);
      } else {
        dispatch(
          setMessage({
            showMessage: true,
            message: "Rut Invalido.",
            typeMessage: "error",
          })
        )
      }
    } catch (error) {
      console.error(error);
      dispatch(toggleLoader());
      dispatch(
        setMessage({
          showMessage: true,
          message: error.response.data.message || "Error en servidor.",
          typeMessage: "error",
        })
      )
    }
  };

  let Fn = {
    validaRut : function (rutCompleto) {
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
        return false;
      var tmp 	= rutCompleto.split('-');
      var digv	= tmp[1]; 
      var rut 	= tmp[0];
      if ( digv == 'K' ) digv = 'k' ;  // eslint-disable-line
      return (Fn.dv(rut) == digv );  // eslint-disable-line
    },
    dv : function(T){
      var M=0,S=1;
      for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
      return S?S-1:'k';
    }
  }

  const onChangeRut = (rut) => {
    const newRut = rut.replace(/\./g,'').replace(/\-/g, '').trim().toLowerCase(); // eslint-disable-line
    const lastDigit = newRut.substr(-1, 1);
    const rutDigit = newRut.substr(0, newRut.length-1)
    let format = '';
    for (let i = rutDigit.length; i > 0; i--) {
      const e = rutDigit.charAt(i-1);
      format = e.concat(format);
    }

    if(format.concat('-').concat(lastDigit) === "-" || format.concat('-').concat(lastDigit) === "" ){
      dispatch(removeMessage())
    }

    setRut(format.concat('-').concat(lastDigit))
  };

  return (
    <Search
      addonBefore="RUT"
      placeholder="Ingrese su rut"
      onSearch={onSearch}
      onChange={(e) => onChangeRut(e.target.value)}
      value={rut}
      size="large"
      disabled={searchButtonState}
    />
  );
}

export default SearchRut;
