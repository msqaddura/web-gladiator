export class layoutVisitor{
    comp;
    constructor(conp){
        this.comp=conp;
    }
    update(comp){
        this.comp.updateLayout();
    }

}