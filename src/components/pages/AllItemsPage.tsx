import { Space, Spin } from "antd";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { IMovie, IQuery } from "../../types/types";
import { API_KEY, API_URL } from "../constants/api";
import { loader } from "../constants/UI";
import MovieList from "../MovieList/MovieList";

interface AllItemsPageProps {
  sortGenres: number | undefined;
  sort: string;
  keyword: string;
  inputValueRaiting: [number, number];
}

const AllItemsPage: FC<AllItemsPageProps> = ({
  sort,
  keyword,
  inputValueRaiting,
  sortGenres,
}) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let params: IQuery = {
    page: page,
    order: sort,
    type: "ALL",
    ratingFrom: inputValueRaiting[0],
    ratingTo: inputValueRaiting[1],
    yearFrom: "2010",
    yearTo: "2022",
    keyword: keyword,
    genres: sortGenres,
  };

  useEffect(() => {
    fetchMovies();
  }, [page, sort, keyword, sortGenres]);

  function fetchMovies() {
    setIsLoading(true);
    axios
      .get(API_URL, {
        headers: {
          "X-API-KEY": API_KEY,
        },
        params,
      })
      .then((res) => res.data)
      .then((json) => {
        setMovies([...json.items]);
        setTotalPages(json.totalPages);
        setIsLoading(false);
      })
      .catch((err) => alert(err));
  }

  const changePage = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      {isLoading ? (
        <Space style={{ position: "absolute", left: "50%", top: "50%" }}>
          <Spin indicator={loader} />
        </Space>
      ) : (
        <MovieList
          movies={movies}
          changePage={changePage}
          page={page}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default AllItemsPage;
