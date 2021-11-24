import React from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/loader/loader.actions";
import { setUserToken } from "../../redux/user/user.actions";
import { setRoutes } from "../../redux/routes/routes.actions";
import { validateID, getPending } from "../../services";

function SearchRut() {
  const { Search } = Input;
  const dispatch = useDispatch();

  const onSearch = async (value) => {
    try {
      dispatch(toggleLoader());
      const validateResponse = await validateID({
        rut: value,
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
    } catch (error) {
      console.error(error);
      dispatch(toggleLoader());
    }
  };

  return (
    <Search
      addonBefore="RUT"
      placeholder="Ingrese su rut"
      onSearch={onSearch}
      size="large"
    />
  );
}

export default SearchRut;
