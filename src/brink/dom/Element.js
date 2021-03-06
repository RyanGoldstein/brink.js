$b(

    [
        './Attr',
        './Text',
        './DOMObject',
        '../utils/get',
        '../utils/trim',
        '../utils/unbound'
    ],

    function (BrinkAttr, BrinkText, DOMObject, get, trim, unbound) {

        'use strict';

        var BrinkElement = DOMObject({

            isElement : true,
            tokens : null,

            init : function () {
                this.compile();
            },

            getElementClass : function (tagName) {
                return (
                    get($b, 'dom.elements.' + tagName.toLowerCase()) ||
                    BrinkElement
                );
            },

            compile : function () {

                var i,
                    m,
                    re,
                    dom,
                    tmp,
                    attr,
                    child,
                    tagEl,
                    domTag,
                    subTags,
                    children,
                    attributes;

                dom = this.get('dom');
                subTags = this.get('subTags');

                children = [];
                attributes = [];

                if (dom.childNodes && dom.childNodes.length) {

                    for (i = 0; i < dom.childNodes.length; i ++) {

                        child = dom.childNodes[i];

                        // Text Node
                        if (child.nodeType === 3) {

                            if (subTags) {

                                re = /\{\s*\%\s*(\S*)\s([^%}]*?)\s*\%\s*\}([\s\S]*)/gi;

                                if ((m = re.exec(child.nodeValue))) {

                                    if (subTags[m[1]]) {

                                        domTag = get($b, 'dom.tags.' + m[1] + '.domTag');
                                        tagEl = document.createElement(domTag);

                                        if (domTag === 'brink-tag') {
                                            tagEl.setAttribute('tag', m[1]);
                                        }

                                        if (m[2]) {
                                            tagEl.setAttribute('options', m[2]);
                                        }

                                        tmp = child.nodeValue.replace(re, trim('$3'));

                                        dom.insertBefore(
                                            tagEl,
                                            child
                                        );

                                        i --;

                                        if (!tmp) {
                                            dom.removeChild(child);
                                        }

                                        else {
                                            child.nodeValue = tmp;
                                        }

                                        continue;
                                    }
                                }
                            }

                            children.push(
                                BrinkText.create({
                                    dom : child,
                                    parent : unbound(this)
                                })
                            );
                        }

                        // Element Node
                        else {

                            var ElementClass;

                            if (child.tagName.toLowerCase() === 'brink-tag') {
                                ElementClass = get($b, 'dom.tags.' + child.getAttribute('tag'));
                            }

                            else {
                                ElementClass = this.getElementClass(child.tagName);
                            }

                            children.push(
                                ElementClass.create({
                                    dom : child,
                                    parent : unbound(this)
                                })
                            );
                        }
                    }
                }

                this.set('children', children);

                if (!this.get('isTag')) {

                    if (dom.attributes && dom.attributes.length) {

                        for (i = 0; i < dom.attributes.length; i ++) {

                            attr = dom.attributes[i];

                            attributes.push(BrinkAttr.create({
                                dom : attr,
                                parent : unbound(this)
                            }));
                        }
                    }

                    this.set('attributes', attributes);
                }
            },

            updateDOM : function () {
                return;
            },

            render : function (context) {

                var children,
                    attributes;

                children = this.get('children') || [];
                attributes = this.get('attributes') || [];

                children.forEach(function (child) {
                    child.render(context);
                });

                attributes.forEach(function (attr) {
                    attr.render(context);
                });
            },

            rerender : function () {
                var children,
                    attributes;

                children = this.get('children') || [];
                attributes = this.get('attributes') || [];

                children.forEach(function (child) {
                    child.rerender();
                });

                attributes.forEach(function (attr) {
                    attr.rerender();
                });
            },

            destroy : function () {

                var dom = this.get('dom');

                if (dom && dom.parentNode) {
                    dom.parentNode.removeChild(dom);
                }

                return this._super.apply(this, arguments);
            }
        });

        return BrinkElement;
    }

).attach('$b.dom');
