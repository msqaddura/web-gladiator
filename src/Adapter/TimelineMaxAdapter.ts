import { TimelineMaxWrapper } from '../Wrapper/TimelineMaxWrapper'; 


export class TimelineMaxAdapter  {
    constructor() {
       
    }
    
    create(options){
        return new TimelineMaxWrapper(options);
    }
}