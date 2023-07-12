export const BASE_THEME: Theme = {
    gridPitch: 10,
    font: "sans-serif",
    moduleFontColor: "black",
    hubFontColor: "black",
    contactFontColor: "black",
    moduleColor: "#D9D9D9",
    hubColor: "#4d4d4d",
    contactColor: "#235adc",
    contactBorderColor: "#fff",
    moduleWidth: 4,
    gap: 2,
    padding: 6,
    titleFontSize: 12,
    descriptionFontSize: 10,
}


export const PADDING = 6;

export interface Theme {
    font: string,
    gridPitch: number,
    moduleColor: string;
    hubColor: string;
    contactColor: string;
    contactBorderColor: string;
    moduleWidth: number;
    gap: number;
    padding: number;
    moduleFontColor: string;
    hubFontColor: string;
    contactFontColor: string;
    titleFontSize: number;
    descriptionFontSize: number;
}


export const SIZES_MAP: { [key: string]: number } = {
    "XS": 2,
    "S": 4,
    "M": 8,
    "L": 16,
    "XL": 32,
    "XXL": 64,
}



