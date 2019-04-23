export default function () {
  this.transition(
    this.toRoute('record.show.edit.main.citation'),
    this.fromRoute('record.show.edit.main.index'),
    this.use('toLeft'),
    this.reverse('toRight')
    //,this.debug()
  );
  this.transition(
    this.toRoute('record.show.edit.main.citation.identifier'),
    this.fromRoute('record.show.edit.main.citation.index'),
    this.use('toLeft'),
    this.reverse('toRight')
    //,this.debug()
  );
  this.transition(
    this.toRoute('record.show.edit.metadata.identifier'),
    this.fromRoute('record.show.edit.metadata.index'),
    this.use('toLeft'),
    this.reverse('toRight')
    //,this.debug()
  );
  this.transition(
    this.toRoute('record.show.edit.metadata.alternate'),
    this.fromRoute('record.show.edit.metadata.index'),
    this.use('toLeft'),
    this.reverse('toRight')
    //,this.debug()
  );
  this.transition(
    this.toRoute('record.show.edit.metadata.alternate.identifier'),
    this.fromRoute('record.show.edit.metadata.alternate.index'),
    this.use('toLeft'),
    this.reverse('toRight')
    //,this.debug()
  );
  this.transition(
    this.toRoute('record.show.edit.metadata.parent'),
    this.fromRoute('record.show.edit.metadata.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('record.show.edit.metadata.parent.identifier'),
    this.fromRoute('record.show.edit.metadata.parent.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('record.show.edit.taxonomy.collection'),
    this.fromRoute('record.show.edit.taxonomy.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('record.show.edit.taxonomy.collection.itis'),
    this.fromRoute('record.show.edit.taxonomy.collection.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('record.show.edit.taxonomy.collection.system'),
    this.fromRoute('record.show.edit.taxonomy.collection.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('record.show.edit.lineage.lineageobject'),
    this.fromRoute('record.show.edit.lineage.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('record.show.edit.lineage.lineageobject.citation'),
    this.fromRoute('record.show.edit.lineage.lineageobject.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('record.show.edit.lineage.lineageobject.citation.identifier'),
    this.fromRoute('record.show.edit.lineage.lineageobject.citation.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('record.show.edit.lineage.lineageobject.step'),
    this.fromRoute('record.show.edit.lineage.lineageobject.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('record.show.edit.lineage.lineageobject.step.citation'),
    this.fromRoute('record.show.edit.lineage.lineageobject.step.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('record.show.edit.lineage.lineageobject.source'),
    this.fromRoute('record.show.edit.lineage.lineageobject.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('record.show.edit.associated.resource'),
    this.fromRoute('record.show.edit.associated.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('record.show.edit.documents.citation'),
    this.fromRoute('record.show.edit.documents.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('record.show.edit.funding.allocation'),
    this.fromRoute('record.show.edit.funding.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('record.show.edit.distribution.distributor'),
    this.fromRoute('record.show.edit.distribution.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('dictionary.show.edit'),
    this.fromRoute('dictionary.show.index'),
    this.use('toLeft'),
    this.reverse('toRight'),
    //this.debug()
  );
  this.transition(
    this.toRoute('dictionary.show.edit.citation.identifier'),
    this.fromRoute('dictionary.show.edit.citation.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('dictionary.show.edit.domain.edit'),
    this.fromRoute('dictionary.show.edit.domain.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('dictionary.show.edit.domain.edit.item'),
    this.fromRoute('dictionary.show.edit.domain.edit.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('dictionary.show.edit.domain.edit.citation'),
    this.fromRoute('dictionary.show.edit.domain.edit.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('dictionary.show.edit.domain.edit.citation.identifier'),
    this.fromRoute('dictionary.show.edit.domain.edit.citation.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('dictionary.show.edit.entity.edit'),
    this.fromRoute('dictionary.show.edit.entity.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('dictionary.show.edit.entity.edit'),
    this.fromRoute('dictionary.show.edit.entity.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('dictionary.show.edit.entity.edit.citation'),
    this.fromRoute('dictionary.show.edit.entity.edit.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('dictionary.show.edit.entity.edit.citation.identifier'),
    this.fromRoute('dictionary.show.edit.entity.edit.citation.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('dictionary.show.edit.entity.edit.attribute'),
    this.fromRoute('dictionary.show.edit.entity.edit.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('dictionary.show.edit.entity.import'),
    this.fromRoute('dictionary.show.edit.entity.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  //non-route transitions
  this.transition(
    this.hasClass('md-itis-selected'),
    this.includingInitialRender(),
    this.toValue(true),
    this.use('toRight', {
      duration: 250
    }),
    this.reverse('toLeft', {
      duration: 250
    })//,
    //this.debug()
  );
  this.transition(
    this.hasClass('md-itis-unselected'),
    this.includingInitialRender(),
    this.toValue(true),
    this.use('toLeft', {
      duration: 250
    }),
    this.reverse('toRight', {
      duration: 250
    })//,
    //this.debug()
  );
}
