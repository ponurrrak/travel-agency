/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }
  output = output.filter(trip => (trip.days >= filters.duration.from && trip.days <= filters.duration.to));
  if(filters.tags.length){
    output = output.filter(trip => {
      const commonTags = trip.tags.filter(tag => filters.tags.indexOf(tag) > -1);
      return commonTags.length === filters.tags.length;
    });
  }
  output.sort((tripA, tripB) => (parseFloat(tripB.cost.replace(/[^0-9.]/g, ()=> '')) - parseFloat(tripA.cost.replace(/[^0-9.]/g, ()=> ''))));
  return output;
};

export const getTripById = ({trips}, tripId) =>
  trips.filter(trip => trip.id === tripId)[0]

export const getTripsForCountry = ({trips}, countryCode) =>
  trips.filter(trip => trip.country.code === countryCode)

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
