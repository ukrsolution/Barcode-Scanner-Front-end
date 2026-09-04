const gulp = require("gulp");
const HubRegistry = require("gulp-hub");

// Load tasks separated in different files
let hub = new HubRegistry(["gulp_tasks/*.js"]);
gulp.registry(hub);
