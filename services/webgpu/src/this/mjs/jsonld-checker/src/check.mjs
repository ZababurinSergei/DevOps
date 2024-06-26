// import jsonld from 'jsonld';
const jsonld = window.jsonld
import CheckResult from './CheckResult.mjs';
import defaultLoader from './defaultDocumentLoader.mjs';

// const isNotJsonLdPropery = property => !['@id', '@type'].includes(property);

const check = async (
  jsonldDocument,
  documentLoader = defaultLoader
) => {
  try {
    let jsonldDoc = {};
    if (typeof jsonldDocument === 'string') {
      jsonldDoc = JSON.parse(jsonldDocument);
    } else {
      jsonldDoc = jsonldDocument;
    }

    const unmappedProperties = [];

    const expansionMap = info => {
      if (info) {
        if (info.activeProperty) {
          unmappedProperties.push(
            `${info.activeProperty}.${info.unmappedProperty}`
          );
        } else if (info.unmappedProperty) {
          unmappedProperties.push(info.unmappedProperty);
        }
      }
    };



    // Remove all keys not present in the jsonld context
    const expanded = await jsonld.expand(jsonldDoc, {
      documentLoader,
      expansionMap,
    });

    await jsonld.compact(expanded, jsonldDoc['@context'], { documentLoader });

    if (unmappedProperties.length === 0) {
      return new CheckResult(true);
    }
    return new CheckResult(
      false,
      'MISSING_PROPERTIES_IN_CONTEXT',
      JSON.stringify(unmappedProperties)
    );
  } catch (err) {
    return new CheckResult(false, err.name, err.message);
  }
};

export default check;
