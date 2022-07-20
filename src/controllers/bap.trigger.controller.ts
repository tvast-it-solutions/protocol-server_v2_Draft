// TODO: Code bapTriggerHandler()

import { NextFunction, Request, Response } from "express";
import { RequestActions } from "../schemas/configs/actions.app.config.schema";
import { MQClient } from "../utils/rbtmq.utils"

export const bapTriggerHandler = async (req: Request, res: Response, next: NextFunction, action: RequestActions) => {
    try {
        new MQClient().publishMessage("outbox", req.body);
        res.status(200).json({
            message: {
                ack: {
                    status: "ACK"
                }
            }
        });
    } catch (err) {
        next(err)
    }
};