streamViewApp
.config(function($translateProvider) {
  var preferredLanguage = (memoryStorage.preferredLanguage != null && memoryStorage.preferredLanguage != '' && memoryStorage.preferredLanguage != undefined) ?
  memoryStorage.preferredLanguage : 'es';

  $translateProvider
  .useStaticFilesLoader({
    prefix: 'app/translations/',
    suffix: '.json'
  })
  .preferredLanguage(preferredLanguage)
  .fallbackLanguage('en')
  .useMissingTranslationHandlerLog();

});