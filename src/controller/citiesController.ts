import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Cities } from '../entity/Cities';
import { validate } from 'class-validator';

export class CitiesController {

  static getAll = async (req: Request, res: Response) => {
    const citiesRepository = getRepository(Cities);
    let users;

    try {
      users = await citiesRepository.find({ select: ['id', 'city', 'country', 'continent'] });
    } catch (e) {
      res.status(404).json({ message: 'Somenthing goes wrong!' });
    }

    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(Cities);
    try {
      const user = await userRepository.findOneOrFail(id);
      res.send(user);
    } catch (e) {
      res.status(404).json({ message: 'Not result' });
    }
  };

  static new = async (req: Request, res: Response) => {
    const { city, country, continent } = req.body;
    const cities = new Cities();

    cities.city = city;
    cities.country = country;
    cities.continent = continent;

    // Validate
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(cities, validationOpt);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    const citiesRepository = getRepository(Cities);
    try {
      await citiesRepository.save(cities);
    } catch (e) {
      return res.status(409).json({ message: 'city already exist' });
    }

    // All ok
    res.send({ result: 'City created' });
  };

  static edit = async (req: Request, res: Response) => {
    let cities;
    const { id } = req.params;
    const { city, country, continent } = req.body;

    const citiesRepository = getRepository(Cities);
    // Try get cities
    try {
      cities = await citiesRepository.findOneOrFail(id);
      cities.city = city;
      cities.country = country;
      cities.continent = continent;
    } catch (e) {
      return res.status(404).json({ message: 'cities not found' });
    }
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(cities, validationOpt);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Try to save cities
    try {
      await citiesRepository.save(cities);
    } catch (e) {
      return res.status(409).json({ message: 'cities already in use' });
    }

    res.status(201).json({ message: 'cities update' });
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const citiesRepository = getRepository(Cities);
    let city: Cities;

    try {
      city = await citiesRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).json({ message: 'City not found' });
    }

    // Remove user
    citiesRepository.delete(id);
    res.status(201).json({ message: ' City deleted' });
  };
}

export default CitiesController;
