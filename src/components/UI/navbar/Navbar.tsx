import React, { FC, useState } from "react";
import {
  Button,
  Collapse,
  DatePicker,
  DatePickerProps,
  Drawer,
  Menu,
  MenuProps,
  Space,
} from "antd";
import { Header } from "antd/lib/layout/layout";
import classes from "./Navbar.module.scss";
import MySearch from "../MySearch/MySearch";
import MySelec from "../MySelec/MySelect";
import { SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import IntegerStep from "../IntegerStep/IntegerStep";
import MySelecGenres from "../MySelec/MySelectGenres";
import { RangePickerProps } from "antd/lib/date-picker";

interface NavbarProps {
  sortGenres: number | undefined;
  handleChangeSort: (handleChangeSort: number | undefined) => void;
  sort: string;
  onChange: (sort: string) => void;
  inputValueRaiting: [number, number];
  onChangeRating: (ratingValue: [number, number]) => void;
  onSearch: (search: string) => void;
  onChangeType: (type: string) => void;
  inputValueYear: string | [string, string];
  onChangeYear: (yearValue: string | [string, string]) => void;
}

const Navbar: FC<NavbarProps> = ({
  sort,
  sortGenres,
  inputValueRaiting,
  inputValueYear,
  onChangeYear,
  handleChangeSort,
  onChange,
  onSearch,
  onChangeRating,
  onChangeType,
}) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>("item-1");
  const [newSortGenres, setNewSortGenre] = useState<number | undefined>(
    sortGenres
  );
  const [newRating, setNewRating] =
    useState<[number, number]>(inputValueRaiting);
  const [newYear, setNewYear] = useState<string | [string, string]>(
    inputValueYear
  );

  const items = [
    { label: <Link to={"/"}>Все</Link>, key: "item-1" },
    { label: <Link to={"/films"}>Фильмы</Link>, key: "item-2" },
    { label: <Link to={"/serials"}>Сериалы</Link>, key: "item-3" },
  ];
  const { RangePicker } = DatePicker;

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "item-1") {
      onChangeType("ALL");
    }
    if (e.key === "item-2") {
      onChangeType("FILM");
    }
    if (e.key === "item-3") {
      onChangeType("TV_SERIES");
    }
  };

  const onChangeNewSort = (sortGenres: number | undefined) => {
    setNewSortGenre(sortGenres);
  };

  const onChangeNewRating = (inputValueRaiting: [number, number]) => {
    setNewRating(inputValueRaiting);
  };

  const onChangeTest = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    setNewYear(dateString);
  };

  const onClickTest = () => {
    handleChangeSort(newSortGenres);
    onChangeRating(newRating);
    onChangeYear(newYear);
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };
  const onClose = () => {
    setIsDrawerVisible(false);
  };

  return (
    <Header className={classes.navbar}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        // className={classes.menu}
        items={items}
        theme="dark"
        mode="horizontal"
      />
      <MySearch onSearch={onSearch} />
      <Space>
        <MySelec sort={sort} onChange={onChange} />
        <Button
          color={"purple-8"}
          type="primary"
          shape="circle"
          icon={<SettingOutlined />}
          onClick={() => showDrawer()}
        />
        <Drawer
          title="Сортировка по всем фильмам"
          placement="left"
          width={400}
          visible={isDrawerVisible}
          onClose={onClose}
        >
          <Collapse defaultActiveKey={["1", "2", "3"]} ghost>
            <CollapsePanel header="Рейтинг" key="1">
              <IntegerStep
                inputValueRaiting={inputValueRaiting}
                newRating={newRating}
                onChangeNewRating={onChangeNewRating}
              />
            </CollapsePanel>
            <CollapsePanel header="Год производства" key="2">
              <RangePicker picker="year" onChange={onChangeTest} />
            </CollapsePanel>
            <CollapsePanel header="Жанры" key="3">
              <MySelecGenres
                onChangeNewSort={onChangeNewSort}
                sortGenres={sortGenres}
              />
            </CollapsePanel>
          </Collapse>
          <Button type="primary" shape="round" onClick={onClickTest}>
            Применить
          </Button>
        </Drawer>
      </Space>
    </Header>
  );
};

export default Navbar;
