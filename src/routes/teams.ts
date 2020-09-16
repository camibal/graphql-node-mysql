import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { TeamsController } from './../controller/TeamsController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', TeamsController.getAll);

// Get one user
router.get('/:id', [checkJwt, checkRole(['admin'])], TeamsController.getById);

// Create a new user
router.post('/', [checkJwt, checkRole(['admin'])], TeamsController.new);

// Edit user
router.put('/:id', [checkJwt, checkRole(['admin'])], TeamsController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['admin'])], TeamsController.delete);

export default router;
