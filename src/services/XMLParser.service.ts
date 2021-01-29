import convert from 'xml-js';

export default class XMLParser {
  static Parse(xml: string) {
    try {
      return JSON.parse(convert.xml2json(xml, { compact: true }));
    } catch (error) {
      return { error };
    }
  }
}
