import { Slider, SliderFilledTrack, SliderThumb, SliderTrack, Tooltip } from "@chakra-ui/react";
import React from "react";
const SliderComponent = ({ setSliderValue, setShowTooltip, showTooltip, sliderValue, start, stop, width, setName, name }) => {
    return (<Slider id='slider' defaultValue={start} min={start} max={stop} colorScheme='teal' onChange={(v) => {
        setName(name);
        setSliderValue(v);
    }} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} width={width} my="3">
    
    <SliderTrack>
  <SliderFilledTrack />
    </SliderTrack>
    <Tooltip hasArrow bg='teal.500' color='white' placement='top' isOpen={showTooltip} label={`${sliderValue}%`}>
  <SliderThumb />
    </Tooltip>
    </Slider>);
};
export default SliderComponent;
