import User from '../models/User.model.js';
import Reservation from '../models/Reservation.model.js'
import CustomError from '../errors/index.js'
import { StatusCodes } from 'http-status-codes';


// Create a new reservation
const createReservation = async (req, res) => {
    const { userId, reservationDate, numberOfGuests, phone, specialRequests } = req.body;

    // Validate input
    if (!userId || !reservationDate || !numberOfGuests || !phone) {
        throw new CustomError.BadRequestError('All fields are required')
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
        throw new CustomError.NotFoundError('User not found')
    }

    // Create the reservation
    const reservation = await Reservation.create({
        userId,
        reservationDate,
        numberOfGuests,
        phone,
        specialRequests: specialRequests || '',
        status: 'Pending', // Default status is pending
    });

    res.status(StatusCodes.CREATED).json({ reservation });
};

// Get all reservations
const getAllReservations = async (req, res) => {
    const reservations = await Reservation.findAll();

    if (reservations.length === 0) throw new CustomError.NotFoundError('No reservations found')

    res.status(StatusCodes.OK).json({ reservations });
};

// Get a single reservation by ID
const getReservationById = async (req, res) => {
    const { id } = req.params;

    const reservation = await Reservation.findOne({ where: { id } });

    if (!reservation) throw new CustomError.NotFoundError('No reservations found')

    res.status(StatusCodes.OK).json({ reservation });
};

// Update a reservation
const updateReservation = async (req, res) => {
    const { id } = req.params;
    const { reservationDate, numberOfGuests, phone, specialRequests } = req.body;

    const reservation = await Reservation.findOne({ where: { id } });

    if (!reservation) throw new CustomError.NotFoundError('Reservation not found')

    // Update the reservation details
    reservation.reservationDate = reservationDate || reservation.reservationDate;
    reservation.numberOfGuests = numberOfGuests || reservation.numberOfGuests;
    reservation.phone = phone || reservation.phone;
    reservation.specialRequests = specialRequests || reservation.specialRequests;

    await reservation.save();

    res.status(StatusCodes.OK).json({ reservation });
};

// Delete a reservation
const deleteReservation = async (req, res) => {
    const { id } = req.params;

    const reservation = await Reservation.findOne({ where: { id } });

    if (!reservation) throw new CustomError.NotFoundError('Reservation not found')

    await reservation.destroy();

    res.status(StatusCodes.OK).json({ msg: 'Reservation deleted successfully' });
};

export {
    createReservation,
    deleteReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
}