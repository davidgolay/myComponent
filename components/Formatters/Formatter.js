import PropTypes from "prop-types";
import React, { Component } from "react";

export const getStyle = (paletteType, getAttribute) => {
  let style = '';
  if(paletteTypeMatches(paletteType) && attributeMatches) {
    switch(attribute) {
      case 'color': style = getPalette(paletteType).color; break;
      case 'background': style = getPalette(paletteType).background; break;
      case 'border': style = getPalette(paletteType).border; break;
      default: style = ''; break;
    }
  }
  return style;
}

export const getPalette = (paletteType) => {
  let palette = '';

  return palette;
}

export const Pallets = () => {
  const pallets = 
  [
    {
      type: 'invalid',
      pallet: {
        color: '#ff0000',
        background: ''
      }
    },
  ]

  return palette;
}
