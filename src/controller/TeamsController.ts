import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Teams } from '../entity/Teams';
import { validate } from 'class-validator';

export class TeamsController {

  static getAll = async (req: Request, res: Response) => {
    const teamsRepository = getRepository(Teams);
    let teams;

    try {
      teams = await teamsRepository.find({ select: ['id', 'equipment', 'ligue', 'country'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (teams.length > 0) {
      res.send(teams);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teamsRepository = getRepository(Teams);
    try {
      const team = await teamsRepository.findOneOrFail(id);
      res.send(team);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { equipment, ligue, country } = req.body;
    const teams = new Teams();

    teams.equipment = equipment;
    teams.ligue = ligue;
    teams.country = country;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(teams, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const citiesRepository = getRepository(Teams);
    try {
      await citiesRepository.save(teams);
    } catch (e) {
      return res.status(409).json({ message: 'Team already exist' });
    }

    // All ok
    res.send({ result: 'Team created' });
  };

  static edit = async (req: Request, res: Response) => {
    let teams;
    const { id } = req.params;
    const { equipment, ligue, country } = req.body;

    const teamsRepository = getRepository(Teams);
    // Try get teams
    try {
      teams = await teamsRepository.findOneOrFail(id);
      teams.equipment = equipment;
      teams.ligue = ligue;
      teams.country = country;
    } catch (e) {
      return res.status(404).json({ message: 'teams not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(teams, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save teams
    try {
      await teamsRepository.save(teams);
    } catch (e) {
      return res.status(409).json({ message: 'teams already in use' });
    }

    res.status(201).json({ message: 'teams update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const citiesRepository = getRepository(Teams);
    let teams: Teams;

    try {
      teams = await citiesRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'team not found' });
    }

    // Remove user
    citiesRepository.delete(id);
    res.status(201).json({ message: ' team deleted' });
  };
}

export default TeamsController;
