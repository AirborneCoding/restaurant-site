import Event from '../models/Event.model.js'
import CustomError from '../errors/index.js'
import { StatusCodes } from 'http-status-codes';
import { uploadImageCloudinary } from '../utils/cloudinary.js';

// Create a new Event
const createEvent = async (req, res) => {
    const { eventName, eventDescription, eventDate, eventType, capacity } = req.body;

    // Validate input
    if (!eventName || !eventDescription || !eventDate || !eventType || !capacity) {
        throw new CustomError.BadRequestError('All fields are required')
    }


    // image upload
    if (req.files) {
        // Extracting image file from the request
        const productPostMedia = req.files.image;

        // Validating that the uploaded file is an image
        if (!productPostMedia.mimetype.startsWith("image")) {
            throw new CustomError.BadRequestError("Please upload an image");
        }

        // Uploading the image to Cloudinary and getting the result
        const imagePathForPostImage = req.files.image.tempFilePath;
        var result = await uploadImageCloudinary(imagePathForPostImage);

        // Extracting image URL and public ID from the Cloudinary result
        const url = result.secure_url;
        const id = result.public_id;

        // Creating an image object with URL and ID
        var image = {
            url: url,
            id: id
        };
    }

    const event = await Event.create({
        eventName,
        eventDescription,
        eventDate,
        eventType,
        capacity,
        image,
    });

    res.status(StatusCodes.CREATED).json({ event });
};

// Get all events
const getAllEvents = async (req, res) => {
    const events = await Event.findAll();

    if (events.length === 0) {
        throw new CustomError.NotFoundError('No events found')
    }

    res.status(StatusCodes.OK).json({ events });
};

// Get a single event
const getEventById = async (req, res) => {
    const { id } = req.params;

    const event = await Event.findOne({ where: { id } });

    if (!event) {
        throw new CustomError.NotFoundError('Event not found')
    }

    res.status(StatusCodes.OK).json({ event });
};

// Delete an event
const deleteEvent = async (req, res) => {
    const { id } = req.params;

    const event = await Event.findOne({ where: { id } });

    if (!event) {
        throw new CustomError.NotFoundError('Event not found')
    }

    await event.destroy();

    res.status(StatusCodes.OK).json({ msg: 'Event deleted successfully' });
};




export {
    createEvent,
    getAllEvents,
    deleteEvent,
    getEventById
}