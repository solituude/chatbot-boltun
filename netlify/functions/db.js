const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    try {
        const dbPath = path.join(__dirname, '../../src/model/db.json');
        const data = fs.readFileSync(dbPath, 'utf8');
        return {
            statusCode: 200,
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to load data' }),
        };
    }
};