import Joi from "joi";

export const createTaskSchema={
    body:Joi.object({
        title: Joi.string()
        .required()
        .messages({
            "any.required": "Title is required",
            "string.empty": "Title cannot be empty"
        }),
        description: Joi.string()
        .optional()
        .allow('')
        .messages({
            "string.base": "Description must be a string"
        }),
        dueDate: Joi.date()
        .optional()
        .min('now')
        .messages({
            "date.base": "Due date must be a valid date",
            "date.min": "Due date must be in the future"
        })
    })
}

export const getAllTasksSchema = {
    query: Joi.object({
        status: Joi.string()
            .valid('PENDING', 'IN_PROGRESS', 'COMPLETED','pending','in progress','completed')
            .optional()
            .messages({
                'any.only': 'Status must be one of PENDING, IN_PROGRESS, COMPLETED',
                'string.base': 'Status must be a string'
            }),
        dueDate: Joi.date()
            .optional()
            .messages({
                'date.base': 'Due date must be a valid date'
            })
    })
};


export const getSingleTaskSchema = {
    params: Joi.object({
        id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'any.required': 'Task ID is required',
            'number.base': 'Task ID must be a number',
            'number.integer': 'Task ID must be an integer',
            'number.positive': 'Task ID must be a positive number'
        })
    })
};



export const updateTaskSchema = {
    params: Joi.object({
        id: Joi.number().integer().positive().required()
    }),
    body: Joi.object({
        title: Joi.string().optional().messages({
            'string.base': 'Title must be a string'
        }),
        description: Joi.string().optional().allow('').messages({
            'string.base': 'Description must be a string'
        }),
        status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED').optional(),
        dueDate: Joi.date().min('now').optional().messages({
            'date.base': 'Due date must be a valid date',
            'date.min': 'Due date must be in the future'
        })
    })
};


export const deleteTaskSchema = {
    params: Joi.object({
        id: Joi.number().integer().positive().required()
    })
};
