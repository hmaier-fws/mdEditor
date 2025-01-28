import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import EmObject, { computed, defineProperty } from '@ember/object';
import moment from 'moment';
import ScrollTo from 'mdeditor/mixins/scroll-to';
import { singularize } from 'ember-inflector';

const modelTypes = [
  'records',
  'contacts',
  'dictionaries',
  'settings',
  'schemas',
  'custom-profiles',
  'profiles',
];

const fixLiabilityTypo = async (store) => {
  let records = store.peekAll('record');
  let promises = [];
  records.forEach((record) => {
    let jsonData = record.get('json');
    if (jsonData) {
      let metadata = jsonData.get('metadata');
      if (metadata?.resourceDistribution?.length > 0) {
        const liabilityStatement =
          metadata.resourceDistribution[0].liablityStatement;

        if (liabilityStatement) {
          metadata.resourceDistribution[0].liabilityStatement =
            liabilityStatement;
          delete metadata.resourceDistribution[0].liablityStatement;

          jsonData.set('metadata', metadata);
          promises.push(record.save());
        }
      }
    }
  });
  return Promise.all(promises);
};

export default Route.extend(ScrollTo, {
  mdjson: service(),
  settings: service(),

  model() {
    return EmObject.create({
      records: this.modelFor('application'),
      settings: this.get('settings.data'),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);

    defineProperty(
      this.controller,
      'hasSelected',
      computed(
        'model.{records.0.@each._selected,records.1.@each._selected,records.2.@each._selected,settings._selected}',
        function () {
          return (
            this.store.peekAll('record').filterBy('_selected').length +
              this.store.peekAll('contact').filterBy('_selected').length +
              this.store.peekAll('dictionary').filterBy('_selected').length +
              this.store.peekAll('setting').filterBy('_selected').length >
            0
          );
        }
      )
    );

    defineProperty(
      this.controller,
      'hasSelectedRecords',
      computed('model.records.0.@each._selected', function () {
        return this.store.peekAll('record').filterBy('_selected').length > 0;
      })
    );
  },

  columns: EmObject.create({
    record: [
      { propertyName: 'title', title: 'Title' },
      { propertyName: 'defaultType', title: 'Type' },
      { propertyName: 'recordId', title: 'ID' },
    ],
    contact: [
      { propertyName: 'title', title: 'Title' },
      { propertyName: 'defaultOrganization', title: 'Organization' },
      {
        propertyName: 'json.electronicMailAddress.firstObject',
        title: 'E-mail',
      },
      { propertyName: 'contactId', title: 'ID' },
    ],
    dictionary: [
      { propertyName: 'title', title: 'Title' },
      { propertyName: 'json.dataDictionary.subject', title: 'Type' },
      { propertyName: 'dictionaryId', title: 'ID' },
    ],
  }),

  // TODO: refactor this method to inclucde {attributes: {json: {}, dateUpdate:''}} in the modelTypes array
  processExportData(exportData) {
    let resultObject;

    try {
      resultObject = JSON.parse(exportData._result);

      resultObject.data = resultObject.data.map((item) => {
        if (item.type === 'dictionaries' && item.attributes?.json) {
          // Parse the 'json' string to access the dictionary

          let jsonData = JSON.parse(item.attributes.json);

          // Remove the `dataDictionary` wrapper if it exists
          if (jsonData.dataDictionary) {
            jsonData = { ...jsonData, ...jsonData.dataDictionary };
            delete jsonData.dataDictionary;
          }

          // Update the item's 'json' string
          item.attributes.json = JSON.stringify(jsonData);
        }

        return item;
      });

      // Re-serialize the modified object back to JSON
      exportData._result = JSON.stringify(resultObject);
    } catch (error) {
      console.error('Error processing export data:', error);
    }
    return exportData;
  },

  actions: {
    exportData() {
      fixLiabilityTypo(this.store).then(() => {
        const modifiedData = this.processExportData(
          this.store.exportData(modelTypes)
        );
        window.saveAs(
          new Blob([modifiedData._result], {
            type: 'application/json;charset=utf-8',
          }),
          `mdeditor-${moment.utc().format('YYYYMMDD-HHmmss')}.json`
        );
      });
    },

    exportSelectedData(asMdjson) {
      fixLiabilityTypo(this.store).then(() => {
        if (asMdjson) {
          let records = this.store
            .peekAll('record')
            .filterBy('_selected')
            .map((item) => this.mdjson.formatRecord(item));

          window.saveAs(
            new Blob([JSON.stringify(records)], {
              type: 'application/json;charset=utf-8',
            }),
            `mdjson-${moment.utc().format('YYYYMMDD-HHmmss')}.json`
          );
        } else {
          let filterIds = {};

          modelTypes.forEach((type) => {
            let singularType = singularize(type);
            filterIds[singularType] = this.store
              .peekAll(singularType)
              .filterBy('_selected')
              .mapBy('id');
          });

          // Export schemas with settings
          if (filterIds.setting.length) {
            filterIds.schema = this.store.peekAll('schema').mapBy('id');
            filterIds.profile = this.store.peekAll('profile').mapBy('id');
            filterIds['custom-profile'] = this.store
              .peekAll('custom-profile')
              .mapBy('id');
          }
          const modifiedSelectedData = this.processExportData(
            this.store.exportSelectedData(modelTypes, { filterIds })
          );

          window.saveAs(
            new Blob([modifiedSelectedData._result], {
              type: 'application/json;charset=utf-8',
            }),
            `mdeditor-${moment.utc().format('YYYYMMDD-HHmmss')}.json`
          );
        }
      });
    },

    getColumns(type) {
      return this.columns.get(type);
    },

    hasSelected() {
      return this.hasSelected;
    },
  },
});
