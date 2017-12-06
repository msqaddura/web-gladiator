import * as AutoLayout from 'autolayout';
import { View } from '../Wrapper/AutolayoutWrapper';
export class CEVFLAdapter {
    constructor() {
        console.info(AutoLayout);
    }

    parseEVFL(options){
        const view = new View(options);
        return view;
    }
} 