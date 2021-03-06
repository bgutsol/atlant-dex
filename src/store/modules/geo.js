// Copyright 2017, 2018 Tensigma Ltd. All rights reserved.
// Use of this source code is governed by Microsoft Reference Source
// License (MS-RSL) that can be found in the LICENSE file.

import * as GeoApi from 'services/api/geo';

export default {
  state: {
    countries: [],
    countriesLoading: false,
    countriesLoaded: false,
    citiesLoading: false,
    cities: {},
  },
  getters: {
    getCountryName: (state) => (countryCode) => {
      let obj = state.countries.find((el) => el.code == countryCode);
      return obj ? obj.name : '';
    },
    getCountryPhoneCode: (state) => (countryCode) => {
      let obj = state.countries.find((el) => el.code == countryCode);
      return obj ? obj.phoneCode : '';
    },
  },
  mutations: {
    setAll(state, data) {
      Object.assign(state, data);
      return state;
    },
    setCountries(state, countries) {
      Object.assign(state, {
        countries,
        countriesLoading: false,
        countriesLoaded: true,
      });
      return state.countries;
    },
    setCities(state, {country, countryCities}) {
      Object.assign(state, {
        cities: Object.assign({}, state.cities, {[country]: countryCities}),
        citiesLoading: false,
      });
      return state.cities;
    },
  },
  actions: {
    getCountries({commit, state}) {
      if (state.countriesLoaded) return true;
      commit('setAll', {countriesLoading: true});
      GeoApi.getCountries()
          .then(({data}) => {
            commit('setCountries', data);
      });
    },
    getCities({commit, state}, country) {
      if (state.cities[country]) return true;
      commit('setAll', {citiesLoading: true});
      GeoApi.getCities({country})
      .then(({data}) => {
        commit('setCities', {countryCities: data, country});
      });
    },
  },
  namespaced: true,
};
