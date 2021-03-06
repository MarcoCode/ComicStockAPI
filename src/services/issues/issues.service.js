// Initializes the `issues` service on path `/issues`
const createService = require('feathers-nedb');
const createModel = require('../../models/issues.model');
const hooks = require('./issues.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'issues',
    Model,
    paginate
  };


  const events = createService(options)
  events.docs = {
    description: 'A Service to perform CRUD operations on Issues',

    find: {
      parameters: [
        {
          description: 'Number of results to return',
          in: 'query',
          name: '$limit',
          type: 'integer'
        },
        {
          description: 'Number of results to skip',
          in: 'query',
          name: '$skip',
          type: 'integer'
        },
        {
          description: 'Property to sort results',
          in: 'query',
          name: '$sort',
          type: 'string'
        },
        {
          description: 'Property to query results',
          in: 'query',
          name: '$search',
          type: 'string'
        }
      ]
    },

    get: {
      parameters:
        [
          {
            name: "_id",
            description: "Issue ID",
            in: "path",
            required: true,
            type: 'string' , 
            pattern: "^[a-zA-Z0-9]{16}$"              
          }
        ]
    },

    remove: {
      parameters:
        [
          {
            name: "_id",
            description: "Issue ID",
            in: "path",
            required: true,
            type: 'string' , 
            pattern: "^[a-zA-Z0-9]{16}$"              
          }
        ]
    },

    create: {
      parameters:
        [
          {
            name: "Post Issue",
            description: "Issue Object",
            in: "body",
            required: true,
            schema: { $ref: '#/definitions/issuesPOST' }
          }
        ]
    },

    update: {
      parameters:
        [
          {
            name: "_id",
            description: "Issue ID",
            in: "path",
            required: true,
            type: 'string' , 
            pattern: "^[a-zA-Z0-9]{16}$"              
          },
          {
            name: "Issue Update",
            description: "Issue Object",
            in: "body",
            required: true,
            schema: { $ref: '#/definitions/issuesUPDATE' }
          }
        ]
    },

    patch: {
      parameters:
        [
          {
            name: "_id",
            description: "Issue ID",
            in: "path",
            required: true,
            type: 'string' , 
            pattern: "^[a-zA-Z0-9]{16}$"              
          },
          {
            name: "Issue Patch",
            description: "Issue Object",
            in: "body",
            required: true,
            schema: { $ref: '#/definitions/issuesUPDATE' }
          }
        ]
    },

    definitions: {
      issuesPOST: {
        "type": "object",
        "properties": {
          "title": { "type": "string",
          "description": "Issue Title" },
          "series": { "type": "string",
          "description": "Issue Series" },
          "description": { "type": "string",
          "description": "Description of Issue" },
          "publisherString": { "type": "string",
          "description": "Name of Issue Publisher" },
          "publicationDate": { "type": "string", "format": "date-time",
          "description": "Date Issue was published" },
  
          "thumbnail": {
            "type": "object",
            "description": "Thumbnails of the Issue",
            "properties": {
              "path": { "type": "string",
              "description": "Path where the thumbnail is stored" },
              "extension": { "type": "string",
              "description": "Extension or File type of the thumbnail" },
            },
            "required": ["path", "extension"],
            "additionalProperties": false
          },
  
          "images": {
            "type": "array",
            "description": "Images of the Issue",
            "maxItems": 10,
            "items": {
              "type": "object",
              "properties": {
                "path": { "type": "string",
                "description": "Path where the image is stored" },
                "extension": { "type": "string",
                "description": "Extension or File type of the image"  }
              },
              "required": ["path", "extension"],
              "additionalProperties": false
            }
          }
        },
        "required": ["title", "series", "description", "publisherString", "publicationDate"],
        "additionalProperties": false
      },

      issuesUPDATE :{
        "type": "object",
        "properties": {
          "title": { "type": "string",
          "description": "Issue Title" },
          "series": { "type": "string",
          "description": "Issue Series" },
          "description": { "type": "string",
          "description": "Description of Issue" },
          "publisherString": { "type": "string",
          "description": "Name of Issue Publisher" },
          "publicationDate": { "type": "string", "format": "date-time",
          "description": "Date Issue was published" },
  
          "thumbnail": {
            "type": "object",
            "description": "Thumbnails of the Issue",
            "properties": {
              "path": { "type": "string",
              "description": "Path where the thumbnail is stored" },
              "extension": { "type": "string",
              "description": "Extension or File type of the thumbnail" },
            },
            "required": ["path", "extension"],
            "additionalProperties": false
          },
  
          "images": {
            "type": "array",
            "description": "Images of the Issue",
            "maxItems": 10,
            "items": {
              "type": "object",
              "properties": {
                "path": { "type": "string",
                "description": "Path where the image is stored" },
                "extension": { "type": "string",
                "description": "Extension or File type of the image"  }
              },
              "required": ["path", "extension"],
              "additionalProperties": false
            }
          }
        },
        "additionalProperties": false
      },

      'issues list': {
        "type": "object",
        "properties": {
          "title": { "type": "string",
          "description": "Issue Title" },
          "series": { "type": "string",
          "description": "Issue Series" },
          "description": { "type": "string",
          "description": "Description of Issue" },
          "publisherString": { "type": "string",
          "description": "Name of Issue Publisher" },
          "publicationDate": { "type": "string", "format": "date-time",
          "description": "Date Issue was published" },
  
          "thumbnail": {
            "type": "object",
            "description": "Thumbnails of the Issue",
            "properties": {
              "path": { "type": "string",
              "description": "Path where the thumbnail is stored" },
              "extension": { "type": "string",
              "description": "Extension or File type of the thumbnail" },
            },
            "additionalProperties": false
          },
  
          "images": {
            "type": "array",
            "description": "Images of the Issue",
            "maxItems": 10,
            "items": {
              "type": "object",
              "properties": {
                "path": { "type": "string",
                "description": "Path where the image is stored" },
                "extension": { "type": "string",
                "description": "Extension or File type of the image"  }
              },
              "additionalProperties": false
            }
          }
        },
        "additionalProperties": false
      },

      issues: {
        "type": "object",
        "properties": {
          "title": { "type": "string",
          "description": "Issue Title" },
          "series": { "type": "string",
          "description": "Issue Series" },
          "description": { "type": "string",
          "description": "Description of Issue" },
          "publisherString": { "type": "string",
          "description": "Name of Issue Publisher" },
          "publicationDate": { "type": "string", "format": "date-time",
          "description": "Date Issue was published" },
  
          "thumbnail": {
            "type": "object",
            "description": "Thumbnails of the Issue",
            "properties": {
              "path": { "type": "string",
              "description": "Path where the thumbnail is stored" },
              "extension": { "type": "string",
              "description": "Extension or File type of the thumbnail" },
            },
            "additionalProperties": false
          },
  
          "images": {
            "type": "array",
            "description": "Images of the Issue",
            "maxItems": 10,
            "items": {
              "type": "object",
              "properties": {
                "path": { "type": "string",
                "description": "Path where the image is stored" },
                "extension": { "type": "string",
                "description": "Extension or File type of the image"  }
              },
              "additionalProperties": false
            }
          }
        },
        "additionalProperties": false
      }
      
    }
  }





  // Initialize our service with any options it requires
  app.use('/issues', events);


  // Get our initialized service so that we can register hooks and filters
  const service = app.service('issues');

  service.hooks(hooks);
};
