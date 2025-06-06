import Search from "antd/lib/input/Search";
import React, { FC } from "react";

interface MySeachProps {
    onSearch: (search: string) => void;
}

const MySearch: FC<MySeachProps> = ({ onSearch }) => {
    return (
        <Search
            placeholder="Поиск..."
            allowClear
            onSearch={onSearch}
            style={{ maxWidth: 400 }}
        />
    );
};

export default MySearch;
