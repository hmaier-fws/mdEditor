import { attr, belongsTo } from '@ember-data/model';
import { Copyable } from 'ember-copy'
import { alias } from '@ember/object/computed';
import Model from 'mdeditor/models/base';
import { validator, buildValidations } from 'ember-cp-validations';
import EmberObject, { computed } from '@ember/object';
import config from 'mdeditor/config/environment';

const {
  APP: { defaultProfileId },
} = config;

const Validations = buildValidations({
  'json.dataDictionary.dictionaryId': validator('presence', {
    presence: true,
    ignoreBlank: true,
  }),
  'json.dataDictionary.citation.title': validator('presence', {
    presence: true,
    ignoreBlank: true,
  }),
  'json.dataDictionary.subject': [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
    }),
    validator('array-required', {
      track: [],
    }),
  ],
});

const JsonDefault = EmberObject.extend({
  init() {
    this._super(...arguments);
    this.setProperties({
      dataDictionary: {
        dictionaryId: null,

        citation: {
          title: null,
          date: [
            {
              date: new Date().toISOString(),
              dateType: 'creation',
            },
          ],
        },
        description: '',
        subject: [],
        responsibleParty: {},
        domain: [],
        entity: [],
      },
    });
  },
});

export default Model.extend(Validations, Copyable, {

  pouchDictionary: belongsTo('pouch-dictionary', { async: false }),

  /**
   * Dictionary model
   *
   * @class dictionary
   * @constructor
   * @extends base
   * @module mdeditor
   * @submodule data-models
   */

  init() {
    this._super(...arguments);

    this.on('didLoad', this, this.assignId);
  },

  profile: attr('string', {
    defaultValue: defaultProfileId,
  }),
  json: attr('json', {
    defaultValue() {
      return JsonDefault.create();
    },
  }),
  dateUpdated: attr('date', {
    defaultValue() {
      return new Date();
    },
  }),

  title: alias('json.dataDictionary.citation.title'),
  dictionaryId: alias('json.dataDictionary.dictionaryId'),

  icon: 'book',

  /**
   * A list of schema errors return by the validator.
   *
   * @property schemaErrors
   * @type {Array}
   * @readOnly
   * @category computed
   * @requires status
   */
  schemaErrors: computed('hasDirtyHash', 'customSchemas.[]', function () {
    let mdjson = this.mdjson;
    let errors = [];
    let result = mdjson.validateDictionary(this).errors;

    if (result) {
      errors.pushObject({
        title: 'Default Dictionary Validation',
        errors: result,
      });
    }

    this.customSchemas.forEach((schema) => {
      const validator = schema.validator;

      if (validator.validate(schema.rootSchema, this.cleanJson)) {
        return;
      }

      errors.pushObject({
        title: schema.title,
        errors: validator.errors,
      });
    });

    return errors;
  }),

  copy() {
    let current = this.cleanJson;
    let json = EmberObject.create(current);
    let name = current.dataDictionary.citation.title;
    json.set('dataDictionary.citation.title', `Copy of ${name}`);
    //TODO:copy needs a new ID
    json.set('dataDictionary.dictionaryId', null);

    return this.store.createRecord('dictionary', {
      json: json,
    });
  },
});
