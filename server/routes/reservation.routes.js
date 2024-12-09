import express from "express";
const router = express.Router();

import { authenticateUser, authorizePermissions } from "../middleware/authentication.js";

import {
    createReservation,
    deleteReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
} from "../controllers/reservation.controller.js";

router
    .route('/')
    .post(authenticateUser, createReservation)
    .get(authenticateUser, authorizePermissions('admin'), getAllReservations)

router
    .route('/:id')
    .get(authenticateUser, authorizePermissions('admin'), getReservationById) // TODO: admin and who created the reservation
    .put(authenticateUser, authorizePermissions('admin'), updateReservation) // TODO: admin and who created the reservation
    .put(authenticateUser, authorizePermissions('admin'), deleteReservation)


export default router