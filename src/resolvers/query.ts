import { IResolvers } from "graphql-tools";
import { getRepository } from 'typeorm';
import { Cities } from '../entity/Cities';
import { Teams } from '../entity/Teams';

const query: IResolvers = {
    Query: {
        async citiesList() {
            // console.log('ok cities list')
            const citiesRepository = getRepository(Cities);
            let cities: Array<any> = [];
            try {
                cities = await citiesRepository.find({ select: ['id', 'city', 'country', 'continent'] });
                return cities;
            } catch (e) {
                cities.push({
                    id: -1,
                    city: "No se ha encontrado la ciudad",
                    country: "",
                    continent: ""
                });
            }
        },
        async cityList(__: void, { id }) {
            const citiesRepository = getRepository(Cities);
            let cities: Array<any> = [];
            try {
                const city = await citiesRepository.findOneOrFail(id);
                return city;
            } catch (e) {
                cities.push({
                    id: -1,
                    city: "No se ha encontrado la ciudad",
                    country: "",
                    continent: ""
                });
            }
        },
        async teamsList() {
            const teamsRepository = getRepository(Teams);
            let teams: Array<any> = [];
            try {
                teams = await teamsRepository.find({ select: ['id', 'equipment', 'ligue', 'country'] });
                return teams;
            } catch (e) {
                teams.push({
                    id: -1,
                    equipment: "No se ha encontrado el equipo",
                    ligue: "",
                    country: ""
                });
            }
        },
        async teamList(__: void, { id }) {
            const teamsRepository = getRepository(Teams);
            let teams: Array<any> = [];
            try {
                const team = await teamsRepository.findOneOrFail(id);
                return team;
            } catch (e) {
                teams.push({
                    id: -1,
                    equipment: "No se ha encontrado el equipo",
                    ligue: "",
                    country: ""
                });
            }
        },
    }
}

export default query;