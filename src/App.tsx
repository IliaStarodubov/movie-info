import { useEffect, useState } from "react";
import "./App.scss";
import Navbar from "./components/UI/navbar/Navbar";
import { HashRouter, Route, Routes } from "react-router-dom";
import FilmItemPage from "./components/pages/FilmItemPage";
import { IMovie, IQuery } from "./types/types";
import axios from "axios";
import { API_KEY, API_URL } from "./components/constants/api";
import ItemsPage from "./components/pages/ItemsPage";

function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("ALL");
  const [sort, setSort] = useState<string>("NUM_VOTE");
  const [sortGenres, setSortGenres] = useState<number | undefined>();
  const [keyword, setKeyword] = useState<string>("");
  const [inputValueRaiting, setInputValueRaiting] = useState<[number, number]>([
    5, 10,
  ]);
  const [inputValueYear, setInputValueYear] = useState<
    string | [string, string]
  >(["2010", "2022"]);

  let params: IQuery = {
    page: page,
    order: sort,
    type: type,
    ratingFrom: inputValueRaiting[0],
    ratingTo: inputValueRaiting[1],
    yearFrom: inputValueYear[0],
    yearTo: inputValueYear[1],
    keyword: keyword,
    genres: sortGenres,
  };

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

  useEffect(() => {
    fetchMovies();
  }, [
    page,
    sort,
    keyword,
    sortGenres,
    type,
    inputValueRaiting,
    inputValueYear,
  ]);

  const onChangeRating = (ratingValue: [number, number]) => {
    setInputValueRaiting(ratingValue);
  };

  const onChangeYear = (yearValue: string | [string, string]) => {
    setInputValueYear(yearValue);
  };

  const handleChange = (sort: string) => {
    setSort(sort);
  };

  const handleChangeSort = (sortGenres: number | undefined) => {
    setSortGenres(sortGenres);
  };

  const onSearch = (search: string) => {
    setKeyword(search);
  };

  const changePage = (page: number) => {
    setPage(page);
  };

  const onChangeType = (type: string) => {
    setType(type);
  };

  return (
    <HashRouter>
      <Navbar
        sortGenres={sortGenres}
        handleChangeSort={handleChangeSort}
        sort={sort}
        inputValueRaiting={inputValueRaiting}
        onChangeRating={onChangeRating}
        inputValueYear={inputValueYear}
        onChangeYear={onChangeYear}
        onChange={handleChange}
        onSearch={onSearch}
        onChangeType={onChangeType}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ItemsPage
              isLoading={isLoading}
              totalPages={totalPages}
              movies={movies}
              page={page}
              changePage={changePage}
            />
          }
        />
        <Route
          path="/films"
          element={
            <ItemsPage
              isLoading={isLoading}
              totalPages={totalPages}
              movies={movies}
              page={page}
              changePage={changePage}
            />
          }
        />
        <Route
          path="/serials"
          element={
            <ItemsPage
              isLoading={isLoading}
              totalPages={totalPages}
              movies={movies}
              page={page}
              changePage={changePage}
            />
          }
        />
        <Route path="/film/:kinopoiskId" element={<FilmItemPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
