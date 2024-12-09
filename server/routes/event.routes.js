import express from "express";
const router = express.Router();

import { authenticateUser, authorizePermissions } from "../middleware/authentication.js";

import {
    createEvent,
    getAllEvents,
    deleteEvent,
    getEventById
} from "../controllers/event.controller.js";

router
    .route('/')
    .post(authenticateUser, authorizePermissions('admin'), createEvent)
    .get(getAllEvents)

router
    .route('/:id')
    .get(authenticateUser, authorizePermissions('admin'), getEventById)
    .delete(authenticateUser, authorizePermissions('admin'), deleteEvent)


export default router