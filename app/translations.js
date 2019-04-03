streamViewApp
.config(function($translateProvider) {
  var preferredLanguage = (memoryStorage.preferredLanguage != null && memoryStorage.preferredLanguage != '' && memoryStorage.preferredLanguage != undefined) ?
  memoryStorage.preferredLanguage : 'default';

  console.log(preferredLanguage);

  $translateProvider
  .useStaticFilesLoader({
    prefix: 'app/translations/',
    suffix: '.json'
  })
  .preferredLanguage(preferredLanguage)
  .fallbackLanguage('en')
  // .useLocalStorage()
  .useSanitizeValueStrategy('escape')
  .useMissingTranslationHandlerLog();

});