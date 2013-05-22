/**
 *@model task-model
 *
 *@schema
record:
 	id: {Strin---GUID}  
 	data: {
			last-time: {Number} 已近做了多少时间
			class: {String}
			type: {String}
 			content {String}
 	}
 	meta:{
			created-time {Date}
			updated-time {Date}
			started: false #意外退出计时， 存储记录
 	}
	tracks: [
		{
			start-time：
			end-time: {Number}
		}
	]
	rules: {
		repeat: {String}  Month || Week || Day
		start-time: {Date}
		end-time: {Date}
		dead-line: {Date}
	}
*/
(function(){
  var taskModel;
  taskModel = YTI.Model.create();
  taskModel.config = {
    savePath: "/cxjtask.json",
    directory: TFS.externalStorageDirectory
  };
  taskModel.records = {};
  taskModel.createTask = function(data){
    var record;
    record = {};
    record.id = YTI.guid();
    record.data = {
      lastTime: 0,
      'class': "default",
      type: "default",
      content: data.taskText
    };
    record.meta = {
      createdTime: data.createdTime,
      updatedTime: 0,
      started: false,
      startedTime: 0
    };
    record.rules = {
      repeat: "",
      startTime: 1371657600000,
      endTime: 1371657600000,
      deadLine: 1371657600000
    };
    record.tracks = [];
    this.records[record.id] = record;
    this.save();
    return record;
  };
  /**
   *@method 保存记录
   */
  taskModel.save = function(){
    var file;
    file = TFS.getFile(this.config.directory, this.config.savePath);
    file.write(
    JSON.stringify(
    this.records));
  };
  /**
   *@method 更新记录
   */
  taskModel.update = function(){
    var file;
    file = TFS.getFile(this.config.directory, this.config.savePath);
    if (file.exists()) {
      this.records = JSON.parse(file.read().text);
    }
  };
  /**
   *@getter 通过id获取记录
   */
  taskModel.getRecordById = function(id){
    return this.records[id];
  };
  taskModel.getRecordByAttr = function(attrs){};
  taskModel.getRecordsByType = function(typeName){};
  taskModel.getRecodsByTimeRange = function(start, end){};
  taskModel.getRecords = function(){
    return this.records;
  };
  taskModel.getMockRecords = function(){
    return this.records = this.mockList();
  };
  /**
   *@setter
   */
  taskModel.deleteRecordById = function(id){
    log('delete-record-by-id');
    log('id');
    delete this.records[id];
    this.save();
  };
  /**
   *@mock 模拟一个task-record
   */
  taskModel.mockATask = function(){
    var task;
    task = {};
    task.id = "id-1";
    task.data = {
      lastTime: 2059022,
      'class': "lol",
      type: "plan",
      content: "hahaha, 明天开始我要认真学习"
    };
    task.meta = {
      createdTime: 1368792059022,
      updatedTime: 1368792059022
    };
    task.rules = {
      repeat: "Day",
      startTime: 1368792059022,
      endTime: 1368792059022,
      deadLine: 1368792059022
    };
    return task;
  };
  taskModel.mockList = function(){
    var i$, index;
    for (i$ = 1; i$ <= 2; ++i$) {
      index = i$;
      this.createTask({
        taskText: "说好的明天要努力学习呢？",
        createdTime: new Date() - 0
      });
    }
    return this.records;
  };
  taskModel.update();
  module.exports = taskModel;
}).call(this);
