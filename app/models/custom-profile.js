import Model, { attr } from '@ember-data/model';
import { computed, observer } from '@ember/object';
import { or, alias, notEmpty } from '@ember/object/computed';
import { once } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { checkVersion } from 'mdeditor/models/schema';
import { validator, buildValidations } from 'ember-cp-validations';

// [{
//   "id": "full",
//   "namespace": "org.adiwg.profile",
//   "alternateId": [""],
//   "title": "Full",
//   "description": "Evey supported component",
//   "version": "0.0.0",
//   "components": {
//     "record": {},
//     "contact": {},
//     "dictionary": {}
//   },
//   "nav": {
//     "record": [{
//       "title": "",
//       "target": "",
//       "tip": ""
//     }]
//   }
// }]

const Validations = buildValidations({
  alias: validator('presence', {
    presence: true,
    ignoreBlank: true,
    disabled: notEmpty('model.title'),
    message: 'A title must be provided.',
  }),
  title: validator('presence', {
    presence: true,
    ignoreBlank: true,
    disabled: notEmpty('model.Alias'),
    message: 'A title must be provided.',
  }),
  profileId: validator('presence', {
    presence: true,
    ignoreBlank: true,
    isWarning: true,
    message: 'No profile definition is assigned.',
  }),
  schemas: validator('presence', {
    presence: true,
    ignoreBlank: true,
    isWarning: true,
    message: 'No schemas have been assigned.',
  }),
});

export default Model.extend(Validations, {
  /**
   * Custom Profile model
   *
   * @class custom-profile
   * @constructor
   * @extends DS.Model
   * @module mdeditor
   * @submodule data-models
   */

  init() {
    this._super(...arguments);

    this.updateSettings;
  },

  definitions: service('profile'),
  uri: attr('string'),
  alias: attr('string'),
  altDescription: attr('string'),
  remoteVersion: attr('string'),
  config: attr('json'),
  profileId: attr('string'),

  title: or('alias', 'config.title'),
  identifier: alias('config.identifier'),
  namespace: alias('config.namespace'),
  description: or('altDescription', 'config.description'),
  localVersion: alias('config.version'),
  components: alias('config.components'),
  nav: alias('config.nav'),
  hasUpdate: computed('localVersion', 'remoteVersion', checkVersion),

  definition: computed('profileId', function () {
    return this.definitions.profiles.findBy('identifier', this.profileId);
  }),

  thesauri: alias('config.thesauri'),

  /* eslint-disable ember/no-observers */
  updateSettings: observer(
    'hasDirtyAttributes',
    'title',
    'uri',
    'alias',
    'description',
    'hasUpdate',
    'schemas.[]',
    'profileId',
    function () {
      if (this.isNew || this.isEmpty || this.isDeleted) {
        return;
      }

      if (this.hasDirtyAttributes) {
        this.set('dateUpdated', new Date());

        once(this, function () {
          this.save();
        });
      }
    }
  ),
  /* eslint-enable ember/no-observers */
});
