import { IResolvers } from 'graphql-tools';
// import { database } from '../data/data.store';
import _ from 'lodash';
import { getRepository } from 'typeorm';
import { Cities } from '../entity/Cities';
const type: IResolvers = {
    Cities: {
        courses: parent => {
            const citiesList: Array<any> = [];
            parent.cities.map((city: string) => {
                citiesList.push(_.filter(getRepository(Cities), ['id', city])[0])
            });
            return citiesList;
        }
    }
}

export default type;