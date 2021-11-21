import React from "react";
import { Input } from "antd";

function SearchRut() {
  const { Search } = Input;

  const onSearch = (value) => console.log(value);

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
