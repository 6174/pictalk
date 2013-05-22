Ti.include "common/common.js"
require! ["common/util/Event","common/Class" ]

Model = Class.create!
Model.extend Event
Model.include Event

module.exports = Model