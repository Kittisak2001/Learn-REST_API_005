import {AnySchema} from 'yup';
import {NextFunction, Request, Response} from 'express';
import log from '../src/logger';

const validate = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        await schema.validate({
            body: req.body,
            query: req.query,
            parmas: req.params,
        });

        return next();
    }catch(err: any){
        log.error(err);
        return res.status(400).send(err.errors)
    }
}

export default validate;