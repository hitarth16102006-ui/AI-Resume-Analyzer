const { body, param } = require('express-validator');

const resumeIdValidation = [
  param('id')
    .isMongoId().withMessage('Invalid resume ID'),
];

module.exports = { resumeIdValidation };
