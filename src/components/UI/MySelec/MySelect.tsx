import { Select } from "antd";
import React, { FC } from "react";

interface MySelecProps {
    sort: string;
    onChange: (sort: string) => void;
}

const MySelec: FC<MySelecProps> = ({ sort, onChange }) => {
    const { Option } = Select;

    return (
        <Select defaultValue={sort} style={{ minWidth: 150}} onChange={onChange}>
            <Option value="NUM_VOTE">По отзывам</Option>
            <Option value="RATING">По рейтингу</Option>
            <Option value="YEAR">По году</Option>
        </Select>
    );
};

export default MySelec;
