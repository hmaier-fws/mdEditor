import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MdPouchRecordPouchDeleteButtonComponent extends Component {
  @service pouch;

  @action
  async delete() {
    const { record } = this.args;
    await this.pouch.deletePouchRecord(record)
  }
}