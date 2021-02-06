//create costom schema according to status provided in url if no status is provided it will take active by default
const schema={

    properties:{
        queryStringParameters:{
            type:'object',
            properties:{
                status : {
                    type: "string",
                    enum: ["Active","Inactive"],
                    default : "Active",
                },
            },
        },
    },

    required:[
        'queryStringParameters',
    ],
};

export default schema;