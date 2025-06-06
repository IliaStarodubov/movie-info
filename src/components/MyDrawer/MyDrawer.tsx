import { Button, Drawer } from "antd";
import React, { FC } from "react";

interface MyDrawerProps {
    isDrawerVisible: boolean;
    onClose: () => void;
}

const MyDrawer: FC<MyDrawerProps> = ({isDrawerVisible, onClose}) => {

    return (
        <Drawer>
            <Drawer
                title="Сортировка по всем фильмам"
                placement="left"
                width={500}
                visible={isDrawerVisible}
                onClose={onClose}
                extra={<Button onClick={onClose}>Cancel</Button>}
            ></Drawer>
        </Drawer>
    );
};

export default MyDrawer;
