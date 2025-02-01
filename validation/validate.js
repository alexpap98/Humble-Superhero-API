const Joi = require("joi");
// we will use Joi to validate our requests

function handleSchema(schema, res, next) {
    //if there is error return 400 and the error
    if (schema.error) {
        console.log(schema.error);
        res.status(400).json({ error: schema.error.details });
    } else {
        //otherwise we move to the next function from the request
        next()
    }
}

module.exports = {
    insertHero: function (req, res, next) {
        // creating a shcema that accepts 
        // name , superpower and "humility score", 
        // we also check that
        // name is string,
        // superpower is string, 
        // "humilityscore"" is number between 1 and 10
        console.log(req.body);
        const schema = Joi.object({
            name: Joi.string().required(),
            superpower: Joi.string().required(),
            "humility score": Joi.number().min(1).max(10).required(),
        })
            //remove any variable that is not in the schema
            .options({ stripUnknown: true });

        //we run the validate function to check the body
        let test = schema.validate(req.body);
        req.body = test.value
        //we handle the results
        handleSchema(test, res, next);
    }
}

