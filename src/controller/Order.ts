
import { Router, Request, Response, NextFunction } from 'express'
import Order from '../models/Order';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { name, phone, address, barrelType, sendBarrel, backBarrel, customerType } = req.body;

    const data = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }).replace('/', '-').replace('/', '-').replace('上午', '').replace('下午', '');

    const order = new Order({
        name: name,
        phone: phone,
        address: address,
        barrelType: barrelType,
        sendBarrel: sendBarrel,
        backBarrel: backBarrel,
        customerType: customerType,
        updatedAt: data,
        createdAt: data,
    });

    try {
        const saveOrder = await order.save();
        res.status(201).json({ "message": "create", "status": true, "id": data });
        // res.status(200).send(`${saveOrder} create success!`);
        // res.sendStatus({"status":"create order",});
    } catch (error) {
        res.status(400).send(error);
    }
};

export const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const readAll = await Order.find();
        res.status(200).send(readAll);
    } catch (error) {
        res.status(404).send(error);
    }

};

export const readOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    const order = await Order.findOne({ createdAt: orderId });
    if (!order)
        return res.status(401).json({ "message": "readOrder", "status": false, "id": orderId });
    else {
        try {
            // const readOrderId = await Order.findById(orderId);
            const readOrder = await Order.findOne({ createdAt: orderId });
            res.status(200).send(readOrder);
        } catch (error) {
            res.status(404).send(error);
        }
    }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    const order = await Order.findOne({ createdAt: orderId });

    if (!order)
        return res.status(401).json({ "message": "delete", "status": false, "id": orderId });
    else {
        try {
            const data = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }).replace('/', '-').replace('/', '-').replace('上午', '').replace('下午', '');
            await Order.updateOne({ createdAt: orderId }, { updatedAt: data, isDeleted: true, deletedAt: data });
            res.status(201).json({ "message": "delete", "status": true, "id": orderId });
        } catch (error) {
            res.status(404).send(error);
        }
    }

};

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;
    const { name, phone, address, barrelType, sendBarrel, backBarrel, customerType } = req.body;

    const order = await Order.findOne({ createdAt: orderId });
    if (!order)
        return res.status(401).json({ "message": "update", "status": false, "id": orderId });
    else {

        try {
            const data = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }).replace('/', '-').replace('/', '-').replace('上午', '').replace('下午', '');
            if (name) await Order.updateOne({ createdAt: orderId }, { name: name });
            if (phone) await Order.updateOne({ createdAt: orderId }, { phone: phone });
            if (address) await Order.updateOne({ createdAt: orderId }, { address: address });
            if (barrelType) await Order.updateOne({ createdAt: orderId }, { barrelType: barrelType });
            if (sendBarrel) await Order.updateOne({ createdAt: orderId }, { sendBarrel: sendBarrel });
            if (backBarrel) await Order.updateOne({ createdAt: orderId }, { backBarrel: backBarrel });
            if (customerType) await Order.updateOne({ createdAt: orderId }, { customerType: customerType });

            await Order.updateOne({ createdAt: orderId }, { updatedAt: data });
            res.status(201).json({ "message": "update", "status": true, "id": orderId });

        } catch (error) {
            res.status(401).send(error);
        }

    }

};

// export const deleteOrderId = async (req: Request, res: Response, next: NextFunction) => {
//     const orderId = req.params.orderId
//     try {
//         // const readOrderId = await Order.findById(orderId);
//         const deleteOrderId = await Order.deleteOne({ updatedAt: orderId });

//         res.status(200).send(deleteOrderId);
//     } catch (error) {
//         res.status(404).send(error);
//     }
// };

