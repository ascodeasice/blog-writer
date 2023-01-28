import { useRef } from "react";

const AutoResizeTextarea = ({ className, onChange, value, placeholder }) => {
    const textRef = useRef();

    const onChangeHandler = function (event) {
        const target = event.target;
        textRef.current.style.height = "30px";
        textRef.current.style.height = `${target.scrollHeight}px`;
    };


    return (
        <textarea
            className={className + " autoResizeTextarea"}
            ref={textRef}
            value={value}
            placeholder={placeholder}
            onChange={(event) => {
                onChangeHandler(event);
                onChange(event);
            }}
            onMouseOver={onChangeHandler}
        />
    );
}

export default AutoResizeTextarea;