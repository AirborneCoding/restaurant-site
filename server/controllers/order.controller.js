import User from '../models/User.model.js';
import Order from '../models/Order.model.js'
import CustomError from '../errors/index.js'
import { StatusCodes } from 'http-status-codes';
import checkPermissions from '../utils/checkPermissions.js';

// Create a new order
const createOrder = async (req, res) => {
    // const user_id = req.user.userId
    const { userId, guestUser, phoneNumber, address, orderDetails, orderTotal, extraInfo } = req.body;

    // Validate required fields
    if (!phoneNumber || !address || !orderDetails || !orderTotal) {
        throw new CustomError.BadRequestError('Phone number, address, order details, and order total are required');
    }

    // Check if user exists (only if `userId` is provided)
    // console.log("user id: ", userId)
    if (userId) {
        const user = await User.findByPk(userId);
        // console.log(user);

        if (!user) {
            throw new CustomError.NotFoundError('User not found');
        }
    }

    // Create the order
    const order = await Order.create({
        userId: userId || null, // Null for guest users
        guestUser: guestUser || null,
        phoneNumber,
        address,
        orderDetails,
        orderTotal,
        orderState: 'pending', // Default state
        extraInfo: extraInfo || '', // Default to empty string if not provided
    });

    res.status(StatusCodes.CREATED).json({ order });
};

// Get all orders
const getAllOrders = async (req, res) => {
    const { userId, role } = req.user; // Assuming req.user is populated by `authenticateUser`

    // Fetch all orders including user details (if present)
    const orders = await Order.findAll({
        include: {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email'], // Include only required fields
        },
    });

    let filteredOrders;
    if (role === 'admin') {
        // Admin can view all orders, including guest orders
        filteredOrders = orders;
    } else {
        // Non-admin users can only view their own orders
        filteredOrders = orders.filter((order) => {
            const resourceUserId = order.user?.id; // Safely access `id` in case `user` is null

            // Allow orders with no user (guest orders) to be visible to everyone
            if (!resourceUserId) return false;

            try {
                checkPermissions({ userId, role }, resourceUserId);
                return true; // Keep the order if permission check passes
            } catch (error) {
                return false; // Exclude the order if permission check fails
            }
        });
    }

    // Respond with the accessible orders
    res.status(StatusCodes.OK).json({ orderNbr: filteredOrders.length, orders: filteredOrders });
};



// todo: Get a specific order by ID
const getOrderById = async (req, res) => {
    const { id } = req.params;

    const order = await Order.findOne({
        where: { id },
        include: {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email'],
        },
    });

    if (!order) throw new CustomError.NotFoundError('Order Not Found')

    res.status(StatusCodes.OK).json({ order });
};

// todo:  Update an order (for admin only)
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { phoneNumber, address, orderDetails, orderState, extraInfo } = req.body;

    const order = await Order.findOne({ where: { id } });

    if (!order) throw new CustomError.NotFoundError('Order Not Found')

    // Update the order details
    order.phoneNumber = phoneNumber || order.phoneNumber;
    order.address = address || order.address;
    order.orderDetails = orderDetails || order.orderDetails;
    order.orderState = orderState || order.orderState;
    order.extraInfo = extraInfo || order.extraInfo;

    await order.save();

    res.status(StatusCodes.OK).json({ order });
};

// Delete an order
// const deleteOrder = async (req, res) => {
//     const { id } = req.params;

//     const order = await Order.findOne({ where: { id } });

//     if (!order) throw new CustomError.NotFoundError('Order Not Found')

//     await order.destroy();
//     res.status(StatusCodes.OK).json({ msg: 'Order deleted successfully' });
// };

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    const { userId, role } = req.user; // Assuming `req.user` is populated by `authenticateUser`

    // Fetch the order including user details (if present)
    const order = await Order.findOne({
        where: { id },
        include: {
            model: User,
            as: 'user',
            attributes: ['id'], // Include only the necessary fields
        },
    });

    if (!order) {
        throw new CustomError.NotFoundError('Order Not Found');
    }

    // Access control
    const resourceUserId = order.user?.id; // Safely access `id` in case `user` is null

    if (role !== 'admin') {
        if (!resourceUserId || resourceUserId !== userId) {
            throw new CustomError.UnauthorizedError('Not authorized to delete this order');
        }
    }

    // Delete the order
    await order.destroy();
    res.status(StatusCodes.OK).json({ msg: 'Order deleted successfully' });
};


export {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
}











