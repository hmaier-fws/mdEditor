'use strict';

define("mdeditor/tests/acceptance/pods/components/layout/md-breadcrumb-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Acceptance | pods/components/md breadcrumb', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /record/new', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/record/new');
      assert.ok((0, _testHelpers.currentURL)().match(/record\/new\/[a-z0-9]+/));
      const listItems = (0, _testHelpers.findAll)('ol.breadcrumb li');
      const linkItems = (0, _testHelpers.findAll)('ol.breadcrumb li a');
      const hasRecordInallList = listItems[0].textContent.indexOf('Record') >= 0;
      const hasNewTextInallList = listItems[1].textContent.indexOf('New') >= 0;

      // const doesNotHaveRecordInLinkList = linkItems.indexOf('Record') === -1;
      // const doesNotHaveNewInLinkList = linkItems.indexOf('New') === -1;

      assert.ok(hasRecordInallList, 'renders the right inferred name');
      assert.ok(hasNewTextInallList, 'renders the right inferred name');
      assert.equal(linkItems.length, 0, 'no links rendered');
      // assert.ok(doesNotHaveRecordInLinkList, 'renders the right inferred name');
      // assert.ok(doesNotHaveNewInLinkList, 'renders the right inferred name');
    });
  });
});
define("mdeditor/tests/acceptance/pods/contact/copy-test", ["qunit", "@ember/test-helpers", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_qunit, _testHelpers, _emberQunit, _createContact) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"@ember/test-helpers",0,"ember-qunit",0,"mdeditor/tests/helpers/create-contact"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Acceptance | pods/contact copy', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('create and copy record', async function (assert) {
      assert.expect(2);
      var store = this.owner.lookup('service:store');

      //make sure there's at least one record visible
      var contact = store.createRecord('contact', (0, _createContact.default)(1)[0]);
      //await visit('/contacts/');
      //await click('button.md-button-.btn-danger');
      await (0, _testHelpers.visit)('/contact/' + contact.id);
      //await settled();
      assert.equal((0, _testHelpers.currentURL)(), '/contact/' + contact.id);
      await (0, _testHelpers.click)('.md-crud-buttons .btn-info');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, 'Copy of Contact0', 'created copy');
    });
  });
});
define("mdeditor/tests/acceptance/pods/contact/new-test", ["qunit", "@ember/test-helpers", "ember-qunit"], function (_qunit, _testHelpers, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"@ember/test-helpers",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Acceptance | pods/contact/new', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /pods/contact/new', async function (assert) {
      await (0, _testHelpers.visit)('/contact/new');
      assert.ok((0, _testHelpers.currentURL)().match(/contact\/new\/[a-z0-9]+/));
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new contact initial page conditions', async function (assert) {
      assert.expect(5);
      await (0, _testHelpers.visit)('/contact/new');
      assert.ok((0, _testHelpers.find)('.x-toggle-component.toggle-off'));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value.length, 36);
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, '');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[2].value, '');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new contact individual', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/contact/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Individual Name');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[2], '');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, 'Individual Name');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, false);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new contact organization', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/contact/new');
      await (0, _testHelpers.click)('.x-toggle-btn');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Organization Name');
      assert.ok((0, _testHelpers.find)('.x-toggle-component.toggle-on'));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value.length, 36);
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, "Organization Name");
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, false);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new contact missing contact ID', async function (assert) {
      assert.expect(1);
      await (0, _testHelpers.visit)('/contact/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[0], '');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Individual Name');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
  });
});
define("mdeditor/tests/acceptance/pods/contacts/contacts-test", ["qunit", "@ember/test-helpers", "ember-qunit"], function (_qunit, _testHelpers, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"@ember/test-helpers",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Acceptance | pods/contacts', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /contacts', async function (assert) {
      await (0, _testHelpers.visit)('/contacts');
      assert.equal((0, _testHelpers.currentURL)(), '/contacts');
    });
    (0, _qunit.test)('delete should display a confirm', async function (assert) {
      assert.expect(1);
      var store = this.owner.lookup('service:store');

      //make sure there's at least one record visible as a loaded record
      store.push({
        data: {
          id: 'test-contact-1',
          type: 'contact',
          attributes: {
            json: {
              contactId: 'test-contact-1',
              name: 'Test Contact',
              isOrganization: false
            },
            dateUpdated: new Date().toISOString()
          }
        }
      });
      await (0, _testHelpers.visit)('/contacts');
      await (0, _testHelpers.click)('button.md-button-confirm.btn-danger');
      assert.equal((0, _testHelpers.find)('button.md-button-confirm.btn-danger').innerText.trim(), 'Confirm');
    });
  });
});
define("mdeditor/tests/acceptance/pods/dictionary/copy-test", ["qunit", "@ember/test-helpers", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_qunit, _testHelpers, _emberQunit, _createDictionary) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"@ember/test-helpers",0,"ember-qunit",0,"mdeditor/tests/helpers/create-dictionary"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Acceptance | pods/dictionary copy', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('create and copy record', async function (assert) {
      assert.expect(2);
      var store = this.owner.lookup('service:store');

      //make sure there's at least one record visible
      var dictionary = store.createRecord('dictionary', (0, _createDictionary.createDictionary)(1)[0]);
      //await visit('/contacts/');
      //await click('button.md-button-.btn-danger');
      await (0, _testHelpers.visit)('/dictionary/' + dictionary.id);
      //await settled();
      assert.equal((0, _testHelpers.currentURL)(), '/dictionary/' + dictionary.id);
      await (0, _testHelpers.click)('.md-crud-buttons .btn-info');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, 'Copy of My Dictionary0', 'created copy');
    });
  });
});
define("mdeditor/tests/acceptance/pods/dictionary/new-test", ["qunit", "@ember/test-helpers", "ember-qunit", "ember-power-select/test-support"], function (_qunit, _testHelpers, _emberQunit, _testSupport) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"@ember/test-helpers",0,"ember-qunit",0,"ember-power-select/test-support"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Acceptance | pods/dictionary/new', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /pods/dictionary/new', async function (assert) {
      await (0, _testHelpers.visit)('/dictionary/new');
      assert.ok((0, _testHelpers.currentURL)().match(/dictionary\/new\/[a-z0-9]+/));
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new dictionary initial page conditions', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/dictionary/new');
      assert.equal((0, _testHelpers.find)('.md-input-input input').value, '');
      assert.equal((0, _testHelpers.find)('.md-codelist-multi').innerText.trim(), '');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      assert.equal((0, _testHelpers.findAll)('.md-error.ember-tooltip-target').length, 2);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new dictionary completed form', async function (assert) {
      assert.expect(4);
      await (0, _testHelpers.visit)('/dictionary/new');
      await (0, _testHelpers.fillIn)('.md-input-input input', 'Dictionary Name');
      await (0, _testSupport.selectChoose)('.md-codelist-multi', 'aggregate');
      assert.equal((0, _testHelpers.find)('.md-input-input input').value, 'Dictionary Name');
      assert.ok((0, _testHelpers.find)('.md-codelist-multi').innerText.includes('aggregate'));
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, false);
      assert.equal((0, _testHelpers.findAll)('.md-error.ember-tooltip-target').length, 0);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new dictionary missing dictionary name', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/dictionary/new');
      await (0, _testSupport.selectChoose)('.md-codelist-multi', 'aggregate');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      assert.equal((0, _testHelpers.findAll)('.md-error.ember-tooltip-target').length, 1);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new dictionary missing data resource type', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/dictionary/new');
      await (0, _testHelpers.fillIn)('.md-input-input input', 'Dictionary Name');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      assert.equal((0, _testHelpers.findAll)('.md-error.ember-tooltip-target').length, 1);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
  });
});
define("mdeditor/tests/acceptance/pods/record/copy-test", ["qunit", "@ember/test-helpers", "ember-qunit", "mdeditor/tests/helpers/create-record", "mdeditor/tests/helpers/create-contact", "mdeditor/tests/helpers/md-helpers"], function (_qunit, _testHelpers, _emberQunit, _createRecord, _createContact, _mdHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"@ember/test-helpers",0,"ember-qunit",0,"mdeditor/tests/helpers/create-record",0,"mdeditor/tests/helpers/create-contact",0,"mdeditor/tests/helpers/md-helpers"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Acceptance | raster view', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    hooks.afterEach(function () {
      (0, _mdHelpers.lsClean)();
    });
    (0, _qunit.skip)('visiting /raster', async function (assert) {
      let json = (0, _createRecord.createRecord)(1)[0];
      let contact = (0, _createContact.default)(2);
      json.json.contact = contact;
      let coverageDescription = (0, _createRecord.createCoverageDescription)(1);
      json.json.metadata.resourceInfo.coverageDescription = coverageDescription;
      let store = this.owner.lookup('service:store');
      let record = store.createRecord('record', json);
      record.save();
      await (0, _testHelpers.visit)(`/record/${record.id}/edit`);
      assert.equal((0, _testHelpers.currentURL)(), `/record/${record.id}/edit`);
    });

    // need to figure out why the Promise is being rejected when asserting the currentURL
    // is equal to asyny helper
    // skip('visiting raster page', async function(assert) {
    //     let store = this.owner.lookup('service:store');
    //     let json = createRecord(1)[0];
    //     let coverageDescription = createCoverageDescription(1);
    //     json.json.metadata.resourceInfo.coverageDescription = coverageDescription;
    //     let record = store.createRecord('record', json);
    //     record.save();

    //   await visit(`/record/${record.id}/edit`);
    //   assert.equal(currentURL(), `/record/${record.id}/edit`);
    // });
  });
});
define("mdeditor/tests/acceptance/pods/record/new-test", ["qunit", "@ember/test-helpers", "ember-qunit", "ember-power-select/test-support"], function (_qunit, _testHelpers, _emberQunit, _testSupport) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"@ember/test-helpers",0,"ember-qunit",0,"ember-power-select/test-support"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Acceptance | pods/record/new', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /pods/record/new', async function (assert) {
      await (0, _testHelpers.visit)('/record/new');
      assert.ok((0, _testHelpers.currentURL)().match(/record\/new\/[a-z0-9]+/));
    });
    (0, _qunit.test)('test new metadata record initial page conditions', async function (assert) {
      assert.expect(3);
      await (0, _testHelpers.visit)('/record/new');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, '');
      assert.equal((0, _testHelpers.find)('.md-select').innerText.trim(), 'Choose type of resource');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new metadata record completed form', async function (assert) {
      assert.expect(3);
      await (0, _testHelpers.visit)('/record/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[0], 'Record Title');
      await (0, _testSupport.selectChoose)('.md-select', 'attribute');
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, 'Record Title');
      assert.equal((0, _testHelpers.find)('div.md-select .select-value').innerText, 'attribute');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, false);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new metadata record missing record title', async function (assert) {
      assert.expect(1);
      await (0, _testHelpers.visit)('/record/new');
      await (0, _testSupport.selectChoose)('.md-select', 'attribute');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
    (0, _qunit.test)('test new metadata record missing data record type (scope)', async function (assert) {
      assert.expect(2);
      await (0, _testHelpers.visit)('/record/new');
      await (0, _testHelpers.fillIn)((0, _testHelpers.findAll)('.md-input-input input')[1], 'Record Title');
      assert.equal((0, _testHelpers.find)('button.md-form-save').disabled, true);
      assert.equal((0, _testHelpers.findAll)('.md-error').length, 1);
      //change route to prevent error during teardown
      await (0, _testHelpers.visit)('/');
    });
  });
});
define("mdeditor/tests/helpers/create-citation", ["exports", "@ember/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createCitation;
  0; //eaimeta@70e063a35619d71f0,"@ember/object"eaimeta@70e063a35619d71f
  function createCitation(total) {
    const citations = [];
    for (let i = 0; i < total; i++) {
      const citation = _object.default.create({
        "title": "title" + i,
        "alternateTitle": ["alternateTitle0", "alternateTitle1"],
        "date": [{
          "date": "2016-10-13",
          "dateType": "dateType"
        }, {
          "date": "2016-10-22",
          "dateType": "dateType"
        }],
        "edition": "edition",
        "responsibleParty": [{
          "role": "role",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        }, {
          "role": "role",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        }],
        "presentationForm": ["presentationForm0", "presentationForm1"],
        "identifier": [{
          "identifier": "identifier" + i,
          "authority": {
            "title": "title"
          }
        }, {
          "identifier": "identifier-" + i
        }],
        "series": {
          "seriesName": "seriesName"
        },
        "otherCitationDetails": ["otherCitationDetails0", "otherCitationDetails1"],
        "onlineResource": [{
          "uri": "http://adiwg.org"
        }, {
          "uri": "http://mdeditor.org"
        }],
        "graphic": [{
          "fileName": "fileName"
        }, {
          "fileName": "fileName"
        }]
      });
      citations.push(citation);
    }
    return citations;
  }
});
define("mdeditor/tests/helpers/create-contact", ["exports", "@ember/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createContact;
  0; //eaimeta@70e063a35619d71f0,"@ember/object"eaimeta@70e063a35619d71f
  function createContact(total) {
    const contacts = [];
    for (let i = 0; i < total; i++) {
      const contact = _object.default.create({
        json: {
          "contactId": i,
          "isOrganization": false,
          "name": "Contact" + i,
          "positionName": null,
          "phoneBook": [],
          "address": {},
          "onlineResource": [],
          "contactInstructions": null
        },
        title: 'Contact' + i,
        icon: 'user',
        contactId: i
      });
      contacts.push(contact);
    }
    return contacts;
  }
});
define("mdeditor/tests/helpers/create-dictionary", ["exports", "@ember/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.createEntity = _exports.createDomain = _exports.createDictionary = _exports.createAttribute = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object"eaimeta@70e063a35619d71f
  let createDictionary = function (total) {
    const dictionaries = [];
    for (let i = 0; i < total; i++) {
      const dictionary = _object.default.create({
        json: {
          "dataDictionary": {
            "citation": {
              "title": "My Dictionary" + i,
              "date": [{
                "date": new Date().toISOString(),
                "dateType": "creation"
              }]
            },
            "description": "Data dictionary." + i,
            subject: [],
            responsibleParty: {},
            domain: createDomain(2),
            entity: createEntity(2)
          }
        },
        title: 'My Dictionary' + i,
        icon: 'book'
      });
      dictionaries.push(dictionary);
    }
    return dictionaries;
  };
  _exports.createDictionary = createDictionary;
  let createDomain = function (total) {
    const domains = [];
    for (let i = 0; i < total; i++) {
      const domain = _object.default.create({
        "domainId": "domainId" + i,
        "commonName": "commonName" + i,
        "codeName": "codeName" + i,
        "description": "description" + i,
        "domainItem": [{
          "name": "name" + i,
          "value": "value" + i,
          "definition": "definition" + i
        }]
      });
      domains.push(domain);
    }
    return domains;
  };
  _exports.createDomain = createDomain;
  let createAttribute = function (total) {
    const attributes = [];
    for (let i = 0; i < total; i++) {
      const attribute = _object.default.create({
        "commonName": "attributeCommonName" + i,
        "codeName": "attributeCodeName0-" + i,
        "alias": ["attributeAlias0-" + i],
        "definition": "definition" + i,
        "dataType": "dataType" + i,
        "allowNull": true,
        "units": "units" + i,
        "domainId": "domainId" + i,
        "minValue": "0" + i,
        "maxValue": "99"
      });
      attributes.push(attribute);
    }
    return attributes;
  };
  _exports.createAttribute = createAttribute;
  let createEntity = function (total) {
    const entities = [];
    for (let i = 0; i < total; i++) {
      const entity = _object.default.create({
        "entityId": "entityId" + i,
        "commonName": "commonName" + i,
        "codeName": "codeName" + i,
        "alias": ["alias0-" + i, "alias1-" + i],
        "definition": "definition" + i,
        "primaryKeyAttributeCodeName": ["primaryKeyAttributeCodeName0-" + i, "primaryKeyAttributeCodeName1-" + i],
        "index": [{
          "codeName": "attributeIndex0-" + i,
          "allowDuplicates": false,
          "attributeCodeName": ["attributeCodeName0-" + i]
        }],
        "attribute": createAttribute(3),
        "foreignKey": [{
          "localAttributeCodeName": ["attributeCommonName0-" + i],
          "referencedEntityCodeName": "referencedEntityCodeName0" + i,
          "referencedAttributeCodeName": ["referencedAttributeCodeName0-" + i]
        }],
        "fieldSeparatorCharacter": ",",
        "numberOfHeaderLines": 9,
        "quoteCharacter": "\""
      });
      entities.push(entity);
    }
    return entities;
  };
  _exports.createEntity = createEntity;
});
define("mdeditor/tests/helpers/create-extent", ["exports", "@ember/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createExtent;
  0; //eaimeta@70e063a35619d71f0,"@ember/object"eaimeta@70e063a35619d71f
  function createExtent(total) {
    const contacts = [];
    for (let i = 0; i < total; i++) {
      const contact = _object.default.create({
        "description": "description" + i,
        "geographicExtent": [{
          "description": "description" + i,
          "boundingBox": {
            "westLongitude": -87.52179241764053,
            "eastLongitude": -85.30119385960293,
            "southLatitude": 29.640690610830635,
            "northLatitude": 30.42485959910817
          },
          "containsData": false,
          "geographicElement": [{
            "type": "Point",
            "coordinates": [100, 0]
          }, {
            "type": "LineString",
            "coordinates": [[100, 0], [101, 1]]
          }]
        }, {
          "geographicElement": [{
            "type": "Point",
            "coordinates": [100, 0]
          }]
        }],
        "temporalExtent": [{
          "timeInstant": {
            "description": "description" + i,
            "dateTime": "2016-10-24T11:10:15.2-10:00"
          }
        }, {
          "timePeriod": {
            "description": "description" + i,
            "startDateTime": "2016-10-24T11:10:15.2-10:00"
          }
        }],
        "verticalExtent": [{
          "description": "description" + i,
          "minValue": 9.9,
          "maxValue": 9.9,
          "crsId": {
            "referenceSystemType": "referenceSystemType",
            "referenceSystemIdentifier": {
              "identifier": "identifier"
            }
          }
        }, {
          "minValue": 9.9,
          "maxValue": 9.9,
          "crsId": {
            "referenceSystemType": "referenceSystemType",
            "referenceSystemIdentifier": {
              "identifier": "identifier"
            }
          }
        }]
      });
      contacts.push(contact);
    }
    return contacts;
  }
});
define("mdeditor/tests/helpers/create-identifier", ["exports", "@ember/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createIdentifier;
  0; //eaimeta@70e063a35619d71f0,"@ember/object"eaimeta@70e063a35619d71f
  function createIdentifier(total) {
    const identifiers = [];
    for (let i = 0; i < total; i++) {
      const identifier = _object.default.create({
        "identifier": "identifier" + i,
        "namespace": "namespace" + i,
        "version": "version" + i,
        "description": "description" + i,
        "authority": {
          "title": "title" + i
        }
      });
      identifiers.push(identifier);
    }
    return identifiers;
  }
});
define("mdeditor/tests/helpers/create-map-layer", ["exports", "@ember/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createMapLayer;
  0; //eaimeta@70e063a35619d71f0,"@ember/object"eaimeta@70e063a35619d71f
  function createMapLayer(total) {
    const layers = {
      type: 'FeatureCollection',
      features: []
    };
    for (let i = 1; i < total + 1; i++) {
      const layer = _object.default.create({
        type: 'Feature',
        id: i,
        geometry: {
          type: 'Point',
          coordinates: [-104.99404, 39.75621 + i]
        },
        properties: {
          name: `Feature ` + i
        }
      });
      layers.features.push(layer);
    }
    return layers;
  }
});
define("mdeditor/tests/helpers/create-profile", ["exports", "@ember/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createProfile;
  0; //eaimeta@70e063a35619d71f0,"@ember/object"eaimeta@70e063a35619d71f
  function createProfile(total) {
    const profiles = [];
    for (let i = 0; i < total; i++) {
      const profile = _object.default.create({
        "uri": "https://jlblcc.github.io/test-profile/profiles/minimal.json",
        "alias": 'My alias' + i,
        "altDescription": 'alternate decscription' + i,
        "remoteVersion": "0.0.1",
        components: {
          "record": {
            "main": {
              "recordId": false,
              "purpose": false,
              "environmentDescription": false,
              "supplementalInfo": false,
              "credit": false,
              "timePeriod": {
                "id": false,
                "description": false,
                "periodName": false,
                "duration": false,
                "interval": false
              },
              "citation": {
                "edition": false,
                "onlineResource": {
                  "protocol": false
                },
                "presentationForm": false,
                "otherCitationDetails": false,
                "graphic": false,
                "series": false,
                "identifier": false,
                "graphicOverview": false
              },
              "graphicOverview": false
            },
            "metadata": {
              "identifier": {
                "identifier": true,
                "namespace": true,
                "version": false,
                "description": false,
                "authority": false
              },
              "parentMetadata": false,
              "alternateMetadataReference": false,
              "defaultLocale": false,
              "maintenance": false
            }
          }
        },
        description: "A Minimalist Profile" + i,
        hasUpdate: true,
        identifier: "minimal",
        localVersion: "0.0.0",
        namespace: "org.adiwg.profile",
        nav: {
          "record": [{
            "title": "Basic Info",
            "target": "record.show.edit.main",
            "tip": "This is a customized tip."
          }, {
            "title": "About Metadata",
            "target": "record.show.edit.metadata",
            "tip": "Information about the metadata for the resource."
          }, {
            "title": "Keywords",
            "target": "record.show.edit.keywords",
            "tip": "Terms used to describe the resource."
          }, {
            "title": "Boundaries",
            "target": "record.show.edit.extent",
            "tip": "Information describing the bounds of the resource."
          }, {
            "title": "Distribution",
            "target": "record.show.edit.distribution",
            "tip": "Information about obtaining the resource."
          }],
          "dictionary": [{
            "title": "Main",
            "target": "dictionary.show.edit.index",
            "tip": "Basic information about the dictionary."
          }, {
            "title": "Citation",
            "target": "dictionary.show.edit.citation",
            "tip": "The citation for the dictionary."
          }, {
            "title": "Tables",
            "target": "dictionary.show.edit.entity",
            "tip": "Information about entities(tables) and attributes(columns or fields)."
          }]
        },
        title: "Minimal",
        config: JSON.parse("{\"identifier\":\"minimal\",\"namespace\":\"org.adiwg.profile\",\"alternateId\":[],\"title\":\"Minimal\",\"description\":\"A Minimalist Profile\",\"version\":\"0.0.0\",\"components\":{\"record\":{\"main\":{\"recordId\":false,\"purpose\":false,\"environmentDescription\":false,\"supplementalInfo\":false,\"credit\":false,\"timePeriod\":{\"id\":false,\"description\":false,\"periodName\":false,\"duration\":false,\"interval\":false},\"citation\":{\"edition\":false,\"onlineResource\":{\"protocol\":false},\"presentationForm\":false,\"otherCitationDetails\":false,\"graphic\":false,\"series\":false,\"identifier\":false,\"graphicOverview\":false},\"graphicOverview\":false},\"metadata\":{\"identifier\":{\"identifier\":true,\"namespace\":true,\"version\":false,\"description\":false,\"authority\":false},\"parentMetadata\":false,\"alternateMetadataReference\":false,\"defaultLocale\":false,\"maintenance\":false}}},\"nav\":{\"record\":[{\"title\":\"Basic Info\",\"target\":\"record.show.edit.main\",\"tip\":\"This is a customized tip.\"},{\"title\":\"About Metadata\",\"target\":\"record.show.edit.metadata\",\"tip\":\"Information about the metadata for the resource.\"},{\"title\":\"Keywords\",\"target\":\"record.show.edit.keywords\",\"tip\":\"Terms used to describe the resource.\"},{\"title\":\"Boundaries\",\"target\":\"record.show.edit.extent\",\"tip\":\"Information describing the bounds of the resource.\"},{\"title\":\"Distribution\",\"target\":\"record.show.edit.distribution\",\"tip\":\"Information about obtaining the resource.\"}],\"dictionary\":[{\"title\":\"Main\",\"target\":\"dictionary.show.edit.index\",\"tip\":\"Basic information about the dictionary.\"},{\"title\":\"Citation\",\"target\":\"dictionary.show.edit.citation\",\"tip\":\"The citation for the dictionary.\"},{\"title\":\"Tables\",\"target\":\"dictionary.show.edit.entity\",\"tip\":\"Information about entities(tables) and attributes(columns or fields).\"}]}}")
      });
      profiles.push(profile);
    }
    return profiles;
  }
});
define("mdeditor/tests/helpers/create-record", ["exports", "@ember/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.createRecord = _exports.createCoverageDescription = _exports.createAttribute = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object"eaimeta@70e063a35619d71f
  let createRecord = total => {
    const records = [];
    for (let i = 0; i < total; i++) {
      const record = _object.default.create({
        json: {
          schema: {
            name: 'mdJson',
            version: '2.7.0'
          },
          "metadata": {
            "metadataInfo": {
              "metadataIdentifier": {
                "identifier": 'r' + i,
                "type": "uuid"
              }
            },
            "associatedResource": [],
            "resourceInfo": {
              "resourceType": [{
                "type": "project"
              }],
              "citation": {
                "title": "My Record" + i,
                "date": [{
                  "date": new Date().toISOString(),
                  "dateType": "creation"
                }]
              },
              "pointOfContact": [{
                "role": "administrator"
              }],
              "pointOfrecord": [],
              "abstract": "An abstract.",
              "status": ["completed"],
              "language": ["eng; USA"]
            },
            "resourceDistribution": []
          }
        },
        title: 'My Record' + i,
        icon: 'project'
      });
      records.push(record);
    }
    return records;
  };
  _exports.createRecord = createRecord;
  let createCoverageDescription = total => {
    const coverageDescriptions = [];
    for (let i = 0; i < total; i++) {
      const coverageDescription = _object.default.create({
        "coverageName": "coverageName" + i,
        "coverageDescription": "coverageDescription" + i,
        "attributeGroup": [{
          "attributeContentType": ["attributeContentType" + i],
          "attribute": createAttribute(1).attributeDescription
        }],
        "processingLevelCode": {
          "identifier": "identifier" + i,
          "namespace": "namespace" + i
        },
        "imageDescription": {
          "illuminationElevationAngle": i.toString(),
          "illuminationAzimuthAngle": i.toString(),
          "imagingCondition": "imagingCondition" + i,
          "imageQualityCode": {
            "identifier": "identifier" + i,
            "namespace": "namespace" + i
          },
          "cloudCoverPercent": i.toString(),
          "compressionQuantity": i.toString(),
          "triangulationIndicator": true,
          "radiometricCalibrationAvailable": false,
          "cameraCalibrationAvailable": true,
          "filmDistortionAvailable": false,
          "lensDistortionAvailable": false
        }
      });
      coverageDescriptions.push(coverageDescription);
    }
    return coverageDescriptions;
  };
  _exports.createCoverageDescription = createCoverageDescription;
  let createAttribute = total => {
    const attributes = [];
    for (var i = 0; i < total; i++) {
      const attribute = _object.default.create({
        "attributeDescription": "attributeDescription" + i,
        "attributeIdentifier": [{
          "identifier": "identifier" + i,
          "namespace": "namespace" + i
        }],
        "bandBoundaryDefinition": ["bandBoundaryDefinition" + i],
        "transferFunctionType": ["transferFunctionType" + i],
        "transmittedPolarization": ["transmittedPolarization" + i],
        "detectedPolarization": ["detectedPolarization" + i],
        "sequenceIdentifier": "sequenceIdentifier" + i,
        "sequenceIdentifierType": "sequenceIdentifierType" + i,
        "minValue": i.toString(),
        "maxValue": i.toString(),
        "units": "units" + i,
        "scaleFactor": i.toString(),
        "offset": i.toString(),
        "meanValue": i.toString(),
        "numberOfValues": i.toString(),
        "standardDeviation": i.toString(),
        "bitsPerValue": i.toString(),
        "boundMin": i.toString(),
        "boundMax": i.toString(),
        "boundUnits": i.toString(),
        "peakResponse": i.toString(),
        "toneGradations": i.toString(),
        "nominalSpatialResolution": i.toString()
      });
      attributes.push(attribute);
    }
    return attributes;
  };
  _exports.createAttribute = createAttribute;
});
define("mdeditor/tests/helpers/create-taxonomy", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createTaxonomy;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function createTaxonomy() {
    const taxonomies = [{
      "taxonomicClassification": [{
        "taxonomicSystemId": "555705",
        "taxonomicLevel": "Kingdom",
        "taxonomicName": "Fungi",
        "subClassification": [{
          "taxonomicSystemId": "936287",
          "taxonomicLevel": "Subkingdom",
          "taxonomicName": "Dikarya",
          "subClassification": [{
            "taxonomicSystemId": "623881",
            "taxonomicLevel": "Division",
            "taxonomicName": "Basidiomycota",
            "isITIS": true
          }],
          "isITIS": true
        }],
        "isITIS": true,
        "commonName": ["Kingdom"]
      }, {
        "taxonomicSystemId": "202423",
        "taxonomicLevel": "Kingdom",
        "taxonomicName": "Animalia",
        "subClassification": [{
          "taxonomicSystemId": "914153",
          "taxonomicLevel": "Subkingdom",
          "taxonomicName": "Radiata",
          "subClassification": [{
            "taxonomicSystemId": "48738",
            "taxonomicLevel": "Phylum",
            "taxonomicName": "Cnidaria",
            "subClassification": [{
              "taxonomicSystemId": "718920",
              "taxonomicLevel": "Subphylum",
              "taxonomicName": "Medusozoa",
              "subClassification": [{
                "taxonomicSystemId": "51483",
                "taxonomicLevel": "Class",
                "taxonomicName": "Scyphozoa",
                "subClassification": [{
                  "taxonomicSystemId": "718923",
                  "taxonomicLevel": "Subclass",
                  "taxonomicName": "Discomedusae",
                  "subClassification": [{
                    "taxonomicSystemId": "51756",
                    "taxonomicLevel": "Order",
                    "taxonomicName": "Rhizostomeae",
                    "subClassification": [{
                      "taxonomicSystemId": "51911",
                      "taxonomicLevel": "Family",
                      "taxonomicName": "Rhizostomatidae",
                      "subClassification": [{
                        "taxonomicSystemId": "51919",
                        "taxonomicLevel": "Genus",
                        "taxonomicName": "Rhopilema",
                        "subClassification": [{
                          "taxonomicSystemId": "51920",
                          "taxonomicLevel": "Species",
                          "taxonomicName": "Rhopilema verrilli",
                          "commonName": ["mushroom jellyfish"],
                          "isITIS": true
                        }],
                        "isITIS": true
                      }],
                      "isITIS": true
                    }],
                    "isITIS": true
                  }],
                  "isITIS": true
                }],
                "isITIS": true
              }],
              "isITIS": true
            }],
            "isITIS": true
          }],
          "isITIS": true
        }],
        "isITIS": true
      }],
      "taxonomicSystem": [{
        "citation": {
          "title": "Integrated Taxonomic Information System (ITIS)",
          "date": [{
            "date": "2019-02-26",
            "dateType": "transmitted",
            "description": "Taxa imported from ITIS"
          }],
          "presentationForm": ["webService", "webSite"],
          "otherCitationDetails": ["Retrieved from the Integrated Taxonomic Information System on-line database, https://www.itis.gov."],
          "onlineResource": [{
            "uri": "https://www.itis.gov",
            "name": "ITIS website",
            "protocol": "HTTPS",
            "function": "information",
            "description": "ITIS contains taxonomic information on plants, animals, fungi, and microbes of North America and the world."
          }],
          "graphic": [{
            "fileName": "itis_logo.jpg",
            "fileType": "JPEG",
            "fileUri": [{
              "uri": "https://itis.gov/Static/images/itis_logo.jpg"
            }]
          }]
        },
        modifications: "modifications"
      }],
      "observer": [{
        "party": [{
          "contactId": "CID003"
        }],
        "role": "pointOfContact"
      }],
      "voucher": [{
        "repository": {
          "party": [{
            "contactId": "CID003"
          }],
          "role": "custodian"
        },
        "specimen": "Specimen"
      }],
      "generalScope": "Scope",
      "identificationProcedure": "Id Procedure",
      "identificationCompleteness": "Id Completeness"
    }, {
      "taxonomicSystem": [{
        "citation": {
          "title": "ITIS - Integrated Taxonomic Information System",
          "alternateTitle": ["Citation for ITIS"],
          "date": [{
            "date": "2013-06-22",
            "dateType": "publication"
          }],
          "responsibleParty": [{
            "role": "originator",
            "party": [{
              "contactId": "CID004"
            }]
          }]
        },
        "modifications": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      }, {
        "citation": {
          "title": "Some OTHER Taxonomic System",
          "date": [{
            "date": "2013-06-22",
            "dateType": "publication"
          }],
          "responsibleParty": [{
            "role": "originator",
            "party": [{
              "contactId": "CID004"
            }]
          }]
        }
      }],
      "generalScope": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "identificationReference": [{
        "title": "citation",
        "identifier": [{
          "identifier": "identifier0",
          "namespace": "namespace0",
          "version": "version0",
          "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "authority": {
            "title": "title0",
            "date": [{
              "date": "2013-06-22",
              "dateType": "publication"
            }],
            "responsibleParty": [{
              "role": "originator",
              "party": [{
                "contactId": "CID004"
              }]
            }]
          }
        }]
      }, {
        "title": "citation1",
        "identifier": [{
          "identifier": "identifier1",
          "namespace": "namespace1",
          "version": "version1",
          "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          "authority": {
            "title": "title1",
            "date": [{
              "date": "2013-06-22",
              "dateType": "publication"
            }],
            "responsibleParty": [{
              "role": "originator",
              "party": [{
                "contactId": "CID004"
              }]
            }]
          }
        }]
      }],
      "observer": [{
        "party": [{
          "contactId": "CID006"
        }, {
          "contactId": "CID004"
        }],
        "role": "coPrincipalInvestigator"
      }, {
        "party": [{
          "contactId": "CID001"
        }],
        "role": "editor"
      }],
      "identificationProcedure": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "identificationCompleteness": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "voucher": [{
        "repository": {
          "role": "custodian",
          "party": [{
            "contactId": "CID002"
          }]
        },
        "specimen": "bear claw"
      }, {
        "repository": {
          "role": "custodian",
          "party": [{
            "contactId": "CID002"
          }]
        },
        "specimen": "moose tooth"
      }],
      "taxonomicClassification": [{
        "taxonomicLevel": "taxonomicLevel0",
        "taxonomicName": "taxonomicName",
        "commonName": ["commonName0", "commonName1"],
        "subClassification": [{
          "taxonomicSystemId": "taxonomicSystemId00",
          "taxonomicLevel": "taxonomicLevel00",
          "taxonomicName": "taxonomicName",
          "commonName": ["commonName0", "commonName1"],
          "subClassification": [{
            "taxonomicLevel": "taxonomicLevel000",
            "taxonomicName": "taxonomicName",
            "commonName": ["commonName0", "commonName1"],
            "subClassification": [{
              "taxonomicSystemId": "taxonomicSystemId0000.1",
              "taxonomicLevel": "taxonomicLevel0000.1",
              "taxonomicName": "taxonomicName",
              "commonName": ["commonName0", "commonName1"]
            }, {
              "taxonomicSystemId": "taxonomicSystemId0000.2",
              "taxonomicLevel": "taxonomicLevel0000.2",
              "taxonomicName": "taxonomicName",
              "commonName": ["commonName0", "commonName1"]
            }]
          }]
        }, {
          "taxonomicLevel": "taxonomicLevel01",
          "taxonomicName": "taxonomicName",
          "commonName": ["commonName0", "commonName1"],
          "subClassification": [{
            "taxonomicLevel": "taxonomicLevel010",
            "taxonomicName": "taxonomicName",
            "commonName": ["commonName0", "commonName1"]
          }]
        }]
      }, {
        "taxonomicLevel": "taxonomicLevel0201",
        "taxonomicName": "taxonomicName"
      }]
    }];
    return taxonomies;
  }
});
define("mdeditor/tests/helpers/data-transfer", ["exports", "@ember/object"], function (_exports, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object"eaimeta@70e063a35619d71f
  var c = _object.default.extend({
    getData: function () {
      return this.get('payload');
    },
    setData: function (dataType, payload) {
      this.set("data", {
        dataType: dataType,
        payload: payload
      });
    }
  });
  c.reopenClass({
    makeMockEvent: function (payload) {
      var transfer = this.create({
        payload: payload
      });
      var res = {
        dataTransfer: transfer
      };
      res.preventDefault = function () {
        console.log('prevent default');
      };
      res.stopPropagation = function () {
        console.log('stop propagation');
      };
      return res;
    },
    createDomEvent: function (type) {
      var event = document.createEvent("CustomEvent");
      event.initCustomEvent(type, true, true, null);
      event.dataTransfer = {
        data: {},
        setData: function (type, val) {
          this.data[type] = val;
        },
        getData: function (type) {
          return this.data[type];
        }
      };
      return event;
    }
  });
  var _default = _exports.default = c;
});
define("mdeditor/tests/helpers/destroy-app", ["exports", "@ember/runloop"], function (_exports, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = destroyApp;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop"eaimeta@70e063a35619d71f
  function destroyApp(application) {
    var store = application.__container__.lookup('service:store');
    if (store) {
      (0, _runloop.run)(function () {
        store.unloadAll();
        application.destroy();
      });
    } else {
      (0, _runloop.run)(application, 'destroy');
    }
  }
});
define("mdeditor/tests/helpers/drag-drop", ["exports", "@ember/test-helpers", "mdeditor/tests/helpers/mock-event"], function (_exports, _testHelpers, _mockEvent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.drag = drag;
  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"mdeditor/tests/helpers/mock-event"eaimeta@70e063a35619d71f
  async function dragOver(dropSelector, moves) {
    moves = moves || [[{
      clientX: 1,
      clientY: 1
    }, dropSelector]];
    for (const move of moves) {
      const position = move[0] || false;
      const selector = move[1] || false;
      const event = new _mockEvent.default(position);
      await (0, _testHelpers.triggerEvent)(selector || dropSelector, 'dragover', event);
    }
  }
  async function drop(dragSelector, dragEvent, options) {
    let {
      drop: dropSelector,
      dropEndOptions,
      dragOverMoves
    } = options;
    let dropElement = await (0, _testHelpers.find)(dropSelector);
    if (!dropElement) {
      throw `There are no drop targets by the given selector: '${dropSelector}'`;
    }
    await dragOver(dropSelector, dragOverMoves);
    if (options.beforeDrop) {
      await options.beforeDrop.call();
    }
    let event = new _mockEvent.default().useDataTransferData(dragEvent);
    await (0, _testHelpers.triggerEvent)(dropSelector, 'drop', event);
    return await (0, _testHelpers.triggerEvent)(dragSelector, 'dragend', dropEndOptions);
  }
  async function drag(dragSelector) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let dragEvent = new _mockEvent.default(options.dragStartOptions);
    await (0, _testHelpers.triggerEvent)(dragSelector, 'mouseover');
    await (0, _testHelpers.triggerEvent)(dragSelector, 'dragstart', dragEvent);
    if (options.afterDrag) {
      await options.afterDrag.call();
    }
    if (options.drop) {
      await drop(dragSelector, dragEvent, options);
    }
  }
});
define("mdeditor/tests/helpers/ember-drag-drop", ["exports", "@ember/runloop", "mdeditor/tests/helpers/data-transfer"], function (_exports, _runloop, _dataTransfer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.drag = drag;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"mdeditor/tests/helpers/data-transfer"eaimeta@70e063a35619d71f
  /* global triggerEvent , andThen */
  function drop($dragHandle, dropCssPath, dragEvent) {
    let dropTarget = document.querySelector(dropCssPath);
    if (dropTarget.length === 0) {
      throw `There are no drop targets by the given selector: '${dropCssPath}'`;
    }
    (0, _runloop.run)(() => {
      triggerEvent(dropTarget, 'dragover', _dataTransfer.default.makeMockEvent());
    });
    (0, _runloop.run)(() => {
      triggerEvent(dropTarget, 'drop', _dataTransfer.default.makeMockEvent(dragEvent.dataTransfer.get('data.payload')));
    });
    (0, _runloop.run)(() => {
      triggerEvent($dragHandle, 'dragend', _dataTransfer.default.makeMockEvent());
    });
  }
  function drag(cssPath) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let dragEvent = _dataTransfer.default.makeMockEvent();
    let dragHandle = document.querySelector(cssPath);
    (0, _runloop.run)(() => {
      triggerEvent(dragHandle, 'mouseover');
    });
    (0, _runloop.run)(() => {
      triggerEvent(dragHandle, 'dragstart', dragEvent);
    });
    andThen(function () {
      if (options.beforeDrop) {
        options.beforeDrop.call();
      }
    });
    andThen(function () {
      if (options.drop) {
        drop(dragHandle, options.drop, dragEvent);
      }
    });
  }
});
define("mdeditor/tests/helpers/flash-message", ["ember-cli-flash/flash/object"], function (_object) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"ember-cli-flash/flash/object"eaimeta@70e063a35619d71f
  _object.default.reopen({
    init() {
      return this;
    }
  });
});
define("mdeditor/tests/helpers/md-helpers", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.formatContent = formatContent;
  _exports.nestedValues = _exports.lsClean = void 0;
  _exports.parseInput = parseInput;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  /**
   * The parseInput helper will query for any input, textarea, or instance of
   * md-select and return the value(s) as a delimited string. Set delimiter to
   * `false` to return an array of values.
   *
   * @method parseInput
   * @param {Element} e The element to parse
   * @param {String|false} delimiter The delimiter to use, Defaults to `|`. Set to `false` to
   * return `[values]`
   * @static
   * @return {String|Array}
   */
  function parseInput(e) {
    let delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '|';
    // TODO: Support md-toggle
    let text = Array.from(e.querySelectorAll('input,textarea,.md-select')).map(i => (i.type === 'checkbox' ? i.checked.toString() : false) || i.value || Array.from(i.querySelectorAll('.select-value')).map(n => n.textContent).join('|'));
    return delimiter ? text.join(delimiter) : text;
  }
  function formatContent(t) {
    return t.textContent.replace(/[\s\n]+/g, '|').trim();
  }
  let nestedValues = obj => typeof obj === 'object' ? Object.values(obj).map(nestedValues).flat() : [obj];
  _exports.nestedValues = nestedValues;
  let lsClean = () => {
    let ls = window.localStorage;
    Object.keys(ls).forEach(k => {
      // eslint-disable-next-line no-useless-escape
      if (k.match(/^test\:/)) {
        ls.removeItem(k);
        console.info('Removed record:' + k);
      }
    });
  };
  _exports.lsClean = lsClean;
});
define("mdeditor/tests/helpers/mock-event", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.createDomEvent = createDomEvent;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  class DataTransfer {
    constructor() {
      this.data = {};
    }
    setData(type, value) {
      this.data[type] = value;
      return this;
    }
    getData() {
      let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Text";
      return this.data[type];
    }
    setDragImage() {}
  }
  window.__CLASSIC_HAS_CONSTRUCTOR__.set(DataTransfer, true);
  window.__CLASSIC_OWN_CLASSES__.set(DataTransfer, true);
  class MockEvent {
    constructor() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.dataTransfer = new DataTransfer();
      this.dataTransfer.setData('Text', options.dataTransferData);
      this.setProperties(options);
    }
    useDataTransferData(otherEvent) {
      this.dataTransfer.setData('Text', otherEvent.dataTransfer.getData());
      return this;
    }
    setProperties(props) {
      for (let prop in props) {
        this[prop] = props[prop];
      }
      return this;
    }
    preventDefault() {}
    stopPropagation() {}
  }
  _exports.default = MockEvent;
  window.__CLASSIC_HAS_CONSTRUCTOR__.set(MockEvent, true);
  window.__CLASSIC_OWN_CLASSES__.set(MockEvent, true);
  function createDomEvent(type) {
    let event = document.createEvent("CustomEvent");
    event.initCustomEvent(type, true, true, null);
    event.dataTransfer = new DataTransfer();
    return event;
  }
});
define("mdeditor/tests/helpers/modal-asserts", ["exports", "jquery", "qunit"], function (_exports, _jquery, _qunit) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = registerAssertHelpers;
  0; //eaimeta@70e063a35619d71f0,"jquery",0,"qunit"eaimeta@70e063a35619d71f
  function registerAssertHelpers() {
    const {
      assert
    } = _qunit.default;
    const overlaySelector = '.md-modal-overlay';
    const dialogSelector = '.ember-modal-dialog';
    assert.isPresentOnce = function (selector, message) {
      message = message || `${selector} is present in DOM once`;
      return this.equal((0, _jquery.default)(selector).length, 1, message);
    };
    assert.isAbsent = function (selector, message) {
      message = message || `${selector} is absent from DOM`;
      return this.equal((0, _jquery.default)(selector).length, 0, message);
    };
    assert.isVisible = function (selector, message) {
      message = message || `${selector} is not visible`;
      return this.ok((0, _jquery.default)(selector).is(':visible'), message);
    };
    assert.dialogOpensAndCloses = function (options /*, message*/) {
      //message = message || `Dialog triggered by ${options.openSelector} failed to open and close`;
      const dialogContent = options.dialogText ? [dialogSelector, `:contains(${options.dialogText})`].join('') : dialogSelector;
      const self = this;
      return click(options.openSelector, options.context).then(function () {
        if (options.hasOverlay) {
          self.isPresentOnce(overlaySelector);
        }
        self.isPresentOnce(dialogContent);
        if (options.whileOpen) {
          options.whileOpen();
        }
        return click(options.closeSelector, options.context).then(function () {
          self.isAbsent(overlaySelector);
          self.isAbsent(dialogContent);
        });
      });
    };
  }
});
define("mdeditor/tests/helpers/start-app", ["exports", "mdeditor/app", "mdeditor/config/environment", "@ember/polyfills", "@ember/runloop", "mdeditor/tests/helpers/modal-asserts", "mdeditor/tests/helpers/ember-power-select"], function (_exports, _app, _environment, _polyfills, _runloop, _modalAsserts, _emberPowerSelect) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = startApp;
  0; //eaimeta@70e063a35619d71f0,"mdeditor/app",0,"mdeditor/config/environment",0,"@ember/polyfills",0,"@ember/runloop",0,"mdeditor/tests/helpers/modal-asserts",0,"mdeditor/tests/helpers/ember-power-select"eaimeta@70e063a35619d71f
  (0, _emberPowerSelect.default)();
  function startApp(attrs) {
    let attributes = (0, _polyfills.merge)({}, _environment.default.APP);
    attributes = (0, _polyfills.merge)(attributes, attrs); // use defaults, but you can override;

    return (0, _runloop.run)(() => {
      let application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      (0, _modalAsserts.default)();
      return application;
    });
  }
});
define("mdeditor/tests/integration/components/feature-form-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | feature form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('model', {
        id: 'foo',
        properties: {
          name: 'bar',
          description: 'foobar'
        }
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{feature-form model=model}}
      */
      {
        "id": "7g4WJgts",
        "block": "[[[1,[28,[35,0],null,[[\"model\"],[[33,1]]]]]],[],false,[\"feature-form\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Feature|ID|Name|Description|Description|Other|Properties|read-only|Name|Value|None|found.|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#feature-form model=model}}
              template block text
            {{/feature-form}}
          
      */
      {
        "id": "6U/+GIky",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"model\"],[[33,1]]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"feature-form\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Feature|ID|Name|Description|Description|Other|Properties|read-only|Name|Value|None|found.|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/components/feature-group-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-map-layer",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | feature group', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('layers', (0, _createMapLayer.default)(2));

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <LeafletDraw @lat={{0}} @lng={{0}} @zoom={{2}}>
              {{!-- Specify child layer components here --}}
              <LayerGroup @name="Terrain" @baselayer={{true}} @default={{true}}>
                {{tile-layer url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png" attribution=mapAttribution}}
              </LayerGroup>
      
              <FeatureGroup @name="Extents" @default={{true}}>
                {{#each layers as |l|}}
                  {{geojson-layer geoJSON=l draw=true}}
                {{/each}}
              </FeatureGroup>
      
              {{layer-control}}
            </LeafletDraw>
          
      */
      {
        "id": "an/uo72W",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@lat\",\"@lng\",\"@zoom\"],[0,0,2]],[[\"default\"],[[[[1,\"\\n\"],[1,\"        \"],[8,[39,1],null,[[\"@name\",\"@baselayer\",\"@default\"],[\"Terrain\",true,true]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,2],null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[33,3]]]]],[1,\"\\n        \"]],[]]]]],[1,\"\\n\\n        \"],[8,[39,4],null,[[\"@name\",\"@default\"],[\"Extents\",true]],[[\"default\"],[[[[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[33,7]],null]],null],null,[[[1,\"            \"],[1,[28,[35,8],null,[[\"geoJSON\",\"draw\"],[[30,1],true]]]],[1,\"\\n\"]],[1]],null],[1,\"        \"]],[]]]]],[1,\"\\n\\n        \"],[1,[34,9]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"]],[\"l\"],false,[\"leaflet-draw\",\"layer-group\",\"tile-layer\",\"mapAttribution\",\"feature-group\",\"each\",\"-track-array\",\"layers\",\"geojson-layer\",\"layer-control\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.leaflet-container').innerText.trim().replace(/\n/g, '|'), '+|-|Draw a polyline|Draw a polygon|Draw a rectangle|Draw a marker|3000 km|2000 mi|Leaflet');
    });
  });
});
define("mdeditor/tests/integration/components/feature-table-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-map-layer",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | feature table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.zoomTo = function () {
        assert.ok(true, 'called zoomTo');
      };
      this.showForm = function () {
        assert.ok(true, 'clicked showForm');
      };
      this.deleteFeature = function () {
        assert.ok(true, 'clicked deleteFeature');
      };
      this.set('data', (0, _createMapLayer.default)(2));
      assert.expect(4);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{feature-table
            data=data.features
            columnComponents=(hash
              leaflet-table-row-actions=(component "leaflet-table-row-actions"
              showForm=showForm
              zoomTo=zoomTo
              deleteFeature=deleteFeature
            ))
          }}
      */
      {
        "id": "atR5tGUl",
        "block": "[[[1,[28,[35,0],null,[[\"data\",\"columnComponents\"],[[33,1,[\"features\"]],[28,[37,2],null,[[\"leaflet-table-row-actions\"],[[50,\"leaflet-table-row-actions\",0,null,[[\"showForm\",\"zoomTo\",\"deleteFeature\"],[[33,4],[33,5],[33,6]]]]]]]]]]]],[],false,[\"feature-table\",\"data\",\"hash\",\"component\",\"showForm\",\"zoomTo\",\"deleteFeature\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.feature-table').textContent.replace(/[\s, \t]/g, '\n').trim().replace(/[ +\n]+/g, '|'), 'Search:|Columns|Show|All|Hide|All|Restore|Defaults|ID|Name|Description|Actions|ID|Name|Description|Actions|ID|Name|Description|1|Feature|1|2|Feature|2|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|Page:|1');
      await (0, _testHelpers.click)((0, _testHelpers.find)('td .btn-success'));
      await (0, _testHelpers.click)((0, _testHelpers.find)('td .btn-info'));
      await (0, _testHelpers.click)((0, _testHelpers.find)('td .btn-danger'));
    });
  });
});
define("mdeditor/tests/integration/components/geojson-layer-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-map-layer",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | geojson layer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('layers', (0, _createMapLayer.default)(2));

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#leaflet-draw lat=0 lng=0 zoom=2}}
              {{!-- Specify child layer components here --}}
              {{#layer-group name="Terrain" baselayer=true default=true}}
                {{tile-layer url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png" attribution=mapAttribution}}
              {{/layer-group}}
      
              {{#feature-group name="Extents" default=true}}
                {{#each layers as |l|}}
                  {{geojson-layer geoJSON=l draw=true editLayers=layers}}
                {{/each}}
              {{/feature-group}}
      
              {{layer-control}}
            {{/leaflet-draw}}
          
      */
      {
        "id": "zBjEOjZS",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"lat\",\"lng\",\"zoom\"],[0,0,2]],[[\"default\"],[[[[6,[39,1],null,[[\"name\",\"baselayer\",\"default\"],[\"Terrain\",true,true]],[[\"default\"],[[[[1,\"          \"],[1,[28,[35,2],null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[33,3]]]]],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[6,[39,4],null,[[\"name\",\"default\"],[\"Extents\",true]],[[\"default\"],[[[[42,[28,[37,6],[[28,[37,6],[[33,7]],null]],null],null,[[[1,\"            \"],[1,[28,[35,8],null,[[\"geoJSON\",\"draw\",\"editLayers\"],[[30,1],true,[33,7]]]]],[1,\"\\n\"]],[1]],null]],[]]]]],[1,\"\\n        \"],[1,[34,9]],[1,\"\\n\"]],[]]]]],[1,\"    \"]],[\"l\"],false,[\"leaflet-draw\",\"layer-group\",\"tile-layer\",\"mapAttribution\",\"feature-group\",\"each\",\"-track-array\",\"layers\",\"geojson-layer\",\"layer-control\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.leaflet-container').innerText.trim().replace(/\n/g, '|'), '+|-|Draw a polyline|Draw a polygon|Draw a rectangle|Draw a marker|3000 km|2000 mi|Leaflet');
    });
  });
});
define("mdeditor/tests/integration/components/leaflet-draw-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-map-layer",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | leaflet draw', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('layers', (0, _createMapLayer.default)(2));

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <LeafletDraw @lat={{0}} @lng={{0}} @zoom={{2}}>
              {{!-- Specify child layer components here --}}
              <LayerGroup @name="Terrain" @baselayer={{true}} @default={{true}}>
                {{tile-layer url="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png" attribution=mapAttribution}}
              </LayerGroup>
      
              {{layer-control}}
            </LeafletDraw>
          
      */
      {
        "id": "q35Gbjev",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@lat\",\"@lng\",\"@zoom\"],[0,0,2]],[[\"default\"],[[[[1,\"\\n\"],[1,\"        \"],[8,[39,1],null,[[\"@name\",\"@baselayer\",\"@default\"],[\"Terrain\",true,true]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,2],null,[[\"url\",\"attribution\"],[\"http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png\",[33,3]]]]],[1,\"\\n        \"]],[]]]]],[1,\"\\n\\n        \"],[1,[34,4]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"leaflet-draw\",\"layer-group\",\"tile-layer\",\"mapAttribution\",\"layer-control\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.leaflet-container').innerText.trim().replace(/\n/g, '|'), '+|-|Draw a polyline|Draw a polygon|Draw a rectangle|Draw a marker|3000 km|2000 mi|Leaflet');
    });
  });
});
define("mdeditor/tests/integration/components/leaflet-table-row-actions-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | leaflet table row actions', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.zoomTo = function () {};
      this.showForm = function () {};
      this.deleteFeature = function () {};
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{leaflet-table-row-actions
            zoomTo=zoomTo
            showForm=showForm
            deleteFeature=deleteFeature
          }}
      */
      {
        "id": "GJK7uD+f",
        "block": "[[[1,[28,[35,0],null,[[\"zoomTo\",\"showForm\",\"deleteFeature\"],[[33,1],[33,2],[33,3]]]]]],[],false,[\"leaflet-table-row-actions\",\"zoomTo\",\"showForm\",\"deleteFeature\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.findAll)('button').length, 3);
    });
  });
});
define("mdeditor/tests/integration/components/leaflet-table-row-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | leaflet table row', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{leaflet-table-row}}
      */
      {
        "id": "8oW3Xl1S",
        "block": "[[[1,[34,0]]],[],false,[\"leaflet-table-row\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.findAll)('tr').length, 1);
    });
  });
});
define("mdeditor/tests/integration/components/leaflet-table-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-map-layer"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createMapLayer) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-map-layer",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | leaflet table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('layers', (0, _createMapLayer.default)(2));
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{leaflet-table layers=this.layers.features
            resizeDebouncedEventsEnabled=true}}
      */
      {
        "id": "qup18Wvq",
        "block": "[[[1,[28,[35,0],null,[[\"layers\",\"resizeDebouncedEventsEnabled\"],[[30,0,[\"layers\",\"features\"]],true]]]]],[],false,[\"leaflet-table\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.feature-table').textContent.replace(/[\s\t]/g, '\n').trim().replace(/[ \n]+/g, '|'), 'ID|Name|Description|Actions|ID|Name|Description|1|Feature|1|2|Feature|2|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|Page:|1');
    });
  });
});
define("mdeditor/tests/integration/components/sb-publisher-test", ["@ember/template-factory", "@ember/test-helpers", "@ember/object", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-record"], function (_templateFactory, _testHelpers, _object, _qunit, _emberQunit, _createRecord) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"@ember/object",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-record",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | sb publisher', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('config', {
        name: 'ScienceBase',
        route: 'sciencebase',
        description: 'ScienceBase is a collaborative scientific data and information management platform',
        icon: 'globe',
        rootURI: 'https://api.sciencebase.gov/sbmd-service/',
        rootItemURL: 'https://www.sciencebase.gov/catalog/item/',
        defaultParent: '59ef8a34e4b0220bbd98d449',
        settingsComponent: 'sb-settings'
      });
      this.set('settings', _object.default.create({
        data: {
          publishOptions: []
        }
      }));
      this.set('records', (0, _createRecord.createRecord)(3));
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{sb-publisher config=config settings=settings records=records}}
      */
      {
        "id": "QQbUz8QA",
        "block": "[[[1,[28,[35,0],null,[[\"config\",\"settings\",\"records\"],[[33,1],[33,2],[33,3]]]]]],[],false,[\"sb-publisher\",\"config\",\"settings\",\"records\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.findAll)('.tree-leaf').length, 4);
    });
  });
});
define("mdeditor/tests/integration/components/sb-settings-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | sb settings', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('model', {
        publisherEndpoint: '',
        'sb-defaultParent': ''
      });
      this.set('save', () => {});
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{sb-settings model=this.model save=this.save}}
      */
      {
        "id": "q7pKIeCx",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"save\"],[[30,0,[\"model\"]],[30,0,[\"save\"]]]]]]],[],false,[\"sb-settings\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.findAll)('input').length, 2);
    });
  });
});
define("mdeditor/tests/integration/components/sb-tree-label-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | sb tree label', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('model', {
        definition: 'Final report outlining the Data Management Strategy for the Science Agency.',
        hideCheck: false,
        icon: 'android',
        id: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        identifier: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        isSelected: false,
        label: 'Data Management Strategy',
        nodeClass: 'tree-node-rooted',
        notSelectable: false,
        sbDate: null,
        sbId: 'test',
        sbParentId: null,
        sbParentIdObj: undefined,
        sortOrder: 0,
        type: 'application',
        uuid: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8'
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{sb-tree-label model=model}}
      */
      {
        "id": "MD0H2Qm6",
        "block": "[[[1,[28,[35,0],null,[[\"model\"],[[33,1]]]]]],[],false,[\"sb-tree-label\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.tree-cell').innerText.trim(), 'Data Management Strategy : test Parent Id: None --');
    });
  });
});
define("mdeditor/tests/integration/components/sb-tree-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | sb tree', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('model', [{
        children: [{
          definition: 'Child 1.',
          hideCheck: false,
          icon: 'globe',
          id: '4ebb8fe5-f88f-49a4-9964-1',
          identifier: '4ebb8fe5-f88f-49a4-9964-1',
          isSelected: false,
          label: 'Child 1',
          nodeClass: 'tree-node-rooted',
          notSelectable: false,
          sbDate: null,
          sbId: 'test1',
          sbParentId: null,
          sbParentIdObj: undefined,
          sortOrder: 0,
          type: 'map',
          uuid: '4ebb8fe5-f88f-49a4-9964-1'
        }],
        definition: 'Final report outlining the Data Management Strategy for the Science Agency.',
        hideCheck: false,
        isExpanded: true,
        isRoot: true,
        icon: 'android',
        id: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        identifier: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8',
        isSelected: false,
        label: 'Data Management Strategy',
        nodeClass: 'tree-node-rooted',
        notSelectable: false,
        sbDate: null,
        sbId: 'test',
        sbParentId: null,
        sbParentIdObj: undefined,
        sortOrder: 0,
        type: 'application',
        uuid: '4ebb8fe5-f88f-49a4-9964-ff5395e234b8'
      }]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{sb-tree model=model labelComponent="sb-tree-label"}}
      */
      {
        "id": "L9stbjss",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"labelComponent\"],[[33,1],\"sb-tree-label\"]]]]],[],false,[\"sb-tree\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.tree-trunk').innerText.replace(/[\s\t]/g, '\n').trim().replace(/[ \n]+/g, '|'), 'Data|Management|Strategy|:|test|?|Child|1|:|test1|Parent|Id:|None|--|?');
      assert.equal((0, _testHelpers.findAll)('.tree-branch')[1].innerText.replace(/[\s\t]/g, '\n').trim().replace(/[ \n]+/g, '|'), 'Child|1|:|test1|Parent|Id:|None|--|?');
    });
  });
});
define("mdeditor/tests/integration/components/tree-branch-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | tree branch', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('model', {
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      });
      this.set('selected', [{
        identifier: 'bar1'
      }]);
      this.set('path', [{
        label: 'fiz',
        identifier: 1
      }, {
        label: 'faz',
        identifier: 10
      }, {
        label: 'foz',
        identifier: 100
      }]);
      this.set('select', function () {
        assert.ok(true, 'called select');
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{tree-branch model=model
                select=select
                selected=selected
                nodeDepth=3
                path=path
            }}
      */
      {
        "id": "T/zWEoEa",
        "block": "[[[1,\"\\n      \"],[1,[28,[35,0],null,[[\"model\",\"select\",\"selected\",\"nodeDepth\",\"path\"],[[33,1],[33,2],[33,3],3,[33,4]]]]]],[],false,[\"tree-branch\",\"model\",\"select\",\"selected\",\"path\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.expect(3);
      assert.equal((0, _testHelpers.find)('.tree-branch').innerText.trim(), 'foo1label');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#tree-branch model=model
              select=select
              selected=selected
              nodeDepth=3
              path=path
            }}
              template block text
            {{/tree-branch}}
          
      */
      {
        "id": "olyCkhbz",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"model\",\"select\",\"selected\",\"nodeDepth\",\"path\"],[[33,1],[33,2],[33,3],3,[33,4]]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"tree-branch\",\"model\",\"select\",\"selected\",\"path\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('.tree-leaf .toggle-icon');
      assert.equal((0, _testHelpers.find)('.tree-branch').innerText.replace(/[\s\n]+/g, '|'), '|foo1label|foo2label');
      assert.equal((0, _testHelpers.findAll)('.tree-leaf')[1].querySelectorAll('.tree-indent').length, 3, 'proper indentation');
    });
  });
});
define("mdeditor/tests/integration/components/tree-label-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | tree label', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      });
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{tree-label model=model}}
      */
      {
        "id": "fdry4LFo",
        "block": "[[[1,[28,[35,0],null,[[\"model\"],[[33,1]]]]]],[],false,[\"tree-label\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.tree-label-text').innerText.trim(), 'foo1label');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#tree-label model=model}}
              template block text
            {{/tree-label}}
          
      */
      {
        "id": "AlmDD608",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"model\"],[[33,1]]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"tree-label\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.tree-label-text').innerText.trim(), 'foo1label');
    });
  });
});
define("mdeditor/tests/integration/components/tree-leaf-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | tree leaf', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('model', {
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      });
      this.set('selected', [{
        identifier: 'foo1'
      }]);
      this.set('nodePath', [{
        label: 'fiz',
        identifier: 1
      }, {
        label: 'faz',
        identifier: 10
      }, {
        label: 'foz',
        identifier: 100
      }]);
      this.set('select', function () {
        assert.ok(true, 'called select');
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{tree-leaf model=model
            inTree=true
            select=select
            selected=selected
            nodeDepth=3
            nodePath=nodePath
          }}
      */
      {
        "id": "J8Z/58l4",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"inTree\",\"select\",\"selected\",\"nodeDepth\",\"nodePath\"],[[33,1],true,[33,2],[33,3],3,[33,4]]]]]],[],false,[\"tree-leaf\",\"model\",\"select\",\"selected\",\"nodePath\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('.toggle-icon');
      assert.equal((0, _testHelpers.find)('.tree-leaf').innerText.trim(), 'foo1label');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <TreeLeaf @model={{model}} @inTree={{false}} @select={{select}} @selected={{selected}}>
              template block text
            </TreeLeaf>
          
      */
      {
        "id": "1B6C7y3m",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@model\",\"@inTree\",\"@select\",\"@selected\"],[[99,1,[\"@model\"]],false,[99,2,[\"@select\"]],[99,3,[\"@selected\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"tree-leaf\",\"model\",\"select\",\"selected\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.tree-leaf').innerText.trim(), 'foo1label');
      assert.equal((0, _testHelpers.findAll)('.tree-indent').length, 0, 'not in tree');
    });
  });
});
define("mdeditor/tests/integration/components/tree-search-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | tree search', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('model', [{
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      }, {
        broader: 'barfoo0',
        children: [],
        label: 'barfoo1label',
        uuid: 'barfoo1'
      }]);
      this.set('selected', [{
        identifier: 'bar1'
      }]);
      this.set('select', function () {
        assert.ok(true, 'called select');
      });
      this.set('searchString', 'foo');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{tree-search
              model=model
              selected=selected
              select=select
              searchString=searchString
              exactMatch=exactMatch
            }}
      */
      {
        "id": "9vlaP6IR",
        "block": "[[[1,\"\\n      \"],[1,[28,[35,0],null,[[\"model\",\"selected\",\"select\",\"searchString\",\"exactMatch\"],[[33,1],[33,2],[33,3],[33,4],[33,5]]]]]],[],false,[\"tree-search\",\"model\",\"selected\",\"select\",\"searchString\",\"exactMatch\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.tree-search').innerText.replace(/[ \n]+/g, '|'), 'Search|Tree:|Exact|Match|3|matches|found.|barfoo1label|foo1label|foo2label', 'search OK');
      this.set('exactMatch', true);
      assert.equal((0, _testHelpers.find)('.tree-search').innerText.replace(/[ \n]+/g, '|'), 'Search|Tree:|Exact|Match|2|matches|found.|foo1label|foo2label', 'exact match');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#tree-search
              model=model
              selected=selected
              select=select
            }}
              template block text
            {{/tree-search}}
          
      */
      {
        "id": "Enml9au0",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"model\",\"selected\",\"select\"],[[33,1],[33,2],[33,3]]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"tree-search\",\"model\",\"selected\",\"select\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.tree-search').innerText.replace(/[ \n]+/g, '|'), 'Search|Tree:|Exact|Match|template|block|text', 'block');
    });
  });
});
define("mdeditor/tests/integration/components/tree-view-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | tree view', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders and expands', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', [{
        broader: 'foo0',
        children: [{
          broader: 'foo2',
          children: [],
          label: 'foo2label',
          uuid: 'foo2'
        }],
        label: 'foo1label',
        uuid: 'foo1'
      }, {
        broader: 'bar0',
        children: [],
        label: 'bar1label',
        uuid: 'bar1'
      }]);
      this.set('selected', [{
        identifier: 'bar1'
      }]);
      this.set('select', function () {
        assert.ok(true, 'called select');
      });
      // Handle any actions with this.on('myAction', function(val) { ... });
      assert.expect(7);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{tree-view model=model selected=selected}}
      */
      {
        "id": "/vTUWHcG",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"selected\"],[[33,1],[33,2]]]]]],[],false,[\"tree-view\",\"model\",\"selected\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.tree-trunk').innerText.replace(/[\s\n]+/g, '|'), '|bar1label|foo1label');
      assert.ok((0, _testHelpers.find)('.tree-leaf').classList.contains('tree-highlight'), 'selected leaf highlighted');
      assert.equal((0, _testHelpers.findAll)('.tree-leaf .expand-icon').length, 1, 'node expand icon rendered');
      await (0, _testHelpers.click)((0, _testHelpers.find)('.expand-icon'));
      assert.equal((0, _testHelpers.findAll)('.tree-leaf').length, 3, 'node expanded');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#tree-view model=model select=select}}
              template block text
            {{/tree-view}}
          
      */
      {
        "id": "G622DizZ",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"model\",\"select\"],[[33,1],[33,2]]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"tree-view\",\"model\",\"select\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.tree-trunk').innerText.replace(/[\s\n]+/g, '|'), '|bar1label|foo1label|foo2label');
      await (0, _testHelpers.click)((0, _testHelpers.findAll)('.tree-leaf')[1]);
      assert.equal((0, _testHelpers.findAll)('.tree-leaf.tree-highlight').length, 2, 'node selected');
    });
  });
});
define("mdeditor/tests/integration/helpers/object-each-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Helper | object-each', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object-each inputValue}}
      */
      {
        "id": "KlUbCV+R",
        "block": "[[[1,[28,[35,0],[[33,1]],null]]],[],false,[\"object-each\",\"inputValue\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), '1234');
    });
  });
});
define("mdeditor/tests/integration/helpers/object-is-empty-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Helper | object-is-empty', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object-is-empty inputValue}}
      */
      {
        "id": "NRarIBPJ",
        "block": "[[[1,[28,[35,0],[[33,1]],null]]],[],false,[\"object-is-empty\",\"inputValue\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), "false");
    });
  });
});
define("mdeditor/tests/integration/helpers/present-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('helper:present', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <section>{{present inputValue}}</section>
      */
      {
        "id": "JwEH4ZHt",
        "block": "[[[10,\"section\"],[12],[1,[28,[35,0],[[33,1]],null]],[13]],[],false,[\"present\",\"inputValue\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.trim(), 'true');
    });
  });
});
define("mdeditor/tests/integration/helpers/word-limit-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('helper:word-limit', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum, neque
      nec sagittis maximus, lacus lectus placerat libero, finibus varius arcu enim
      eget ante. Duis.`);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <section>{{word-limit inputValue limit=20 wordLength=10}}</section>
      */
      {
        "id": "OWO2irMk",
        "block": "[[[10,\"section\"],[12],[1,[28,[35,0],[[33,1]],[[\"limit\",\"wordLength\"],[20,10]]]],[13]],[],false,[\"word-limit\",\"inputValue\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.trim(), `Lorem ipsum dolor sit amet,  consectetu... adipiscing...elit. Etiam rutrum, neque nec sagittis maximus, lacus lectus placerat libero, finibus varius ...`);
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-alert-table/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "ember-tooltips/test-support/dom"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _dom) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"ember-tooltips/test-support/dom",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md-alert-table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-alert-table
            title="Foos"
            required=true
            tipMessage="Biz is baz."
          }}
      */
      {
        "id": "vtqfCig9",
        "block": "[[[1,[28,[35,0],null,[[\"title\",\"required\",\"tipMessage\"],[\"Foos\",true,\"Biz is baz.\"]]]]],[],false,[\"control/md-alert-table\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), 'No|Foos|found.|Add|Foo|');
      await (0, _testHelpers.triggerEvent)('.md-danger.ember-tooltip-target', 'mouseenter');
      (0, _dom.assertTooltipContent)(assert, {
        contentString: 'Biz is baz.'
      });
      assert.dom('.md-alert-table.alert-danger').exists();
      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#control/md-alert-table title="Bars"}}
              template block text
            {{/control/md-alert-table}}
          
      */
      {
        "id": "IExny986",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"title\"],[\"Bars\"]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"control/md-alert-table\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Bars|found.|Add|Bar|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-button-confirm/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md button confirm', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-button-confirm}}
      */
      {
        "id": "jg3ahzQE",
        "block": "[[[1,[34,0]]],[],false,[\"control/md-button-confirm\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), '');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#control/md-button-confirm}}
              template block text
            {{/control/md-button-confirm}}
          
      */
      {
        "id": "DVDZ7c7g",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,null,[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"control/md-button-confirm\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'template block text');
    });
    (0, _qunit.test)('shows and cancels confirm', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <a href="#">Test</a>
            {{#control/md-button-confirm}}
              Test
            {{/control/md-button-confirm}}
          
      */
      {
        "id": "awBXpA86",
        "block": "[[[1,\"\\n      \"],[10,3],[14,6,\"#\"],[12],[1,\"Test\"],[13],[1,\"\\n\"],[6,[39,0],null,null,[[\"default\"],[[[[1,\"        Test\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"control/md-button-confirm\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'Test', 'renders button');
      await (0, _testHelpers.click)('button');
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'Confirm', 'renders confirm');
      await (0, _testHelpers.triggerEvent)('button', 'blur');
      assert.equal((0, _testHelpers.find)('button').innerText.trim(), 'Test', 'cancels confirm');
    });
    (0, _qunit.test)('performs confirm action', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('externalAction', type => {
        assert.ok(type, `${type} called`);
      });

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#control/md-button-confirm onConfirm=(action externalAction "onConfirm")}}
              Test
            {{/control/md-button-confirm}}
          
      */
      {
        "id": "MSpOYrC1",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"onConfirm\"],[[28,[37,1],[[30,0],[33,2],\"onConfirm\"],null]]],[[\"default\"],[[[[1,\"        Test\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"control/md-button-confirm\",\"action\",\"externalAction\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('button');
      await (0, _testHelpers.click)('button');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-button-modal/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/modal-asserts"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _modalAsserts) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/modal-asserts",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _modalAsserts.default)();
  (0, _qunit.module)('Integration | Component | control/md button modal', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-button-modal}}
      */
      {
        "id": "VqlfJ2ig",
        "block": "[[[1,[34,0]]],[],false,[\"control/md-button-modal\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-button-modal').innerText.trim(), '');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#control/md-button-modal}}
              template block text
            {{/control/md-button-modal}}
          
      */
      {
        "id": "KDVBXhht",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,null,[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"control/md-button-modal\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-button-modal').innerText.trim(), 'template block text', 'block');
    });
    (0, _qunit.test)('shows modal and performs actions', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      // let modalDialogService = this.owner.lookup('service:modal-dialog');
      // modalDialogService.destinationElementId = 'test-div';

      this.set('externalAction', type => {
        assert.ok(type, `${type} called`);
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <div id='test-div'></div>
            {{#control/md-button-modal
                message="Hello" onConfirm=(action externalAction "confirm")
                onCancel=(action externalAction "cancel")}} Test
            {{/control/md-button-modal}}
          
      */
      {
        "id": "3Bp1lVEE",
        "block": "[[[1,\"\\n      \"],[10,0],[14,1,\"test-div\"],[12],[13],[1,\"\\n      \"],[6,[39,0],null,[[\"message\",\"onConfirm\",\"onCancel\"],[\"Hello\",[28,[37,1],[[30,0],[33,2],\"confirm\"],null],[28,[37,1],[[30,0],[33,2],\"cancel\"],null]]],[[\"default\"],[[[[1,\" Test\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"control/md-button-modal\",\"action\",\"externalAction\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));

      // click the button
      await (0, _testHelpers.click)('.md-button-modal');
      assert.isPresentOnce('.md-modal-overlay');
      await (0, _testHelpers.clearRender)();
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <div id='test-div'></div>
            {{#control/md-button-modal
              renderInPlace=true
              message="Hello" onConfirm=(action externalAction "confirm")
              onCancel=(action externalAction "cancel")}} Test
            {{/control/md-button-modal}}
          
      */
      {
        "id": "rGsaVwd3",
        "block": "[[[1,\"\\n      \"],[10,0],[14,1,\"test-div\"],[12],[13],[1,\"\\n      \"],[6,[39,0],null,[[\"renderInPlace\",\"message\",\"onConfirm\",\"onCancel\"],[true,\"Hello\",[28,[37,1],[[30,0],[33,2],\"confirm\"],null],[28,[37,1],[[30,0],[33,2],\"cancel\"],null]]],[[\"default\"],[[[[1,\" Test\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"control/md-button-modal\",\"action\",\"externalAction\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      // click the button
      await (0, _testHelpers.click)('.md-button-modal');
      await (0, _testHelpers.click)('.md-button-modal');
      assert.isAbsent('.md-modal-overlay');

      // click the modal buttons
      await (0, _testHelpers.click)('.md-button-modal');
      let num = (0, _testHelpers.findAll)('.md-modal-buttons button').length;
      let i = 0;
      while (i < num) {
        await (0, _testHelpers.click)((0, _testHelpers.findAll)('.md-modal-buttons button')[i]);
        i++;
      }
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-button/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md-button', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('myAction', function (val) {
        assert.ok(val, 'Click action');
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-button text="Click me" click=(action myAction true)}}
      */
      {
        "id": "WqPYNPsR",
        "block": "[[[1,[28,[35,0],null,[[\"text\",\"click\"],[\"Click me\",[28,[37,1],[[30,0],[33,2],true],null]]]]]],[],false,[\"control/md-button\",\"action\",\"myAction\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'Click me');
      (0, _testHelpers.click)('.md-button');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Control::MdButton>
              template block text
            </Control::MdButton>
          
      */
      {
        "id": "L++Qn3vS",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"control/md-button\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-contact-link/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-contact",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md contact link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      var store = this.owner.lookup('service:store');
      this.set('contacts', this.owner.lookup('service:contacts'));
      store.createRecord('contact', (0, _createContact.default)(1)[0]);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-contact-link contacts=contacts contactId=0}}
      */
      {
        "id": "+7ZP4cJv",
        "block": "[[[1,[28,[35,0],null,[[\"contacts\",\"contactId\"],[[33,1],0]]]]],[],false,[\"control/md-contact-link\",\"contacts\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('a').innerText.trim(), 'Contact0', 'renders link');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Control::MdContactLink @contacts={{contacts}} @contactId={{0}} @block={{true}}>
              template block text
            </Control::MdContactLink>
          
      */
      {
        "id": "lYqoS84X",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@contacts\",\"@contactId\",\"@block\"],[[99,1,[\"@contacts\"]],0,true]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"control/md-contact-link\",\"contacts\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('a').textContent.trim(), 'template block text', 'renders as block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-contact-title/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-contact",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md contact title', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      var store = this.owner.lookup('service:store');
      store.createRecord('contact', (0, _createContact.default)(1)[0]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <span>{{control/md-contact-title contactId=0}}</span>
      */
      {
        "id": "tWOURiaG",
        "block": "[[[10,1],[12],[1,[28,[35,0],null,[[\"contactId\"],[0]]]],[13]],[],false,[\"control/md-contact-title\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('span').textContent.trim(), 'Contact0');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <div class="test1">
            <Control::MdContactTitle @contactId={{0}} as |c|>
              template block text {{c.title}}
            </Control::MdContactTitle>
            </div>
          
      */
      {
        "id": "f9wbp5i2",
        "block": "[[[10,0],[14,0,\"test1\"],[12],[1,\"\\n      \"],[8,[39,0],null,[[\"@contactId\"],[0]],[[\"default\"],[[[[1,\"\\n        template block text \"],[1,[30,1,[\"title\"]]],[1,\"\\n      \"]],[1]]]]],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[\"c\"],false,[\"control/md-contact-title\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.test1').textContent.trim(), 'template block text Contact0');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-crud-buttons/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md crud buttons', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-crud-buttons allowCopy=true allowDelete=true}}
      */
      {
        "id": "aF5RXqgG",
        "block": "[[[1,[28,[35,0],null,[[\"allowCopy\",\"allowDelete\"],[true,true]]]]],[],false,[\"control/md-crud-buttons\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.triggerEvent)('.md-crud-buttons', 'mouseenter');
      assert.equal((0, _testHelpers.find)('.md-crud-buttons').textContent.replace(/[ \n]+/g, '|'), '|Copy|Delete|');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#control/md-crud-buttons doSave=true allowCopy=true}}
              template block text
            {{/control/md-crud-buttons}}
          
      */
      {
        "id": "gk4MdhEP",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"doSave\",\"allowCopy\"],[true,true]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"control/md-crud-buttons\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-crud-buttons').textContent.replace(/[ \n]+/g, '|'), '|Save|Cancel|Copy|template|block|text|', 'block, doSave');
      assert.equal((0, _testHelpers.find)('.md-crud-buttons .btn-success').disabled, true, 'save disabled');
    });
    (0, _qunit.test)('should trigger external action', async function (assert) {
      assert.expect(4);

      // test double for the external action
      this.set('externalAction', type => {
        assert.ok(type, `${type} called`);
      });

      //enable save and delete
      this.set('model', {
        hasDirtyHash: true,
        canRevert: true
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-crud-buttons model=model doSave=(action externalAction
        'doSave') doCancel=(action externalAction 'doCancel') doCopy=(action
        externalAction 'doCopy') doDelete=(action externalAction 'doDelete') allowCopy=true allowDelete=true}}
      */
      {
        "id": "PlJnCB+u",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"doSave\",\"doCancel\",\"doCopy\",\"doDelete\",\"allowCopy\",\"allowDelete\"],[[33,1],[28,[37,2],[[30,0],[33,3],\"doSave\"],null],[28,[37,2],[[30,0],[33,3],\"doCancel\"],null],[28,[37,2],[[30,0],[33,3],\"doCopy\"],null],[28,[37,2],[[30,0],[33,3],\"doDelete\"],null],true,true]]]]],[],false,[\"control/md-crud-buttons\",\"model\",\"action\",\"externalAction\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));

      // click the buttons
      await (0, _testHelpers.click)('.md-crud-buttons .btn-success');
      await (0, _testHelpers.click)('.md-crud-buttons .btn-warning');
      await (0, _testHelpers.click)('.md-crud-buttons .btn-info');
      //we have to click delete twice to confirm
      await (0, _testHelpers.click)('.md-crud-buttons .btn-danger');
      await (0, _testHelpers.click)('.md-crud-buttons .btn-danger');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-definition/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md definition', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-definition title="foobar" text="bizbaz"}}
      */
      {
        "id": "+7gG0/BJ",
        "block": "[[[1,[28,[35,0],null,[[\"title\",\"text\"],[\"foobar\",\"bizbaz\"]]]]],[],false,[\"control/md-definition\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), 'foobar|bizbaz|');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-definition title="foobar"}}
      */
      {
        "id": "I5pMjPrO",
        "block": "[[[1,[28,[35,0],null,[[\"title\"],[\"foobar\"]]]]],[],false,[\"control/md-definition\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), 'foobar|Not|Defined|', 'no text');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Control::MdDefinition @title="foobar">
              template block text
            </Control::MdDefinition>
          
      */
      {
        "id": "VCu6KGrk",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@title\"],[\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"control/md-definition\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|foobar|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-edit-table/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "@ember/object"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _object) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/object",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md-edit-table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      this.set('data', [_object.default.create({
        title: 'foo',
        type: 'bar'
      }), _object.default.create({
        title: 'biz',
        type: 'baz'
      })]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-edit-table data=data dataColumns=columns rowBodyComponent="object/md-schema"}}
      */
      {
        "id": "pIptU+Lo",
        "block": "[[[1,[28,[35,0],null,[[\"data\",\"dataColumns\",\"rowBodyComponent\"],[[33,1],[33,2],\"object/md-schema\"]]]]],[],false,[\"control/md-edit-table\",\"data\",\"columns\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Title|Type|Title|Type|foo|bar|Edit|Delete|biz|baz|Edit|Delete|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|Page:|1|');
      await (0, _testHelpers.click)('.md-row-buttons .btn-success');
      assert.dom('.md-schema').exists('expanded row');
      assert.equal((0, _testHelpers.find)('.md-schema input').value, 'foo', 'render row contents');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-errors/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md errors', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('errors', [{
        title: 'Test',
        errors: [{
          dataPath: '/foo/biz',
          message: 'message1'
        }, {
          message: 'message2'
        }]
      }, {
        title: 'Test2',
        errors: []
      }]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-errors errors=errors}}
      */
      {
        "id": "aFOuF2za",
        "block": "[[[1,[28,[35,0],null,[[\"errors\"],[[33,1]]]]]],[],false,[\"control/md-errors\",\"errors\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-error-list').textContent.replace(/[ \n]+/g, '|').trim(), '|Test|1|Validation|Error|in|foo|>|biz|message1|Schema|Path:|/foo/biz|Go|To|Error|2|Validation|Error|in|the|record|message2|Go|To|Error|Test2|');
      assert.ok((0, _testHelpers.findAll)('.md-error-list .label')[1].classList.contains('label-danger'), 'class applied');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#control/md-errors  errors=errors}}
              template block text
            {{/control/md-errors}}
          
      */
      {
        "id": "MnPpGYLR",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"errors\"],[[33,1]]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"control/md-errors\",\"errors\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-error-list').textContent.replace(/[ \n]+/g, '|').trim(), '|Test|1|Validation|Error|in|foo|>|biz|message1|Schema|Path:|/foo/biz|Go|To|Error|2|Validation|Error|in|the|record|message2|Go|To|Error|Test2|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-fiscalyear/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "ember-power-select/test-support", "ember-power-select/test-support/helpers", "moment", "@ember/object"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _testSupport, _helpers, _moment, _object) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"ember-power-select/test-support",0,"ember-power-select/test-support/helpers",0,"moment",0,"@ember/object",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md fiscalyear', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-fiscalyear context=this}}
      */
      {
        "id": "9E+5IRcF",
        "block": "[[[1,[28,[35,0],null,[[\"context\"],[[30,0]]]]]],[],false,[\"control/md-fiscalyear\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-select.md-fiscalyear').innerText.replace(/[\n]+/g, '|').trim(), 'Pick Fiscal Year|Pick a Fiscal Year');
    });
    (0, _qunit.test)('select a year', async function (assert) {
      assert.expect(2);

      // Set any properties with this.set('myProperty', 'value');
      this.set('end', null);
      this.set('start', null);
      this.set('settings', _object.default.create({
        data: _object.default.create({
          fiscalStartMonth: 1
        })
      }));
      // Handle any actions with this.on('myAction', function(val) { ... });
      var year = new Date().getFullYear();
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{input/md-datetime
              class="start"
              valuePath="start"
              model=this
              label="Start Date"
              placeholder="Enter start dateTime"
            }}
            {{input/md-datetime
              class="end"
              valuePath="end"
              model=this
              label="End Date"
            }}
            {{control/md-fiscalyear context=this settings=settings}}
      */
      {
        "id": "M2XirI2r",
        "block": "[[[1,\"\\n      \"],[1,[28,[35,0],null,[[\"class\",\"valuePath\",\"model\",\"label\",\"placeholder\"],[\"start\",\"start\",[30,0],\"Start Date\",\"Enter start dateTime\"]]]],[1,\"\\n      \"],[1,[28,[35,0],null,[[\"class\",\"valuePath\",\"model\",\"label\"],[\"end\",\"end\",[30,0],\"End Date\"]]]],[1,\"\\n      \"],[1,[28,[35,1],null,[[\"context\",\"settings\"],[[30,0],[33,2]]]]]],[],false,[\"input/md-datetime\",\"control/md-fiscalyear\",\"settings\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _helpers.clickTrigger)('.md-fiscalyear');
      await (0, _testSupport.selectChoose)('.md-fiscalyear', year);
      assert.equal((0, _moment.default)(this.end).format('YYYY-MM-DD'), (0, _moment.default)(year, 'YYYY').month(this.settings.data.fiscalStartMonth + 10).endOf('month').format('YYYY-MM-DD'), 'end set');
      assert.equal((0, _moment.default)(this.start).format('YYYY-MM-DD'), (0, _moment.default)(year, 'YYYY').month(this.settings.data.fiscalStartMonth - 1).startOf('month').format('YYYY-MM-DD'), 'start set');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-import-csv/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md import csv', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      this.set('progress', 0);
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-import-csv}}
      */
      {
        "id": "MSsOFkkr",
        "block": "[[[1,[34,0]]],[],false,[\"control/md-import-csv\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-import-picker').textContent.trim(), 'Click or Drop a CSV here.');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-import-csv isProcessing=true progress=progress}}
      */
      {
        "id": "ZcK3PeF4",
        "block": "[[[1,[28,[35,0],null,[[\"isProcessing\",\"progress\"],[true,[33,1]]]]]],[],false,[\"control/md-import-csv\",\"progress\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Processing...|Stop|0%|Complete|', 'renders progressbar');
      this.set('progress', 57);
      assert.equal((0, _testHelpers.find)('.ember-view').textContent.replace(/[ \n]+/g, '|').trim(), '|Processing...|Stop|57%|Complete|', 'updates progressbar');
    });
    (0, _qunit.skip)('upload csv', async function (assert) {
      assert.ok();
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-indicator/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "ember-tooltips/test-support/dom"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _dom) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"ember-tooltips/test-support/dom",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md-indicator', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('values', {
        foo: 'This',
        bar: 'warning'
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-indicator
            icon="sticky-note"
            title="Hello"
            note="${foo} is a ${bar}"
            values=values
            type="danger"}}
            
      */
      {
        "id": "FpjjGUEw",
        "block": "[[[1,[28,[35,0],null,[[\"icon\",\"title\",\"note\",\"values\",\"type\"],[\"sticky-note\",\"Hello\",\"${foo} is a ${bar}\",[33,1],\"danger\"]]]],[1,\"\\n      \"]],[],false,[\"control/md-indicator\",\"values\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.md-indicator').isVisible({
        count: 1
      });
      await (0, _testHelpers.triggerEvent)('.md-indicator', 'mouseenter');
      (0, _dom.assertTooltipContent)(assert, {
        contentString: 'Hello\nThis is a warning'
      });
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-indicator/related/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "@ember/object", "mdeditor/tests/helpers/create-dictionary", "ember-tooltips/test-support/dom", "@ember/service"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _object, _createDictionary, _dom, _service) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/object",0,"mdeditor/tests/helpers/create-dictionary",0,"ember-tooltips/test-support/dom",0,"@ember/service",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md-indicator/related', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function (assert) {
      let router = _service.default.extend({
        transitionTo() {
          assert.ok(true, 'Transition started');
        },
        generateURL(route, models) {
          assert.equal(route, 'dictionary.show.edit.domain.edit', 'route OK');
          assert.deepEqual(models, [0], 'model ids OK');
          return '#';
        }
      });
      this.owner.register('service:-routing', router);
      this.owner.setupRouter();
    });
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(6);
      this.set('values', {
        foo: 'attribute1',
        bar: 'codeName0'
      });
      this.set('dictionary', _object.default.create((0, _createDictionary.createDictionary)(1)[0].json.dataDictionary));
      this.set('model', this.dictionary.entity[0].attribute[0]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-indicator/related
            model=model
            icon="cog"
            note="The attribute ${foo} has an associated domain: ${bar}."
            route="dictionary.show.edit.domain.edit"
            values=values
            parent=dictionary
            relatedId="domainId"
            path="domain"
            title="Related Indicator Test"
            linkText="Go to Domain"
            type="warning"
            popperContainer="#ember-testing"
            routeIdPaths=(array "relatedIndex")
          }}
      */
      {
        "id": "AArbHIWM",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"icon\",\"note\",\"route\",\"values\",\"parent\",\"relatedId\",\"path\",\"title\",\"linkText\",\"type\",\"popperContainer\",\"routeIdPaths\"],[[33,1],\"cog\",\"The attribute ${foo} has an associated domain: ${bar}.\",\"dictionary.show.edit.domain.edit\",[33,2],[33,3],\"domainId\",\"domain\",\"Related Indicator Test\",\"Go to Domain\",\"warning\",\"#ember-testing\",[28,[37,4],[\"relatedIndex\"],null]]]]]],[],false,[\"control/md-indicator/related\",\"model\",\"values\",\"dictionary\",\"array\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.md-indicator-related').exists({
        count: 1
      });
      assert.dom('.md-indicator-related .fa').hasClass('fa-cog');
      await (0, _testHelpers.triggerEvent)('.md-indicator-related .fa', 'mouseenter');
      (0, _dom.assertTooltipContent)(assert, {
        contentString: `Related Indicator Test\nThe attribute attribute1 has an associated domain: codeName0.\nGo to Domain`
      });
      await (0, _testHelpers.click)('.btn');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-infotip/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md-infotip', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-infotip}}
      */
      {
        "id": "bd83AGPX",
        "block": "[[[1,[34,0]]],[],false,[\"control/md-infotip\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Control::MdInfotip>
              template block text
            </Control::MdInfotip>
          
      */
      {
        "id": "75cxgldD",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"control/md-infotip\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-itis/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "@ember/object"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _object) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/object",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md itis', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      // Set any properties with this.set('myProperty', 'value');
      this.set('taxonomy', {
        taxonomicClassification: []
      });
      this.set('taxa', [_object.default.create({
        "kingdom": "Animalia",
        "name": "Calotes rouxii",
        "rank": "Species",
        "tsn": "1055525",
        "taxonomy": [[{
          "rank": "Kingdom",
          "value": "Animalia",
          "order": 0,
          "tsn": "202423"
        }, {
          "rank": "Subkingdom",
          "value": "Bilateria",
          "order": 1,
          "tsn": "914154"
        }, {
          "rank": "Genus",
          "value": "Calotes",
          "order": 12,
          "tsn": "209043"
        }, {
          "rank": "Species",
          "value": "Calotes rouxii",
          "order": 13,
          "tsn": "1055525",
          "common": ["Roux's Forest Lizard", "Forest Blood Sucker"]
        }]],
        "common": [{
          "name": "Roux's Forest Lizard",
          "language": "English"
        }, {
          "name": "Forest Blood Sucker",
          "language": "English"
        }],
        "status": "valid"
      })]);
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-itis taxonomy=taxonomy}}
      */
      {
        "id": "hpIO+AGl",
        "block": "[[[1,[28,[35,0],null,[[\"taxonomy\"],[[33,1]]]]]],[],false,[\"control/md-itis\",\"taxonomy\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-itis').textContent.replace(/[ \n]+/g, '|').trim(), '|Search|Value|Kingdom|(optional)|Select|a|kingdom.|Search|');

      // await fillIn('.md-input-input input.ember-text-field', 'shark');
      // await click('button[type=submit]');
      // await settled();

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-itis taxonomy=taxonomy searchResult=taxa}}
      */
      {
        "id": "PKEOP6gA",
        "block": "[[[1,[28,[35,0],null,[[\"taxonomy\",\"searchResult\"],[[33,1],[33,2]]]]]],[],false,[\"control/md-itis\",\"taxonomy\",\"taxa\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.ok((0, _testHelpers.find)('.md-itis-taxalist'), 'renders search result');
      await (0, _testHelpers.click)('.md-itis-taxalist .list-group-item .btn-success');
      assert.ok((0, _testHelpers.find)('.md-itis-selectedlist .list-group-item'), 'renders selected item');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-json-button/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md json button', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-json-button}}
      */
      {
        "id": "Bkh+36cf",
        "block": "[[[1,[34,0]]],[],false,[\"control/md-json-button\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('button').textContent.trim(), 'Preview JSON');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#control/md-json-button}}
              template block text
            {{/control/md-json-button}}
          
      */
      {
        "id": "ZfaNNAyx",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,null,[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"control/md-json-button\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('button').textContent.trim(), 'template block text');
    });
    (0, _qunit.test)('render json modal', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-json-button json=json preview=true}}
      */
      {
        "id": "SITVNmDT",
        "block": "[[[1,[28,[35,0],null,[[\"json\",\"preview\"],[[33,1],true]]]]],[],false,[\"control/md-json-button\",\"json\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('button.btn');
      assert.equal(document.querySelector('.md-jsmodal-container').textContent.trim(), '{"foo": "bar"}');
    });
    (0, _qunit.test)('render json slider', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-json-button json=json title="foobar"}}
            <div class="slider">
              {{#from-elsewhere name="md-slider-json" as |slider|}}
                <h3 class="text-info">{{slider.title}}</h3>
                <hr>
                {{component slider.body}}
              {{/from-elsewhere}}
            </div>
      */
      {
        "id": "r8516kJn",
        "block": "[[[1,[28,[35,0],null,[[\"json\",\"title\"],[[33,1],\"foobar\"]]]],[1,\"\\n      \"],[10,0],[14,0,\"slider\"],[12],[1,\"\\n\"],[6,[39,2],null,[[\"name\"],[\"md-slider-json\"]],[[\"default\"],[[[[1,\"          \"],[10,\"h3\"],[14,0,\"text-info\"],[12],[1,[30,1,[\"title\"]]],[13],[1,\"\\n          \"],[10,\"hr\"],[12],[13],[1,\"\\n          \"],[46,[30,1,[\"body\"]],null,null,null],[1,\"\\n\"]],[1]]]]],[1,\"      \"],[13]],[\"slider\"],false,[\"control/md-json-button\",\"json\",\"from-elsewhere\",\"component\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('button.btn');
      assert.equal((0, _testHelpers.find)('.slider').textContent.replace(/[ \n]+/g, '|').trim(), '|Viewing|JSON|for:|foobar|{"foo":|"bar"}|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-json-viewer/component-test", ["@ember/template-factory", "@ember/test-helpers", "jquery", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _jquery, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"jquery",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md json viewer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('render json modal', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-json-viewer json=json}}
      */
      {
        "id": "OK8gjCMC",
        "block": "[[[1,[28,[35,0],null,[[\"json\"],[[33,1]]]]]],[],false,[\"control/md-json-viewer\",\"json\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _jquery.default)('.md-jsmodal-container').text().trim(), '{"foo": "bar"}');
    });
    (0, _qunit.test)('render json viewer', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('json', {
        foo: 'bar'
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-json-viewer json=json modal=false}}
      */
      {
        "id": "RNdP+sqz",
        "block": "[[[1,[28,[35,0],null,[[\"json\",\"modal\"],[[33,1],false]]]]],[],false,[\"control/md-json-viewer\",\"json\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-json-viewer').textContent.trim(), '{"foo": "bar"}');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-modal/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md modal', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-modal isShowing=true}}
      */
      {
        "id": "2YES7m2M",
        "block": "[[[1,[28,[35,0],null,[[\"isShowing\"],[true]]]]],[],false,[\"control/md-modal\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.ok(document.querySelector('.md-modal-container'));

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Control::MdModal @isShowing={{true}}>
              template block text
            </Control::MdModal>
          
      */
      {
        "id": "yRUvWC3w",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@isShowing\"],[true]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"control/md-modal\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(document.querySelector('.md-modal-container').textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/buttons/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md record table/buttons', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(4);
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        hasDirtyHash: true,
        hasSchemaErrors: true
      });
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-record-table/buttons record=model}}
      */
      {
        "id": "1RH58l2S",
        "block": "[[[1,[28,[35,0],null,[[\"record\"],[[33,1]]]]]],[],false,[\"control/md-record-table/buttons\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-dashboard-buttons').textContent.replace(/[ \n]+/g, '|').trim(), '|Show|Edit|Delete|Preview|JSON|');
      assert.dom('.md-status-icon .btn-danger').exists();
      assert.dom('.md-status-icon .btn-warning').exists();
      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <Control::MdRecordTable::Buttons>
                template block text
              </Control::MdRecordTable::Buttons>
      */
      {
        "id": "7CBdNZkK",
        "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n          template block text\\n        \"]],[]]]]]],[],false,[\"control/md-record-table/buttons\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-dashboard-buttons').textContent.replace(/[ \n]+/g, '|').trim(), '|Show|Edit|Delete|Preview|JSON|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/buttons/custom/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md record table/buttons/custom', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);
      this.set('rec', {
        biz: 'baz'
      });
      this.set('column', {
        buttonConfig: {
          title: 'foobar',
          style: 'warning',
          action: function (rec) {
            assert.equal(rec.biz, 'baz', 'action fired');
          }
        }
      });

      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-record-table/buttons/custom column=column record=rec}}
      */
      {
        "id": "PNPCLno1",
        "block": "[[[1,[28,[35,0],null,[[\"column\",\"record\"],[[33,1],[33,2]]]]]],[],false,[\"control/md-record-table/buttons/custom\",\"column\",\"rec\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('button.btn-warning').textContent.trim(), 'foobar');
      (0, _testHelpers.click)('button.btn-warning');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/buttons/filter/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md record table/buttons/filter', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);
      var items = ['foo', 'bar'];
      // Set any properties with this.set('myProperty', 'value');
      this.set('selectedItems', items);
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('deleteSelected', function (selectedItems) {
        assert.equal(selectedItems, items, 'fires action');
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-record-table/buttons/filter deleteSelected=deleteSelected selectedItems=selectedItems}}
      */
      {
        "id": "jdwUnuui",
        "block": "[[[1,[28,[35,0],null,[[\"deleteSelected\",\"selectedItems\"],[[33,1],[33,2]]]]]],[],false,[\"control/md-record-table/buttons/filter\",\"deleteSelected\",\"selectedItems\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('button.btn-danger').textContent.trim(), 'Delete Selected');
      (0, _testHelpers.doubleClick)('button.btn-danger');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/buttons/show/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md record table/buttons/show', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-record-table/buttons/show}}
      */
      {
        "id": "c+dlENyT",
        "block": "[[[1,[34,0]]],[],false,[\"control/md-record-table/buttons/show\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.btn-info').textContent.trim(), 'Show');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-record-table/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md record table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);

      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-record-table dataColumns=columns data=data}}
      */
      {
        "id": "x2iZT0e2",
        "block": "[[[1,[28,[35,0],null,[[\"dataColumns\",\"data\"],[[33,1],[33,2]]]]]],[],false,[\"control/md-record-table\",\"columns\",\"data\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-record-table').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Actions|Title|Type|Actions|Title|Type|foo|bar|Show|biz|baz|Show|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|Page:|1|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Control::MdRecordTable @dataColumns={{columns}} @data={{data}}>
              template block text
            </Control::MdRecordTable>
          
      */
      {
        "id": "mwcLtWcC",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@dataColumns\",\"@data\"],[[99,1,[\"@dataColumns\"]],[99,2,[\"@data\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"control/md-record-table\",\"columns\",\"data\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-record-table').textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-repo-link/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/config/environment"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _environment) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/config/environment",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  const {
    APP: {
      repository,
      version
    }
  } = _environment.default;
  (0, _qunit.module)('Integration | Component | control/md repo link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-repo-link}}
      */
      {
        "id": "qA4Or2hP",
        "block": "[[[1,[34,0]]],[],false,[\"control/md-repo-link\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('a').textContent.trim(), version);
      assert.equal((0, _testHelpers.find)('a').getAttribute('href'), `${repository}/tree/${version.substring(version.indexOf('+') + 1)}`, 'link ok');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#control/md-repo-link}}
              template block text
            {{/control/md-repo-link}}
          
      */
      {
        "id": "ekcN5Qc4",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,null,[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"control/md-repo-link\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('a').textContent.trim(), 'template block text', 'block ok');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-scroll-into-view/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md-scroll-into-view', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-scroll-into-view}}
      */
      {
        "id": "jPkmQaCc",
        "block": "[[[1,[34,0]]],[],false,[\"control/md-scroll-into-view\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Control::MdScrollIntoView>
              template block text
            </Control::MdScrollIntoView>
          
      */
      {
        "id": "CfulgPva",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"control/md-scroll-into-view\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-scroll-spy/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md scroll spy', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      // Set any properties with this.set('myProperty', 'value');
      this.set('setScrollTo', function (target) {
        assert.equal(target, 'foo', 'calls action');
      });

      // this.set('clickLink', function(){
      // });
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <div data-spy="Foo" id="foo1">Foo</div>
            <div data-spy="Bar" id="bar1">Bar</div>
            {{control/md-scroll-spy setScrollTo=setScrollTo}}
      */
      {
        "id": "L8z1fM3l",
        "block": "[[[10,0],[14,\"data-spy\",\"Foo\"],[14,1,\"foo1\"],[12],[1,\"Foo\"],[13],[1,\"\\n      \"],[10,0],[14,\"data-spy\",\"Bar\"],[14,1,\"bar1\"],[12],[1,\"Bar\"],[13],[1,\"\\n      \"],[1,[28,[35,0],null,[[\"setScrollTo\"],[[33,1]]]]]],[],false,[\"control/md-scroll-spy\",\"setScrollTo\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('ul').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Foo|Bar|');
      await (0, _testHelpers.click)('ul a');
      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Control::MdScrollSpy @setScrollTo={{setScrollTo}}>
              template block text
            </Control::MdScrollSpy>
          
      */
      {
        "id": "s4vcCp20",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@setScrollTo\"],[[99,1,[\"@setScrollTo\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"control/md-scroll-spy\",\"setScrollTo\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('ul').textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-select-table/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md select table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);

      // Set any properties with this.set('myProperty', 'value');
      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);
      this.set('select', function (selected) {
        assert.equal(selected[0].title, 'foo', 'calls action');
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-select-table columns=columns data=data select=select}}
      */
      {
        "id": "yKrcKaMl",
        "block": "[[[1,[28,[35,0],null,[[\"columns\",\"data\",\"select\"],[[33,1],[33,2],[33,3]]]]]],[],false,[\"control/md-select-table\",\"columns\",\"data\",\"select\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-select-table').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Title|Type|Title|Type|foo|bar|biz|baz|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|Page:|1|');
      await (0, _testHelpers.click)('.md-select-table tbody tr');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-spinner/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md spinner', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-spinner text="foobar" size="5"}}
      */
      {
        "id": "sSGrImXH",
        "block": "[[[1,[28,[35,0],null,[[\"text\",\"size\"],[\"foobar\",\"5\"]]]]],[],false,[\"control/md-spinner\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-spinner').textContent.trim(), 'foobar');
      assert.ok((0, _testHelpers.find)('.md-spinner .md-spinner-text').classList.contains('size-5'), 'adds class');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Control::MdSpinner>
              template block text
            </Control::MdSpinner>
          
      */
      {
        "id": "Q+F8mAdr",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"control/md-spinner\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-spinner').textContent.trim(), 'template block text', 'block ok');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-spotlight/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md spotlight', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(4);
      var spotlight = this.owner.lookup('service:spotlight');
      var scope = {
        foo: 'bar'
      };
      var close = function () {
        assert.equal(this.foo, 'bar', 'calls close action');
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <div id="foo">foobar</div>
            {{control/md-spotlight renderInPlace=true}}
      */
      {
        "id": "JfF/Izrz",
        "block": "[[[10,0],[14,1,\"foo\"],[12],[1,\"foobar\"],[13],[1,\"\\n      \"],[1,[28,[35,0],null,[[\"renderInPlace\"],[true]]]]],[],false,[\"control/md-spotlight\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      spotlight.setTarget('foo', close, scope);
      assert.ok(document.querySelector('.md-spotlight-modal'), 'render modal container');
      assert.equal((0, _testHelpers.find)('#foo').textContent.trim(), 'foobar', 'render target');
      assert.ok((0, _testHelpers.find)('#foo').classList.contains('md-spotlight-target'), 'adds class');
      close.call(scope);
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/md-status/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/md status', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        hasDirtyHash: true,
        hasSchemaErrors: false
      });
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/md-status model=model}}
      */
      {
        "id": "aIfw8Mub",
        "block": "[[[1,[28,[35,0],null,[[\"model\"],[[33,1]]]]]],[],false,[\"control/md-status\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.md-status-icon .md-error').isVisible();
      this.set('model.hasDirtyHash', false);
      this.set('model.hasSchemaErrors', true);
      assert.dom('.md-status-icon .md-error').isNotVisible();
      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Control::MdStatus @model={{model}}>
              template block text
            </Control::MdStatus>
          
      */
      {
        "id": "HpOG+KRK",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@model\"],[[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"control/md-status\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.md-status-icon .md-warning').isVisible();
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/subbar-citation/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/subbar citation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/subbar-citation text="foobar"}}
      */
      {
        "id": "VXpSWujS",
        "block": "[[[1,[28,[35,0],null,[[\"text\"],[\"foobar\"]]]]],[],false,[\"control/subbar-citation\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.btn-group-vertical').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Select|a|Record|foobar|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Control::SubbarCitation>
              template block text
            </Control::SubbarCitation>
          
      */
      {
        "id": "un9HvI1Y",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"control/subbar-citation\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.btn-group-vertical').textContent.replace(/[ \n\t\s]+/g, '|').trim(), '|Select|a|Record|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/subbar-importcsv/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "@ember/routing/route"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _route) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/routing/route",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/subbar importcsv', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      // Set any properties with this.set('myProperty', 'value');
      var Target = _route.default.extend({
        actions: {
          doImport() {
            assert.ok(true, 'calls target action');
          }
        }
      });
      this.set('foo', Target.create({}));

      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/subbar-importcsv class="importcsv" actionContext=foo}}
      */
      {
        "id": "qhhtVFj0",
        "block": "[[[1,[28,[35,0],null,[[\"class\",\"actionContext\"],[\"importcsv\",[33,1]]]]]],[],false,[\"control/subbar-importcsv\",\"foo\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.importcsv').textContent.replace(/[ \n]+/g, '|').trim(), '|Do|Import|Cancel|Import|');
      (0, _testHelpers.click)('.importcsv .btn-info');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Control::SubbarImportcsv @class="importcsv">
              template block text
            </Control::SubbarImportcsv>
          
      */
      {
        "id": "2K9qZhng",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@class\"],[\"importcsv\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"control/subbar-importcsv\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.importcsv').textContent.replace(/[ \n]+/g, '|').trim(), '|Do|Import|Cancel|Import|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/subbar-link/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/subbar link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);
      this.set('handleClick', () => {
        assert.ok(true, 'called action');
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Control::SubbarLink @text="foo" @click={{this.handleClick}} />
          
      */
      {
        "id": "8Pimu8Am",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@text\",\"@click\"],[\"foo\",[30,0,[\"handleClick\"]]]],null],[1,\"\\n    \"]],[],false,[\"control/subbar-link\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('button').textContent.trim(), 'foo');
      await (0, _testHelpers.click)('button');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Control::SubbarLink @text="foo" @click={{this.handleClick}}>
              <section>template block text</section>
            </Control::SubbarLink>
          
      */
      {
        "id": "kmtIVx2w",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@text\",\"@click\"],[\"foo\",[30,0,[\"handleClick\"]]]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"section\"],[12],[1,\"template block text\"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"control/subbar-link\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/control/subbar-spatial/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | control/subbar spatial', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/subbar-spatial class="testme"}}
      */
      {
        "id": "5hHE3INZ",
        "block": "[[[1,[28,[35,0],null,[[\"class\"],[\"testme\"]]]]],[],false,[\"control/subbar-spatial\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Zoom|All|Import|Features|Export|Features|Delete|All|Back|to|List|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#control/subbar-spatial class="testme"}}
              template block text
            {{/control/subbar-spatial}}
          
      */
      {
        "id": "8LUib/jP",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"class\"],[\"testme\"]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"control/subbar-spatial\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Zoom|All|Import|Features|Export|Features|Delete|All|Back|to|List|template|block|text|');
    });
    (0, _qunit.test)('fire actions', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      assert.expect(5);
      this.setProperties({
        test1: function () {
          assert.ok(true, 'called zoomAll');
        },
        test2: function () {
          assert.ok(true, 'called uploadData');
        },
        test3: function () {
          assert.ok(true, 'called exportGeoJSON');
        },
        test4: function () {
          assert.ok(true, 'called deleteAllFeatures');
        },
        test5: function () {
          assert.ok(true, 'called toList');
        }
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{control/subbar-spatial
            zoomAll=test1
            uploadData=test2
            exportGeoJSON=test3
            deleteAllFeatures=test4
            toList=test5
          }}
      */
      {
        "id": "HrQM5Rj7",
        "block": "[[[1,[28,[35,0],null,[[\"zoomAll\",\"uploadData\",\"exportGeoJSON\",\"deleteAllFeatures\",\"toList\"],[[33,1],[33,2],[33,3],[33,4],[33,5]]]]]],[],false,[\"control/subbar-spatial\",\"test1\",\"test2\",\"test3\",\"test4\",\"test5\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      (0, _testHelpers.findAll)('button').forEach(async btn => await (0, _testHelpers.click)(btn));
      await (0, _testHelpers.doubleClick)('.btn-danger');
    });
  });
});
define("mdeditor/tests/integration/pods/components/ember-tooltip/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "ember-tooltips/test-support"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _testSupport) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"ember-tooltips/test-support",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | ember-tooltip', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{ember-tooltip}}
      */
      {
        "id": "nrmQcEt7",
        "block": "[[[1,[34,0]]],[],false,[\"ember-tooltip\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <EmberTooltip @isShown="true">
              template block text
            </EmberTooltip>
          
      */
      {
        "id": "rWetjXGg",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@isShown\"],[\"true\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"ember-tooltip\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      (0, _testSupport.assertTooltipContent)(assert, {
        contentString: 'template block text'
      });
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-boolean/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | input/md boolean', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-boolean value=false text="Foo Bar" label="Baz" }}
      */
      {
        "id": "YNMLhSZ4",
        "block": "[[[1,[28,[35,0],null,[[\"value\",\"text\",\"label\"],[false,\"Foo Bar\",\"Baz\"]]]]],[],false,[\"input/md-boolean\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.form-group').textContent.replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#input/md-boolean value=true text="Foo Bar" label="Baz"}}
              template block text
            {{/input/md-boolean}}
          
      */
      {
        "id": "l3S4K2sA",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"value\",\"text\",\"label\"],[true,\"Foo Bar\",\"Baz\"]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"input/md-boolean\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.form-group').textContent.replace(/[ \n]+/g, '|'), '|Baz|Foo|Bar|template|block|text|');
      assert.ok((0, _testHelpers.find)('input').checked);
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-codelist-multi/component-test", ["@ember/template-factory", "@ember/test-helpers", "@ember/service", "qunit", "ember-qunit", "ember-power-select/test-support/helpers"], function (_templateFactory, _testHelpers, _service, _qunit, _emberQunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"@ember/service",0,"qunit",0,"ember-qunit",0,"ember-power-select/test-support/helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  const foobar = {
    codelist: [{
      code: '001',
      codeName: 'foo',
      description: 'This is foo.'
    }, {
      code: '002',
      codeName: 'bar',
      description: 'This is bar.'
    }]
  };
  const codelist = _service.default.extend({
    foobar: foobar
  });
  (0, _qunit.module)('Integration | Component | input/md codelist multi', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      var _this = this;
      this.actions = {};
      this.send = function (actionName) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return _this.actions[actionName].apply(_this, args);
      };
    });
    hooks.beforeEach(function () {
      this.owner.register('service:codelist', codelist);
      this.codelist = this.owner.lookup('service:codelist');
    });
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('fooVal', ['foo', 'bar']);

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#input/md-codelist-multi
              mdCodeName="foobar"
              value=fooVal
            }}
              <p>template block text</p>
            {{/input/md-codelist-multi}}
          
      */
      {
        "id": "z2yTnRiJ",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"mdCodeName\",\"value\"],[\"foobar\",[33,1]]],[[\"default\"],[[[[1,\"        \"],[10,2],[12],[1,\"template block text\"],[13],[1,\"\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"input/md-codelist-multi\",\"fooVal\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|×|bar|×|foo|', 'renders block with array value');
    });
    (0, _qunit.test)('set value action', async function (assert) {
      assert.expect(2);

      //this.set('fooVal', ['foo']);
      this.set('value', ['foo']);
      this.actions.update = actual => {
        assert.equal(actual, this.value, 'submitted value is passed to external action');
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-codelist-multi
            create=false
            value=value
            mdCodeName="foobar"
            change=(action "update" value)}}
      */
      {
        "id": "f/n13isQ",
        "block": "[[[1,[28,[35,0],null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[false,[33,1],\"foobar\",[28,[37,2],[[30,0],\"update\",[33,1]],null]]]]]],[],false,[\"input/md-codelist-multi\",\"value\",\"action\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _helpers.clickTrigger)();
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');
      assert.equal((0, _testHelpers.getRootElement)().textContent.replace(/[ \n]+/g, '|'), '|×|bar|×|foo|', 'value updated');
    });
    (0, _qunit.test)('create option', async function (assert) {
      assert.expect(3);
      this.set('value', ['foo']);
      this.actions.update = actual => {
        assert.equal(actual, this.value, 'submitted value is passed to external action');
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-codelist-multi
            create=true
            value=value
            mdCodeName="foobar"
            change=(action "update" value)}}
      */
      {
        "id": "BFCBc/Es",
        "block": "[[[1,[28,[35,0],null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[true,[33,1],\"foobar\",[28,[37,2],[[30,0],\"update\",[33,1]],null]]]]]],[],false,[\"input/md-codelist-multi\",\"value\",\"action\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _helpers.clickTrigger)();
      await (0, _helpers.typeInSearch)('biz');
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');
      assert.equal((0, _testHelpers.getRootElement)().textContent.replace(/[ \n]+/g, '|'), '|×|foo|×|biz|', 'value updated');
    });
    (0, _qunit.test)('selecting writes back through the two-way binding', async function (assert) {
      this.set('resource', {
        status: ['foo']
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-codelist-multi
            create=false
            value=this.resource.status
            mdCodeName="foobar"}}
      */
      {
        "id": "CTIOoWV6",
        "block": "[[[1,[28,[35,0],null,[[\"create\",\"value\",\"mdCodeName\"],[false,[30,0,[\"resource\",\"status\"]],\"foobar\"]]]]],[],false,[\"input/md-codelist-multi\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _helpers.clickTrigger)();
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');
      assert.deepEqual([...this.resource.status].sort(), ['bar', 'foo'], 'selection propagates to the bound property');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-codelist/component-test", ["@ember/template-factory", "@ember/test-helpers", "@ember/service", "qunit", "ember-qunit", "ember-power-select/test-support", "ember-power-select/test-support/helpers"], function (_templateFactory, _testHelpers, _service, _qunit, _emberQunit, _testSupport, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"@ember/service",0,"qunit",0,"ember-qunit",0,"ember-power-select/test-support",0,"ember-power-select/test-support/helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  const foobar = {
    codelist: [{
      code: '001',
      codeName: 'foo',
      description: 'This is foo.'
    }, {
      code: '002',
      codeName: 'bar',
      description: 'This is bar.'
    }]
  };
  const codelist = _service.default.extend({
    foobar: foobar
  });
  (0, _qunit.module)('Integration | Component | input/md-codelist', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      var _this = this;
      this.actions = {};
      this.send = function (actionName) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return _this.actions[actionName].apply(_this, args);
      };
    });
    hooks.beforeEach(function () {
      this.owner.register('service:codelist', codelist);
      this.codelist = this.owner.lookup('service:codelist');
    });
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(1);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-codelist
            value='foo' mdCodeName="foobar"}}
      */
      {
        "id": "B4wdJ7II",
        "block": "[[[1,[28,[35,0],null,[[\"value\",\"mdCodeName\"],[\"foo\",\"foobar\"]]]]],[],false,[\"input/md-codelist\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|×|');
    });
    (0, _qunit.test)('set value action', async function (assert) {
      assert.expect(2);
      this.set('value', ['foo']);
      this.actions.update = actual => {
        assert.equal(actual, this.value, 'submitted value is passed to external action');
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-codelist
            value=value mdCodeName="foobar"
            change=(action "update" value)}}
      */
      {
        "id": "SXwZHn2j",
        "block": "[[[1,[28,[35,0],null,[[\"value\",\"mdCodeName\",\"change\"],[[33,1],\"foobar\",[28,[37,2],[[30,0],\"update\",[33,1]],null]]]]]],[],false,[\"input/md-codelist\",\"value\",\"action\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testSupport.selectChoose)('.md-select', 'bar');

      // return settled().then(() => {
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|bar|×|', 'value updated');
      // });
    });
    (0, _qunit.test)('create option', async function (assert) {
      assert.expect(2);
      this.set('value', ['foo']);
      this.actions.update = actual => {
        assert.equal(actual, this.value, 'submitted value is passed to external action');
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-codelist
            create=true
            value=value
            mdCodeName="foobar"
            change=(action "update" value)}}
      */
      {
        "id": "VRrjNwPt",
        "block": "[[[1,[28,[35,0],null,[[\"create\",\"value\",\"mdCodeName\",\"change\"],[true,[33,1],\"foobar\",[28,[37,2],[[30,0],\"update\",[33,1]],null]]]]]],[],false,[\"input/md-codelist\",\"value\",\"action\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _helpers.clickTrigger)();
      await (0, _helpers.typeInSearch)('biz');
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');

      //return settled().then(() => {
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|biz|×|', 'value updated');
      //});
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-date-range/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | input/md date range', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('start', new Date('2016-01-01'));
      this.set('end', new Date('2017-01-01'));
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-date-range class="testme" startDateTime=start endDateTime=end profilePath="foobar"}}
      */
      {
        "id": "feiV0rkH",
        "block": "[[[1,[28,[35,0],null,[[\"class\",\"startDateTime\",\"endDateTime\",\"profilePath\"],[\"testme\",[33,1],[33,2],\"foobar\"]]]]],[],false,[\"input/md-date-range\",\"start\",\"end\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), 'Dates|Precision|Year|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|');
      assert.equal(new Date((0, _testHelpers.findAll)('.date input')[0].value).toISOString(), this.start.toISOString(), 'set start');
      assert.equal(new Date((0, _testHelpers.findAll)('.date input')[1].value).toISOString(), this.end.toISOString(), 'set end');
      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Input::MdDateRange @class="testme" @startDateTime={{start}} @endDateTime={{end}} @profilePath="foobar">
              template block text
            </Input::MdDateRange>
          
      */
      {
        "id": "cHtWWRT6",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@class\",\"@startDateTime\",\"@endDateTime\",\"@profilePath\"],[\"testme\",[99,1,[\"@startDateTime\"]],[99,2,[\"@endDateTime\"]],\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"input/md-date-range\",\"start\",\"end\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), 'Dates|Precision|Year|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-datetime/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | input/md datetime', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('renders and binds', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      this.set('mydate', '1999-12-31T23:59:59.999+0900');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-datetime
                            date=mydate
                            format="YYYY-MM-DD"
                            placeholder="Enter date"}}
      */
      {
        "id": "eqCSamux",
        "block": "[[[1,[28,[35,0],null,[[\"date\",\"format\",\"placeholder\"],[[33,1],\"YYYY-MM-DD\",\"Enter date\"]]]]],[],false,[\"input/md-datetime\",\"mydate\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('input').value, '1999-12-31', 'binding works');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-input-confirm/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | input/md input confirm', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-input-confirm}}
      */
      {
        "id": "AqeIuKIF",
        "block": "[[[1,[34,0]]],[],false,[\"input/md-input-confirm\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-input').textContent.trim(), 'Edit');
      assert.ok((0, _testHelpers.find)('.md-input input[disabled]'), 'input disabled');
      await (0, _testHelpers.click)('.btn-warning');
      assert.equal((0, _testHelpers.find)('.md-input').textContent.trim(), 'Confirm', 'confirm ok');
      await (0, _testHelpers.click)('.btn-warning');
      assert.ok((0, _testHelpers.find)('.md-input input:not([disabled])'), 'input enabled');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Input::MdInputConfirm>
              template block text
            </Input::MdInputConfirm>
          
      */
      {
        "id": "7w47nCu0",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"input/md-input-confirm\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-input').textContent.replace(/[ \n]+/g, '|').trim(), '|Edit|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-input/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "@ember/object"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _object) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/object",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | input/md input', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders md-input', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{input/md-input
              label="Foo"
              value="Bar"
              maxlength=100
              required="true"
              inputClass="test"
              placeholder="Enter FooBar"}}
          
      */
      {
        "id": "DRssF96K",
        "block": "[[[1,\"\\n      \"],[1,[28,[35,0],null,[[\"label\",\"value\",\"maxlength\",\"required\",\"inputClass\",\"placeholder\"],[\"Foo\",\"Bar\",100,\"true\",\"test\",\"Enter FooBar\"]]]],[1,\"\\n    \"]],[],false,[\"input/md-input\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('label').textContent.trim(), 'Foo', 'labeled OK');
      const input = this.$('input');
      const props = [input.prop('required'), input.prop('maxlength'), input.val(), input.prop('placeholder'), input.hasClass('test')];
      assert.deepEqual(props, [true, 100, 'Bar', 'Enter FooBar', true], 'properties set OK');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#input/md-input}}
              <p class="help-block">help text</p>
            {{/input/md-input}}
          
      */
      {
        "id": "nvhgrtMD",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,null,[[\"default\"],[[[[1,\"        \"],[10,2],[14,0,\"help-block\"],[12],[1,\"help text\"],[13],[1,\"\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"input/md-input\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.help-block').textContent, 'help text', 'block renders');
    });
    (0, _qunit.test)('it accepts required when bound to a model', async function (assert) {
      this.set('model', _object.default.create({
        title: 'Hello'
      }));
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{input/md-input
              model=this.model
              valuePath="title"
              label="Title"
              required=true
            }}
          
      */
      {
        "id": "951DW4PA",
        "block": "[[[1,\"\\n      \"],[1,[28,[35,0],null,[[\"model\",\"valuePath\",\"label\",\"required\"],[[30,0,[\"model\"]],\"title\",\"Title\",true]]]],[1,\"\\n    \"]],[],false,[\"input/md-input\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('input').hasAttribute('required');
      assert.dom('.md-input').hasClass('required');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-markdown-area/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | input/md markdown area', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-markdown-area required=true}}
      */
      {
        "id": "qALBMkWn",
        "block": "[[[1,[28,[35,0],null,[[\"required\"],[true]]]]],[],false,[\"input/md-markdown-area\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-markdown-editor').innerText.replace(/[ \n\s]+/g, '').trim(), '||||Entertext,Markdownissupported.​length:0100:0');
      assert.ok((0, _testHelpers.find)('.md-markdown-editor .length.md-error'), 'required ok');
      this.set('markdownValue', 'This is foobar.');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-markdown-area value=markdownValue maxlength=10 required=false}}
      */
      {
        "id": "EoxWQwIT",
        "block": "[[[1,[28,[35,0],null,[[\"value\",\"maxlength\",\"required\"],[[33,1],10,false]]]]],[],false,[\"input/md-markdown-area\",\"markdownValue\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-markdown-editor .length.md-error').textContent, 'length: 15', 'maxlength ok');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Input::MdMarkdownArea>
              template block text
            </Input::MdMarkdownArea>
          
      */
      {
        "id": "5rT55KxU",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"input/md-markdown-area\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-markdown-editor').innerText.replace(/[ \n\s]+/g, '').trim(), '||||Entertext,Markdownissupported.​length:0100:0templateblocktext', 'block');
    });
    (0, _qunit.test)('editing writes back through the two-way binding', async function (assert) {
      this.set('description', {
        abstract: ''
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-markdown-area value=this.description.abstract}}
      */
      {
        "id": "+LuuHe04",
        "block": "[[[1,[28,[35,0],null,[[\"value\"],[[30,0,[\"description\",\"abstract\"]]]]]]],[],false,[\"input/md-markdown-area\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      (0, _testHelpers.find)('.CodeMirror').CodeMirror.setValue('I am the abstract');
      await (0, _testHelpers.settled)();
      assert.equal(this.description.abstract, 'I am the abstract', 'edited value propagates to the bound property');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-month/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | input/md month', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('date', '10');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-month date=this.date}}
      */
      {
        "id": "xJCudx+U",
        "block": "[[[1,[28,[35,0],null,[[\"date\"],[[30,0,[\"date\"]]]]]]],[],false,[\"input/md-month\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('input').value, 'October');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Input::MdMonth @class="testme" @date="10">
              template block text
            </Input::MdMonth>
          
      */
      {
        "id": "uc9zLfto",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@class\",\"@date\"],[\"testme\",\"10\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"input/md-month\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), '', 'no block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select-contact/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-contact",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | input/md select contact', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      var contacts = (0, _createContact.default)(3);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts);
      this.set('contacts', contacts);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-select-contact value=1}}
      */
      {
        "id": "bIy9L0HJ",
        "block": "[[[1,[28,[35,0],null,[[\"value\"],[1]]]]],[],false,[\"input/md-select-contact\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-select-contact').textContent.replace(/[ \n]+/g, '|').trim(), '|Contact1|×|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Input::MdSelectContact>
              template block text
            </Input::MdSelectContact>
          
      */
      {
        "id": "vRLcvPgR",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"input/md-select-contact\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-select-contact').textContent.trim(), 'Select one option');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select-contacts/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact", "ember-power-select/test-support"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createContact, _testSupport) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-contact",0,"ember-power-select/test-support",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | input/md select contacts', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-select-contacts}}
      */
      {
        "id": "vvFAhTN1",
        "block": "[[[1,[34,0]]],[],false,[\"input/md-select-contacts\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.ok((0, _testHelpers.find)('.md-select-contact'));
    });
    (0, _qunit.test)('contact selected', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      //make sure there's at least one record visible
      //var store = this.owner.lookup('service:store');
      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts);
      //store.createRecord('contact', contacts[0]);
      //store.createRecord('contact', contacts[1]);

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-select-contacts}}
      */
      {
        "id": "vvFAhTN1",
        "block": "[[[1,[34,0]]],[],false,[\"input/md-select-contacts\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testSupport.selectChoose)('.md-select-contact', 'Contact0');
      await (0, _testSupport.selectChoose)('.md-select-contact', 'Contact1');
      assert.equal((0, _testHelpers.find)('.md-select-contact').innerText.replace(/[\s\n]+/g, '|').trim(), '×|Contact0|×|Contact1', 'select multiple contacts');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select-profile/component-test", ["@ember/template-factory", "@ember/test-helpers", "@ember/service", "@ember/array", "qunit", "ember-qunit", "ember-power-select/test-support/helpers", "mdeditor/config/environment"], function (_templateFactory, _testHelpers, _service, _array, _qunit, _emberQunit, _helpers, _environment) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"@ember/service",0,"@ember/array",0,"qunit",0,"ember-qunit",0,"ember-power-select/test-support/helpers",0,"mdeditor/config/environment",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  const MockCustomProfile = _service.default.extend({
    init() {
      this._super(...arguments);
      this.profiles = (0, _array.A)([{
        id: _environment.default.APP.defaultProfileId,
        title: 'Full',
        description: 'Full profile description'
      }]);
    }
  });
  (0, _qunit.module)('Integration | Component | input/md select profile', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.owner.register('service:custom-profile', MockCustomProfile);
    });
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // test dummy for the external profile action
      this.set('updateProfile', () => {});
      this.set('profileId', _environment.default.APP.defaultProfileId);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-select-profile
            value=profileId
            updateProfile=updateProfile
            class="testme"
          }}
      */
      {
        "id": "09x36xj+",
        "block": "[[[1,[28,[35,0],null,[[\"value\",\"updateProfile\",\"class\"],[[33,1],[33,2],\"testme\"]]]]],[],false,[\"input/md-select-profile\",\"profileId\",\"updateProfile\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|'), '|Profile|Full|?|');
    });
    (0, _qunit.test)('should trigger external action on change', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      // test dummy for the external profile action
      this.set('updateProfile', actual => {
        assert.equal(actual, _environment.default.APP.defaultProfileId, 'submitted value is passed to external action');
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-select-profile value=null updateProfile=(action updateProfile)}}
      */
      {
        "id": "NaSwD3aD",
        "block": "[[[1,[28,[35,0],null,[[\"value\",\"updateProfile\"],[null,[28,[37,1],[[30,0],[33,2]],null]]]]]],[],false,[\"input/md-select-profile\",\"action\",\"updateProfile\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));

      // select a value and force an onchange
      await (0, _helpers.clickTrigger)();
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.findAll)('.ember-power-select-option .select-value').findBy('innerText', 'Full'), 'mouseup');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select-thesaurus/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "ember-power-select/test-support/helpers"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"ember-power-select/test-support/helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | input/md select thesaurus', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-select-thesaurus}}
      */
      {
        "id": "ZRM0UKj8",
        "block": "[[[1,[34,0]]],[],false,[\"input/md-select-thesaurus\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|Pick|a|thesaurus|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#input/md-select-thesaurus}}
              template block text
            {{/input/md-select-thesaurus}}
          
      */
      {
        "id": "bqJ8txro",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,null,[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"input/md-select-thesaurus\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|Pick|a|thesaurus|');
    });
    (0, _qunit.test)('should trigger external action on change', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      // test dummy for the external profile action
      this.set('selectThesaurus', id => {
        assert.equal(id.citation.identifier[0].identifier, 'ISO 19115 Topic Category', 'submitted value is passed to external action');
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-select-thesaurus selectThesaurus=selectThesaurus}}
      */
      {
        "id": "t0AeZaEN",
        "block": "[[[1,[28,[35,0],null,[[\"selectThesaurus\"],[[33,1]]]]]],[],false,[\"input/md-select-thesaurus\",\"selectThesaurus\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));

      // select a value and force an onchange
      await (0, _helpers.clickTrigger)();
      (0, _testHelpers.triggerEvent)((0, _testHelpers.findAll)('.ember-power-select-option')[1], 'mouseup');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-select/component-test", ["@ember/template-factory", "@ember/test-helpers", "@ember/object", "qunit", "ember-qunit", "ember-power-select/test-support/helpers"], function (_templateFactory, _testHelpers, _object, _qunit, _emberQunit, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"@ember/object",0,"qunit",0,"ember-qunit",0,"ember-power-select/test-support/helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | input/md select', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('objArray', [_object.default.create({
        id: 1,
        name: 'foo',
        tip: 'bar'
      })]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{input/md-select
              value=1
              objectArray=objArray
              valuePath="id"
              namePath="name"
              tooltipPath="tip"
              placeholder="Select one"}}
          
      */
      {
        "id": "LqXapWQh",
        "block": "[[[1,\"\\n      \"],[1,[28,[35,0],null,[[\"value\",\"objectArray\",\"valuePath\",\"namePath\",\"tooltipPath\",\"placeholder\"],[1,[33,1],\"id\",\"name\",\"tip\",\"Select one\"]]]],[1,\"\\n    \"]],[],false,[\"input/md-select\",\"objArray\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|', 'renders ok');
    });
    (0, _qunit.test)('set value', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('objArray', [_object.default.create({
        id: 1,
        name: 'foo',
        tip: 'bar'
      }), _object.default.create({
        id: 2,
        name: 'baz',
        tip: 'biz'
      })]);
      this.set('value', 1);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{input/md-select
              value=value
              objectArray=objArray
              valuePath="id"
              namePath="name"}}
          
      */
      {
        "id": "YxlQxi/m",
        "block": "[[[1,\"\\n      \"],[1,[28,[35,0],null,[[\"value\",\"objectArray\",\"valuePath\",\"namePath\"],[[33,1],[33,2],\"id\",\"name\"]]]],[1,\"\\n    \"]],[],false,[\"input/md-select\",\"value\",\"objArray\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|', 'value set');
      await (0, _helpers.clickTrigger)();
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.findAll)('.ember-power-select-option')[1], 'mouseup');
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|baz|', 'display value updates');
      assert.equal(this.value, 2, 'value is updated');
    });
    (0, _qunit.test)('create option', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
      this.set('objArray', [_object.default.create({
        id: 1,
        name: 'foo',
        tip: 'bar'
      }), _object.default.create({
        id: 2,
        name: 'baz',
        tip: 'biz'
      })]);
      this.set('value', 1);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{input/md-select
              value=value
              create=true
              objectArray=objArray
              valuePath="id"
              namePath="name"}}
          
      */
      {
        "id": "na3ZdRLU",
        "block": "[[[1,\"\\n      \"],[1,[28,[35,0],null,[[\"value\",\"create\",\"objectArray\",\"valuePath\",\"namePath\"],[[33,1],true,[33,2],\"id\",\"name\"]]]],[1,\"\\n    \"]],[],false,[\"input/md-select\",\"value\",\"objArray\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|foo|', 'value set');
      await (0, _helpers.clickTrigger)();
      await (0, _helpers.typeInSearch)('biz');
      await (0, _testHelpers.triggerEvent)((0, _testHelpers.find)('.ember-power-select-option'), 'mouseup');
      assert.equal((0, _testHelpers.find)('.md-select').textContent.replace(/[ \n]+/g, '|'), '|biz|', 'display value updates');
      assert.equal(this.value, 'biz', 'value is updated');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-textarea/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | input/md textarea', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{input/md-textarea
            value="Foo bar baz"
            label="FooBar"
            placeholder="placeholder"
            rows=10}}
            
      */
      {
        "id": "cImgQzjd",
        "block": "[[[1,\"\\n      \"],[1,[28,[35,0],null,[[\"value\",\"label\",\"placeholder\",\"rows\"],[\"Foo bar baz\",\"FooBar\",\"placeholder\",10]]]],[1,\"\\n      \"]],[],false,[\"input/md-textarea\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('textarea').value, 'Foo bar baz');
      assert.equal((0, _testHelpers.find)('label').textContent, 'FooBar', 'label renders');

      // Template block usage:" + EOL +
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#input/md-textarea class="testme"}}
              template block text
            {{/input/md-textarea}}
          
      */
      {
        "id": "mfRxTyJB",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"class\"],[\"testme\"]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"input/md-textarea\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), 'template block text', 'block renders');
    });
    (0, _qunit.test)('editing writes back through the two-way binding', async function (assert) {
      this.set('extent', {
        description: ''
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{input/md-textarea value=this.extent.description label="Description"}}
          
      */
      {
        "id": "QeGEW6G5",
        "block": "[[[1,\"\\n      \"],[1,[28,[35,0],null,[[\"value\",\"label\"],[[30,0,[\"extent\",\"description\"]],\"Description\"]]]],[1,\"\\n    \"]],[],false,[\"input/md-textarea\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.fillIn)('textarea', 'qweqwe');
      assert.equal(this.extent.description, 'qweqwe', 'typed value propagates to the bound property');
    });
    (0, _qunit.test)('a programmatic revert is reflected in the textarea', async function (assert) {
      this.set('description', 'original');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{input/md-textarea value=this.description label="Description"}}
          
      */
      {
        "id": "YWVHCld4",
        "block": "[[[1,\"\\n      \"],[1,[28,[35,0],null,[[\"value\",\"label\"],[[30,0,[\"description\"]],\"Description\"]]]],[1,\"\\n    \"]],[],false,[\"input/md-textarea\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.fillIn)('textarea', 'qweqwe');
      this.set('description', 'original');
      await (0, _testHelpers.settled)();
      assert.equal((0, _testHelpers.find)('textarea').value, 'original', 'reverting the bound property resets the displayed value');
    });
  });
});
define("mdeditor/tests/integration/pods/components/input/md-toggle/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | input/md toggle', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('value', false);
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{input/md-toggle
            value=this.value
            showLabels=true
            onToggle=(action (mut this.value))
            offLabel="No"
            onLabel="Yes"
          }}
      */
      {
        "id": "i2eCVYMg",
        "block": "[[[1,[28,[35,0],null,[[\"value\",\"showLabels\",\"onToggle\",\"offLabel\",\"onLabel\"],[[30,0,[\"value\"]],true,[28,[37,1],[[30,0],[28,[37,2],[[30,0,[\"value\"]]],null]],null],\"No\",\"Yes\"]]]]],[],false,[\"input/md-toggle\",\"action\",\"mut\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.x-toggle-component').textContent.replace(/[ \n]+/g, '|').trim(), '|No|Yes|');
      await (0, _testHelpers.click)('.x-toggle-btn');
      assert.ok((0, _testHelpers.find)('.toggle-on'), 'toggle on');
      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Input::MdToggle @class="testme">
              template block text
            </Input::MdToggle>
          
      */
      {
        "id": "nv+nQ9Tg",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@class\"],[\"testme\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"input/md-toggle\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-card/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | layout/md card', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{layout/md-card title="foo"}}
      */
      {
        "id": "5nSg2rkr",
        "block": "[[[1,[28,[35,0],null,[[\"title\"],[\"foo\"]]]]],[],false,[\"layout/md-card\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.trim(), 'foo');

      // await render(hbs`{{layout/md-card title="foo" collasped="true"}}`);

      // assert.equal(find('.md-card').textContent.trim(), 'foo');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Layout::MdCard>
              template block text
            </Layout::MdCard>
          
      */
      {
        "id": "nZEwWjr2",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"layout/md-card\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.trim(), 'template block text', 'block');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Layout::MdCard @title="foo" @collapsed={{true}} @collapsible={{true}}>
              template block text
            </Layout::MdCard>
          
      */
      {
        "id": "5+U6kNbb",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@title\",\"@collapsed\",\"@collapsible\"],[\"foo\",true,true]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"layout/md-card\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-card').innerText.trim(), 'foo', 'collapsed');
      assert.ok((0, _testHelpers.find)('.md-card .card-block:not(.in)'), 'class ok');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-footer/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | layout/md footer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('settings', {
        data: {
          autoSave: false
        }
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{layout/md-footer settings=settings}}
      */
      {
        "id": "Jk7yx3wf",
        "block": "[[[1,[28,[35,0],null,[[\"settings\"],[[33,1]]]]]],[],false,[\"layout/md-footer\",\"settings\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-footer').textContent.replace(/[ \n]+/g, '|').trim(), '|Report|Issue|AutoSave:|Off|');
      this.set('settings.data.autoSave', true);
      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Layout::MdFooter @settings={{settings}}>
              template block text
            </Layout::MdFooter>
          
      */
      {
        "id": "0ZuBgRoH",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@settings\"],[[99,1,[\"@settings\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"layout/md-footer\",\"settings\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-footer').textContent.replace(/[ \n]+/g, '|').trim(), '|Report|Issue|AutoSave:|On|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-nav-main/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | md nav main', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{layout/md-nav-main}}
      */
      {
        "id": "0ohV0eST",
        "block": "[[[1,[34,0]]],[],false,[\"layout/md-nav-main\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('nav').innerText.replace(/[ \n]+/g, '|'), '|Dashboard|Export|Import|Publish|Sync|Settings');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#layout/md-nav-main}}
              template block text
            {{/layout/md-nav-main}}
          
      */
      {
        "id": "PdmrwEHI",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,null,[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"layout/md-nav-main\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('nav').innerText.replace(/[ \n]+/g, '|'), '|Dashboard|Export|Import|Publish|Sync|template|block|text|Settings');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-nav-secondary/component-test", ["@ember/template-factory", "@ember/test-helpers", "@ember/service", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _service, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"@ember/service",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  //Stub profile service
  const profiles = [{
    identifier: "full",
    namespace: "org.adiwg.profile",
    nav: {
      record: [{
        title: 'Foo',
        target: 'record.show.edit.index'
      }, {
        title: 'Bar',
        target: 'record.show.edit.metadata'
      }]
    }
  }, {
    identifier: 'basic',
    namespace: "org.adiwg.profile",
    nav: {
      record: [{
        title: 'FooBar',
        target: 'record.show.edit.index'
      }, {
        title: 'BarFoo',
        target: 'record.show.edit.metadata'
      }, {
        title: 'FooBar1',
        target: 'record.show.edit.index'
      }, {
        title: 'BarFoo2',
        target: 'record.show.edit.metadata'
      }]
    }
  }];
  const profileStub = _service.default.extend({
    coreProfiles: profiles
  });
  (0, _qunit.module)('Integration | Component | md nav secondary', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.owner.register('service:profile', profileStub);
      // Calling inject puts the service instance in the test's context,
      // making it accessible as "profileService" within each test
      this.profileService = this.owner.lookup('service:profile');
      this.customService = this.owner.lookup('service:custom-profile');
      this.model = {
        constructor: {
          modelName: 'record'
        }
      };
    });
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{layout/md-nav-secondary model=model}}
      */
      {
        "id": "EXVqm2L1",
        "block": "[[[1,[28,[35,0],null,[[\"model\"],[[33,1]]]]]],[],false,[\"layout/md-nav-secondary\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      var more = (0, _testHelpers.findAll)('.overflow-nav').length ? '|More' : '';
      assert.equal((0, _testHelpers.find)('.nav').textContent.replace(/[ \n]+/g, '|'), more + '|Foo|Bar|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#layout/md-nav-secondary model=model}}
              <li>template block text</li>
            {{/layout/md-nav-secondary}}
          
      */
      {
        "id": "mJIRphxY",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"model\"],[[33,1]]],[[\"default\"],[[[[1,\"        \"],[10,\"li\"],[12],[1,\"template block text\"],[13],[1,\"\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"layout/md-nav-secondary\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      more = (0, _testHelpers.findAll)('.overflow-nav').length ? '|More' : '';
      assert.equal((0, _testHelpers.find)('.nav').textContent.replace(/[ \n]+/g, '|'), more + '|Foo|Bar|');
    });
    (0, _qunit.test)('render after setting profile', async function (assert) {
      assert.expect(2);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.set('customService.active', 'org.adiwg.profile.basic');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{layout/md-nav-secondary model=model}}
      */
      {
        "id": "EXVqm2L1",
        "block": "[[[1,[28,[35,0],null,[[\"model\"],[[33,1]]]]]],[],false,[\"layout/md-nav-secondary\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      var more = (0, _testHelpers.findAll)('.overflow-nav').length ? '|More' : '';
      assert.equal((0, _testHelpers.find)('.nav').textContent.replace(/[ \n]+/g, '|'), more + '|FooBar|BarFoo|FooBar1|BarFoo2|');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <div style="width:100px;">{{layout/md-nav-secondary model=model}}</div>
      */
      {
        "id": "DGR5OHcT",
        "block": "[[[10,0],[14,5,\"width:100px;\"],[12],[1,[28,[35,0],null,[[\"model\"],[[33,1]]]]],[13]],[],false,[\"layout/md-nav-secondary\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.ok((0, _testHelpers.findAll)('.dropdown .dropdown-menu').length, 'render more dropdown');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-nav-secondary/link/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "@ember/object"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _object) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/object",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | layout/md-nav-secondary/link', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.links = [_object.default.create({
        title: 'Foo',
        target: 'record.show.edit.index',
        tip: 'Foo not bar'
      }), _object.default.create({
        title: 'Bar',
        target: 'record.show.edit.metadata'
      })];
      this.nav = {
        links: this.links
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{layout/md-nav-secondary/link link=links.firstObject nav=nav}}
      */
      {
        "id": "tc15JCbP",
        "block": "[[[1,[28,[35,0],null,[[\"link\",\"nav\"],[[33,1,[\"firstObject\"]],[33,2]]]]]],[],false,[\"layout/md-nav-secondary/link\",\"links\",\"nav\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'Foo');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#layout/md-nav-secondary/link link=links.lastObject nav=nav}}
              template block text
            {{/layout/md-nav-secondary/link}}
          
      */
      {
        "id": "8Kgeil8j",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"link\",\"nav\"],[[33,1,[\"lastObject\"]],[33,2]]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"layout/md-nav-secondary/link\",\"links\",\"nav\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'Bar');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-nav-sidebar/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact", "mdeditor/tests/helpers/create-record", "mdeditor/tests/helpers/create-dictionary"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createContact, _createRecord, _createDictionary) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-contact",0,"mdeditor/tests/helpers/create-record",0,"mdeditor/tests/helpers/create-dictionary",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | md nav sidebar', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(1);
      const contacts = (0, _createContact.default)(2);
      contacts.forEach(c => c.set('isNew', true));
      contacts.meta = {
        type: 'contact',
        list: 'contacts',
        title: 'Contacts'
      };
      const records = (0, _createRecord.createRecord)(2);
      records.forEach(r => r.set('isNew', true));
      records.meta = {
        type: 'record',
        list: 'records',
        title: 'Records'
      };
      const dicts = (0, _createDictionary.createDictionary)(2);
      dicts.forEach(d => d.set('isNew', true));
      dicts.meta = {
        type: 'dictionary',
        list: 'dictionaries',
        title: 'Dictionaries'
      };
      this.set('model', [records, contacts, dicts]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{layout/md-nav-sidebar items=model version="test"}}
      */
      {
        "id": "mg4Xasl3",
        "block": "[[[1,[28,[35,0],null,[[\"items\",\"version\"],[[33,1],\"test\"]]]]],[],false,[\"layout/md-nav-sidebar\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.sidebar-nav').textContent.replace(/[ \n]+/g, '|'), '|mdditorvtest|Records|(2)|My|Record0|My|Record1|Contacts|(2)|Contact0|Contact1|Dictionaries|(2)|My|Dictionary0|My|Dictionary1|');
    });
    (0, _qunit.test)('toggle help action', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{layout/md-nav-sidebar}}
      */
      {
        "id": "LsAkzxAP",
        "block": "[[[1,[34,0]]],[],false,[\"layout/md-nav-sidebar\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('.md-btn-help');
      assert.ok((0, _testHelpers.find)('.md-sidebar-wrapper').classList.contains('help'));
    });
    (0, _qunit.test)('toggle sidebar action', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <div id="md-wrapper">{{layout/md-nav-sidebar}}</div>
      */
      {
        "id": "FQo3VzJw",
        "block": "[[[10,0],[14,1,\"md-wrapper\"],[12],[1,[34,0]],[13]],[],false,[\"layout/md-nav-sidebar\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('.sidebar-brand-link');
      assert.ok((0, _testHelpers.find)('#md-wrapper').classList.contains('toggled'));
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-object-container/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | layout/md-object-container', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{layout/md-object-container
            title="Foo"
            isCollapsible=true
            index="1"
          }}
      */
      {
        "id": "CQFtwZBW",
        "block": "[[[1,[28,[35,0],null,[[\"title\",\"isCollapsible\",\"index\"],[\"Foo\",true,\"1\"]]]]],[],false,[\"layout/md-object-container\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'Foo #1');
      assert.dom('.md-object-container').hasClass('even');
      await (0, _testHelpers.click)('.md-object-container-header a');
      assert.dom('.md-object-container .btn-collapse').hasClass('collapsed');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#layout/md-object-container}}
              template block text
            {{/layout/md-object-container}}
          
      */
      {
        "id": "DlmfCrt2",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,null,[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"layout/md-object-container\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'template block text', 'block renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-slider/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | layout/md slider', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{layout/md-slider}}
      */
      {
        "id": "cMD49a7h",
        "block": "[[[1,[34,0]]],[],false,[\"layout/md-slider\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-slider').textContent.trim(), 'Close');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Layout::MdSlider @fromName="slider">
              template block text
            </Layout::MdSlider>
            {{to-elsewhere named="slider"
              send=(hash
                title="biz"
                body=(component "layout/md-card" title="foobar"))
            }}
          
      */
      {
        "id": "RT8Wy4Hv",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@fromName\"],[\"slider\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n      \"],[1,[28,[35,1],null,[[\"named\",\"send\"],[\"slider\",[28,[37,2],null,[[\"title\",\"body\"],[\"biz\",[50,\"layout/md-card\",0,null,[[\"title\"],[\"foobar\"]]]]]]]]]],[1,\"\\n    \"]],[],false,[\"layout/md-slider\",\"to-elsewhere\",\"hash\",\"component\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-slider').textContent.replace(/[ \n]+/g, '|').trim(), '|Close|biz|foobar|template|block|text|');
      assert.ok((0, _testHelpers.find)('.md-card'), 'rendered slider content');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/md-wrap/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | layout/md wrap', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{layout/md-wrap class="testme"}}
      */
      {
        "id": "yGVZdjSn",
        "block": "[[[1,[28,[35,0],null,[[\"class\"],[\"testme\"]]]]],[],false,[\"layout/md-wrap\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Layout::MdWrap @class="testme">
              template block text
            </Layout::MdWrap>
          
      */
      {
        "id": "kveO21+p",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@class\"],[\"testme\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"layout/md-wrap\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/nav/dictionary/nav-main/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  // import Service from '@ember/service';

  //Stub profile service
  // const profiles = [{
  //     identifier: "full",
  //     namespace: "org.adiwg.profile",
  //     nav: {
  //       dictionary: [{
  //         title: 'Foo',
  //         target: 'record.show.edit.index'
  //
  //       }, {
  //         title: 'Bar',
  //         target: 'record.show.edit.metadata'
  //
  //       }]
  //     }
  //   },
  //   {
  //     identifier: 'basic',
  //     namespace: "org.adiwg.profile",
  //     nav: {
  //       dictionary: [{
  //         title: 'FooBar',
  //         target: 'record.show.edit.index'
  //
  //       }, {
  //         title: 'BarFoo',
  //         target: 'record.show.edit.metadata'
  //
  //       }]
  //     }
  //   }
  // ];

  // const profileStub = Service.extend({
  //   coreProfiles: profiles
  // });

  (0, _qunit.module)('Integration | Component | layout/nav/dictionary/nav-main', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // hooks.beforeEach(function () {
    //   this.owner.register('service:profile', profileStub);
    //   // Calling inject puts the service instance in the test's context,
    //   // making it accessible as "profileService" within each test
    //   this.profileService = this.owner.lookup('service:profile');
    //   this.customService = this.owner.lookup('service:custom-profile');
    //   this.model = {
    //     constructor: {
    //       modelName: 'record'
    //     }
    //   }
    // });

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{layout/nav/dictionary/nav-main model=model}}
            {{to-elsewhere named="dictionary-nav" send=(component "control/md-button" text="testme")}}
            
      */
      {
        "id": "DlIgCc5Y",
        "block": "[[[1,[28,[35,0],null,[[\"model\"],[[33,1]]]]],[1,\"\\n      \"],[1,[28,[35,2],null,[[\"named\",\"send\"],[\"dictionary-nav\",[50,\"control/md-button\",0,null,[[\"text\"],[\"testme\"]]]]]]],[1,\"\\n      \"]],[],false,[\"layout/nav/dictionary/nav-main\",\"model\",\"to-elsewhere\",\"component\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'testme');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#layout/nav/dictionary/nav-main model=model}}
              template block text
            {{/layout/nav/dictionary/nav-main}}
            {{to-elsewhere named="dictionary-nav" send=(component "control/md-button" text="testme")}}
          
      */
      {
        "id": "7Hh3LEn0",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"model\"],[[33,1]]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"      \"],[1,[28,[35,2],null,[[\"named\",\"send\"],[\"dictionary-nav\",[50,\"control/md-button\",0,null,[[\"text\"],[\"testme\"]]]]]]],[1,\"\\n    \"]],[],false,[\"layout/nav/dictionary/nav-main\",\"model\",\"to-elsewhere\",\"component\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'testme');
    });
  });
});
define("mdeditor/tests/integration/pods/components/layout/nav/record/nav-main/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/config/environment", "@ember/service", "@ember/array"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _environment, _service, _array) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"mdeditor/config/environment",0,"@ember/service",0,"@ember/array",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | layout/nav/record/nav-main', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.foo = function () {};
      this.profileId = _environment.default.APP.defaultProfileId;

      // Provide the "Full" profile so the select shows the correct value
      this.owner.register('service:custom-profile', _service.default.extend({
        profiles: (0, _array.A)([{
          id: _environment.default.APP.defaultProfileId,
          title: 'Full',
          description: 'The full metadata profile'
        }]),
        active: null,
        getActiveProfile() {
          return null;
        }
      }));
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{layout/nav/record/nav-main}}
          {{to-elsewhere named="record-nav" send=(component "input/md-select-profile" value=profileId updateProfile=this.foo)}}
          
      */
      {
        "id": "32q1Yg/q",
        "block": "[[[1,[34,0]],[1,\"\\n    \"],[1,[28,[35,1],null,[[\"named\",\"send\"],[\"record-nav\",[50,\"input/md-select-profile\",0,null,[[\"value\",\"updateProfile\"],[[33,3],[30,0,[\"foo\"]]]]]]]]],[1,\"\\n    \"]],[],false,[\"layout/nav/record/nav-main\",\"to-elsewhere\",\"component\",\"profileId\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Translate|Profile|Full|?|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#layout/nav/record/nav-main}}
              template block text
            {{/layout/nav/record/nav-main}}
          
      */
      {
        "id": "QX0xYo1v",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,null,[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"layout/nav/record/nav-main\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'Translate');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-help/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | md help', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(2);

      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{md-help}}
      */
      {
        "id": "gMYfY6qL",
        "block": "[[[1,[34,0]]],[],false,[\"md-help\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Help|Main|Tour|The|mdEditor|is|a|web|application|that|allows|users|to|author|and|edit|metadata|for|projects|and|datasets.|The|primary|design|goal|is|to|develop|an|editor|that|will|allow|creation|and|management|of|archival|quality|metadata|without|requiring|extensive|knowledge|of|metadata|standards.|A|comprehensive|User|Manual|is|available.|The|manual|includes|a|tutorial,|reference,|and|best|practices.|View|User|Manual|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#md-help}}
              template block text
            {{/md-help}}
          
      */
      {
        "id": "CQ0r67dn",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,null,[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"md-help\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.ok(this.element.textContent.trim().indexOf('template block text') > 0);
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | md models table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{md-models-table data=data columns=columns}}
      */
      {
        "id": "T+nLeEri",
        "block": "[[[1,[28,[35,0],null,[[\"data\",\"columns\"],[[33,1],[33,2]]]]]],[],false,[\"md-models-table\",\"data\",\"columns\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Search:|Columns|Show|All|Hide|All|Restore|Defaults|Title|Type|Title|Type|Title|Type|foo|bar|biz|baz|Show|1|-|2|of|2|Clear|all|filters|Rows:|10|25|50|Page:|1|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <MdModelsTable>
              template block text
            </MdModelsTable>
          
      */
      {
        "id": "Oh/zqGiC",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"md-models-table\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/components/check-all/component-test", ["@ember/template-factory", "@ember/test-helpers", "@ember/object", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _object, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"@ember/object",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | md models table/components/check all', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(4);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.data = {
        themeInstance: {
          selectAllRowsIcon: 'select',
          deselectAllRowsIcon: 'deselect'
        },
        selectedItems: _object.default.create({
          length: 0
        }),
        length: 1
      };
      this.toggleAllSelection = function () {
        assert.ok(true, 'toggleAll action');
        this.set('selectedItems.length', 1);
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{md-models-table/components/check-all data=data selectedItems=data.selectedItems themeInstance=data.themeInstance toggleAllSelection=toggleAllSelection}}
      */
      {
        "id": "I3sNlHu+",
        "block": "[[[1,[28,[35,0],null,[[\"data\",\"selectedItems\",\"themeInstance\",\"toggleAllSelection\"],[[33,1],[33,1,[\"selectedItems\"]],[33,1,[\"themeInstance\"]],[33,2]]]]]],[],false,[\"md-models-table/components/check-all\",\"data\",\"toggleAllSelection\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.ok((0, _testHelpers.find)('i').classList.contains('deselect'), 'add class');
      await (0, _testHelpers.click)('button');

      // await render(hbs`{{md-models-table/components/check-all data=data themeInstance=data.themeInstance toggleAllSelection=toggleAllSelection}}`);

      assert.ok((0, _testHelpers.find)('i').classList.contains('select'), 'deselect');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <MdModelsTable::Components::CheckAll>
              template block text
            </MdModelsTable::Components::CheckAll>
          
      */
      {
        "id": "GWE3QpjN",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"md-models-table/components/check-all\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), '');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/components/check/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | md models table/components/check', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.themeInstance = {
        selectRowIcon: 'select',
        deselectRowIcon: 'deselect'
      };
      this.set('isSelected', false);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{md-models-table/components/check isSelected=isSelected themeInstance=themeInstance}}
      */
      {
        "id": "rSFyzHU8",
        "block": "[[[1,[28,[35,0],null,[[\"isSelected\",\"themeInstance\"],[[33,1],[33,2]]]]]],[],false,[\"md-models-table/components/check\",\"isSelected\",\"themeInstance\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.ok((0, _testHelpers.find)('i').classList.contains('deselect'), 'add class');
      this.set('isSelected', true);
      assert.ok((0, _testHelpers.find)('i').classList.contains('select'), 'update class');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <MdModelsTable::Components::Check>
              template block text
            </MdModelsTable::Components::Check>
          
      */
      {
        "id": "gIJ6LUD5",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"md-models-table/components/check\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), '');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/components/row-body/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | md-models-table/components/row-body', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(1);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('myAction', function () {
        assert.ok(true, 'call collapseRow');
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{md-models-table/components/row-body collapseRow=myAction}}
      */
      {
        "id": "ctpduY6+",
        "block": "[[[1,[28,[35,0],null,[[\"collapseRow\"],[[33,1]]]]]],[],false,[\"md-models-table/components/row-body\",\"myAction\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-models-table/components/row-buttons/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | md-models-table/components/row-buttons', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(6);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('myAction', function (col, index, record) {
        assert.equal(record.title, 'foo', 'called passed action');
        this.expandRow(index, record);
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{md-models-table/components/row-buttons}}
      */
      {
        "id": "+6McqsG4",
        "block": "[[[1,[34,0]]],[],false,[\"md-models-table/components/row-buttons\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      this.set('data', [{
        title: 'foo',
        type: 'bar'
      }, {
        title: 'biz',
        type: 'baz'
      }]);
      this.set('columns', [{
        propertyName: 'title',
        title: 'Title'
      }, {
        propertyName: 'type',
        title: 'Type'
      }, {
        component: 'components/md-models-table/components/row-buttons',
        disableFiltering: true,
        disableSorting: true,
        mayBeHidden: false,
        className: 'text-center',
        buttons: [{
          title: 'foo',
          type: 'info',
          icon: 'house',
          action: this.myAction
        }, {
          title: 'biz',
          type: 'danger',
          icon: 'times',
          confirm: true,
          action: this.myAction
        }]
      }]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{md-models-table data=data columns=columns expandedRowComponent=(component "md-models-table/components/row-body" spotlighted=true)}}
      */
      {
        "id": "rJgXWMJ7",
        "block": "[[[1,[28,[35,0],null,[[\"data\",\"columns\",\"expandedRowComponent\"],[[33,1],[33,2],[50,\"md-models-table/components/row-body\",0,null,[[\"spotlighted\"],[true]]]]]]]],[],false,[\"md-models-table\",\"data\",\"columns\",\"component\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.findAll)('.md-row-buttons .btn').length, 4);
      assert.equal((0, _testHelpers.findAll)('.md-row-buttons .btn-danger').length, 2);
      assert.dom('.md-button-confirm').hasText('biz');
      assert.dom('.md-button-confirm.btn-danger .fa').hasClass('fa-times');
      await (0, _testHelpers.click)('.md-button-confirm');
      assert.dom('.md-button-confirm').hasText('Confirm');
      await (0, _testHelpers.click)('.btn-info');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-title/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | md title', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{md-title}}
      */
      {
        "id": "rOdq0uvJ",
        "block": "[[[1,[34,0]]],[],false,[\"md-title\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <MdTitle>
              template block text
            </MdTitle>
          
      */
      {
        "id": "1AEzxwdO",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"md-title\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/md-translate/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-record", "@ember/service"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createRecord, _service) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-record",0,"@ember/service",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  const MockApiValidator = _service.default.extend({
    isApiConfigured() {
      return true;
    }
  });
  (0, _qunit.module)('Integration | Component | md translate', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.owner.register('service:api-validator', MockApiValidator);
    });
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createRecord.createRecord)(1)[0];
      this.isLoading = false;
      this.messages = null;
      this.result = null;
      this.writer = {
        type: 'json'
      };
      window.saveAs = function (blob, title) {
        assert.ok(title, 'save title');
        assert.equal(blob.constructor.name, 'Blob', 'save blob');
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{md-translate
            model=model
            isLoading=isLoading
            messages=messages
            result=result
            errorLevel=2
            writeObj=writer
          }}
      */
      {
        "id": "Ud+X9zzJ",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"isLoading\",\"messages\",\"result\",\"errorLevel\",\"writeObj\"],[[33,1],[33,2],[33,3],[33,4],2,[33,5]]]]]],[],false,[\"md-translate\",\"model\",\"isLoading\",\"messages\",\"result\",\"writer\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Options|Choose|Format|Select|one|option|Force|Valid|Ouput?|No|Yes|Show|Empty|Tags?|No|Yes|Translate|');
      this.set('isLoading', true);
      assert.ok((0, _testHelpers.find)('.md-spinner'), 'loading');
      this.set('messages', [["WARNING", " FGDC writer", " citation originator role is missing", " CONTEXT is lineage method"], ["WARNING", " FGDC writer", " citation publication date is missing", " CONTEXT is lineage method"]]);
      assert.equal((0, _testHelpers.find)('.md-translator-error').textContent.replace(/[\s\n]+/g, '|').trim(), '|Translation|Warning|Warning|ocurred|during|translation.|WARNING|citation|originator|role|is|missing|FGDC|writer|context|is|lineage|method|WARNING|citation|publication|date|is|missing|FGDC|writer|context|is|lineage|method|', 'messages');
      this.set('result', '{"foo":"bar"}');
      assert.equal((0, _testHelpers.find)('.md-translator-preview.warning').textContent.replace(/[\s\n]+/g, '|').trim(), '|Result|Preview|JSON|Format|Save|Result|', 'result');
      assert.equal((0, _testHelpers.find)('.md-translator-preview.warning textarea').value, '{"foo":"bar"}', 'textarea value set');
      (0, _testHelpers.click)('.md-translator-preview.warning .btn-success');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <MdTranslate>
              template block text
            </MdTranslate>
          
      */
      {
        "id": "N2DeMxKo",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"md-translate\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Options|Choose|Format|Select|one|option|Force|Valid|Ouput?|No|Yes|Show|Empty|Tags?|No|Yes|Translate|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/models-table/cell-content-display/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "@ember/object"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _object) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/object",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | models-table/cell-content-display', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('column', {
        propertyName: 'title'
      });
      this.set('data', _object.default.create({
        title: 'foo biz baz',
        uri: 'bar'
      }));
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{models-table/cell-content-display column=column record=data}}
      */
      {
        "id": "P5cx+e4J",
        "block": "[[[1,[28,[35,0],null,[[\"column\",\"record\"],[[33,1],[33,2]]]]]],[],false,[\"models-table/cell-content-display\",\"column\",\"data\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'foo biz baz');
      this.set('column1', {
        propertyName: 'title',
        truncate: true,
        wordLimit: 2
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{models-table/cell-content-display column=column1 record=data}}
      */
      {
        "id": "bdxbOH51",
        "block": "[[[1,[28,[35,0],null,[[\"column\",\"record\"],[[33,1],[33,2]]]]]],[],false,[\"models-table/cell-content-display\",\"column1\",\"data\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'foo biz ...');
    });
  });
});
define("mdeditor/tests/integration/pods/components/models-table/row-expand/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | models-table/row-expand', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{models-table/row-expand}}
      */
      {
        "id": "a0Pxa9B1",
        "block": "[[[1,[34,0]]],[],false,[\"models-table/row-expand\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <ModelsTable::RowExpand>
              template block text
            </ModelsTable::RowExpand>
          
      */
      {
        "id": "EgMMa+6f",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"models-table/row-expand\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/models-table/table-body/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | models-table/table-body', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{models-table/table-body}}
      */
      {
        "id": "NpLJWDUT",
        "block": "[[[1,[34,0]]],[],false,[\"models-table/table-body\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <ModelsTable::TableBody>
              template block text
            </ModelsTable::TableBody>
          
      */
      {
        "id": "V2p6RZqy",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"models-table/table-body\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-address/md-address-block/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md address/md address block', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('address', {
        "addressType": ["mailing", "physical"],
        "description": "description",
        "deliveryPoint": ["deliveryPoint0", "deliveryPoint1"],
        "city": "city",
        "administrativeArea": "administrativeArea",
        "postalCode": "postalCode",
        "country": "country"
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-address/md-address-block item=address}}
      */
      {
        "id": "vB02o6wJ",
        "block": "[[[1,[28,[35,0],null,[[\"item\"],[[33,1]]]]]],[],false,[\"object/md-address/md-address-block\",\"address\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('address').textContent.replace(/[ \n]+/g, '|').trim(), '|deliveryPoint0|deliveryPoint1|city,|administrativeArea|postalCode|country|mailing,|physical|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdAddress::MdAddressBlock @item={{address}}>
              template block text
            </Object::MdAddress::MdAddressBlock>
          
      */
      {
        "id": "1FzCqtd6",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@item\"],[[99,1,[\"@item\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-address/md-address-block\",\"address\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('address').textContent.replace(/[ \n]+/g, '|').trim(), '|deliveryPoint0|deliveryPoint1|city,|administrativeArea|postalCode|country|mailing,|physical|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-allocation/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md allocation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('allocation', {
        'amount': 9.9,
        'currency': 'currency',
        'sourceId': 'source',
        'recipientId': 'recipient',
        'matching': true,
        'comment': 'comment',
        sourceAllocationId: 'sourceAllocationId'
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-allocation profilePath="test" model=allocation}}
      */
      {
        "id": "fD11YamN",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"test\",[33,1]]]]]],[],false,[\"object/md-allocation\",\"allocation\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Amount|Amount|Currency|Choose|unit|of|currency|Award|ID|Source|Pick|contact|that|supplied|funds|Recipient|Pick|contact|that|received|funds|No|Other|Contacts|found.|Add|Other|Contact|Matching|Matching|funds|or|in-kind|services|Comment|Comment|No|Online|Resource|found.|Add|Online|Resource|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdAllocation @profilePath="test" @model={{allocation}} @class="testme">
              template block text
            </Object::MdAllocation>
          
      */
      {
        "id": "6+mOLYsM",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\",\"@class\"],[\"test\",[99,1,[\"@model\"]],\"testme\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-allocation\",\"allocation\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Amount|Amount|Currency|Choose|unit|of|currency|Award|ID|Source|Pick|contact|that|supplied|funds|Recipient|Pick|contact|that|received|funds|No|Other|Contacts|found.|Add|Other|Contact|Matching|Matching|funds|or|in-kind|services|Comment|Comment|No|Online|Resource|found.|Add|Online|Resource|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-array-table/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md array table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('data', [{
        biz: 'biz1',
        baz: 'baz1'
      }, {
        biz: 'biz2',
        baz: 'baz2'
      }]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdArrayTable @columns="biz,baz" @value={{data}} @title="FooBar" @data-spy="FooBar" as |f|>
              <td>
                {{f.item.biz}}
              </td>
              <td>
                {{f.item.baz}}
              </td>
            </Object::MdArrayTable>
            
      */
      {
        "id": "IHbnv09v",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@columns\",\"@value\",\"@title\",\"@data-spy\"],[\"biz,baz\",[99,1,[\"@value\"]],\"FooBar\",\"FooBar\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,\"td\"],[12],[1,\"\\n          \"],[1,[30,1,[\"item\",\"biz\"]]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"td\"],[12],[1,\"\\n          \"],[1,[30,1,[\"item\",\"baz\"]]],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[1]]]]],[1,\"\\n      \"]],[\"f\"],false,[\"object/md-array-table\",\"data\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|FooBars|2|Add|#|Biz|Baz|0|biz1|baz1|Delete|1|biz2|baz2|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdArrayTable @columns="biz,baz" @value={{data}} @title="FooBar">
              template block text
            </Object::MdArrayTable>
          
      */
      {
        "id": "ZISBoP6G",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@columns\",\"@value\",\"@title\"],[\"biz,baz\",[99,1,[\"@value\"]],\"FooBar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-array-table\",\"data\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|FooBars|2|Add|#|Biz|Baz|0|template|block|text|Delete|1|template|block|text|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-associated/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md associated', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "associationType": "product",
        "resourceCitation": {
          "title": "Pacific Connectivity Website",
          "date": [{
            "date": "2015-09-30T04:00:00.000Z",
            "dateType": "publication"
          }],
          "identifier": [{
            "authority": {
              "date": [{
                "date": "2018-01-30T19:09:24.029Z",
                "dateType": "published",
                "description": "Published using mdEditor"
              }],
              "title": "ScienceBase"
            },
            "identifier": "5a70c2dee4b0a9a2e9dafbe7",
            "namespace": "gov.sciencebase.catalog",
            "description": "Identifier imported from ScienceBase during publication"
          }]
        },
        "metadataCitation": {
          "title": "Metadata for Pacific Connectivity Website",
          "responsibleParty": [{
            "party": [{
              "contactId": "05413626-e57e-4121-9f15-39f5df4575fe"
            }],
            "role": "author"
          }],
          "identifier": [{
            "identifier": "f4abb4e0-a3d6-450f-adca-6d07eac19b0b",
            "namespace": "urn:uuid"
          }]
        },
        "resourceType": [{
          "type": "website"
        }, {
          "type": "product"
        }]
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-associated profilePath="foobar" model=model}}
      */
      {
        "id": "3yKWmws4",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-associated\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Association|Type|product|?|×|Initiative|Type|Choose|Type|of|Initiative|Resource|Types|2|Add|#|Type|Name|0|website|?|×|Delete|1|product|?|×|Delete|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|Dates|1|Add|Date|#|Precision|Date|Date|Type|Description|0|Day|publication|?|×|Delete|Edition|Presentation|Form|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Identifier|imported|from|ScienceBase|during|publication|More...|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Identifier|imported|from|ScienceBase|during|publication|Edit|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Identifier|imported|from|ScienceBase|during|publication|Edit|Delete|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|Metadata|Citation|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|Responsible|Parties|1|Add|#|Role|Contacts|0|author|?|×|Delete|No|Online|Resource|found.|Add|Online|Resource|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Not|Defined|More...|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Not|Defined|Edit|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Not|Defined|Edit|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdAssociated @profilePath="foobar" @model={{model}}>
              template block text
            </Object::MdAssociated>
          
      */
      {
        "id": "A5tOILOx",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\"],[\"foobar\",[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-associated\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Association|Type|product|?|×|Initiative|Type|Choose|Type|of|Initiative|Resource|Types|2|Add|#|Type|Name|0|website|?|×|Delete|1|product|?|×|Delete|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|Dates|1|Add|Date|#|Precision|Date|Date|Type|Description|0|Day|publication|?|×|Delete|Edition|Presentation|Form|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Identifier|imported|from|ScienceBase|during|publication|More...|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Identifier|imported|from|ScienceBase|during|publication|Edit|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|5a70c2dee4b0a9a2e9dafbe7|gov.sciencebase.catalog|Identifier|imported|from|ScienceBase|during|publication|Edit|Delete|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|Metadata|Citation|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|Responsible|Parties|1|Add|#|Role|Contacts|0|author|?|×|Delete|No|Online|Resource|found.|Add|Online|Resource|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Not|Defined|More...|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Not|Defined|Edit|Delete|Identifier|1|Add|OK|#|Identifier|Namespace|Description|0|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|urn:uuid|Not|Defined|Edit|Delete|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-associated/preview/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md associated/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "associationType": "product",
        "resourceCitation": {
          "title": "Pacific Connectivity Website",
          "date": [{
            "date": "2015-09-30T12:00:00.000Z",
            "dateType": "publication"
          }],
          "identifier": [{
            "authority": {
              "date": [{
                "date": "2018-01-30T12:00:00.000Z",
                "dateType": "published",
                "description": "Published using mdEditor"
              }],
              "title": "ScienceBase"
            },
            "identifier": "5a70c2dee4b0a9a2e9dafbe7",
            "namespace": "gov.sciencebase.catalog",
            "description": "Identifier imported from ScienceBase during publication"
          }]
        },
        "metadataCitation": {
          "title": "Metadata for Pacific Connectivity Website",
          "responsibleParty": [{
            "party": [{
              "contactId": "05413626-e57e-4121-9f15-39f5df4575fe"
            }],
            "role": "author"
          }],
          "identifier": [{
            "identifier": "f4abb4e0-a3d6-450f-adca-6d07eac19b0b",
            "namespace": "urn:uuid"
          }]
        },
        "resourceType": [{
          "type": "website"
        }, {
          "type": "product"
        }]
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-associated/preview item=model class="testme"}}
      */
      {
        "id": "smUOuUk3",
        "block": "[[[1,[28,[35,0],null,[[\"item\",\"class\"],[[33,1],\"testme\"]]]]],[],false,[\"object/md-associated/preview\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Resource|#|Association|Type|product|Initiative|Type|Not|Defined|Title|Pacific|Connectivity|Website|Alternate|Titles|No|alternate|titles|assigned.|Dates|2015-09-30|(publication)|Identifier|5a70c2dee4b0a9a2e9dafbe7|(gov.sciencebase.catalog)|Responsible|Party|No|responsibility|assigned.|Metadata|Identifier|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|(urn:uuid)|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdAssociated::Preview @item={{model}} @class="testme">
              template block text
            </Object::MdAssociated::Preview>
          
      */
      {
        "id": "yRnoPhLh",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@item\",\"@class\"],[[99,1,[\"@item\"]],\"testme\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-associated/preview\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|Resource|#|Association|Type|product|Initiative|Type|Not|Defined|Title|Pacific|Connectivity|Website|Alternate|Titles|No|alternate|titles|assigned.|Dates|2015-09-30|(publication)|Identifier|5a70c2dee4b0a9a2e9dafbe7|(gov.sciencebase.catalog)|Responsible|Party|No|responsibility|assigned.|Metadata|Identifier|f4abb4e0-a3d6-450f-adca-6d07eac19b0b|(urn:uuid)|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-attribute/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createDictionary) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-dictionary",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md attribute', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', (0, _createDictionary.createAttribute)(1)[0]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-attribute model=model profilePath="foobar"}}
      */
      {
        "id": "/k6Wib4X",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-attribute\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Attribute|Information|Code|Name|Definition|Definition|Data|Type|dataType0|×|Allow|Null?|Allow|null|values|Common|Name|Domain|Select|or|enter|the|domain|for|this|attribute.|Aliases|1|Add|Alias|0|Delete|Units|Units|Resolution|Case|Sensitive?|Is|the|attribute|content|case|sensitive?|Field|Width|Missing|Value|Minimum|Value|Maximum|Value|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#object/md-attribute model=model profilePath="foobar"}}
              template block text
            {{/object/md-attribute}}
          
      */
      {
        "id": "XR9t5uLO",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"object/md-attribute\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Attribute|Information|Code|Name|Definition|Definition|Data|Type|dataType0|×|Allow|Null?|Allow|null|values|Common|Name|Domain|Select|or|enter|the|domain|for|this|attribute.|Aliases|1|Add|Alias|0|Delete|Units|Units|Resolution|Case|Sensitive?|Is|the|attribute|content|case|sensitive?|Field|Width|Missing|Value|Minimum|Value|Maximum|Value|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-attribute/preview/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createDictionary) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-dictionary",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md attribute/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', (0, _createDictionary.createAttribute)(1)[0]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <div class="testme">{{object/md-attribute/preview model=model profilePath="foobar"}}</div>
      */
      {
        "id": "V3sFuPja",
        "block": "[[[10,0],[14,0,\"testme\"],[12],[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]],[13]],[],false,[\"object/md-attribute/preview\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[ \n]+/g, '|').trim(), '|dataType0|×|');
      assert.equal((0, _testHelpers.findAll)('.testme input').length, 3, 'render inputs');
      assert.ok((0, _testHelpers.find)('.testme .md-select'), 'render select');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-bbox/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md bbox', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "westLongitude": -87.52179241764053,
        "eastLongitude": -85.30119385960293,
        "southLatitude": 29.640690610830635,
        "northLatitude": 30.42485959910817
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-bbox profilePath="foobar" model=model}}
      */
      {
        "id": "1eCS0RTZ",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-bbox\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.form').textContent.replace(/[ \n]+/g, '|').trim(), '|North|East|South|West|Minimum|Altitude|Maximum|Altitude|Units|of|Altitude|');
      var inputs = (0, _testHelpers.findAll)('input');
      assert.equal(inputs[0].value, this.model.northLatitude, 'north');
      assert.equal(inputs[1].value, this.model.eastLongitude, 'east');
      assert.equal(inputs[2].value, this.model.southLatitude, 'south');
      assert.equal(inputs[3].value, this.model.westLongitude, 'west');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdBbox @profilePath="foobar" @model={{model}}>
              template block text
            </Object::MdBbox>
          
      */
      {
        "id": "ZnnYO9W8",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\"],[\"foobar\",[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-bbox\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.form').textContent.replace(/[ \n]+/g, '|').trim(), '|North|East|South|West|Minimum|Altitude|Maximum|Altitude|Units|of|Altitude|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-citation-array/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-citation",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md citation array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(3));
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-citation-array}}
      */
      {
        "id": "7+IoKked",
        "block": "[[[1,[34,0]]],[],false,[\"object/md-citation-array\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(), '|No|Citation|found.|Add|Citation|');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-citation-array model=citation}}
      */
      {
        "id": "ugwFb5U/",
        "block": "[[[1,[28,[35,0],null,[[\"model\"],[[33,1]]]]]],[],false,[\"object/md-citation-array\",\"citation\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(), '|Citation|3|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|2|title2|More...|Delete|', 'renders rows');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdCitationArray>
              template block text
            </Object::MdCitationArray>
          
      */
      {
        "id": "duefRdpe",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-citation-array\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[ \n]+/g, '|').trim(), '|No|Citation|found.|Add|Citation|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-citation/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-citation",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md citation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(1)[0]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-citation profilePath="foobar" model=citation}}
      */
      {
        "id": "ZcsRRMVr",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-citation\",\"citation\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.fillIn)('input[id$="-input"]', 'Updated Alternate Title');
      assert.strictEqual(this.citation.title, 'Updated Alternate Title', 'title updates the source citation model');
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Basic|Information|Title|Alternate|Titles|2|Add|Alternate|Title|0|Delete|1|Delete|Dates|2|Add|Date|#|Precision|Date|Date|Type|Description|0|Day|dateType|×|Delete|1|Day|dateType|×|Delete|Edition|Presentation|Form|×|presentationForm0|×|presentationForm1|Responsible|Parties|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Online|Resource|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://mdeditor.org|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|More...|Delete|1|identifier-0|Not|Defined|Not|Defined|More...|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Not|Defined|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Not|Defined|Edit|Delete|Series|Name|Issue|Page|Other|Details|2|Add|0|Delete|1|Delete|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName:|Edit|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdCitation @profilePath="foobar">
              template block text
            </Object::MdCitation>
          
      */
      {
        "id": "5CaTOxHS",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\"],[\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-citation\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|Dates|Add|Date|#|Precision|Date|Date|Type|Description|Add|Date|Edition|Presentation|Form|Responsible|Parties|Add|#|Role|Contacts|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-citation/preview/body/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-citation",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md citation/preview/body', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(1)[0]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-citation/preview/body citation=citation}}
      */
      {
        "id": "Cm5w5tAD",
        "block": "[[[1,[28,[35,0],null,[[\"citation\"],[[33,1]]]]]],[],false,[\"object/md-citation/preview/body\",\"citation\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.row').textContent.replace(/[ \n]+/g, '|').trim(), '|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|2016-10-13|(dateType)|2016-10-22|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|individualId0|)|role|(|individualId0|)|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdCitation::Preview::Body>
              template block text
            </Object::MdCitation::Preview::Body>
          
      */
      {
        "id": "JdKavM8O",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-citation/preview/body\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.row').textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-citation/preview/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-citation",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md citation/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(3);

      // Set any properties with this.set('myProperty', 'value');
      this.set('citation', (0, _createCitation.default)(1)[0]);
      this.set('editCitation', function (v) {
        assert.ok(v, 'Called external action');
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-citation/preview editCitation=editCitation citation=citation}}
      */
      {
        "id": "OzpCKHzN",
        "block": "[[[1,[28,[35,0],null,[[\"editCitation\",\"citation\"],[[33,1],[33,2]]]]]],[],false,[\"object/md-citation/preview\",\"editCitation\",\"citation\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Citation|Edit|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|2016-10-13|(dateType)|2016-10-22|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|individualId0|)|role|(|individualId0|)|Edit|Citation|');
      await (0, _testHelpers.click)('.btn-success');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdCitation::Preview @editCitation={{editCitation}}>
              template block text
            </Object::MdCitation::Preview>
          
      */
      {
        "id": "3f85by12",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@editCitation\"],[[99,1,[\"@editCitation\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-citation/preview\",\"editCitation\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-card').textContent.replace(/[ \n]+/g, '|').trim(), '|Citation|Edit|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|template|block|text|Edit|Citation|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-constraint/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md constraint', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {});
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-constraint profilePath="foobar" model=model}}
      */
      {
        "id": "pnPGhCkb",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-constraint\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Constraint|Type|The|type|of|constraint.|No|Use|Limitations|found.|Add|Use|Limitation|Legal|Access|Constraints|Use|Constraints|No|Other|Constraint|found.|Add|Other|Constraint|Security|Classification|Name|of|the|handling|restrictions|on|the|resource|or|metadata.|Classification|System|Name|Note|Note|Handling|Description|Handling|Description|Releasability|Addressees|Add|#|Role|Contacts|Add|Addressee|Statement|No|Dissemintation|Constraint|found.|Add|Dissemintation|Constraint|Responsible|Parties|Add|#|Role|Contacts|Add|Responsible|Party|No|Graphic|or|Logo|found.|Add|Graphic|or|Logo|No|References|found.|Add|Reference|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdConstraint @profilePath="foobar" @model={{model}}>
              template block text
            </Object::MdConstraint>
          
      */
      {
        "id": "tKylLT+w",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\"],[\"foobar\",[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-constraint\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[ \n]+/g, '|').trim(), '|Constraint|Type|The|type|of|constraint.|No|Use|Limitations|found.|Add|Use|Limitation|Legal|Access|Constraints|Use|Constraints|No|Other|Constraint|found.|Add|Other|Constraint|Security|Classification|Name|of|the|handling|restrictions|on|the|resource|or|metadata.|Classification|System|Name|Note|Note|Handling|Description|Handling|Description|Releasability|No|Addressee|found.|Add|Addressee|Statement|No|Dissemintation|Constraint|found.|Add|Dissemintation|Constraint|No|Responsible|Party|found.|Add|Responsible|Party|No|Graphic|or|Logo|found.|Add|Graphic|or|Logo|No|References|found.|Add|Reference|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-dataquality/preview/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md dataquality/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('dq', {
        'scope': {
          'scopeCode': 'dataset'
        },
        'systemIdentifier': {
          'label': 'My Quality System'
        }
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <section>{{object/md-dataquality/preview item=dq index=0}}</section>
      */
      {
        "id": "nak4t7Xd",
        "block": "[[[10,\"section\"],[12],[1,[28,[35,0],null,[[\"item\",\"index\"],[[33,1],0]]]],[13]],[],false,[\"object/md-dataquality/preview\",\"dq\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.ok((0, _testHelpers.find)('section'), 'component renders');
      assert.dom('section .text-info').hasText('Data Quality #0', 'renders index heading');
      assert.ok((0, _testHelpers.find)('section').textContent.indexOf('dataset') > -1, 'renders scope code');
      assert.ok((0, _testHelpers.find)('section').textContent.indexOf('My Quality System') > -1, 'renders system identifier label');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <section>
            <Object::MdDataquality::Preview @item={{hash}} @index={{1}}>
              template block text
            </Object::MdDataquality::Preview></section>
          
      */
      {
        "id": "JV8eA78Y",
        "block": "[[[10,\"section\"],[12],[1,\"\\n      \"],[8,[39,0],null,[[\"@item\",\"@index\"],[[99,1,[\"@item\"]],1]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[13],[1,\"\\n    \"]],[],false,[\"object/md-dataquality/preview\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('section .text-info').hasText('Data Quality #1', 'block form renders heading');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-date-array/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md date array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-date-array value=model profilePath="foobar"}}
      */
      {
        "id": "CqFnUlIp",
        "block": "[[[1,[28,[35,0],null,[[\"value\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-date-array\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|Dates|Add|#|Precision|Date|Date|Type|Description|Add|Date|');
      this.set('model', [{
        "date": "2016-10-12",
        "dateType": "dateType",
        description: 'description'
      }]);
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|Dates|1|Add|#|Precision|Date|Date|Type|Description|0|Day|dateType|×|Delete|', 'item');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdDateArray @value={{model}} @profilePath="foobar">
              template block text
            </Object::MdDateArray>
          
      */
      {
        "id": "0K0p192A",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@value\",\"@profilePath\"],[[99,1,[\"@value\"]],\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-date-array\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[ \n]+/g, '|').trim(), '|Dates|1|Add|#|Precision|Date|Date|Type|Description|0|Day|dateType|×|template|block|text|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-date/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md date', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <table><tr>{{object/md-date model=model profilePath="foobar"}}</tr></table>
      */
      {
        "id": "UPCYu/ZX",
        "block": "[[[10,\"table\"],[12],[10,\"tr\"],[12],[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]],[13],[13]],[],false,[\"object/md-date\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), "|Year|Choose|date|type|");
      this.set('model', {
        "date": "2016-10-12",
        "dateType": "dateType",
        description: 'description'
      });
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), "|Year|dateType|×|");

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <table><tr>
            <Object::MdDate @profilePath="foobar">
              template block text
            </Object::MdDate>
          </tr></table>
      */
      {
        "id": "Sc5HKqwQ",
        "block": "[[[10,\"table\"],[12],[10,\"tr\"],[12],[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\"],[\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[13]],[],false,[\"object/md-date\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), "|Year|Choose|date|type|template|block|text|");
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-distribution/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md distribution', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        "description": "description",
        "liabilityStatement": "liabilityStatement",
        "distributor": [{
          "contact": {
            "role": "role",
            "roleExtent": [{
              "temporalExtent": [{
                "timePeriod": {
                  "startDateTime": "2016-10-24T11:10:15.2-10:00"
                }
              }]
            }],
            "party": [{
              "contactId": "individualId0"
            }]
          }
        }, {
          "contact": {
            "role": "role",
            "party": [{
              "contactId": "individualId0"
            }]
          }
        }]
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-distribution model=model profilePath="foobar"}}
      */
      {
        "id": "tyOo36Db",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-distribution\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Distribution|#|Description|Description|Liability|Statement|Liability|Statement|Distributors|2|Add|OK|#|Contacts|0|role|(|individualId0|)|More...|Delete|1|role|(|individualId0|)|More...|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#object/md-distribution model=model profilePath="foobar"}}
              template block text
            {{/object/md-distribution}}
          
      */
      {
        "id": "DFfruxby",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"object/md-distribution\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Distribution|#|Description|Description|Liability|Statement|Liability|Statement|Distributors|2|Add|OK|#|Contacts|0|role|(|individualId0|)|More...|Delete|1|role|(|individualId0|)|More...|Delete|', 'block and list');
    });
    (0, _qunit.skip)('call actions', async function (assert) {
      assert.expect(1);
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-distributor/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md distributor', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('distributor', {
        "contact": {
          "role": "role",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        },
        "orderProcess": [{
          "fees": "1.00USD"
        }, {
          "fees": "2.00USD"
        }],
        "transferOption": [{
          "transferSize": 9.9
        }, {
          "transferSize": 10.9
        }]
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-distributor model=distributor profilePath="foobar"}}
      */
      {
        "id": "0vUtz+Ou",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-distributor\",\"distributor\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Contacts|Role|role|×|Transfer|Options|2|Add|OK|#|Size(mb)|Online?|Offline?|Format?|0|9.9|no|no|no|More...|Delete|1|10.9|no|no|no|More...|Delete|Order|Process|Fees|Fees|Planned|Availability|Ordering|Instructions|Ordering|Instructions|Turnaround|Turnaround|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#object/md-distributor model=distributor profilePath="foobar"}}
              template block text
            {{/object/md-distributor}}
          
      */
      {
        "id": "Q6IF1lBq",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"object/md-distributor\",\"distributor\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Contacts|Role|role|×|Transfer|Options|2|Add|OK|#|Size(mb)|Online?|Offline?|Format?|0|9.9|no|no|no|More...|Delete|1|10.9|no|no|no|More...|Delete|Order|Process|Fees|Fees|Planned|Availability|Ordering|Instructions|Ordering|Instructions|Turnaround|Turnaround|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-distributor/preview/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-contact",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md distributor/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      var store = this.owner.lookup('service:store');
      this.set('contacts', this.owner.lookup('service:contacts'));
      store.createRecord('contact', (0, _createContact.default)(1)[0]);

      // Set any properties with this.set('myProperty', 'value');
      this.set('distributor', {
        "contact": {
          "role": "role",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": 0
          }]
        },
        "orderProcess": [{
          "fees": "1.00USD"
        }, {
          "fees": "2.00USD"
        }],
        "transferOption": [{
          "transferSize": 9.9
        }, {
          "transferSize": 10.9
        }]
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-distributor/preview item=distributor}}
      */
      {
        "id": "OIGU3wOH",
        "block": "[[[1,[28,[35,0],null,[[\"item\"],[[33,1]]]]]],[],false,[\"object/md-distributor/preview\",\"distributor\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|role|(|Contact0|)|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#object/md-distributor/preview class="testme" item=distributor}}
              template block text
            {{/object/md-distributor/preview}}
          
      */
      {
        "id": "U8BApLHR",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"class\",\"item\"],[\"testme\",[33,1]]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"object/md-distributor/preview\",\"distributor\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[\s\n]+/g, '|').trim(), '|role|(|Contact0|)|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-documentation/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-citation",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md documentation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('doc', {
        resourceType: [{
          "type": "foo",
          "name": "bar"
        }],
        citation: (0, _createCitation.default)(2)
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-documentation profilePath="foobar" model=doc}}
      */
      {
        "id": "V8kmLhIm",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-documentation\",\"doc\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|1|Add|#|Type|Name|0|foo|×|Delete|Basic|Information|Title|Alternate|Titles|2|Add|Alternate|Title|0|Delete|1|Delete|Dates|2|Add|Date|#|Precision|Date|Date|Type|Description|0|Day|dateType|×|Delete|1|Day|dateType|×|Delete|Edition|Presentation|Form|×|presentationForm0|×|presentationForm1|Responsible|Parties|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Online|Resource|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://mdeditor.org|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|More...|Delete|1|identifier-0|Not|Defined|Not|Defined|More...|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Not|Defined|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Not|Defined|Edit|Delete|Series|Name|Issue|Page|Other|Details|2|Add|0|Delete|1|Delete|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName:|Edit|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdDocumentation @profilePath="foobar" @model={{doc}}>
              template block text
            </Object::MdDocumentation>
          
      */
      {
        "id": "n6dyVZCf",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\"],[\"foobar\",[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-documentation\",\"doc\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|1|Add|#|Type|Name|0|foo|×|Delete|Basic|Information|Title|Alternate|Titles|2|Add|Alternate|Title|0|Delete|1|Delete|Dates|2|Add|Date|#|Precision|Date|Date|Type|Description|0|Day|dateType|×|Delete|1|Day|dateType|×|Delete|Edition|Presentation|Form|×|presentationForm0|×|presentationForm1|Responsible|Parties|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Online|Resource|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://mdeditor.org|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|More...|Delete|1|identifier-0|Not|Defined|Not|Defined|More...|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Not|Defined|Edit|Delete|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|Not|Defined|Not|Defined|Edit|Delete|1|identifier-0|Not|Defined|Not|Defined|Edit|Delete|Series|Name|Issue|Page|Other|Details|2|Add|0|Delete|1|Delete|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName:|Edit|Delete|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-documentation/preview/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-citation",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md documentation/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('doc', {
        resourceType: [{
          "type": "foo",
          "name": "bar"
        }],
        citation: (0, _createCitation.default)(2)
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-documentation/preview item=doc}}
      */
      {
        "id": "Vx0BE+3C",
        "block": "[[[1,[28,[35,0],null,[[\"item\"],[[33,1]]]]]],[],false,[\"object/md-documentation/preview\",\"doc\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.text-muted').textContent.replace(/[\s\n]+/g, '|').trim(), '|Document|#|Resource|Type(s)|foo:|bar|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|2016-10-13|(dateType)|2016-10-22|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|individualId0|)|role|(|individualId0|)|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdDocumentation::Preview @class="testme" @item={{doc}}>
              template block text
            </Object::MdDocumentation::Preview>
          
      */
      {
        "id": "DXIIyeT5",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@class\",\"@item\"],[\"testme\",[99,1,[\"@item\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-documentation/preview\",\"doc\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.testme').textContent.replace(/[\s\n]+/g, '|').trim(), '|Document|#|Resource|Type(s)|foo:|bar|Title|title0|Alternate|Titles|alternateTitle0|alternateTitle1|Dates|2016-10-13|(dateType)|2016-10-22|(dateType)|Identifier|identifier0|identifier-0|Responsible|Party|role|(|individualId0|)|role|(|individualId0|)|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-domain/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createDictionary) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-dictionary",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md domain', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('domain', (0, _createDictionary.createDomain)(1)[0]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-domain profilePath="foobar" model=domain}}
      */
      {
        "id": "9QBcgNHc",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-domain\",\"domain\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Domain|Information|Domain|Identifier|Code|Name|Common|Name|Description|Description|Domain|Items|1|Add|OK|#|Domain|Item|Name|Value|Definition|0|More...|Delete|Domain|Reference|Edit|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|Edit|Citation|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdDomain @profilePath="foobar" @model={{domain}}>
              template block text
            </Object::MdDomain>
          
      */
      {
        "id": "JWWbNXxm",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\"],[\"foobar\",[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-domain\",\"domain\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Domain|Information|Domain|Identifier|Code|Name|Common|Name|Description|Description|Domain|Items|1|Add|OK|#|Domain|Item|Name|Value|Definition|0|More...|Delete|Domain|Reference|Edit|Title|Not|Defined|Alternate|Titles|No|alternate|titles|assigned.|Dates|No|dates|assigned.|Identifier|No|identifiers|assigned.|Responsible|Party|No|responsibility|assigned.|Edit|Citation|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-domainitem/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md domainitem', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('item', {
        "name": "name0",
        "value": "value0",
        "definition": "definition0",
        "reference": {
          "title": "domainReference"
        }
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-domainitem profilePath="foobar" model=item}}
      */
      {
        "id": "qWtpBNF6",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-domainitem\",\"item\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Name|Value|Definition|Definition|Item|Reference|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#object/md-domainitem profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-domainitem}}
          
      */
      {
        "id": "x7LlKIvC",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[28,[37,1],null,null]]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"object/md-domainitem\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Name|Value|Definition|Definition|Item|Reference|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-domainitem/preview/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md domainitem/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('item', {
        "name": "name0",
        "value": "value0",
        "definition": "definition0",
        "reference": {
          "title": "domainReference"
        }
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-domainitem/preview profilePath="foobar" model=item tagName="table"}}
      */
      {
        "id": "6DH1MTp0",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\",\"tagName\"],[\"foobar\",[33,1],\"table\"]]]]],[],false,[\"object/md-domainitem/preview\",\"item\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.findAll)('input').length, 3);
      assert.equal((0, _testHelpers.findAll)('input')[0].value, 'name0', 'name');
      assert.equal((0, _testHelpers.findAll)('input')[1].value, 'value0', 'value');
      assert.equal((0, _testHelpers.findAll)('input')[2].value, 'definition0', 'definition');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdDomainitem::Preview @profilePath="foobar" @model={{item}} @tagName="table">
              template block text
            </Object::MdDomainitem::Preview>
          
      */
      {
        "id": "YG4UKfAz",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\",\"@tagName\"],[\"foobar\",[99,1,[\"@model\"]],\"table\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-domainitem/preview\",\"item\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[\s\n]+/g, '|').trim(), '|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-entity/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-dictionary"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createDictionary) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-dictionary",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md entity', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('dictionary', (0, _createDictionary.createDictionary)(1)[0].json.dataDictionary);
      this.set('entity', this.dictionary.entity[0]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-entity dictionary=dictionary profilePath="foobar" model=entity}}
      */
      {
        "id": "rUrBjWNN",
        "block": "[[[1,[28,[35,0],null,[[\"dictionary\",\"profilePath\",\"model\"],[[33,1],\"foobar\",[33,2]]]]]],[],false,[\"object/md-entity\",\"dictionary\",\"entity\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Entity|Information|Entity|Identifier|Code|Name|Definition|Definition|Common|Name|Aliases|2|Add|Alias|0|Delete|1|Delete|Attributes|3|Add|OK|#|Attribute|Name|Data|Type|Definition|Allow|Null?|0|dataType0|×|More...|Delete|1|dataType1|×|More...|Delete|2|dataType2|×|More...|Delete|Entity|Structure|Field|Separator|Character|#|Header|Lines|Quote|Character|Entity|Keys|Primary|Key|Attributes|×|primaryKeyAttributeCodeName0-0|×|primaryKeyAttributeCodeName1-0|Foreign|Keys|1|Add|Foreign|Key|#|Local|Attributes|Referenced|Entity|Referenced|Attributes|0|×|attributeCommonName0-0|referencedEntityCodeName00|×|×|referencedAttributeCodeName0-0|Delete|Entity|Indices|1|Add|#|Name|Attributes|Duplicates?|0|×|attributeCodeName0-0|?|Delete|No|Entity|Reference|found.|Add|Entity|Reference|');
      assert.dom('.md-indicator-related').isVisible({
        count: 2
      });

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdEntity @dictionary={{hash}} @profilePath="foobar" @model={{hash}}>
              template block text
            </Object::MdEntity>
          
      */
      {
        "id": "zWmoIpO8",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@dictionary\",\"@profilePath\",\"@model\"],[[99,1,[\"@dictionary\"]],\"foobar\",[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-entity\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Entity|Information|Entity|Identifier|Code|Name|Definition|Definition|Common|Name|No|Alias|found.|Add|Alias|No|Attributes|found.|Add|Attribute|Entity|Structure|Field|Separator|Character|#|Header|Lines|Quote|Character|Entity|Keys|Primary|Key|Attributes|No|Foreign|Key|found.|Add|Foreign|Key|No|Entity|Index|found.|Add|Entity|Index|No|Entity|Reference|found.|Add|Entity|Reference|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-extent/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-extent"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _createExtent) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"mdeditor/tests/helpers/create-extent",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-extent', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(9);
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', (0, _createExtent.default)(1)[0]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-extent profilePath="foobar" extent=model}}
      */
      {
        "id": "F/+hJCqR",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"extent\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-extent\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Extent|Description|Extent|Description|Geographic|Extent|Bounding|Box|North|East|South|West|Minimum|Altitude|Maximum|Altitude|Units|of|Altitude|Calculate|Clear|Description|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|Edit|Features|Clear|Features|+-|Terrain|Features|Bounding|BoxLeaflet|Vertical|Extents|2|Add|OK|#|Description|Min|Value|Max|Value|0|description0|9.9|9.9|Edit|Delete|1|Not|Defined|9.9|9.9|Edit|Delete|Temporal|Extents|2|Add|OK|#|Description|0|Not|Defined|Edit|Delete|1|Not|Defined|Edit|Delete|');
      const inputs = (0, _testHelpers.findAll)('.form-group input, .form-group textarea');
      inputs.filter(i => i.value).forEach(i => assert.dom(i).hasValue());
      this.set('model.geographicExtent.firstObject.geographicElement', []);
      this.set('model.geographicExtent.firstObject.boundingBox', {});

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#object/md-extent profilePath="foobar" extent=model}}
              template block text
            {{/object/md-extent}}
          
      */
      {
        "id": "ARY3lWkF",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"profilePath\",\"extent\"],[\"foobar\",[33,1]]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"object/md-extent\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Extent|Description|Extent|Description|Geographic|Extent|Bounding|Box|North|East|South|West|Minimum|Altitude|Maximum|Altitude|Units|of|Altitude|Calculate|Clear|Description|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|No|Features|to|display.|Add|Features|Vertical|Extents|2|Add|OK|#|Description|Min|Value|Max|Value|0|description0|9.9|9.9|Edit|Delete|1|Not|Defined|9.9|9.9|Edit|Delete|Temporal|Extents|2|Add|OK|#|Description|0|Not|Defined|Edit|Delete|1|Not|Defined|Edit|Delete|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-extent/spatial/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md extent/spatial', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(6);
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.deleteFeatures = function () {
        assert.ok(true, 'call delete');
      };
      this.editFeatures = function (val) {
        assert.equal(val, 9, 'call edit');
      };
      this.extent = {
        "geographicExtent": [{
          // "boundingBox": {
          //   "northLatitude": 34.741612,
          //   "southLatitude": 32.472695,
          //   "eastLongitude": -116.542054,
          //   "westLongitude": -117.729264
          // },
          "geographicElement": [{
            "type": "Feature",
            "id": "3843b29f-bec7-418d-919a-4f794ce749cf",
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[-116.542054, 32.472695], [-117.596742, 34.741612], [-117.596742, 34.741612], [-117.729264, 32.805745], [-117.729264, 32.805745], [-116.542054, 32.472695]]]
            },
            "properties": {
              "name": "New Feature"
            }
          }]
        }]
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-extent/spatial
            extent=extent
            index=9
            deleteFeatures=deleteFeatures
            editFeatures=editFeatures
            profilePath="foobar"
          }}
      */
      {
        "id": "NKPwne/n",
        "block": "[[[1,[28,[35,0],null,[[\"extent\",\"index\",\"deleteFeatures\",\"editFeatures\",\"profilePath\"],[[33,1],9,[33,2],[33,3],\"foobar\"]]]]],[],false,[\"object/md-extent/spatial\",\"extent\",\"deleteFeatures\",\"editFeatures\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Geographic|Extent|Bounding|Box|North|East|South|West|Minimum|Altitude|Maximum|Altitude|Units|of|Altitude|Calculate|Clear|Description|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|Edit|Features|Clear|Features|+-|Terrain|FeaturesLeaflet|');
      await (0, _testHelpers.click)('.btn-primary');
      assert.equal(JSON.stringify(this.extent.geographicExtent[0].boundingBox), JSON.stringify({
        "northLatitude": 34.741612,
        "southLatitude": 32.472695,
        "eastLongitude": -116.542054,
        "westLongitude": -117.729264
      }), 'calculateBox');
      await (0, _testHelpers.doubleClick)('.btn-danger');
      assert.equal(JSON.stringify(this.extent.geographicExtent[0].boundingBox), JSON.stringify({
        "northLatitude": null,
        "southLatitude": null,
        "eastLongitude": null,
        "westLongitude": null,
        "minimumAltitude": null,
        "maximumAltitude": null,
        "unitsOfAltitude": null
      }), 'clearBox');
      await (0, _testHelpers.click)('.btn-toolbar .btn-success');
      await (0, _testHelpers.doubleClick)('.btn-toolbar .btn-danger');
      this.empty = {
        geographicExtent: [{}]
      };
      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#object/md-extent/spatial extent=empty profilePath="foobar"
      }}
              template block text
            {{/object/md-extent/spatial}}
          
      */
      {
        "id": "yOm6jQrB",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"extent\",\"profilePath\"],[[33,1],\"foobar\"]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"object/md-extent/spatial\",\"empty\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Geographic|Extent|Bounding|Box|North|East|South|West|Minimum|Altitude|Maximum|Altitude|Units|of|Altitude|Calculate|Clear|Description|Description|Contains|Data|The|geographic|extent|contains|some|or|all|of|the|data|No|Features|to|display.|Add|Features|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-funding/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md funding', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('funding', {
        "allocation": [{
          "amount": 9.9,
          "currency": "currency",
          "onlineResource": [],
          "responsibleParty": []
        }],
        "timePeriod": {
          "id": "id",
          "description": "description",
          "identifier": {
            "identifier": "identifier",
            "namespace": "namespace"
          },
          "periodName": ["periodName0", "periodName1"],
          // "startDateTime": date,
          "endDateTime": "2016-12-31",
          "timeInterval": {
            "interval": 9,
            "units": "year"
          },
          "duration": {
            "years": 1,
            "months": 1,
            "days": 1,
            "hours": 1,
            "minutes": 1,
            "seconds": 1
          }
        },
        description: 'foo is bar.'
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-funding model=funding profilePath="foobar"}}
      */
      {
        "id": "YTw/oJqc",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-funding\",\"funding\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Allocation|1|Add|OK|#|Amount|Currency|Matching|0|9.9|currency|Not|Defined|Edit|Delete|Time|Period|Dates|Precision|Year|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|Time|Unit|year|×|Duration|Years|Months|Days|Hours|Minutes|Seconds|Description|Description|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#object/md-funding model=(hash) profilePath="foobar"}}
              template block text
            {{/object/md-funding}}
          
      */
      {
        "id": "RW0f7Eq2",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"model\",\"profilePath\"],[[28,[37,1],null,null],\"foobar\"]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"object/md-funding\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Allocation|found.|Add|Allocation|Time|Period|Dates|Precision|Year|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Description|No|Time|Period|Name|found.|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Description|Description|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-funding/preview/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md funding/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('funding', {
        "allocation": [{
          "amount": 9.9,
          "currency": "currency"
        }],
        "timePeriod": {
          "endDateTime": "2016-12-31"
        }
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <section>{{object/md-funding/preview item=funding}}</section>
      */
      {
        "id": "bjC7dTU/",
        "block": "[[[10,\"section\"],[12],[1,[28,[35,0],null,[[\"item\"],[[33,1]]]]],[13]],[],false,[\"object/md-funding/preview\",\"funding\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Start|Date:|Not|defined|End|Date:|12-31-2016|Allocations|Amount|Currency|Source|Recipient|Match?|9.9|currency|--|--|--|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <section>
            <Object::MdFunding::Preview @item={{hash}}>
              template block text
            </Object::MdFunding::Preview></section>
          
      */
      {
        "id": "MRQMm6/N",
        "block": "[[[10,\"section\"],[12],[1,\"\\n      \"],[8,[39,0],null,[[\"@item\"],[[99,1,[\"@item\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[13],[1,\"\\n    \"]],[],false,[\"object/md-funding/preview\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Start|Date:|Not|defined|End|Date:|Not|defined|Allocations|Amount|Currency|Source|Recipient|Match?|No|allocations|found.|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-graphic-array/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md graphic array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('graphic', [{
        "fileName": "fileName",
        "fileDescription": "fileDescription",
        "fileType": "fileType",
        "fileUri": [{
          "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        }]
      }, {
        "fileName": "fileName1",
        "fileDescription": "fileDescription1",
        "fileType": "fileType1",
        "fileUri": [{
          "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        }]
      }]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-graphic-array model=graphic}}
      */
      {
        "id": "YHWDqLXW",
        "block": "[[[1,[28,[35,0],null,[[\"model\"],[[33,1]]]]]],[],false,[\"object/md-graphic-array\",\"graphic\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName1:|Edit|Delete|');
      assert.ok((0, _testHelpers.find)('.md-logo-preview').complete, 'loaded image');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdGraphicArray @model={{graphic}}>
              template block text
            </Object::MdGraphicArray>
          
      */
      {
        "id": "8rMwQxsr",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@model\"],[[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-graphic-array\",\"graphic\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Graphic|2|Add|OK|0|fileName:|Edit|Delete|1|fileName1:|Edit|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-identifier-array/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md identifier array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(5);

      // Set any properties with this.set('myProperty', 'value');
      this.set('id', [{
        "identifier": "identifier",
        "authority": {
          "title": "title"
        }
      }, {
        "identifier": "identifier1",
        "authority": {
          "title": "title1"
        }
      }]);
      this.set('edit', function (id) {
        assert.ok(id, 'called edit');
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-identifier-array model=id editItem=edit}}
      */
      {
        "id": "j2WNsczY",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"editItem\"],[[33,1],[33,2]]]]]],[],false,[\"object/md-identifier-array\",\"id\",\"edit\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier|Not|Defined|Not|Defined|More...|Delete|1|identifier1|Not|Defined|Not|Defined|More...|Delete|');
      await (0, _testHelpers.click)('.btn-info');
      assert.equal(this.id.length, 3, 'add item');
      await (0, _testHelpers.doubleClick)('.btn-danger');
      assert.equal(this.id.length, 2), 'delete item';

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <section>
            <Object::MdIdentifierArray>
              template block text
            </Object::MdIdentifierArray>
            </section>
          
      */
      {
        "id": "AKXwW+lQ",
        "block": "[[[10,\"section\"],[12],[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[],false,[\"object/md-identifier-array\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Identifier|found.|Add|Identifier|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-identifier-object-table/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-identifier"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createIdentifier) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-identifier",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md identifier object table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('id', (0, _createIdentifier.default)(2));
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-identifier-object-table model=id}}
      */
      {
        "id": "o4/UO+Z2",
        "block": "[[[1,[28,[35,0],null,[[\"model\"],[[33,1]]]]]],[],false,[\"object/md-identifier-object-table\",\"id\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|Identifier|2|Add|OK|#|Identifier|Namespace|Description|0|identifier0|namespace0|description0|Edit|Delete|1|identifier1|namespace1|description1|Edit|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdIdentifierObjectTable>
              template block text
            </Object::MdIdentifierObjectTable>
          
      */
      {
        "id": "xLRC/Dni",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-identifier-object-table\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.md-object-table').textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Identifier|found.|Add|Identifier|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-identifier/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-identifier"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createIdentifier) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-identifier",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md identifier', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('id', (0, _createIdentifier.default)(1)[0]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-identifier model=id profilePath="foobar"}}
      */
      {
        "id": "OGnzQJZo",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-identifier\",\"id\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      let text = (0, _testHelpers.find)('.md-identifier').textContent.replace(/[\s\n]+/g, '|').trim();
      assert.true(text.includes('|Identifier|Namespace|namespace0|'));
      assert.true(text.includes('|Authority|Basic|Information|Title|'));
      assert.true(text.includes('|Online|Resource|'));
      assert.equal((0, _testHelpers.find)('input').value, 'identifier0', 'assign value');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#object/md-identifier profilePath="foobar" model=(hash)}}
              template block text
            {{/object/md-identifier}}
          
      */
      {
        "id": "LKJ2tjIN",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[28,[37,1],null,null]]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"object/md-identifier\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      text = (0, _testHelpers.find)('.md-identifier').textContent.replace(/[\s\n]+/g, '|').trim();
      assert.true(text.includes('|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|'), 'block');
      assert.true(text.includes('|template|block|text|'), 'block content');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-identifier profilePath="foobar"}}
      */
      {
        "id": "/3b1wHCx",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\"],[\"foobar\"]]]]],[],false,[\"object/md-identifier\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      text = (0, _testHelpers.find)('.md-identifier').textContent.replace(/[\s\n]+/g, '|').trim();
      assert.true(text.includes('|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|'), 'renders without model');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-keyword-citation/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-citation"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createCitation) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-citation",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md keyword citation', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('keyword', {
        keywordType: 'theme',
        thesaurus: (0, _createCitation.default)(1)[0]
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-keyword-citation model=keyword profilePath="foobar"}}
      */
      {
        "id": "eLsaM//z",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-keyword-citation\",\"keyword\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Title|Date|Date|Type|Choose|date|type|Type|theme|?|Edition|URL|');
      var input = (0, _testHelpers.findAll)('form input').mapBy('value').join('|');
      assert.equal(input, "title0|2016-10-13T00:00:00-04:00|edition|http://adiwg.org", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdKeywordCitation @model={{hash thesaurus=(hash)}} @profilePath="foobar">
              template block text
            </Object::MdKeywordCitation>
          
      */
      {
        "id": "r7taFxIp",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@model\",\"@profilePath\"],[[28,[37,1],null,[[\"thesaurus\"],[[28,[37,1],null,null]]]],\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-keyword-citation\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), "|Title|Date|Date|Type|Choose|date|type|Type|Choose|keyword|type|Edition|URL|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-keyword-list/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md keyword list', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('model', {
        'keyword': [{
          'identifier': 'id1',
          'keyword': 'foo1',
          'path': ['foo1']
        }, {
          'identifier': 'id2',
          'keyword': 'bar1',
          'path': ['foo1', 'bar1']
        }]
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-keyword-list model=model profilePath="foobar"}}
      */
      {
        "id": "1E6EKRGO",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-keyword-list\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('ul').textContent.replace(/[ \n]+/g, '|').trim(), '|Delete|foo1|Delete|bar1|');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-keyword-list model=model readOnly=false profilePath="foobar"}}
      */
      {
        "id": "eKN3HIsK",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"readOnly\",\"profilePath\"],[[33,1],false,\"foobar\"]]]]],[],false,[\"object/md-keyword-list\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.findAll)('tr').length, 4, 'Check number of rows.');
      assert.equal((0, _testHelpers.findAll)('input').length, 4, 'Check number of input el.');
      assert.equal(this.$('input')[2].value, 'bar1', 'Correct value for keyword input.');
      assert.equal(this.$('input')[3].value, 'id2', 'Correct value for id input.');
      assert.equal((0, _testHelpers.find)('table').textContent.replace(/[ \n]+/g, '|').trim(), '|Keyword|Id|(Optional)|Delete|Delete|Add|Keyword|Toggle|Thesaurus|', 'readOnly = false.');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <section>
            {{#object/md-keyword-list profilePath="foobar"}}
              template block text
            {{/object/md-keyword-list}}</section>
          
      */
      {
        "id": "UCUHOBHf",
        "block": "[[[10,\"section\"],[12],[1,\"\\n\"],[6,[39,0],null,[[\"profilePath\"],[\"foobar\"]],[[\"default\"],[[[[1,\"        template block text\\n      \"]],[]]]]],[13],[1,\"\\n    \"]],[],false,[\"object/md-keyword-list\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[ \n]+/g, '|').trim(), '|Add|some|keywords.|template|block|text|', 'Block form renders.');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-lineage/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md lineage', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('lineage', {
        "statement": "statement",
        "scope": {
          "scopeCode": "scopeCode"
        },
        "citation": [{
          "title": "title"
        }, {
          "title": "title"
        }],
        "source": [{
          "description": "description"
        }, {
          "description": "description"
        }],
        "sourceProcessStep": [{
          "description": "description"
        }, {
          "description": "description"
        }]
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <section>{{object/md-lineage profilePath="foobar" model=lineage}}</section>
      */
      {
        "id": "9f7IQHoo",
        "block": "[[[10,\"section\"],[12],[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]],[13]],[],false,[\"object/md-lineage\",\"lineage\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Statement|Statement|No|Process|Step|found.|Add|Process|Step|Source|2|Add|OK|#|Description|0|More...|Delete|1|More...|Delete|Citation|2|Add|OK|#|Title|0|title|More...|Delete|1|title|More...|Delete|Scope|scopeCode|×|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <section>
            <Object::MdLineage @profilePath="foobar" @model={{hash}}>
              template block text
            </Object::MdLineage></section>
          
      */
      {
        "id": "2JT1mtgW",
        "block": "[[[10,\"section\"],[12],[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\"],[\"foobar\",[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[13],[1,\"\\n    \"]],[],false,[\"object/md-lineage\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Statement|Statement|No|Process|Step|found.|Add|Process|Step|No|Source|found.|Add|Source|No|Citation|found.|Add|Citation|Scope|Select|type|of|resource.|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-lineage/preview/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md lineage/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('lineage', {
        "statement": "statement",
        "scope": {
          "scopeCode": "scopeCode"
        },
        "citation": [{
          "title": "title"
        }, {
          "title": "title"
        }],
        "source": [{
          "description": "description"
        }, {
          "description": "description"
        }],
        "sourceProcessStep": [{
          "description": "description"
        }, {
          "description": "description"
        }]
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <section>{{object/md-lineage/preview item=lineage}}</section>
      */
      {
        "id": "8hlX0hQs",
        "block": "[[[10,\"section\"],[12],[1,[28,[35,0],null,[[\"item\"],[[33,1]]]]],[13]],[],false,[\"object/md-lineage/preview\",\"lineage\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Lineage|#|Statement|statement|Process|Step|No|process|steps|assigned.|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <section>
            <Object::MdLineage::Preview>
              template block text
            </Object::MdLineage::Preview></section>
          
      */
      {
        "id": "siFqyQXV",
        "block": "[[[10,\"section\"],[12],[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[13],[1,\"\\n    \"]],[],false,[\"object/md-lineage/preview\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Lineage|#|Statement|Not|Defined|Process|Step|No|process|steps|assigned.|', 'template block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-locale-array/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md locale array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('locales', [{
        language: "eng",
        characterSet: "UTF-8",
        country: "USA"
      }, {
        language: "spa",
        characterSet: "UTF-32",
        country: "BDI"
      }]);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-locale-array value=locales}}
      */
      {
        "id": "lyNw8PXC",
        "block": "[[[1,[28,[35,0],null,[[\"value\"],[[33,1]]]]]],[],false,[\"object/md-locale-array\",\"locales\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[\s\n]+/g, '|').trim(), '|2|Add|#|Language|Character|Set|Country|0|eng|?|×|UTF-8|?|×|USA|?|×|Delete|1|spa|?|×|UTF-32|?|×|BDI|?|×|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdLocaleArray>
              template block text
            </Object::MdLocaleArray>
          
      */
      {
        "id": "Fw//ayiL",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-locale-array\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('.panel').textContent.replace(/[\s\n]+/g, '|').trim(), '|Add|#|Language|Character|Set|Country|Add|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-locale/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "@ember/object"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _object) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/object",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md locale', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.set('settings', _object.default.create({
        data: _object.default.create({
          language: "eng",
          characterSet: "UTF-8",
          country: "USA"
        })
      }));
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <section>{{object/md-locale settings=settings model=(hash) profilePath="foobar"}}</section>
      */
      {
        "id": "kuwaHHMg",
        "block": "[[[10,\"section\"],[12],[1,[28,[35,0],null,[[\"settings\",\"model\",\"profilePath\"],[[33,1],[28,[37,2],null,null],\"foobar\"]]]],[13]],[],false,[\"object/md-locale\",\"settings\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Language|eng|?|×|Character|Set|UTF-8|?|×|Country|USA|?|×|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <section>
            <Object::MdLocale @settings={{settings}} @model={{hash}} @profilePath="foobar">
              template block text
            </Object::MdLocale></section>
          
      */
      {
        "id": "pBrWrxGV",
        "block": "[[[10,\"section\"],[12],[1,\"\\n      \"],[8,[39,0],null,[[\"@settings\",\"@model\",\"@profilePath\"],[[99,1,[\"@settings\"]],[99,2,[\"@model\"]],\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[13],[1,\"\\n    \"]],[],false,[\"object/md-locale\",\"settings\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('section').textContent.replace(/[\s\n]+/g, '|').trim(), '|Language|eng|?|×|Character|Set|UTF-8|?|×|Country|USA|?|×|template|block|text|', 'template block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-maintenance/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md maintenance', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.model = {
        "frequency": "frequency",
        "date": [{
          "date": "2016-10-12",
          "dateType": "creation"
        }, {
          "date": "2016-10-12",
          "dateType": "publication"
        }],
        "scope": [{
          "scopeCode": "scopeCode0"
        }, {
          "scopeCode": "scopeCode1"
        }],
        "note": ["note0", "note1"],
        "contact": [{
          "role": "author",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId0"
          }]
        }, {
          "role": "publisher",
          "roleExtent": [{
            "temporalExtent": [{
              "timePeriod": {
                "startDateTime": "2016-10-24T11:10:15.2-10:00"
              }
            }]
          }],
          "party": [{
            "contactId": "individualId1"
          }]
        }]
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-maintenance profilePath="foobar" model=model}}
      */
      {
        "id": "dj8JdVVg",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-maintenance\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Frequency|frequency|×|Dates|2|Add|Date|#|Precision|Date|Date|Type|Description|0|Day|creation|?|×|Delete|1|Day|publication|?|×|Delete|Contacts|2|Add|Contact|#|Role|Contacts|0|author|?|×|Delete|1|publisher|?|×|Delete|Notes|2|Add|Notes|0|Delete|1|Delete|Scope|×|scopeCode0|×|scopeCode1|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdMaintenance @profilePath="foobar">
              template block text
            </Object::MdMaintenance>
          
      */
      {
        "id": "XpaV86kO",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\"],[\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-maintenance\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Frequency|Choose|a|value.|No|Date|found.|Add|Date|No|Contact|found.|Add|Contact|No|Notes|found.|Add|Note|Scope|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-medium/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md medium', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.model = {
        "mediumSpecification": {
          "title": "title"
        },
        "density": 9.9,
        "units": "units",
        "numberOfVolumes": 9,
        "mediumFormat": ["mediumFormat0", "mediumFormat1"],
        "note": "note",
        "identifier": {
          "identifier": "identifier"
        }
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-medium profilePath="foobar" model=model}}
      */
      {
        "id": "TLZPuo3+",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-medium\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), '|Medium|Title|Storage|Density|Density|Units|Number|Of|Volumes|Storage|Format|×|mediumFormat0|×|mediumFormat1|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Description|Note|Note|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdMedium @profilePath="foobar" @model={{hash}}>
              template block text
            </Object::MdMedium>
          
      */
      {
        "id": "VGvqbGtK",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\"],[\"foobar\",[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-medium\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('form').textContent.replace(/[\s\n]+/g, '|').trim(), "|Medium|Title|Storage|Density|Density|Units|Number|Of|Volumes|Storage|Format|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Description|Note|Note|template|block|text|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-object-table/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-object-table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.model = [{
        biz: 'biz0',
        baz: 'baz0'
      }, {
        biz: 'biz1',
        baz: 'baz1'
      }];
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-object-table header="Foo Bars" attributes="biz,baz"}}
      */
      {
        "id": "L8An+XMQ",
        "block": "[[[1,[28,[35,0],null,[[\"header\",\"attributes\"],[\"Foo Bars\",\"biz,baz\"]]]]],[],false,[\"object/md-object-table\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Foo|Bars|found.|Add|Foo|Bar|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#object/md-object-table
             items=model
             header="FooBar"
             buttonText="Add FooBar"
             ellipsis=true
             profilePath="foobar"
             attributes="biz,baz" as |foo|
            }}
              <span>Biz:{{foo.biz}}</span>
              <span>Baz:{{foo.baz}}</span>
            {{/object/md-object-table}}
          
      */
      {
        "id": "t3jAilqI",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"items\",\"header\",\"buttonText\",\"ellipsis\",\"profilePath\",\"attributes\"],[[33,1],\"FooBar\",\"Add FooBar\",true,\"foobar\",\"biz,baz\"]],[[\"default\"],[[[[1,\"        \"],[10,1],[12],[1,\"Biz:\"],[1,[30,1,[\"biz\"]]],[13],[1,\"\\n        \"],[10,1],[12],[1,\"Baz:\"],[1,[30,1,[\"baz\"]]],[13],[1,\"\\n\"]],[1]]]]],[1,\"    \"]],[\"foo\"],false,[\"object/md-object-table\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|FooBar|2|Add|OK|#|Biz|Baz|0|biz0|baz0|Edit|Delete|1|biz1|baz1|Edit|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-objectroute-table/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md objectroute table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = [{
        biz: 'biz0',
        baz: 'baz0'
      }, {
        biz: 'biz1',
        baz: 'baz1'
      }];
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-objectroute-table attributes="biz,baz" header="FooBar"}}
      */
      {
        "id": "KPQTA2IQ",
        "block": "[[[1,[28,[35,0],null,[[\"attributes\",\"header\"],[\"biz,baz\",\"FooBar\"]]]]],[],false,[\"object/md-objectroute-table\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|FooBar|found.|Add|FooBar|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdObjectrouteTable @items={{model}} @header="FooBar" @buttonText="Add FooBar" @ellipsis={{true}} @profilePath="foobar" @attributes="biz,baz" as |foo|>
              <span>Biz:{{foo.biz}}</span>
              <span>Baz:{{foo.baz}}</span>
            </Object::MdObjectrouteTable>
          
      */
      {
        "id": "FH7A1kMn",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@items\",\"@header\",\"@buttonText\",\"@ellipsis\",\"@profilePath\",\"@attributes\"],[[99,1,[\"@items\"]],\"FooBar\",\"Add FooBar\",true,\"foobar\",\"biz,baz\"]],[[\"default\"],[[[[1,\"\\n        \"],[10,1],[12],[1,\"Biz:\"],[1,[30,1,[\"biz\"]]],[13],[1,\"\\n        \"],[10,1],[12],[1,\"Baz:\"],[1,[30,1,[\"baz\"]]],[13],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"foo\"],false,[\"object/md-objectroute-table\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|FooBar|2|Add|OK|#|Biz|Baz|0|biz0|baz0|More...|Delete|1|biz1|baz1|More...|Delete|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-online-resource/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md online resource', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        uri: 'http://URI.example.com',
        protocol: 'protocol',
        name: 'name',
        description: 'description',
        function: 'download',
        applicationProfile: 'applicationProfile',
        protocolRequest: 'protocolRequest'
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-online-resource model=model profilePath="foobar"}}
      */
      {
        "id": "3TyVevF2",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-online-resource\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.fillIn)('input[id$="-input"]', 'resource-name-updated');
      assert.strictEqual(this.model.name, 'resource-name-updated', 'name writes to model');
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Name|URI|Protocol|Description|Description|Function|download|?|×|Application|Profile|applicationProfile|×|Protocol|Request|Protocol|Request|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdOnlineResource @profilePath="foobar" @model={{model}}>
              template block text
            </Object::MdOnlineResource>
          
      */
      {
        "id": "VLod7cvl",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\"],[\"foobar\",[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-online-resource\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Name|URI|Protocol|Description|Description|Function|download|?|×|Application|Profile|applicationProfile|×|Protocol|Request|Protocol|Request|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-party-array/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-contact",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md party array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.party = [{
        "role": "author",
        "roleExtent": [{
          "temporalExtent": [{
            "timePeriod": {
              "startDateTime": "2016-10-24T11:10:15.2-10:00"
            }
          }]
        }],
        "party": [{
          "contactId": 0
        }]
      }, {
        "role": "publisher",
        "party": [{
          "contactId": 1
        }]
      }];
      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-party-array value=party profilePath="foobar"}}
      */
      {
        "id": "SA3rvQ3J",
        "block": "[[[1,[28,[35,0],null,[[\"value\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-party-array\",\"party\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|2|Add|#|Role|Contacts|0|author|?|×|×|Contact0|Delete|1|publisher|?|×|×|Contact1|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdPartyArray @model={{hash}} @profilePath="foobar">
              template block text
            </Object::MdPartyArray>
          
      */
      {
        "id": "4W3/rzwd",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@model\",\"@profilePath\"],[[99,1,[\"@model\"]],\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-party-array\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Add|#|Role|Contacts|Add|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-party/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-contact",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md party', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.party = {
        "role": "author",
        "roleExtent": [{
          "temporalExtent": [{
            "timePeriod": {
              "startDateTime": "2016-10-24T11:10:15.2-10:00"
            }
          }]
        }],
        "party": [{
          "contactId": 0
        }]
      };
      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-party model=party}}
      */
      {
        "id": "gePEMMKf",
        "block": "[[[1,[28,[35,0],null,[[\"model\"],[[33,1]]]]]],[],false,[\"object/md-party\",\"party\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Role|author|?|×|Contacts|×|Contact0|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdParty @model={{hash}}>
              template block text
            </Object::MdParty>
          
      */
      {
        "id": "NfU/QaLC",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@model\"],[[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-party\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Role|Select|or|enter|a|role|Contacts|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-process-step/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-contact"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createContact) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-contact",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md process step', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      var contacts = (0, _createContact.default)(2);
      var cs = this.owner.lookup('service:contacts');
      cs.set('contacts', contacts);
      //
      this.step = {
        "stepId": "stepId",
        "description": "description",
        "rationale": "rationale",
        "timePeriod": {
          "startDateTime": "2016-10-15"
        },
        "processor": [{
          "role": "role",
          "party": [{
            "contactId": "0"
          }]
        }, {
          "role": "role",
          "party": [{
            "contactId": "1"
          }]
        }],
        "stepSource": [{
          "description": "description",
          "sourceCitation": {
            "title": "title"
          },
          "metadataCitation": [{
            "title": "title0"
          }, {
            "title": "title1"
          }],
          "spatialResolution": {
            "measure": {
              "type": "distance",
              "value": 99.9,
              "unitOfMeasure": "unitOfMeasure"
            }
          },
          "referenceSystem": {
            "referenceSystemType": "referenceSystemType",
            "referenceSystemIdentifier": {
              "identifier": "identifier"
            }
          },
          "sourceProcessStep": [{
            "description": "description0"
          }, {
            "description": "description1"
          }]
        }],
        "stepProduct": [{
          "description": "description",
          "sourceCitation": {
            "title": "title"
          },
          "metadataCitation": [{
            "title": "title0"
          }, {
            "title": "title1"
          }],
          "spatialResolution": {
            "measure": {
              "type": "distance",
              "value": 99.9,
              "unitOfMeasure": "unitOfMeasure"
            }
          },
          "referenceSystem": {
            "referenceSystemType": "referenceSystemType",
            "referenceSystemIdentifier": {
              "identifier": "identifier"
            }
          },
          "sourceProcessStep": [{
            "description": "description0"
          }, {
            "description": "description1"
          }]
        }],
        "reference": [{
          "title": "title0"
        }, {
          "title": "title1"
        }]
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-process-step profilePath="foobar" model=step}}
      */
      {
        "id": "m4PQJ63K",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-process-step\",\"step\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Step|ID|Description|Description|Step|Sources|1|Add|#|Description|0|Delete|Step|Products|1|Add|#|Description|0|Delete|Processors|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Step|Reference|2|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|Time|Period|Dates|Precision|Day|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Description|No|Time|Period|Name|found.|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Scope|Select|type|of|resource.|");

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#object/md-process-step profilePath="foobar" model=step}}
              template block text
            {{/object/md-process-step}}
          
      */
      {
        "id": "siJgBpS0",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]],[[\"default\"],[[[[1,\"        template block text\\n\"]],[]]]]],[1,\"    \"]],[],false,[\"object/md-process-step\",\"step\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Step|ID|Description|Description|Step|Sources|1|Add|#|Description|0|Delete|Step|Products|1|Add|#|Description|0|Delete|Processors|2|Add|#|Role|Contacts|0|role|×|Delete|1|role|×|Delete|Step|Reference|2|Add|OK|#|Title|0|title0|More...|Delete|1|title1|More...|Delete|Time|Period|Dates|Precision|Day|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Description|No|Time|Period|Name|found.|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|Scope|Select|type|of|resource.|template|block|text|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-process-step/preview/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-process-step/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      this.source = {
        "description": "description",
        "sourceCitation": {
          "title": "title"
        },
        "metadataCitation": [{
          "title": "title0"
        }, {
          "title": "title1"
        }],
        "spatialResolution": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "referenceSystem": {
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        },
        "sourceProcessStep": [{
          "description": "description0"
        }, {
          "description": "description1"
        }]
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-process-step/preview model=source profilePath="foobar"}}
      */
      {
        "id": "mm1pGoQo",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-process-step/preview\",\"source\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('textarea').value, 'description');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdProcessStep::Preview @model={{source}} @profilePath="foobar">
              template block text
            </Object::MdProcessStep::Preview>
          
      */
      {
        "id": "wCh5Fp/8",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@model\",\"@profilePath\"],[[99,1,[\"@model\"]],\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-process-step/preview\",\"source\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('textarea').value, 'description');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-profile/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-profile"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _createProfile) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"mdeditor/tests/helpers/create-profile",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-profile', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.model = (0, _createProfile.default)(1)[0];
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdProfile @record={{this.model}} />
          
      */
      {
        "id": "XinYobKL",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@record\"],[[30,0,[\"model\"]]]],null],[1,\"\\n    \"]],[],false,[\"object/md-profile\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|URL|Alias|Version|0.0.0|Update|Available|(0.0.1)|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-profile/custom/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-profile/custom', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.model = {
        title: 'testme',
        description: 'testing description'
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdProfile::Custom @record={{this.model}} />
          
      */
      {
        "id": "nkDUZx32",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@record\"],[[30,0,[\"model\"]]]],null],[1,\"\\n    \"]],[],false,[\"object/md-profile/custom\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Description|Description|Profile|Definition|Select|the|profile|definition.|Select|Schemas|No|schemas|avialable.|Schemas|Selected|Select|schemas|from|the|list.|');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdProfile::Custom @record={{this.model}}>
              template block text
            </Object::MdProfile::Custom>
          
      */
      {
        "id": "IvrsPQ2Z",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@record\"],[[30,0,[\"model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-profile/custom\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Description|Description|Profile|Definition|Select|the|profile|definition.|Select|Schemas|No|schemas|avialable.|Schemas|Selected|Select|schemas|from|the|list.|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-profile/form/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-profile"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _createProfile) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"mdeditor/tests/helpers/create-profile",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-profile/form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.model = (0, _createProfile.default)(1)[0];
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdProfile::Form @record={{this.model}} />
          
      */
      {
        "id": "sSBY4/X4",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@record\"],[[30,0,[\"model\"]]]],null],[1,\"\\n    \"]],[],false,[\"object/md-profile/form\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|URL|Alias|Version|0.0.0|Update|Available|(0.0.1)|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdProfile::Form @record={{this.model}}>
              template block text
            </Object::MdProfile::Form>
          
      */
      {
        "id": "q+9rgAQb",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@record\"],[[30,0,[\"model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-profile/form\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|URL|Alias|Version|0.0.0|Update|Available|(0.0.1)|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-profile/preview/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-profile"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _createProfile) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"mdeditor/tests/helpers/create-profile",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-profile/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.model = (0, _createProfile.default)(1)[0];
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdProfile::Preview @record={{this.model}} />
          
      */
      {
        "id": "obfWP+kr",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@record\"],[[30,0,[\"model\"]]]],null],[1,\"\\n    \"]],[],false,[\"object/md-profile/preview\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.text-muted').exists('applies muted styling on the wrapper');
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdProfile::Preview @record={{this.model}} class='list-group-item-text'>
              template block text
            </Object::MdProfile::Preview>
          
      */
      {
        "id": "8LsEkxKW",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[24,0,\"list-group-item-text\"]],[[\"@record\"],[[30,0,[\"model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-profile/preview\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.text-muted.list-group-item-text').exists('merges caller class with muted wrapper');
      assert.equal(this.element.textContent.replace(/[ \n]+/g, '|').trim(), '|Title|Minimal|Description|A|Minimalist|Profile|Identifier|minimal|Namespace|org.adiwg.profile|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/attrgroup/attribute/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/create-record", "mdeditor/tests/helpers/md-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _createRecord, _mdHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"mdeditor/tests/helpers/create-record",0,"mdeditor/tests/helpers/md-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-raster/attrgroup/attribute', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    /*
      The searchable element in the codelist is causing extra pipe characters in the test, we need to find a solution to fix.
    */
    (0, _qunit.todo)('it renders', async function (assert) {
      let attribute = (0, _createRecord.createAttribute)(1);
      this.set('model', attribute[0]);
      let input = (0, _mdHelpers.nestedValues)(attribute[0]).join('|');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-raster/attrgroup/attribute profilePath="foobar" model=model}}
      */
      {
        "id": "vfPwzRpx",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-raster/attrgroup/attribute\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _mdHelpers.formatContent)(this.element).trim(), "|Attribute|Description|Attribute|Identifier|1|Add|OK|#|Identifier|Namespace|0|identifier0|namespace0|Edit|Delete|Band|Boundary|Definition|×|bandBoundaryDefinition0|Transfer|Function|Type|×|transferFunctionType0|Transmitted|Polarization|×|transmittedPolarization0|Detected|Polarization|×|detectedPolarization0|Sequence|Identifier|Sequence|Identifier|Type|Min|Value|Max|Value|Units|Scale|Factor|Offset|Mean|Value|Number|Of|Values|Standard|Deviation|Bits|Per|Value|Bound|Min|Bound|Max|Bound|Units|Peak|Response|Tone|Gradations|Nominal|Spatial|Resolution|");
      assert.equal((0, _mdHelpers.parseInput)(this.element), input);
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/attrgroup/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-raster/attrgroup', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-raster/attrgroup }}
      */
      {
        "id": "TFH8Z7DA",
        "block": "[[[1,[34,0]]],[],false,[\"object/md-raster/attrgroup\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Item|found.|Add|Item|', 'attrgroup component renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/md-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _mdHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"mdeditor/tests/helpers/md-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-raster', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    /*
      The searchable element in the codelist is causing extra pipe characters in the test, we need to find a solution to fix.
    */
    (0, _qunit.todo)('it renders', async function (assert) {
      this.model = {
        "coverageName": "coverageName",
        "coverageDescription": "coverageDescription",
        "attributeGroup": [{
          "attributeContentType": ["attributeContentType1", "attributeContentType2"],
          "attribute": [{
            "attributeDescription": "attributeDescription"
          }]
        }],
        "processingLevelCode": {
          "identifier": "identifier1",
          "namespace": "namespace1"
        },
        "imageDescription": {
          "imageQualityCode": {
            "identifier": "identifier2",
            "namespace": "namespace2"
          },
          "illuminationElevationAngle": 45,
          "illuminationAzimuthAngle": 90,
          "imagingCondition": "imageCondition",
          "cloudCoverPercent": 88,
          "compressionQuantity": 23,
          "triangulationIndicator": "true",
          "radiometricCalibrationAvailable": "true",
          "cameraCalibrationAvailable": "false",
          "filmDistortionAvailable": "false",
          "lensDistortionAvailable": "true"
        }
      };
      let nestedValues = obj => typeof obj === 'object' ? Object.values(obj).map(nestedValues).flat() : [obj];
      let input = nestedValues(this.model).join('|');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-raster profilePath="foobar" model=model}}
      */
      {
        "id": "hx0kxqPy",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-raster\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _mdHelpers.formatContent)(this.element).trim(), '|Name|Description|Attribute|Groups|1|Add|Attribute|Group|#0|Attribute|Content|Type|×|attributeContentType1|×|attributeContentType2|Attribute|1|Add|OK|#|Attribute|Description|0|More...|Delete|Processing|Level|Code|Identifier|Namespace|namespace1|×|More|Image|Description|Image|Quality|Code|Identifier|Namespace|namespace2|×|More|Illumination|Elevation|Angle|Illumination|Azimuth|Angle|Imaging|Condition|Cloud|Cover|Percent|Compression|Quantity|Triangulation|Indicator|Radiometric|Calibration|Available|Camera|Calibration|Available|Film|Distortion|Available|Lens|Distortion|Available|');
      assert.equal((0, _mdHelpers.parseInput)(this.element), input, 'input renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/image-desc/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/md-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _mdHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"mdeditor/tests/helpers/md-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-raster/image-desc', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.model = {
        "imageQualityCode": {
          "identifier": "identifier",
          "namespace": "namespace"
        },
        "illuminationElevationAngle": 45,
        "illuminationAzimuthAngle": 90,
        "imagingCondition": "imageCondition",
        "cloudCoverPercent": 88,
        "compressionQuantity": 23,
        "triangulationIndicator": "true",
        "radiometricCalibrationAvailable": "true",
        "cameraCalibrationAvailable": "false",
        "filmDistortionAvailable": "false",
        "lensDistortionAvailable": "true"
      };
      let input = (0, _mdHelpers.nestedValues)(this.model).join('|');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-raster/image-desc profilePath="foobar" model=model}}
      */
      {
        "id": "nqgMV7n/",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-raster/image-desc\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _mdHelpers.formatContent)(this.element).trim(), '|Image|Quality|Code|Identifier|Namespace|namespace|×|More|Illumination|Elevation|Angle|Illumination|Azimuth|Angle|Imaging|Condition|Cloud|Cover|Percent|Compression|Quantity|Triangulation|Indicator|Radiometric|Calibration|Available|Camera|Calibration|Available|Film|Distortion|Available|Lens|Distortion|Available|', 'md-raster/image-desc component renders');
      assert.equal((0, _mdHelpers.parseInput)(this.element), input, 'md-raster/image-desc inputs render');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-raster/preview/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "mdeditor/tests/helpers/md-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _mdHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"mdeditor/tests/helpers/md-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-raster/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.model = {
        "coverageName": "coverageName",
        "coverageDescription": "coverageDescription"
      };
      let input = Object.values(this.model).join('|');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-raster/preview profilePath="foobar" item=this.model}}
      */
      {
        "id": "BVNKJkHq",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"item\"],[\"foobar\",[30,0,[\"model\"]]]]]]],[],false,[\"object/md-raster/preview\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _mdHelpers.formatContent)(this.element).trim(), '|Raster|Name|Raster|Description|', 'md-raster-preview component renders');
      assert.equal((0, _mdHelpers.parseInput)(this.element), input, 'md-raster-preview inputs renders');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-repository-array/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md repository array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.repo = [{
        "citation": {
          "title": "Arctic LCC data.gov"
        },
        "repository": "data.gov"
      }, {
        "citation": {
          "title": "Something"
        },
        "repository": "data.gov"
      }];
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-repository-array value=repo profilePath="foo"}}
      */
      {
        "id": "oD1hlfuQ",
        "block": "[[[1,[28,[35,0],null,[[\"value\",\"profilePath\"],[[33,1],\"foo\"]]]]],[],false,[\"object/md-repository-array\",\"repo\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Metadata|Repositories|2|Add|#|Repository|Collection|Title|0|data.gov|?|×|Delete|1|data.gov|?|×|Delete|');
      assert.dom('.md-input input').hasValue('Arctic LCC data.gov');
      assert.dom('.select-value').hasText('data.gov');
      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdRepositoryArray @profilePath="foo">
              template block text
            </Object::MdRepositoryArray>
          
      */
      {
        "id": "X3+ofg/C",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\"],[\"foo\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-repository-array\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Metadata|Repositories|Add|#|Repository|Collection|Title|Add|Metadata|Repository|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-resource-type-array/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md resource type array', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.rt = [{
        "type": "project",
        "name": "foobar"
      }, {
        "type": "map"
      }];
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-resource-type-array value=rt profilePath="foobar"}}
      */
      {
        "id": "z5fBw/jv",
        "block": "[[[1,[28,[35,0],null,[[\"value\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-resource-type-array\",\"rt\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|2|Add|#|Type|Name|0|project|?|×|Delete|1|map|?|×|Delete|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdResourceTypeArray @profilePath="foobar">
              template block text
            </Object::MdResourceTypeArray>
          
      */
      {
        "id": "MzOH5yTr",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\"],[\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-resource-type-array\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Resource|Types|Add|#|Type|Name|Add|Resource|Type|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-schema/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "@ember/object"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _object) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/object",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-schema', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('data', _object.default.create({
        title: 'foo',
        uri: 'bar',
        remoteVersion: '1.1',
        localVersion: '1.0',
        hasUpdate: true
      }));
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-schema record=data}}
      */
      {
        "id": "DjZNp6pR",
        "block": "[[[1,[28,[35,0],null,[[\"record\"],[[33,1]]]]]],[],false,[\"object/md-schema\",\"data\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), '|Info|Schemas|Title|URL|Version|1.0|Update|Available|(1.1)|Description|Description|Type|Select|the|record|type|for|schema.|Apply|Globally?|No|Yes|');
      assert.equal((0, _testHelpers.find)('.md-schema input').value, 'foo', 'render form');
      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdSchema @record={{data}}>
              template block text
            </Object::MdSchema>
          
      */
      {
        "id": "E6+utADk",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@record\"],[[99,1,[\"@record\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-schema\",\"data\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), '|Info|Schemas|Title|URL|Version|1.0|Update|Available|(1.1)|Description|Description|Type|Select|the|record|type|for|schema.|Apply|Globally?|No|Yes|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-schema/form/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "@ember/object"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _object) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/object",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-schema/form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      this.set('data', _object.default.create({
        title: 'foo',
        uri: 'bar',
        remoteVersion: '1.1',
        localVersion: '1.0',
        hasUpdate: true
      }));
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-schema/form record=data}}
      */
      {
        "id": "RcZYyoU/",
        "block": "[[[1,[28,[35,0],null,[[\"record\"],[[33,1]]]]]],[],false,[\"object/md-schema/form\",\"data\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), '|Title|URL|Version|1.0|Update|Available|(1.1)|Description|Description|Type|Select|the|record|type|for|schema.|Apply|Globally?|No|Yes|');
      assert.equal((0, _testHelpers.find)('input').value, 'foo', 'render form');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdSchema::Form @record={{data}}>
              template block text
            </Object::MdSchema::Form>
          
      */
      {
        "id": "kOttnapS",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@record\"],[[99,1,[\"@record\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-schema/form\",\"data\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[ \s\n]+/g, '|').trim(), '|Title|URL|Version|1.0|Update|Available|(1.1)|Description|Description|Type|Select|the|record|type|for|schema.|Apply|Globally?|No|Yes|template|block|text|');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-simple-array-table/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md simple array table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });

      this.model = ['biz', 'baz'];
      // this.on('addItem', function(val) {
      //   this.model.pushObject(val);
      // });
      // this.on('addItem', function(val) {
      //   this.model.pushObject(val);
      // });

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-simple-array-table}}
      */
      {
        "id": "zvPm+TCP",
        "block": "[[[1,[34,0]]],[],false,[\"object/md-simple-array-table\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Item|found.|Add|Item|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#object/md-simple-array-table
              title="FooBar"
              required=false
              plain=true
              value=model as |foo|
            }}
              <td>
                  {{foo.item.value}}
              </td>
            {{/object/md-simple-array-table}}
          
      */
      {
        "id": "1FPsOUh2",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"title\",\"required\",\"plain\",\"value\"],[\"FooBar\",false,true,[33,1]]],[[\"default\"],[[[[1,\"        \"],[10,\"td\"],[12],[1,\"\\n            \"],[1,[30,1,[\"item\",\"value\"]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[1]]]]],[1,\"    \"]],[\"foo\"],false,[\"object/md-simple-array-table\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|FooBars|2|Add|FooBar|0|biz|Delete|1|baz|Delete|');
      await (0, _testHelpers.click)('.btn-info');
      assert.equal((0, _testHelpers.findAll)('.table tr').length, 3, 'addItem');
      await (0, _testHelpers.doubleClick)('.btn-danger');
      assert.equal(this.model.length, 1, 'deleteItem');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-source/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md source', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('source', {
        "description": "description",
        "sourceCitation": {
          "title": "title"
        },
        "metadataCitation": [{
          "title": "title0"
        }, {
          "title": "title1"
        }],
        "spatialResolution": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "referenceSystem": {
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        },
        "sourceProcessStep": [{
          "description": "description0"
        }, {
          "description": "description1"
        }]
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-source profilePath="foobar" model=this.source}}
      */
      {
        "id": "hn5lXQpZ",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,0,[\"source\"]]]]]]],[],false,[\"object/md-source\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Source|ID|Description|Description|Scope|Select|type|of|resource.|Source|Citation|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|Edition|Presentation|Form|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|Metadata|Citation|2|Add|OK|#|Title|0|title0|Edit|Delete|1|title1|Edit|Delete|Spatial|Reference|System|Reference|System|Type|referenceSystemType|×|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Spatial|Resolution|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|distance|Value|Units|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdSource @profilePath="foobar" @model={{(hash)}}>
              template block text
            </Object::MdSource>
          
      */
      {
        "id": "60MKpVvr",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\"],[\"foobar\",[28,[37,1],null,null]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-source\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Source|ID|Description|Description|Scope|Select|type|of|resource.|Source|Citation|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|Edition|Presentation|Form|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|No|Metadata|Citation|found.|Add|Metadata|Citation|Spatial|Reference|System|Reference|System|Type|Select|type|of|reference|system|used.|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Spatial|Resolution|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-source/preview/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md source/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.source = {
        "description": "description",
        "sourceCitation": {
          "title": "title"
        },
        "metadataCitation": [{
          "title": "title0"
        }, {
          "title": "title1"
        }],
        "spatialResolution": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "referenceSystem": {
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        },
        "sourceProcessStep": [{
          "description": "description0"
        }, {
          "description": "description1"
        }]
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-source/preview model=source profilePath="foobar"}}
      */
      {
        "id": "Cb7tw0U9",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-source/preview\",\"source\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('textarea').value, 'description');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdSource::Preview @model={{source}} @profilePath="foobar">
              template block text
            </Object::MdSource::Preview>
          
      */
      {
        "id": "cDE4XOIJ",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@model\",\"@profilePath\"],[[99,1,[\"@model\"]],\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-source/preview\",\"source\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.find)('textarea').value, 'description');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-spatial-info/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md spatial info', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        spatialReferenceSystem: [{
          "referenceSystemType": "referenceSystemType",
          "referenceSystemIdentifier": {
            "identifier": "identifier"
          }
        }, {
          "referenceSystemType": "projected",
          "referenceSystemIdentifier": {
            "identifier": "Zone 10",
            "namespace": "UTM",
            "description": "Universal Transverse Mercator Zone 10 Seattle, Washington"
          }
        }, {
          "referenceSystemType": "geodeticGeographic2D",
          "referenceSystemIdentifier": {
            "identifier": "4326",
            "namespace": "urn:ogc:def:crs:EPSG",
            "description": "epsg projection 4326 - wgs 84 - Latitude Longitude",
            "authority": {
              "title": "European Petroleum Survey Group"
            }
          }
        }, {
          "referenceSystemType": "projected",
          "referenceSystemWKT": "PROJCS ['Wyoming 4901, Eastern Zone (1983, meters)', GEOGCS ['GRS 80', DATUM ['GRS 80', SPHEROID ['GRS 80', 6378137.000000, 298.257222]], PRIMEM ['Greenwich', 0.000000 ], UNIT ['Decimal Degree', 0.01745329251994330]], PROJECTION ['Transverse Mercator'], PARAMETER ['Scale_Factor', 0.999938], PARAMETER ['Central_Meridian', -105.166667], PARAMETER ['Latitude_Of_Origin', 40.500000], PARAMETER ['False_Easting', 200000.000000], UNIT ['Meter', 1.000000000000]]"
        }, {
          "referenceSystemType": "geodeticGeographic2D",
          "referenceSystemParameterSet": {
            "geodetic": {
              "datumIdentifier": {
                "identifier": "identifier"
              },
              "ellipsoidIdentifier": {
                "identifier": "identifier"
              },
              "semiMajorAxis": 9.9,
              "axisUnits": "axisUnits",
              "denominatorOfFlatteningRatio": 9.9
            }
          }
        }],
        spatialResolution: [{
          "scaleFactor": 99999
        }, {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }, {
          "levelOfDetail": "levelOfDetail"
        }, {
          "geographicResolution": {
            "latitudeResolution": 9.9,
            "longitudeResolution": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }, {
          "bearingDistanceResolution": {
            "distanceResolution": 9.9,
            "distanceUnitOfMeasure": "",
            "bearingResolution": 9.9,
            "bearingUnitOfMeasure": "",
            "bearingReferenceDirection": "north",
            "bearingReferenceMeridian": "assumed"
          }
        }, {
          "coordinateResolution": {
            "abscissaResolutionX": 9.9,
            "ordinateResolutionY": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }],
        spatialRepresentationType: ["vector", "stereoModel"]
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-spatial-info profilePath="foobar" model=model}}
      */
      {
        "id": "W8F+0eP8",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-spatial-info\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Spatial|Representation|Type|×|stereoModel|?|×|vector|?|Spatial|Reference|System|5|Add|OK|#|Reference|System|Type|Identifier|0|referenceSystemType|identifier|Edit|Delete|1|projected|Zone|10|Edit|Delete|2|geodeticGeographic2D|4326|Edit|Delete|3|projected|Not|Defined|Edit|Delete|4|geodeticGeographic2D|Not|Defined|Edit|Delete|Spatial|Resolution|6|Add|OK|#|Scale|Factor|Level|Of|Detail|Type|0|99999|Not|Defined|Not|Defined|Edit|Delete|1|Not|Defined|Not|Defined|distance|Edit|Delete|2|Not|Defined|levelOfDetail|Not|Defined|Edit|Delete|3|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|4|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|5|Not|Defined|Not|Defined|Not|Defined|Edit|Delete|Add|Spatial|Resolution|No|Raster|Description|found.|Add|Raster|Description|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdSpatialInfo @profilePath="foobar" @model={{hash}}>
              template block text
            </Object::MdSpatialInfo>
          
      */
      {
        "id": "iaNU5Y66",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\"],[\"foobar\",[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-spatial-info\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Spatial|Representation|Type|No|Spatial|Reference|System|found.|Add|Spatial|Reference|System|No|Spatial|Resolution|found.|Add|Spatial|Resolution|No|Raster|Description|found.|Add|Raster|Description|template|block|text|', 'block');
    });
    (0, _qunit.skip)('test actions', async function (assert) {
      assert.expect(1);
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-spatial-resolution/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md spatial resolution', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.set('model', {
        "scaleFactor": {
          scaleFactor: 99999
        },
        "measure": {
          "measure": {
            "type": "distance",
            "value": 99.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "levelOfDetail": {
          levelOfDetail: "levelOfDetail"
        },
        "geographicResolution": {
          geographicResolution: {
            "latitudeResolution": 9.9,
            "longitudeResolution": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        },
        "bearingDistanceResolution": {
          bearingDistanceResolution: {
            "distanceResolution": 9.9,
            "distanceUnitOfMeasure": "",
            "bearingResolution": 9.9,
            "bearingUnitOfMeasure": "",
            "bearingReferenceDirection": "north",
            "bearingReferenceMeridian": "assumed"
          }
        },
        "coordinateResolution": {
          coordinateResolution: {
            "abscissaResolutionX": 9.9,
            "ordinateResolutionY": 9.9,
            "unitOfMeasure": "unitOfMeasure"
          }
        }
      });

      //Todo: Look into this
      //! this option was giving not working well with the regex experesson
      //var empty = "Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|";

      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=this.model.scaleFactor}}
      */
      {
        "id": "2HgQN58t",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,0,[\"model\",\"scaleFactor\"]]]]]]],[],false,[\"object/md-spatial-resolution\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[0].value, this.model.scaleFactor.scaleFactor, 'scaleFactor');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[1].disabled, 'level disabled');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[2].disabled, 'measure disabled');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=this.model.measure}}
      */
      {
        "id": "DntC/fZX",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,0,[\"model\",\"measure\"]]]]]]],[],false,[\"object/md-spatial-resolution\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[2].value, this.model.measure.measure.value, 'measure');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[1].disabled, 'level disabled');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[0].disabled, 'scaleFactor disabled');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=this.model.levelOfDetail}}
      */
      {
        "id": "bsMJ29v/",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,0,[\"model\",\"levelOfDetail\"]]]]]]],[],false,[\"object/md-spatial-resolution\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal((0, _testHelpers.findAll)('.md-input-input input')[1].value, this.model.levelOfDetail.levelOfDetail, 'levelOfDetail');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[2].disabled, 'measure disabled');
      assert.ok((0, _testHelpers.findAll)('.md-input-input input')[0].disabled, 'scaleFactor disabled');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=this.model.geographicResolution}}
      */
      {
        "id": "iTg2Vu5d",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,0,[\"model\",\"geographicResolution\"]]]]]]],[],false,[\"object/md-spatial-resolution\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|', 'geographicResolution');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=this.model.bearingDistanceResolution}}
      */
      {
        "id": "s9Rg3XUJ",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,0,[\"model\",\"bearingDistanceResolution\"]]]]]]],[],false,[\"object/md-spatial-resolution\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|', 'bearingDistanceResolution');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-spatial-resolution profilePath="foobar" model=this.model.coordinateResolution}}
      */
      {
        "id": "+n88OJ4H",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[30,0,[\"model\",\"coordinateResolution\"]]]]]]],[],false,[\"object/md-spatial-resolution\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|', 'coordinateResolution');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdSpatialResolution @model={{(hash)}} @profilePath="foobar">
              template block text
            </Object::MdSpatialResolution>
          
      */
      {
        "id": "jzGT1Q2T",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@model\",\"@profilePath\"],[[28,[37,1],null,null],\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-spatial-resolution\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Scale|Factor|Level|Of|Detail|Measure|Measure|Type|The|type|of|measurement.|Value|Units|' + 'template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-srs/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md srs', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.srs = {
        "referenceSystemType": "projected",
        "referenceSystemIdentifier": {
          "identifier": "identifier",
          "version": "version",
          "description": "description"
        }
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-srs profilePath="foobar" model=srs}}
      */
      {
        "id": "Unx92OnJ",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-srs\",\"srs\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Reference|System|Type|projected|?|×|Reference|System|Identifier|Identifier|Namespace|Select|or|type|a|namespace|for|the|identifier.|Version|Description|Description|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|No|Date|found.|Add|Date|No|Responsible|Party|found.|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|');
      var input = (0, _testHelpers.findAll)('input, textarea').mapBy('value').join('|');
      assert.equal(input, 'identifier|version|description|', 'input values');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdSrs @profilePath="foobar">
              template block text
            </Object::MdSrs>
          
      */
      {
        "id": "G/z/wYTI",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\"],[\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-srs\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Reference|System|Type|Select|type|of|reference|system|used.|template|block|text|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/classification/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-taxonomy",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md taxonomy/classification', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].taxonomicClassification;
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-taxonomy/classification model=model profilePath="foobar"}}
      */
      {
        "id": "SaJ8lDIy",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-taxonomy/classification\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|No|Classification|found.|Kingdom|Animalia|(202423)|Edit|Delete|Add|Child|Subkingdom|Radiata|(914153)|Edit|Delete|Add|Child|Phylum|Cnidaria|(48738)|Edit|Delete|Add|Child|Subphylum|Medusozoa|(718920)|Edit|Delete|Add|Child|Class|Scyphozoa|(51483)|Edit|Delete|Add|Child|Subclass|Discomedusae|(718923)|Edit|Delete|Add|Child|Order|Rhizostomeae|(51756)|Edit|Delete|Add|Child|Family|Rhizostomatidae|(51911)|Edit|Delete|Add|Child|Genus|Rhopilema|(51919)|Edit|Delete|Add|Child|Species|Rhopilema|verrilli|(51920)|mushroom|jellyfish|Edit|Delete|Add|Child|No|Classification|found.|');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-taxonomy/classification model=model preview=true profilePath="foobar"}}
      */
      {
        "id": "6JK/U/7E",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"preview\",\"profilePath\"],[[33,1],true,\"foobar\"]]]]],[],false,[\"object/md-taxonomy/classification\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Kingdom|Animalia|(202423)|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdTaxonomy::Classification @profilePath="foobar">
              template block text
            </Object::MdTaxonomy::Classification>
          
      */
      {
        "id": "Nix264/t",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\"],[\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-taxonomy/classification\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Classification|found.|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/classification/taxon/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-taxonomy",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md taxonomy/classification/taxon', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      assert.expect(7);
      this.model = (0, _createTaxonomy.default)()[0].taxonomicClassification[0];
      this.delete = function (taxa) {
        assert.ok(taxa, 'called delete');
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-taxonomy/classification/taxon model=model deleteTaxa=delete top=top profilePath="foobar"}}
      */
      {
        "id": "mJlIOw4h",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"deleteTaxa\",\"top\",\"profilePath\"],[[33,1],[33,2],[33,3],\"foobar\"]]]]],[],false,[\"object/md-taxonomy/classification/taxon\",\"model\",\"delete\",\"top\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|No|Classification|found.|');
      // await click('.btn-info');

      await (0, _testHelpers.click)('.btn-success');
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Taxonomic|Level|Taxonomic|Name|Taxonomic|ID|Common|Names|1|Add|Common|Name|0|Delete|OK|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|No|Classification|found.|', 'edit');
      await (0, _testHelpers.click)('.md-taxon-form footer .btn-info');
      await (0, _testHelpers.click)('.btn-danger');
      await (0, _testHelpers.click)('.btn-danger');
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|No|Classification|found.|');
      await (0, _testHelpers.click)('.md-taxon .md-taxon .btn-info');
      await (0, _testHelpers.waitFor)('.md-taxon-form', {
        timeout: 2000,
        count: 1
      });
      assert.dom('.md-taxon-body').isVisible({
        count: 4
      });
      assert.dom('.md-taxon-body.md-spotlight-target').isVisible();
      await (0, _testHelpers.click)('.md-taxon-form footer .btn-info');

      // Template block usage — use fresh model to avoid mutation state from above
      this.freshModel = (0, _createTaxonomy.default)()[0].taxonomicClassification[0];
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdTaxonomy::Classification::Taxon @model={{this.freshModel}} @profilePath="foobar">
              template block text
            </Object::MdTaxonomy::Classification::Taxon>
          
      */
      {
        "id": "bmJGUjOi",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@model\",\"@profilePath\"],[[30,0,[\"freshModel\"]],\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-taxonomy/classification/taxon\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|No|Classification|found.|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-taxonomy",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0];
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-taxonomy/collection model=model profilePath="foobar"}}
      */
      {
        "id": "2PgLDgN6",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-taxonomy/collection\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Taxonomic|System|1|Add|OK|#|Title|0|More...|Delete|Classification|Kingdom|Fungi|(555705)|Kingdom|Edit|Delete|Add|Child|Subkingdom|Dikarya|(936287)|Edit|Delete|Add|Child|Division|Basidiomycota|(623881)|Edit|Delete|Add|Child|No|Classification|found.|Kingdom|Animalia|(202423)|Edit|Delete|Add|Child|Subkingdom|Radiata|(914153)|Edit|Delete|Add|Child|Phylum|Cnidaria|(48738)|Edit|Delete|Add|Child|Subphylum|Medusozoa|(718920)|Edit|Delete|Add|Child|Class|Scyphozoa|(51483)|Edit|Delete|Add|Child|Subclass|Discomedusae|(718923)|Edit|Delete|Add|Child|Order|Rhizostomeae|(51756)|Edit|Delete|Add|Child|Family|Rhizostomatidae|(51911)|Edit|Delete|Add|Child|Genus|Rhopilema|(51919)|Edit|Delete|Add|Child|Species|Rhopilema|verrilli|(51920)|mushroom|jellyfish|Edit|Delete|Add|Child|No|Classification|found.|Observers|1|Add|#|Role|Contacts|0|pointOfContact|?|×|Delete|General|Scope|General|Scope|Identification|Procedure|Identification|Procedure|Identification|Completeness|Identification|Completeness|No|Identification|Reference|found.|Add|Identification|Reference|Voucher|1|Add|OK|#|Specimen|0|Specimen|Edit|Delete|');
      var input = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');
      assert.equal(input, "Integrated Taxonomic Information System (ITIS)||Scope|Id Procedure|Id Completeness", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdTaxonomy::Collection @profilePath="foobar" @model={{hash}}>
              template block text
            </Object::MdTaxonomy::Collection>
          
      */
      {
        "id": "VbAGO8MG",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\"],[\"foobar\",[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-taxonomy/collection\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|No|Taxonomic|System|found.|Add|Taxonomic|System|Classification|No|Classification|found.|No|Observer|found.|Add|Observer|General|Scope|General|Scope|Identification|Procedure|Identification|Procedure|Identification|Completeness|Identification|Completeness|No|Identification|Reference|found.|Add|Identification|Reference|No|Voucher|found.|Add|Voucher|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/system/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-taxonomy",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection/system', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].taxonomicSystem[0];
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-taxonomy/collection/system model=model profilePath="foobar"}}
      */
      {
        "id": "TruY+BaO",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-taxonomy/collection/system\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Classification|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|Dates|1|Add|Date|#|Precision|Date|Date|Type|Description|0|Day|transmitted|?|×|Delete|Edition|Presentation|Form|×|webService|?|×|webSite|?|No|Responsible|Party|found.|Add|Responsible|Party|Online|Resource|1|Add|OK|#|Name|Uri|0|ITIS|website|https://www.itis.gov|Edit|Delete|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Series|Name|Issue|Page|Other|Details|1|Add|0|Delete|Graphic|1|Add|OK|0|itis_logo.jpg:|Edit|Delete|Modifications|Modifications|');
      var input = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');
      assert.equal(input, "Integrated Taxonomic Information System (ITIS)|2019-02-26|Taxa imported from ITIS||||||Retrieved from the Integrated Taxonomic Information System on-line database, https://www.itis.gov.|modifications", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdTaxonomy::Collection::System @model={{hash}} @profilePath="foobar">
              template block text
            </Object::MdTaxonomy::Collection::System>
          
      */
      {
        "id": "HsWf0NTj",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@model\",\"@profilePath\"],[[99,1,[\"@model\"]],\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-taxonomy/collection/system\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Classification|Authority|Basic|Information|Title|No|Alternate|Title|found.|Add|Alternate|Title|Dates|Add|Date|#|Precision|Date|Date|Type|Description|Add|Date|Edition|Presentation|Form|Responsible|Parties|Add|#|Role|Contacts|Add|Responsible|Party|No|Online|Resource|found.|Add|Online|Resource|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|No|Identifier|found.|Add|Identifier|Series|Name|Issue|Page|No|Other|Details|found.|Add|Other|Detail|No|Graphic|found.|Add|Graphic|Modifications|Modifications|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/system/preview/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-taxonomy",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection/system/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].taxonomicSystem[0];
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-taxonomy/collection/system/preview model=model profilePath="foobar"}}
      */
      {
        "id": "9qa9ExEq",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"profilePath\"],[[33,1],\"foobar\"]]]]],[],false,[\"object/md-taxonomy/collection/system/preview\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      var input = (0, _testHelpers.findAll)('input, textarea').mapBy('value').join('|');
      assert.equal(input, "Integrated Taxonomic Information System (ITIS)", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdTaxonomy::Collection::System::Preview @model={{hash}} @profilePath="foobar">
              template block text
            </Object::MdTaxonomy::Collection::System::Preview>
          
      */
      {
        "id": "Uu5CX6xM",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@model\",\"@profilePath\"],[[99,1,[\"@model\"]],\"foobar\"]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-taxonomy/collection/system/preview\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|");
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/collection/voucher/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-taxonomy",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md taxonomy/collection/voucher', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0].voucher[0];
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-taxonomy/collection/voucher profilePath="foobar" model=model}}
      */
      {
        "id": "aFwb1OcB",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-taxonomy/collection/voucher\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Specimen|Specimen|Repository|Role|custodian|?|×|Contacts|');
      var input = (0, _testHelpers.findAll)('input, textarea').mapBy('value').join('|');
      assert.equal(input, "Specimen|", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdTaxonomy::Collection::Voucher @profilePath="foobar" @model={{hash repository=(hash)}}>
              template block text
            </Object::MdTaxonomy::Collection::Voucher>
          
      */
      {
        "id": "1Ee9ZqkG",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\"],[\"foobar\",[28,[37,1],null,[[\"repository\"],[[28,[37,1],null,null]]]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-taxonomy/collection/voucher\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Specimen|Specimen|Repository|Role|Select|or|enter|a|role|Contacts|", 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-taxonomy/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "mdeditor/tests/helpers/create-taxonomy"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _createTaxonomy) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"mdeditor/tests/helpers/create-taxonomy",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md taxonomy', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = (0, _createTaxonomy.default)()[0];
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-taxonomy model=model index=0 profilePath="foobar"}}
      */
      {
        "id": "iSvBij8y",
        "block": "[[[1,[28,[35,0],null,[[\"model\",\"index\",\"profilePath\"],[[33,1],0,\"foobar\"]]]]],[],false,[\"object/md-taxonomy\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Collection|#0:|Integrated|Taxonomic|Information|System|(ITIS)|Edit|Collection|Delete|Collection|Kingdom|Fungi|(555705)|Kingdom|Kingdom|Animalia|(202423)|');
      await (0, _testHelpers.click)('li .icon');
      assert.equal((0, _testHelpers.find)('li').textContent.replace(/[\s\n]+/g, '|').trim(), '|Kingdom|Fungi|(555705)|Kingdom|Subkingdom|Dikarya|(936287)|Division|Basidiomycota|(623881)|No|Classification|found.|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdTaxonomy>
              template block text
            </Object::MdTaxonomy>
          
      */
      {
        "id": "b6uIkXi6",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-taxonomy\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Collection|#undefined|Edit|Collection|Delete|Collection|No|Classification|found.|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-time-period/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md time period', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      var date = new Date("2016-10-14T13:10:15-0800");
      this.model = [{
        "id": "id",
        "description": "description",
        "identifier": {
          "identifier": "identifier",
          "namespace": "namespace"
        },
        "periodName": ["periodName0", "periodName1"],
        "startDateTime": date,
        "endDateTime": "2016-12-31",
        "timeInterval": {
          "interval": 9,
          "units": "year"
        },
        "duration": {
          "years": 1,
          "months": 1,
          "days": 1,
          "hours": 1,
          "minutes": 1,
          "seconds": 1
        }
      }, {
        "id": "id",
        "description": "description",
        "identifier": {
          "identifier": "identifier",
          "namespace": "namespace"
        },
        "periodName": ["periodName0", "periodName1"],
        "startGeologicAge": {
          "ageTimeScale": "ageTimeScale",
          "ageEstimate": "ageEstimate"
        },
        "endGeologicAge": {
          "ageTimeScale": "ageTimeScale",
          "ageEstimate": "ageEstimate"
        }
      }];
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-time-period profilePath="foobar" model=(get model "0")}}
      */
      {
        "id": "YkY8sFka",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[28,[37,1],[[33,2],\"0\"],null]]]]]],[],false,[\"object/md-time-period\",\"get\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Time|Period|Dates|Precision|Year|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|Time|Unit|year|×|Duration|Years|Months|Days|Hours|Minutes|Seconds|');
      var input = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');
      assert.equal(input, '2016|2016|identifier|description|periodName0|periodName1|9|1|1|1|1|1|1', 'input values');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-time-period profilePath="foobar" model=model.lastObject}}
      */
      {
        "id": "WcoPBt8b",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1,[\"lastObject\"]]]]]]],[],false,[\"object/md-time-period\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      var input1 = (0, _testHelpers.findAll)('form input, form textarea').mapBy('value').join('|');
      assert.equal(input1, "||identifier|description|periodName0|periodName1|||||||", 'geologic input values');
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), "|Time|Period|Dates|Precision|Year|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Description|Time|Period|Names|2|Add|Time|Period|Name|0|Delete|1|Delete|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|", 'geologic age');
      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdTimePeriod @profilePath="foobar" @model={{hash}}>
              template block text
            </Object::MdTimePeriod>
          
      */
      {
        "id": "Bc+gYNwK",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\"],[\"foobar\",[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-time-period\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Time|Period|Dates|Precision|Year|Start|Date|End|Date|Pick|Fiscal|Year|Pick|a|Fiscal|Year|Identifier|Description|Description|No|Time|Period|Name|found.|Add|Time|Period|Name|Interval|Interval|Amount|Time|Unit|Choose|unit|of|time|Duration|Years|Months|Days|Hours|Minutes|Seconds|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-transfer/component-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit"], function (_templateFactory, _testHelpers, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/test-helpers",0,"qunit",0,"ember-qunit",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md transfer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.model = {
        "unitsOfDistribution": "unitsOfDistribution",
        "transferSize": 9.9,
        "onlineOption": [{
          "uri": "http://adiwg.org"
        }, {
          "uri": "http://adiwg.org/"
        }],
        "offlineOption": [{
          "mediumSpecification": {
            "title": "title0"
          }
        }, {
          "mediumSpecification": {
            "title": "title1"
          }
        }],
        "transferFrequency": {
          "months": 9
        },
        "distributionFormat": [{
          "formatSpecification": {
            "title": "title0"
          }
        }, {
          "formatSpecification": {
            "title": "title1"
          }
        }]
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-transfer profilePath="foobar" model=model}}
      */
      {
        "id": "S/DNIaVk",
        "block": "[[[1,[28,[35,0],null,[[\"profilePath\",\"model\"],[\"foobar\",[33,1]]]]]],[],false,[\"object/md-transfer\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Transfer|Size|(MB)|Distribution|units|Online|Option|2|Add|OK|#|Name|Uri|0|Not|Defined|http://adiwg.org|Edit|Delete|1|Not|Defined|http://adiwg.org/|Edit|Delete|Offline|Option|2|Add|OK|#|Title|0|title0|Edit|Delete|1|title1|Edit|Delete|Distribution|Formats|2|Add|#|Format|Name|Version|Compression|Method|URL|0|Delete|1|Delete|Transfer|Frequency|Years|Months|Days|Hours|Minutes|Seconds|');
      var input = (0, _testHelpers.findAll)('form input').mapBy('value').join('|');
      assert.equal(input, "9.9|unitsOfDistribution|title0||||title1|||||9||||", 'input values');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Object::MdTransfer @profilePath="foobar" @model={{hash}}>
              template block text
            </Object::MdTransfer>
          
      */
      {
        "id": "4bOLSqxp",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@profilePath\",\"@model\"],[\"foobar\",[99,1,[\"@model\"]]]],[[\"default\"],[[[[1,\"\\n        template block text\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"object/md-transfer\",\"hash\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|Transfer|Size|(MB)|Distribution|units|No|Online|Option|found.|Add|Online|Option|No|Offline|Option|found.|Add|Offline|Option|No|Distribution|Format|found.|Add|Distribution|Format|Transfer|Frequency|Years|Months|Days|Hours|Minutes|Seconds|template|block|text|', 'block');
    });
  });
});
define("mdeditor/tests/integration/pods/components/object/md-transfer/preview/component-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/test-helpers",0,"@ember/template-factory"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Integration | Component | object/md-transfer/preview', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      this.model = {
        "unitsOfDistribution": "unitsOfDistribution",
        "transferSize": 9.9,
        "onlineOption": [{
          "uri": "http://adiwg.org"
        }, {
          "uri": "http://adiwg.org/"
        }],
        "offlineOption": [{
          "mediumSpecification": {
            "title": "title0"
          }
        }, {
          "mediumSpecification": {
            "title": "title1"
          }
        }],
        "transferFrequency": {
          "months": 9
        },
        "distributionFormat": [{
          "formatSpecification": {
            "title": "title0"
          }
        }, {
          "formatSpecification": {
            "title": "title1"
          }
        }]
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        {{object/md-transfer/preview item=model}}
      */
      {
        "id": "lMcTa4Bb",
        "block": "[[[1,[28,[35,0],null,[[\"item\"],[[33,1]]]]]],[],false,[\"object/md-transfer/preview\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|9.9|yes(2)|yes(2)|yes(2)|');

      // Template block usage:
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            {{#object/md-transfer/preview isTable=false item=model as |t|}}
              transferSize: {{t.transferSize}}
            {{/object/md-transfer/preview}}
          
      */
      {
        "id": "f2mFvMHY",
        "block": "[[[1,\"\\n\"],[6,[39,0],null,[[\"isTable\",\"item\"],[false,[33,1]]],[[\"default\"],[[[[1,\"        transferSize: \"],[1,[30,1,[\"transferSize\"]]],[1,\"\\n\"]],[1]]]]],[1,\"    \"]],[\"t\"],false,[\"object/md-transfer/preview\",\"model\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(this.element.textContent.replace(/[\s\n]+/g, '|').trim(), '|transferSize:|9.9|');
    });
  });
});
define("mdeditor/tests/test-helper", ["mdeditor/app", "mdeditor/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"mdeditor/app",0,"mdeditor/config/environment",0,"@ember/test-helpers",0,"ember-qunit"eaimeta@70e063a35619d71f
  const debugLookup = typeof window !== 'undefined' && /[?&]debugLookup=1(?:&|$)/.test(window.location.search);
  if (debugLookup) {
    window.__DEBUG_LOOKUP_AFTER_DESTROY__ = true;
    window.__DEBUG_LOOKUP_BREAK__ = /[?&]debugLookupBreak=1(?:&|$)/.test(window.location.search);
  }
  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  // Ignore a known teardown-only global error emitted after test completion.
  if (!debugLookup) {
    window.onerror = function (message) {
      if (typeof message === 'string' && message.includes('Can not call `.lookup` after the owner has been destroyed')) {
        return false;
      }
      return true;
    };
  }
  (0, _emberQunit.start)();
});
define("mdeditor/tests/unit/adapters/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      var adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
    (0, _qunit.test)('it has a importData method', function (assert) {
      var adapter = this.owner.lookup('adapter:application');
      assert.ok(typeof adapter.importData === 'function');
    });
    (0, _qunit.test)('it has a exportData method', function (assert) {
      var adapter = this.owner.lookup('adapter:application');
      assert.ok(typeof adapter.exportData === 'function');
    });
  });
});
define("mdeditor/tests/unit/helpers/bbox-to-poly-test", ["mdeditor/helpers/bbox-to-poly", "qunit"], function (_bboxToPoly, _qunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"mdeditor/helpers/bbox-to-poly",0,"qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Helper | bbox to poly', function () {
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _bboxToPoly.bboxToPoly)([{
        southLatitude: 1,
        northLatitude: 2,
        westLongitude: 3,
        eastLongitude: 4
      }]);
      assert.equal("[[1,3],[2,3],[2,4],[1,4]]", JSON.stringify(result));
    });
  });
});
define("mdeditor/tests/unit/helpers/get-dash-test", ["mdeditor/helpers/get-dash", "qunit"], function (_getDash, _qunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"mdeditor/helpers/get-dash",0,"qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Helper | get dash', function () {
    (0, _qunit.test)('it works', function (assert) {
      let obj = {
        foo: 'bar'
      };
      let result = (0, _getDash.getDash)([obj, 'foo']);
      assert.equal(result, 'bar', 'value');
      result = (0, _getDash.getDash)([obj, 'biz']);
      assert.equal(result, '--', 'dash');
    });
  });
});
define("mdeditor/tests/unit/helpers/make-range-test", ["mdeditor/helpers/make-range", "qunit"], function (_makeRange, _qunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"mdeditor/helpers/make-range",0,"qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Helper | make range', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _makeRange.makeRange)([42]);
      assert.ok(result);
    });
  });
});
define("mdeditor/tests/unit/helpers/md-markdown-test", ["mdeditor/helpers/md-markdown", "qunit"], function (_mdMarkdown, _qunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"mdeditor/helpers/md-markdown",0,"qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Helper | md markdown', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _mdMarkdown.mdMarkdown)('# Test');
      assert.equal(result.string.trim(), '<p>#</p>');
    });
  });
});
define("mdeditor/tests/unit/helpers/mod-test", ["mdeditor/helpers/mod", "qunit"], function (_mod, _qunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"mdeditor/helpers/mod",0,"qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Helper | mod', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = (0, _mod.mod)([42]);
      assert.ok(result);
    });
  });
});
define("mdeditor/tests/unit/initializers/leaflet-test", ["@ember/application", "@ember/runloop", "mdeditor/initializers/leaflet", "qunit"], function (_application, _runloop, _leaflet, _qunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"@ember/runloop",0,"mdeditor/initializers/leaflet",0,"qunit"eaimeta@70e063a35619d71f
  let application;
  (0, _qunit.module)('Unit | Initializer | leaflet', function (hooks) {
    hooks.beforeEach(function () {
      (0, _runloop.run)(function () {
        application = _application.default.create();
        application.deferReadiness();
      });
    });

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      _leaflet.default.initialize(application);

      // you would normally confirm the results of the initializer here
      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/initializers/local-storage-export-test", ["@ember/application", "@ember/runloop", "mdeditor/initializers/local-storage-export", "qunit", "mdeditor/tests/helpers/destroy-app"], function (_application, _runloop, _localStorageExport, _qunit, _destroyApp) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"@ember/runloop",0,"mdeditor/initializers/local-storage-export",0,"qunit",0,"mdeditor/tests/helpers/destroy-app"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Initializer | local storage export', function (hooks) {
    hooks.beforeEach(function () {
      (0, _runloop.run)(() => {
        this.application = _application.default.create();
        this.application.deferReadiness();
      });
    });
    hooks.afterEach(function () {
      (0, _destroyApp.default)(this.application);
    });

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      (0, _localStorageExport.initialize)(this.application);

      // you would normally confirm the results of the initializer here
      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/instance-initializers/profile-test", ["@ember/application", "@ember/runloop", "mdeditor/instance-initializers/profile", "qunit", "mdeditor/tests/helpers/destroy-app"], function (_application, _runloop, _profile, _qunit, _destroyApp) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"@ember/runloop",0,"mdeditor/instance-initializers/profile",0,"qunit",0,"mdeditor/tests/helpers/destroy-app"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Instance Initializer | profile', function (hooks) {
    hooks.beforeEach(function () {
      (0, _runloop.run)(() => {
        this.application = _application.default.create();
        this.appInstance = this.application.buildInstance();
      });
    });
    hooks.afterEach(function () {
      (0, _runloop.run)(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    });

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      (0, _profile.initialize)(this.appInstance);

      // you would normally confirm the results of the initializer here
      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/instance-initializers/route-publish-test", ["@ember/application", "@ember/runloop", "mdeditor/instance-initializers/route-publish", "qunit", "mdeditor/tests/helpers/destroy-app", "@ember/service"], function (_application, _runloop, _routePublish, _qunit, _destroyApp, _service) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"@ember/runloop",0,"mdeditor/instance-initializers/route-publish",0,"qunit",0,"mdeditor/tests/helpers/destroy-app",0,"@ember/service"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Instance Initializer | route publish', function (hooks) {
    hooks.beforeEach(function () {
      (0, _runloop.run)(() => {
        this.application = _application.default.create();
        this.appInstance = this.application.buildInstance();
      });
    });
    hooks.afterEach(function () {
      (0, _runloop.run)(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    });
    (0, _qunit.test)('it works', function (assert) {
      let a = [{
        route: 'test'
      }];
      this.appInstance.register('service:publish', _service.default.extend({
        catalogs: a
      }));
      (0, _routePublish.initialize)(this.appInstance);
      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/instance-initializers/settings-sciencebase-test", ["@ember/application", "@ember/runloop", "mdeditor/instance-initializers/settings-sciencebase", "qunit", "mdeditor/tests/helpers/destroy-app", "@ember/service"], function (_application, _runloop, _settingsSciencebase, _qunit, _destroyApp, _service) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"@ember/runloop",0,"mdeditor/instance-initializers/settings-sciencebase",0,"qunit",0,"mdeditor/tests/helpers/destroy-app",0,"@ember/service"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Instance Initializer | settings sciencebase', function (hooks) {
    hooks.beforeEach(function () {
      (0, _runloop.run)(() => {
        this.application = _application.default.create();
        this.appInstance = this.application.buildInstance();
      });
    });
    hooks.afterEach(function () {
      (0, _runloop.run)(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    });
    let a = [];

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      this.appInstance.register('service:publish', _service.default.extend({
        catalogs: a
      }));
      (0, _settingsSciencebase.initialize)(this.appInstance);

      // you would normally confirm the results of the initializer here
      assert.ok(this.appInstance.lookup('service:publish').catalogs.findBy('route', 'sciencebase'));
    });
  });
});
define("mdeditor/tests/unit/instance-initializers/settings-test", ["@ember/application", "@ember/runloop", "mdeditor/instance-initializers/settings", "qunit", "mdeditor/tests/helpers/destroy-app"], function (_application, _runloop, _settings, _qunit, _destroyApp) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"@ember/runloop",0,"mdeditor/instance-initializers/settings",0,"qunit",0,"mdeditor/tests/helpers/destroy-app"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Instance Initializer | settings', function (hooks) {
    hooks.beforeEach(function () {
      (0, _runloop.run)(() => {
        this.application = _application.default.create();
        this.appInstance = this.application.buildInstance();
      });
    });
    hooks.afterEach(function () {
      (0, _runloop.run)(this.appInstance, 'destroy');
      (0, _destroyApp.default)(this.application);
    });

    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      (0, _settings.initialize)(this.appInstance);

      // you would normally confirm the results of the initializer here
      assert.ok(true);
    });
  });
});
define("mdeditor/tests/unit/mixins/scroll-to-test", ["@ember/object", "mdeditor/mixins/scroll-to", "qunit"], function (_object, _scrollTo, _qunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"mdeditor/mixins/scroll-to",0,"qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Mixin | scroll to', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let ScrollToObject = _object.default.extend(_scrollTo.default);
      let subject = ScrollToObject.create();
      assert.ok(subject);
    });
  });
});
define("mdeditor/tests/unit/models/base-test", ["qunit", "ember-qunit", "@ember/runloop"], function (_qunit, _emberQunit, _runloop) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/runloop"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Model | base', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let model = (0, _runloop.run)(() => this.owner.lookup('service:store').modelFor('base'));
      // let store = this.store();
      assert.equal(model.modelName, 'base');
    });
    (0, _qunit.test)('clears dirty hash across repeated save cycles', function (assert) {
      const store = this.owner.lookup('service:store');
      const model = (0, _runloop.run)(() => store.push({
        data: {
          id: 'contact-base-regression',
          type: 'contact',
          attributes: {
            json: {
              contactId: 'contact-base-regression',
              isOrganization: false,
              name: 'Initial Name',
              positionName: null,
              memberOfOrganization: [],
              logoGraphic: [],
              phone: [],
              address: [],
              electronicMailAddress: [],
              externalIdentifier: [],
              onlineResource: [],
              hoursOfService: []
            },
            dateUpdated: new Date().toISOString()
          }
        }
      }));

      // Avoid async side effects from pouch updates in unit scope.
      model.pouch = {
        updatePouchRecord() {}
      };
      (0, _runloop.run)(() => {
        model.isReady();
      });
      assert.false(model.hasDirtyHash, 'starts clean');
      (0, _runloop.run)(() => {
        model.set('json.name', 'First Edit');
        model.notifyPropertyChange('currentHash');
      });
      assert.true(model.hasDirtyHash, 'becomes dirty after first edit');
      (0, _runloop.run)(() => {
        model.updateTimestamp();
        model.wasUpdated();
      });
      assert.false(model.hasDirtyHash, 'clears after first save cycle');
      (0, _runloop.run)(() => {
        model.set('json.name', 'Second Edit');
        model.notifyPropertyChange('currentHash');
      });
      assert.true(model.hasDirtyHash, 'becomes dirty after second edit');
      (0, _runloop.run)(() => {
        model.updateTimestamp();
        model.wasUpdated();
      });
      assert.false(model.hasDirtyHash, 'clears after second save cycle');
    });
  });
});
define("mdeditor/tests/unit/models/contact-test", ["qunit", "ember-qunit", "@ember/runloop"], function (_qunit, _emberQunit, _runloop) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/runloop"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Model | contact', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let model = (0, _runloop.run)(() => this.owner.lookup('service:store').createRecord('contact'));
      // var store = this.store();
      assert.ok(!!model);
    });
    (0, _qunit.test)('should correctly compute title', function (assert) {
      const me = (0, _runloop.run)(() => this.owner.lookup('service:store').createRecord('contact'));
      assert.expect(3);
      me.set('json.name', 'bar');
      me.set('json.positionName', 'foo');
      assert.equal(me.get('title'), 'bar');
      me.set('json.name', null);
      me.set('json.isOrganization', false);
      assert.equal(me.get('title'), 'foo');
      me.set('json.isOrganization', true);
      assert.equal(me.get('title'), null);
    });
    (0, _qunit.test)('should correctly compute icon', function (assert) {
      const me = (0, _runloop.run)(() => this.owner.lookup('service:store').createRecord('contact'));
      assert.expect(2);
      me.set('json.isOrganization', true);
      assert.equal(me.get('icon'), 'users');
      me.set('json.isOrganization', false);
      assert.equal(me.get('icon'), 'user');
    });
  });
});
define("mdeditor/tests/unit/models/dictionary-test", ["qunit", "ember-qunit", "@ember/runloop"], function (_qunit, _emberQunit, _runloop) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/runloop"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Model | dictionary', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var model = (0, _runloop.run)(() => this.owner.lookup('service:store').createRecord('dictionary'));
      // var store = this.store();
      assert.ok(!!model);
    });
    (0, _qunit.test)('should correctly compute title', function (assert) {
      const me = (0, _runloop.run)(() => this.owner.lookup('service:store').createRecord('dictionary'));
      assert.expect(1);
      me.set('json.dataDictionary.citation.title', 'bar');
      assert.equal(me.get('title'), 'bar');
    });
  });
});
define("mdeditor/tests/unit/models/record-test", ["qunit", "ember-qunit", "@ember/runloop"], function (_qunit, _emberQunit, _runloop) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/runloop"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Model | record', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var model = (0, _runloop.run)(() => this.owner.lookup('service:store').createRecord('record'));
      // var store = this.store();
      assert.ok(!!model);
    });
    (0, _qunit.test)('should correctly compute title', function (assert) {
      const me = (0, _runloop.run)(() => this.owner.lookup('service:store').createRecord('record'));
      assert.expect(1);
      me.set('json.metadata.resourceInfo.citation.title', 'foo');
      assert.equal(me.get('title'), 'foo');
    });
    (0, _qunit.test)('should correctly compute icon', function (assert) {
      const me = (0, _runloop.run)(() => this.owner.lookup('service:store').createRecord('record'));
      const list = this.owner.lookup('service:icon');
      assert.expect(1);
      me.set('json.metadata.resourceInfo.resourceType.firstObject.type', 'project');
      assert.equal(me.get('icon'), list.get('project'));
    });
  });
});
define("mdeditor/tests/unit/models/setting-test", ["qunit", "ember-qunit", "@ember/runloop"], function (_qunit, _emberQunit, _runloop) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"@ember/runloop"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Model | setting', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let model = (0, _runloop.run)(() => this.owner.lookup('service:store').createRecord('setting'));
      // let store = this.store();
      assert.ok(!!model);
    });
  });
});
define("mdeditor/tests/unit/pods/breadcrumbs/service-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | breadcrumbs', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // TODO: Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:breadcrumbs');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/new/id/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | contact/new/id', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact/new/id');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/new/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | contact/new/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact/new/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/show/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | contact/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:contact/show/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/show/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | contact/show/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact/show/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contact/show/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | contact/show', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:contact/show');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/contacts/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | contacts', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:contacts');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dashboard/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dashboard', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dashboard');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionaries/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionaries', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionaries');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/new/id/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/new/id', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/new/id');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/new/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/new/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/new/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/item/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit/item', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit/item');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/domain/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/domain', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/domain');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/attribute/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/attribute/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/attribute/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/attribute/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/attribute', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/attribute');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/import/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/import', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/import');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/entity/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/entity', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/edit/entity');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionary/show/edit/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionary/show/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:dictionary/show/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/dictionary/show/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | dictionary/show', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:dictionary/show');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/error/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | error', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:error');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/export/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | save', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:save');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/help/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | help', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:help');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/import/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | import', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:import');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/not-found/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | not found', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:not-found');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/publish/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | publish/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:publish/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/new/id/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/new/id', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/new/id');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/new/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/new/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/new/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/associated/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/associated/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/associated/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/associated/resource/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/associated/resource/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/associated/resource/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/associated/resource/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/associated/resource', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/associated/resource');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/associated/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/edit/associated', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/associated');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/constraint/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/constraint/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/constraint/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/constraint/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/constraint', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/constraint');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/coverages/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/edit/coverages', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/coverages');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/dictionary/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/dictionary', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/dictionary');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/distributor/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/distributor/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/distributor/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/distributor/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/distributor', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/distributor');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/distributor/transfer/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/distributor/transfer', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/distributor/transfer');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/distribution/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/distribution/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/distribution/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/edit/distribution', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/distribution');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/documents/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/documents/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/documents/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/documents/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/documents/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/documents/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/documents/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/documents/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/documents/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/documents/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/edit/documents', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/documents');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/extent/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/extent/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/extent/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/funding/allocation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/funding/allocation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/funding/allocation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/funding/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/funding/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/funding/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/funding/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/funding', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/funding');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/grid/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/edit/grid', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/grid');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/keywords/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/keywords/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/keywords/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/keywords/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/edit/keywords', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit/keywords');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/keywords/thesaurus/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/keywords/thesaurus', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/keywords/thesaurus');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/source/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/source/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/source/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/source/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/source', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/source');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/step/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/step/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/step/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/step/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/lineage/lineageobject/step/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/lineage/lineageobject/step', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/lineage/lineageobject/step');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/citation/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/main/citation/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/citation/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/citation/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/main/citation/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/citation/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/citation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/main/citation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/citation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/main/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/main/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/main', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/main');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/alternate/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/alternate/identifier');
      assert.ok(route);
    });
    (0, _qunit.test)('setupModel resolves identifiers from native arrays', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/alternate/identifier');
      let identifier = {
        identifier: 'alternate-id-0'
      };
      route.identifierId = '0';
      route.modelFor = function () {
        return {
          identifier: [identifier]
        };
      };
      assert.strictEqual(route.setupModel(), identifier);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/alternate/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/alternate/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/alternate/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/alternate', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/alternate');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/identifier');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/parent/identifier/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/parent/identifier', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/parent/identifier');
      assert.ok(route);
    });
    (0, _qunit.test)('setupModel resolves identifiers from native arrays', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/parent/identifier');
      let identifier = {
        identifier: 'parent-id-0'
      };
      route.identifierId = '0';
      route.modelFor = function () {
        return {
          get(path) {
            if (path === 'json.metadata.metadataInfo.parentMetadata.identifier') {
              return [identifier];
            }
            return undefined;
          }
        };
      };
      assert.strictEqual(route.setupModel(), identifier);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/parent/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/parent/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/parent/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/parent/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/metadata/parent', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata/parent');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/metadata/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/metadata', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/metadata');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show/edit');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/extent/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/extent/spatial', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/extent/spatial');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/spatial/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/raster/attribute/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/spatial/raster/attribute', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial/raster/attribute');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/raster/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/spatial/raster/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial/raster/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/raster/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/spatial/raster', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial/raster');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/spatial/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/spatial', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/spatial');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/itis/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/itis', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/itis');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/system/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/system/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/system/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/collection/system/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/collection/system', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/collection/system');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/edit/taxonomy/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/edit/taxonomy', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/edit/taxonomy');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:record/show');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/record/show/translate/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | record/show/translate', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:record/show/translate');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/records/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | records', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:records');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | settings/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/main/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | settings/main', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/main');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/index/controller-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Controller | settings/profile/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:settings/profile/index');
      assert.ok(controller);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/index/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | settings/profile/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/profile/index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/manage/controller-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Controller | settings/profile/manage', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:settings/profile/manage');
      assert.ok(controller);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/manage/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | settings/profile/manage', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/profile/manage');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/profile/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | settings/profile', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/profile');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | settings', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:settings');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/validation/controller-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Controller | settings/validation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:settings/validation');
      assert.ok(controller);
    });
  });
});
define("mdeditor/tests/unit/pods/settings/validation/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | settings/validation', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:settings/validation');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/pods/translate/route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | translate', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:translate');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/routes/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:application');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/routes/import-dictionary-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | import - mdJSON Dictionary Handling', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('formatMdJSON should populate mdDictionary array from dataDictionary', function (assert) {
      let route = this.owner.lookup('route:import');

      // Mock mdJSON with dataDictionary array
      let mockMdJSON = {
        metadata: {
          metadataInfo: {
            metadataIdentifier: {
              identifier: 'test-123',
              namespace: 'urn:uuid'
            }
          }
        },
        contact: [],
        dataDictionary: [{
          dictionaryId: 'dict-id-1',
          citation: {
            title: 'Dictionary 1'
          }
        }, {
          dictionaryId: 'dict-id-2',
          citation: {
            title: 'Dictionary 2'
          }
        }]
      };
      let result = route.formatMdJSON(mockMdJSON);

      // Find the record item
      let recordItem = result.findBy('type', 'records');
      assert.ok(recordItem, 'Should create a record item');

      // Parse the JSON to check if mdDictionary was populated
      let recordJson = JSON.parse(recordItem.attributes.json);
      assert.ok(recordJson.mdDictionary, 'Record should have mdDictionary array');
      assert.equal(recordJson.mdDictionary.length, 2, 'mdDictionary should have 2 entries');
      assert.ok(recordJson.mdDictionary.includes('dict-id-1'), 'Should include dict-id-1');
      assert.ok(recordJson.mdDictionary.includes('dict-id-2'), 'Should include dict-id-2');

      // Check that dictionary items were created
      let dictItems = result.filterBy('type', 'dictionaries');
      assert.equal(dictItems.length, 2, 'Should create 2 dictionary items');
    });
    (0, _qunit.test)('formatMdJSON should remove mdDictionary array from imported mdJSON', function (assert) {
      let route = this.owner.lookup('route:import');

      // Mock mdJSON with invalid mdDictionary array (shouldn't be there per schema)
      let mockMdJSON = {
        metadata: {
          metadataInfo: {
            metadataIdentifier: {
              identifier: 'test-123',
              namespace: 'urn:uuid'
            }
          }
        },
        contact: [],
        mdDictionary: ['should-be-removed'],
        // This shouldn't be in mdJSON per schema
        dataDictionary: []
      };
      let result = route.formatMdJSON(mockMdJSON);

      // The original mdJSON object should have mdDictionary removed
      assert.notOk(mockMdJSON.mdDictionary, 'mdDictionary should be removed from imported mdJSON');

      // Find the record item
      let recordItem = result.findBy('type', 'records');
      let recordJson = JSON.parse(recordItem.attributes.json);

      // The record should not have the invalid mdDictionary from import
      assert.notOk(recordJson.mdDictionary, 'Record should not inherit invalid mdDictionary from import');
    });
    (0, _qunit.test)('formatMdJSON should handle dataDictionary without dictionaryId', function (assert) {
      let route = this.owner.lookup('route:import');

      // Mock mdJSON with dataDictionary entries that don't have dictionaryId
      let mockMdJSON = {
        metadata: {
          metadataInfo: {
            metadataIdentifier: {
              identifier: 'test-123',
              namespace: 'urn:uuid'
            }
          }
        },
        contact: [],
        dataDictionary: [{
          citation: {
            title: 'Dictionary without ID'
          }
          // Missing dictionaryId
        }, {
          dictionaryId: 'dict-id-1',
          citation: {
            title: 'Dictionary with ID'
          }
        }]
      };
      let result = route.formatMdJSON(mockMdJSON);

      // Find the record item
      let recordItem = result.findBy('type', 'records');
      let recordJson = JSON.parse(recordItem.attributes.json);

      // mdDictionary should only include entries with dictionaryId
      assert.ok(recordJson.mdDictionary, 'Record should have mdDictionary array');
      assert.equal(recordJson.mdDictionary.length, 1, 'mdDictionary should have 1 entry (only the one with ID)');
      assert.ok(recordJson.mdDictionary.includes('dict-id-1'), 'Should include dict-id-1');
    });
  });
});
define("mdeditor/tests/unit/routes/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      var route = this.owner.lookup('route:index');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/routes/publish/sciencebase-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Route | publish/sciencebase', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:publish/sciencebase');
      assert.ok(route);
    });
  });
});
define("mdeditor/tests/unit/serializers/application-test", ["@ember/runloop", "ember-data", "qunit", "ember-qunit"], function (_runloop, _emberData, _qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"ember-data",0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Serializer | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it serializes records', function (assert) {
      assert.expect(2);
      let serializer = this.owner.lookup('serializer:application');
      let store = this.owner.lookup('service:store');
      let record;
      const expected = {
        "data": {
          "attributes": {
            "name": "foo",
            "skill": "bar",
            "games-played": "[100,200]"
          },
          "type": "tests"
        }
      };
      const data = {
        id: 1,
        name: 'foo',
        skill: 'bar',
        gamesPlayed: [100, 200]
      };
      let model = _emberData.default.Model.extend({
        name: _emberData.default.attr(),
        skill: _emberData.default.attr(),
        gamesPlayed: _emberData.default.attr('json')
      });
      this.owner.register('model:test', model);
      (0, _runloop.run)(function () {
        record = store.createRecord('test', data);
      });
      assert.deepEqual(record.serialize(), expected, 'record serialized OK');
      assert.deepEqual(serializer.serialize(record._createSnapshot()), expected, 'serialized snapshot OK');
    });
  });
});
define("mdeditor/tests/unit/services/cleaner-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | cleaner', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:cleaner');
      const obj = {
        test: [[], {}, '', null, undefined],
        foo: 'bar',
        bar: null,
        biz: {},
        baz: {
          foo: [undefined]
        },
        jim: [{
          jam: ''
        }],
        hey: {
          ya: ['', 'keep', true, false],
          zoo: []
        }
      };
      assert.ok(service);
      assert.equal(JSON.stringify(service.clean(obj, {
        preserveArrays: true,
        preserveRootOnly: false
      })), '{"test":[[]],"foo":"bar","baz":{"foo":[]},"jim":[],"hey":{"ya":["keep",true,false],"zoo":[]}}', 'preserveArrays: true, preserveRootOnly: false');
      assert.equal(JSON.stringify(service.clean(obj)), '{"test":[],"foo":"bar","jim":[],"hey":{"ya":["keep",true,false]}}', 'preserveArrays: true, preserveRootOnly: true');
      assert.equal(JSON.stringify(service.clean(obj, {
        preserveArrays: false,
        preserveRootOnly: true
      })), '{"foo":"bar","hey":{"ya":["keep",true,false]}}', 'preserveArrays: false, preserveRootOnly: true');
    });
  });
});
define("mdeditor/tests/unit/services/codelist-test", ["qunit", "ember-qunit", "mdcodes/resources/js/mdcodes.js"], function (_qunit, _emberQunit, _mdcodes) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit",0,"mdcodes/resources/js/mdcodes.js"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | codelist', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('all codelists are present', function (assert) {
      var service = this.owner.lookup('service:codelist');
      Object.keys(_mdcodes.default).forEach(function (key) {
        if (key === 'default') return;
        const name = key.replace(/^(iso_|adiwg_)/, '');
        assert.ok(service.get(name), name + ' is present.');
      });
    });
  });
});
define("mdeditor/tests/unit/services/contacts-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | contacts', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:contacts');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/custom-profile-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | custom-profile', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:custom-profile');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/icon-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | icon', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      var service = this.owner.lookup('service:icon');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/itis-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | itis', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:itis');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/jsonvalidator-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | jsonvalidator', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('test jsonapi validation', function (assert) {
      var service = this.owner.lookup('service:jsonvalidator');
      var obj = {
        "data": [{
          "id": "8ke11eu1",
          "attributes": {
            "profile": "full",
            "json": "{}",
            "date-updated": "2016-09-16T22:08:04.425Z"
          },
          "type": "records",
          "meta": {
            "title": "ytr",
            "export": true
          }
        }, {
          "id": "spt9cadc",
          "attributes": {
            "json": "{}",
            "date-updated": "2016-09-16T22:08:11.080Z"
          },
          "type": "contacts",
          "meta": {
            "title": "ewrrrrrrrrrrrrrr",
            "export": true
          }
        }]
      };
      assert.ok(service.validator.validate('jsonapi', obj));
    });
  });
});
define("mdeditor/tests/unit/services/keycloak-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | keycloak', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:keycloak');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/keyword-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | keyword', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:keyword');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/mdjson-dictionary-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | mdjson - Dictionary Export/Import', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('formatRecord with includeDictionaries=false should not include dataDictionary array', function (assert) {
      let service = this.owner.lookup('service:mdjson');

      // Create a mock record with mdDictionary array
      let mockRecord = {
        json: {
          metadata: {
            metadataInfo: {
              metadataIdentifier: {
                identifier: 'test-123',
                namespace: 'urn:uuid'
              }
            }
          },
          mdDictionary: ['dict-id-1', 'dict-id-2']
        },
        get: function (path) {
          if (path === 'json') {
            return this.json;
          }
          if (path === 'json.mdDictionary') {
            return this.json.mdDictionary;
          }
          return null;
        }
      };

      // Mock the cleaner service
      service.cleaner = {
        clean: function (obj) {
          return JSON.parse(JSON.stringify(obj));
        }
      };

      // Mock the contacts service
      service.contacts = {
        get: function () {
          return {
            contacts: []
          };
        }
      };

      // Mock store to return empty arrays
      service.store = {
        peekAll: function () {
          return {
            filterBy: function () {
              return {
                findBy: function () {
                  return null;
                }
              };
            },
            mapBy: function () {
              return [];
            }
          };
        }
      };

      // Test with includeDictionaries = false (mdJSON export)
      let result = service.formatRecord(mockRecord, false, false);

      // The result should not have a dataDictionary array
      assert.notOk(result.dataDictionary, 'mdJSON export should not include dataDictionary array');
      assert.notOk(result.mdDictionary, 'mdJSON export should not include mdDictionary array');

      // Test with includeDictionaries = true (default, mdEditor-JSON export)
      let resultWithDicts = service.formatRecord(mockRecord, false, true);

      // The result should have a dataDictionary array (empty in this case since we mocked empty store)
      assert.ok(Object.prototype.hasOwnProperty.call(resultWithDicts, 'dataDictionary'), 'mdEditor-JSON export should include dataDictionary array');
    });
    (0, _qunit.test)('formatRecord with default parameters should include dictionaries', function (assert) {
      let service = this.owner.lookup('service:mdjson');

      // Create a mock record
      let mockRecord = {
        json: {
          metadata: {
            metadataInfo: {
              metadataIdentifier: {
                identifier: 'test-123',
                namespace: 'urn:uuid'
              }
            }
          }
        },
        get: function (path) {
          if (path === 'json') {
            return this.json;
          }
          if (path === 'json.mdDictionary') {
            return [];
          }
          return null;
        }
      };

      // Mock the cleaner service
      service.cleaner = {
        clean: function (obj) {
          return JSON.parse(JSON.stringify(obj));
        }
      };

      // Mock the contacts service
      service.contacts = {
        get: function () {
          return {
            contacts: []
          };
        }
      };

      // Mock store to return empty arrays
      service.store = {
        peekAll: function () {
          return {
            filterBy: function () {
              return {
                findBy: function () {
                  return null;
                }
              };
            },
            mapBy: function () {
              return [];
            }
          };
        }
      };

      // Test with default parameters (should include dictionaries)
      let result = service.formatRecord(mockRecord);

      // The result should have a dataDictionary array (even if empty)
      assert.ok(Object.prototype.hasOwnProperty.call(result, 'dataDictionary'), 'Default formatRecord should include dataDictionary array');
    });
  });
});
define("mdeditor/tests/unit/services/mdjson-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | mdjson', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:mdjson');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/patch-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | patch', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:patch');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/profile-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | profile', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      var service = this.owner.lookup('service:profile');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/publish-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | publish', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:publish');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/schemas-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | schemas', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:schemas');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/settings-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | settings', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:settings');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/slider-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | slider', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:slider');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/services/spotlight-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Service | spotlight', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:spotlight');
      assert.ok(service);
    });
  });
});
define("mdeditor/tests/unit/transforms/json-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Transform | json', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it deserialized', function (assert) {
      let transform = this.owner.lookup('transform:json');
      let obj = transform.deserialize('{"foo":"bar"}');
      assert.equal(obj.get('foo'), "bar");
      assert.equal(Object.keys(obj)[0], 'foo');
      assert.equal(Object.keys(obj).length, 1);
    });
    (0, _qunit.test)('it serialized', function (assert) {
      let transform = this.owner.lookup('transform:json');
      assert.equal(transform.serialize({
        foo: 'bar'
      }), '{"foo":"bar"}');
    });
  });
});
define("mdeditor/tests/unit/utils/config-test", ["mdeditor/utils/config", "qunit"], function (_config, _qunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"mdeditor/utils/config",0,"qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Utility | config', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      let result = _config.default.name;
      assert.equal(result, 'ScienceBase');
    });
  });
});
define("mdeditor/tests/unit/utils/md-interpolate-test", ["mdeditor/utils/md-interpolate", "qunit"], function (_mdInterpolate, _qunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"mdeditor/utils/md-interpolate",0,"qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Utility | md-interpolate', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      assert.expect(2);
      let note = "The attribute <em>${value1}</em> has an associated domain: <strong>${value2}</strong>.";
      let result = (0, _mdInterpolate.interpolate)(note, {
        value1: 'foo',
        value2: 'bar'
      });
      assert.equal(result, 'The attribute <em>foo</em> has an associated domain: <strong>bar</strong>.');
      let result2 = (0, _mdInterpolate.parseArgs)(note);
      assert.deepEqual(result2, ['value1', 'value2']);
    });
  });
});
define("mdeditor/tests/unit/utils/md-object-test", ["mdeditor/utils/md-object", "qunit"], function (_mdObject, _qunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"mdeditor/utils/md-object",0,"qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Utility | md-object', function () {
    // Replace this with your real tests.
    (0, _qunit.test)('it works', function (assert) {
      assert.equal(_mdObject.default.isEmpty({}), true);
      assert.equal(_mdObject.default.isEmpty({
        foo: ''
      }), true);
      assert.equal(_mdObject.default.isEmpty({
        foo: []
      }), true);
      assert.equal(_mdObject.default.isEmpty({
        foo: 'bar'
      }), false);
      assert.equal(_mdObject.default.isEmpty({
        foo: {
          bar: {}
        }
      }), true);
      assert.equal(_mdObject.default.isEmpty({
        foo: false
      }), false);
    });
  });
});
define("mdeditor/tests/unit/utils/sb-tree-node-test", ["mdeditor/utils/sb-tree-node", "qunit"], function (_sbTreeNode, _qunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"mdeditor/utils/sb-tree-node",0,"qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Utility | sb tree node', function () {
    (0, _qunit.test)('it works', function (assert) {
      assert.expect(2);
      let result = _sbTreeNode.default.create({
        _record: {
          recordId: 'theid'
        }
        //config: this.get('config')
      });
      assert.equal(result.uuid, 'theid');
      assert.equal(result.uuid, result.identifier, 'set ids');
    });
  });
});
define("mdeditor/tests/unit/validators/array-required-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Validator | array-required', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it works', function (assert) {
      var validator = this.owner.lookup('validator:array-required');
      assert.ok(validator);
    });
  });
});
define("mdeditor/tests/unit/validators/array-valid-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"qunit",0,"ember-qunit"eaimeta@70e063a35619d71f
  (0, _qunit.module)('Unit | Validator | array-valid', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it works', function (assert) {
      var validator = this.owner.lookup('validator:array-valid');
      assert.ok(validator);
    });
  });
});
define('mdeditor/config/environment', [], function() {
  var prefix = 'mdeditor';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('mdeditor/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
