import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { copy } from 'ember-copy';

export default Route.extend({
  flashMessages: service(),

  async model(params) {
    // Finding pouch-dictionary records needs to happen first
    // to load them into the store as related dictionary records
    await this.store.findAll('pouch-dictionary');
    return this.store.peekRecord('dictionary', params.dictionary_id);
  },

  afterModel(model) {
    const name = model.get('title');

    const crumb = {
      title: name
    };

    this.set('breadCrumb', crumb);
  },

  actions: {
    destroyDictionary: function() {
      let model = this.currentRouteModel();
      model
        .destroyRecord()
        .then(() => {
          this.flashMessages
            .success(`Deleted Dictionary: ${model.get('title')}`);
          this.replaceWith('dictionaries');
        });
    },

    copyDictionary: function() {

      this.flashMessages
        .success(`Copied Dictionary: ${this.currentRouteModel().get('title')}`);
      this.transitionTo('dictionary.new.id', copy(this.currentRouteModel()));
    }
  }
});
