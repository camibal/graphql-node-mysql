import { IResolvers } from 'graphql-tools';
import _ from 'lodash';
import { Cities } from '../entity/Cities';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { Teams } from '../entity/Teams';
import { validateSchema } from 'graphql';
import { checkJwt } from './../middlewares/jwt';
import { checkRole } from './../middlewares/role';
const { AuthorizationError, noInputError } = require('./../errors/error');

const mutation: IResolvers = {
    Mutation: {
        // CITIES
        async addCity(__: void, { cities }) {
            console.log('ok add city')
            const city = new Cities();
            city.id = cities.id;
            city.city = cities.city;
            city.country = cities.country;
            city.continent = cities.continent;

            // Validate
            const validationOpt = { validationError: { target: false, value: false } };
            const errors = await validate(cities, validationOpt);
            if (errors.length > 0) {
                return noCompletado(1);
            }

            const citiesRepository = getRepository(Cities);
            try {
                await citiesRepository.save(city);
            } catch (e) {
                return noCompletado(1);
            }
            // All ok
            return city;
        },
        async updateCity(__: void, { cities }) {
            let city;

            const citiesRepository = getRepository(Cities);
            // Try get cities
            try {
                city = await citiesRepository.findOneOrFail(city);
                city.city = cities.city;
                city.country = cities.country;
                city.continent = cities.continent;
            } catch (e) {
                return noCompletado(2);
            }
            // Try to save teams
            try {
                await citiesRepository.save(city);
            } catch (e) {
                return noCompletado(1);
            }
            return city;
        },
        async deleteCity(__: void, { id }) {
            console.log('ok delete city')
            const citiesRepository = getRepository(Cities);
            let city: Cities;

            try {
                city = await citiesRepository.findOneOrFail(id);
            } catch (e) {
                return noCompletado(2);
            }
            // Remove user
            citiesRepository.delete(id);
            return city;
        },
        // TEAMS
        async addTeam(__: void, { teams }) {
            const team = new Teams();
            team.id = teams.id;
            team.equipment = teams.equipment;
            team.ligue = teams.ligue;
            team.country = teams.country;

            // Validate
            const validationOpt = { validationError: { target: false, value: false } };
            const errors = await validate(teams, validationOpt);
            if (errors.length > 0) {
                return noCompletado(4);
            }
            const teamsRepository = getRepository(Teams);
            try {
                await teamsRepository.save(team);
            } catch (e) {
                return noCompletado(4);
            }
            // All ok
            return team;
        },
        async updateTeam(__: void, { teams }) {
            let team;

            const teamsRepository = getRepository(Teams);
            // Try get teams
            try {
                team = await teamsRepository.findOneOrFail(team);
                team.equipment = teams.equipment;
                team.ligue = teams.ligue;
                team.country = teams.country;
            } catch (e) {
                return noCompletado(5);
            }
            // Try to save teams
            try {
                await teamsRepository.save(team);
            } catch (e) {
                return noCompletado(4);
            }
            console.log(team)
            return team;
        },
        async deleteTeam(__: void, { id }) {
            const teamsRepository = getRepository(Teams);
            let team: Teams;

            try {
                team = await teamsRepository.findOneOrFail(id);
            } catch (e) {
                return noCompletado(5);
            }
            // Remove user
            teamsRepository.delete(id);
            return team;
        },
    }
}

function noCompletado(operacion: number) {
    let city = '';
    let team = '';

    switch (operacion) {
        case 1: {
            city = 'Ya existe ciudad con ese nombre';
            break;
        }
        case 2: {
            city = 'No existe la cuidad en la base de datos';
            break;
        }
        case 3: {
            city = 'la ciudad no se puede borrar porque no se ha encontrado ningúna ciudad con ese ID';
            break;
        }
        case 4: {
            team = 'Ya existe equipo de futbol con ese nombre';
        }
        case 5: {
            team = 'No existe el equipo de futbol en la base de datos';
        }
        case 6: {
            team = 'El equipo de futbol no se puede borrar porque no se ha encontrado ningún equipo con ese ID';
        }
        default: {
            //statements; 
            break;
        }
    }
    return {
        id: '-1 ha ocurrido un error',
    };
}

export default mutation;