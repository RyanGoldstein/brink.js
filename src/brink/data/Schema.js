$b(

    [
        '../core/CoreObject',
        '../utils/extend'
    ],

    function (CoreObject, extend) {

        'use strict';

        var Schema = CoreObject.extend({

            __init : function (o) {

                this.__meta = this.__meta || {};
                this.__meta.isSchema = true;

                extend(this, o);

                return this;
            }

        });

        return Schema;
    }

).attach('$b');
