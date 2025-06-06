import { Space, Spin } from "antd";
import React, { FC } from "react";
import { IMovie } from "../../types/types";
import { loader } from "../constants/UI";
import MovieList from "../MovieList/MovieList";

interface ItemsPageProps {
    movies: IMovie[];
    page: number;
    totalPages: number;
    isLoading: boolean;
    changePage: (page: number) => void;
}

const ItemsPage: FC<ItemsPageProps> = ({
    movies,
    page,
    totalPages,
    isLoading,
    changePage
}) => {
    return (
        <div>
            {isLoading ? (
                <Space
                    style={{ position: "absolute", left: "50%", top: "50%" }}
                >
                    <Spin  
                        indicator={loader}
                    />
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

export default ItemsPage;
