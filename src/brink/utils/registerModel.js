$b(

    [],

    /***********************************************************************
    @class Brink
    ************************************************************************/
    function () {

        'use strict';

        $b.__models = {};

        /***********************************************************************
        @method registerModel
        @param {Brink.Model} Model
        ************************************************************************/
        return function (model) {

            var mKey,
                cKey;

            mKey = model.modelKey;
            cKey = model.collectionKey;

            if ($b.__models[mKey]) {
                throw new Error('`modelKey` already registered : "' + mKey +  '".');
            }

            else if ($b.__models[cKey]) {
                throw new Error('`collectionKey` already registered : "' + cKey +  '".');
            }

            $b.__models[mKey] = model;
            $b.__models[cKey] = model;
        };
    }

).attach('$b');
