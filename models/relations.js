const Team = require('./teamModel');
const Position = require('./positionModel');

Team.belongsTo(Position, { foreignKey: 'positionId' });

Position.hasMany(Team, { foreignKey: 'positionId'});
