import { Breadcrumb, Divider, Space, Spin } from "antd";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IMovie } from "../../types/types";
import { API_KEY, API_URL } from "../constants/api";
import { HomeOutlined } from "@ant-design/icons";
import cl from "./FilmItemPage.module.scss";
import { loader } from "../constants/UI";
import MyList from "../UI/MyList/MyList";

type FilmItemPageProps = {
  kinopoiskId: string;
};

const FilmItemPage: FC = () => {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const params = useParams<FilmItemPageProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const navigate = useNavigate()

  useEffect(() => {
    fetchMovie();
  }, []);

  function fetchMovie() {
    setIsLoading(true);
    axios
      .get(API_URL + "/" + params.kinopoiskId, {
        headers: {
          "X-API-KEY": API_KEY,
        },
        params,
      })
      .then((res) => res.data)
      .then((json) => {
        setMovie(json);
        setIsLoading(false);
      })
      .catch((err) => alert(err));
  }

  return (
    <div className={cl.container}>
      <div className={cl.pageBody}>
        <Breadcrumb style={{ marginBottom: 30 }}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
            <span>Главная страница</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>О {movie?.type === "FILM" ? "Фильме" : "Сериале"}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        {isLoading ? (
          <Space
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
            }}
          >
            <Spin indicator={loader} />
          </Space>
        ) : (
          <Space size={100} align="start">
            {
              <img
                alt={movie?.posterUrlPreview}
                src={movie?.posterUrlPreview}
              />
            }
            <div>
              <h1>{movie?.nameRu}</h1>
              <h2>О {movie?.type === "FILM" ? "фильме" : "сериале"}</h2>
              <Space>
                <MyList movie={movie} />
              </Space>
            </div>
          </Space>
        )}

        <Divider style={{ marginTop: 50 }} orientation="left">
          Описание
        </Divider>
        <p>{movie?.description}</p>
      </div>
    </div>
  );
};

export default FilmItemPage;
