import { View as AutolayoutView, VisualFormat } from "autolayout";
import { MathUtil } from "../Util/MathUtil";
export class AutolayoutViewWrapper {
    proxy;
    viewMap = {};
    rules = {};

    parent;
    children;
    name = "";
    target = null;
    tree = {};
    width;
    height;
    left;
    top;
    EVFL;
    // constraints;
    // tslint:disable-next-line:max-line-length
    constructor({ EVFL, spacing = 8, children = [], name = "", target = "", width, height, parent = null, left = 0, top = 0, rules = {} }) {
        const constraints = VisualFormat.parse(EVFL, { extended: true });
        this.proxy = new AutolayoutView({ constraints });
        this.rules = rules;
        this.parent = parent;
        this.children = children;
        this.name = name;
        this.target = target;
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;

        this.setSize(width, height);

    }

    // {left:{target:x,prop:left}}
    query(name) {
        return this.root.compute(name, this.rules[name]);
    }
    compute(name, matches = null) {
        if (matches == null) {
            return this.getViewFromMap(name);
        }

        const result = { name };
        for (const key in matches) {
            if (matches.hasOwnProperty(key)) {
                const target = matches[key]["target"];
                const prop = matches[key]["prop"];
                const value = this.getPropertyFromMap(target, prop);
                result[prop] = value;
            }
        }
        return result;
    }

    getPropertyFromMap(name, prop) {
        return this.getViewFromMap(name)[prop];
    }
    getViewFromMap(name) {
        return this.root.viewMap[name];
    }
    get root() {
        return this.parent ? this.parent.root : this;
    }

    normalizeSubView(name) {

        // not this, the target itself ;) :D ;*
        if (name[0] === "_") { return; }
        const subView = this.proxy.subViews[name];
        subView.gLeft = MathUtil.toFixed(subView.left + this.left);
        subView.gRight = MathUtil.toFixed(subView.right + this.left);
        subView.gCenterX = MathUtil.toFixed(subView.centerX + this.left);

        subView.gTop = MathUtil.toFixed(subView.top + this.top);
        subView.gBottom = MathUtil.toFixed(subView.bottom + this.top);
        subView.gCenteryY = MathUtil.toFixed(subView.centerY + this.top);
        this.addSubView(subView);
    }

    normalizeSubViews() {
        for (const key in this.proxy.subViews) {
            if (this.proxy.subViews.subViews.hasOwnProperty(key)) {
                this.normalizeSubView(key);
            }
        }
    }

    addSubView(subView) {
        this.root.viewMap[subView.name] = subView;
    }

    resize(width, height, left = 0, top = 0) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.setSize(width, height);
        this.normalizeSubViews();
    }
    setSize(width, height) {
        if (!width || !height) {
            return;
        }
        this.width = width;
        this.height = height;

        this.proxy.setSize(width, height);
        this.normalizeSubViews();

        this.children.forEach((childParams) => {
            const target = this.proxy.subViews[childParams.target];
            childParams.width = MathUtil.toFixed(target.width);
            childParams.height = MathUtil.toFixed(target.height);
            childParams.parent = this;
            childParams.left = MathUtil.toFixed(target.left + this.left);
            childParams.top = MathUtil.toFixed(target.top + this.top);
            if (this.tree[childParams.name]) {
                // tslint:disable-next-line:max-line-length
                this.tree[childParams.name].resize(childParams.width, childParams.height, childParams.left, childParams.top);
            } else {
                this.tree[childParams.name] = new AutolayoutViewWrapper(childParams);
            }

        });
    }
}
