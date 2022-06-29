import express, { Request, Response, NextFunction } from 'express';
// import { any } from 'joi';
import jwt from 'jsonwebtoken';


export default function verifyToken(req: any, res: any, next: NextFunction) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ "token": "denied" });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET!);
        // const verified = jwt.verify(token, 'adcdefg1234567');

        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ "message": "token", "status": "invalid" });
    }
}