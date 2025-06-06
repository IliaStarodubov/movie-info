import { Select } from "antd";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { IGenre, IQuery } from "../../../types/types";
import { API_KEY, API_URL } from "../../constants/api";

interface MySelecGenresProps {
  sortGenres: number | undefined;
  onChangeNewSort: (sortGenres2: number | undefined) => void;
}

const MySelecGenres: FC<MySelecGenresProps> = ({
  sortGenres,
  onChangeNewSort,
}) => {
  const { Option } = Select;
  const [filters, setFilters] = useState<IGenre[]>([]);
  const params: IQuery = {
    filters: "filters",
  };

  function fetchMovies() {
    axios
      .get(API_URL + "/" + params.filters, {
        headers: {
          "X-API-KEY": API_KEY,
        },
      })
      .then((res) => res.data)
      .then((json) => {
        setFilters(json.genres);
      })
      .catch((err) => alert(err));
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Select
      bordered={false}
      placement="bottomLeft"
      placeholder="Поиск по жанрам"
      defaultValue={sortGenres}
      style={{ width: 320 }}
      onChange={onChangeNewSort}
    >
      {filters.map((filter) => (
        <Option key={filter.id} value={filter.id}>
          {filter.genre}
        </Option>
      ))}
    </Select>
  );
};

export default MySelecGenres;
