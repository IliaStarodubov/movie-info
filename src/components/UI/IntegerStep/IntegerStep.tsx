import { InputNumber, Slider } from "antd";
import React, { FC } from "react";

interface IntegerStepProps {
    inputValueRaiting: [number, number];
    newRating: [number, number];
    onChangeNewRating: (inputValue: [number, number]) => void;
}

const IntegerStep: FC<IntegerStepProps> = ({
    inputValueRaiting,
    newRating,
    onChangeNewRating
}) => {

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <InputNumber
                    size="large"
                    readOnly={true}
                    value={newRating[0]}
                />
                <InputNumber
                    size="large"
                    readOnly={true}
                    value={newRating[1]}
                />
            </div>
            <Slider
                autoFocus
                range
                defaultValue={inputValueRaiting}
                min={1}
                max={10} 
                onAfterChange={onChangeNewRating}
            />
        </div>
    );
};

export default IntegerStep;
