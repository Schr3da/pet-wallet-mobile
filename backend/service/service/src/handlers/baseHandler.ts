import * as Koa from "koa";
import { allow, optional, valid } from "joi";
const joi = require('joi');
const insane = require('insane');
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import * as _ from 'lodash';

export const performValidation = (ctx: Koa.Context, joiSchema: any): boolean => {

    const validationResult = joiSchema.validate(ctx.request.body);

    if (validationResult.error) {
        ctx.status = StatusCodes.BAD_REQUEST;
        ctx.body = _.get(validationResult, 'error.details[0].message', 'error');
        console.log('validation error ' + JSON.stringify(ctx.body));
        return false;
    }

    ctx.status = StatusCodes.OK;

    return true;
}

export const htmlSanitize = (dirtyString: string | null): string => {
    if (dirtyString == null) {
        return "";
    }
    return insane(dirtyString);
}

export const getJoiId = (): any => {
    return joi.string().min(3).max(40).required()
}

export const getJoiString = (min: number, max: number, optional: boolean = false, allowNull: boolean = false) => {
    let validator = joi.string().min(min).max(max);
    if (optional) {
        validator = validator.optional();
    } else {
        validator = validator.required();
    }

    if (min == 0) {
        validator = validator.allow('');
    }

    if (allowNull) {
        if (min == 0) {
            validator = validator.allow('', null);
        } else {
            validator = validator.allow(null);
        }
    }

    return validator;
}

export const getJoiBase64 = (optional: boolean, allowNull: boolean): any => {
    let validator = joi.string();
    if (optional) {
        validator = validator.optional();
    } else {
        validator = validator.required();
    }

    if (allowNull) {
        validator = validator.allow(null);
    }
    return validator;
}

export const getJoiDate = (optional: boolean, allowNull: boolean): any => {
    let validator = joi.number();
    if (optional) {
        validator = validator.optional();
    } else {
        validator = validator.required();
    }

    if (allowNull) {
        validator = validator.allow(null);
    }
    return validator;
}