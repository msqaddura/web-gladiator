export interface IBus{
    _registeredMessages;
    registerMessage(ctor);
    sendMessage(obj)
}