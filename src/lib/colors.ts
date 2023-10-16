import { Color } from 'three';

export const darkBg = new Color('rgb(7%, 7%, 7%)');
export const lightBg = darkBg.lerp(new Color('#FFF'), 0.1);

export const lightText = new Color('rgb(67%, 67%, 67%)');
export const lightUI = new Color('rgb(80%, 80%, 80%)');

export const blue = new Color('rgb(0%, 45%, 85%)');
export const red = new Color('rgb(100%, 25%, 21%)');
export const green = new Color('rgb(18%, 80%, 25%)');
export const yellow = new Color('rgb(100%, 86%, 0%)');
