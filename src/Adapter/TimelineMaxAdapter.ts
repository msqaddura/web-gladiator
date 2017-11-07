import { TimelineMaxWrapper } from '../Wrapper/TimelineMaxWrapper'; 


export class TimelineMaxAdapter  {
    constructor() {
       
    }
    
    create(){
        return new TimelineMaxWrapper();
    }
}