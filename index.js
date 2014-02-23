
function injectEnv(key, value) {
  if (typeof(value) == 'string' && value.match(/^\$/)) {
    return process.env[value.replace('$', '')]
  }
  return value
}

module.exports = function(json) {
  if (typeof(json) === "object") {
    return JSON.parse(JSON.stringify(json, injectEnv))
  } else if ((typeof(json) === "string") && json.match(/\.json$/i)) {
    return JSON.parse(JSON.stringify(JSON.parse(require('fs').readFileSync(json)), injectEnv))
  } else {
    return JSON.parse(JSON.stringify(JSON.parse(json), injectEnv))
  }
}