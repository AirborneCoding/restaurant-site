import express from "express";
const router = express.Router();

import { authenticateUser, authorizePermissions } from "../middleware/authentication.js";

import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} from "../controllers/order.controller.js";

router
    .route('/')
    .post(createOrder)
    .get(authenticateUser, getAllOrders) // TODO: admin and who created the order



router
    .route('/:id')
    .get(authenticateUser, authorizePermissions('admin'), getOrderById) // TODO: admin and who created the order
    .put(authenticateUser, authorizePermissions('admin'), updateOrder) // TODO: admin and who created the order
    .delete(authenticateUser, deleteOrder)


export default router