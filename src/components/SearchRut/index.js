import React from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/loader/loader.actions"
import { setUserToken } from "../../redux/user/user.actions"
import { validateID } from "../../services"

function SearchRut() {
  const { Search } = Input;
  const dispatch = useDispatch();

  const onSearch = async (value) => {
    try {
      dispatch(toggleLoader())
      const response = await validateID(value)
      console.log(response);
      dispatch(setUserToken(response))
      dispatch(toggleLoader())
    } catch (error) {
      console.error(error);
      dispatch(toggleLoader())
    }
  }

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
