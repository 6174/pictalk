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
task-model = YTI.Model.create!
task-model.config = {
	save-path: "/cxjtask.json"
	directory: TFS.externalStorageDirectory
}
task-model.records = {}
task-model.create-task = (data)->
	record = {}
	record <<< { 
		id: YTI.guid!
		data:{
			last-time:  0
			class: "default"
			type: "default"
			content: data.task-text
		}
		meta:{
			created-time: data.created-time
			updated-time: 0
			started: false
			started-time: 0
		}
		rules:{
			repeat: ""
			start-time:  1371657600000
			end-time: 1371657600000
			dead-line: 1371657600000

		}
		tracks:[]
	}
	@records[record.id] = record
	@save!
	record 
/**
 *@method 保存记录
 */
task-model.save = !->
	file = TFS.get-file(@config.directory ,@config.save-path)
	@records |> JSON.stringify |> file.write
/**
 *@method 更新记录
 */
task-model.update = !->
	file = TFS.get-file(@config.directory ,@config.save-path)
	if file.exists!
		@records = JSON.parse file.read!.text
/**
 *@getter 通过id获取记录
 */
task-model.get-record-by-id = (id)->
	@records[id]
task-model.get-record-by-attr = (attrs)->
task-model.get-records-by-type = (type-name)->
task-model.get-recods-by-time-range = (start, end)->
task-model.get-records = ->
	@records  
task-model.get-mock-records = ->
	@records = @mock-list!
/**
 *@setter
 */
task-model.delete-record-by-id = !(id)->
	log \delete-record-by-id
	log \id
	delete @records[id]
	@save!
/**
 *@mock 模拟一个task-record
 */
task-model.mock-a-task = ->
	task = {}
	task <<< { 
		id: "id-1"
		data:{
			last-time: 2059022
			class: "lol"
			type: "plan"
			content: "hahaha, 明天开始我要认真学习"
		}
		meta:{
			created-time: 1368792059022
			updated-time: 1368792059022
		}
		rules:{
			repeat: "Day"
			start-time: 1368792059022
			end-time: 1368792059022
			dead-line: 1368792059022

		}
	}
	task
task-model.mock-list = ->
	for index from 1 to 2 by 1
		@create-task({
			task-text: "说好的明天要努力学习呢？"
			created-time: new Date() - 0
		})
	@records
task-model.update!
module.exports = task-model
