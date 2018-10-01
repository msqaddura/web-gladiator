import { TimelineMaxWrapper } from "../Wrapper/TimelineMaxWrapper";

export class TimelineMaxAdapter {
    create(options) {
        return new TimelineMaxWrapper(options);
    }
}
