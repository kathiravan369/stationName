const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  stationName: { type: String, required: true },
 ebReport: { type: String, required: true }, // File path or URL
  operatingFrom: { type: String, required: true },
  operatingTo: { type: String, required: true },
  fromPeriod: { type: String, required: true },
  toPeriod: { type: String, required: true },
landOwnershipDoc: { type: String, required: true }, // File path or URL
  latitudeLongitude: { type: String, required: true },
  utilityProvider: { type: String, required: true },
 uploadMedia: { type: String, required: true }, // File path or URL
  address: { type: String, required: true },
  electricityContractType: { type: String, required: true },
});

module.exports = mongoose.model('Data', DataSchema);
 