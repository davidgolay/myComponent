import React, { useState } from "react";
import { usePopper } from "react-popper";
import stylesheet from "./tooltip.module.scss";

export const Tooltip = () => {
  const [referenceElement, setReferenceElement] = useState(null);
  const buttonRef = useRef(null);
  const popperRef = useRef(null);
  const { styles, attributes } = usePopper(
    buttonRef.current,
    popperRef.current,
    {
      modifiers: [
        {
          name: "arrow",
          options: {
            element: arrowRef
          }
        },
        {
          name: "offset",
          options: {
            offset: [0, 10]
          }
        }
      ]
    }
  );



  return (
    <>
    <button ref={buttonRef} />


    </>
  );
};

export default Tooltip;
