import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { CitiesController } from './../controller/CitiesController';
import { Router } from 'express';

const router = Router();

// Get all cities
router.get('/', CitiesController.getAll);

// Get one city
router.get('/:id', [checkJwt, checkRole(['admin'])], CitiesController.getById);

// Create a new city
router.post('/', [checkJwt, checkRole(['admin'])], CitiesController.new);

// Edit uscityer
router.put('/:id', [checkJwt, checkRole(['admin'])], CitiesController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])], CitiesController.delete);

export default router;
