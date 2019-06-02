import Vue from 'vue'
const state = {
	
  indialog:false,
  tableInputItem:{name:'表输入',stepType:'TableInput'},
  outdialog:false,//表输出
  tableOutputItem:{name:'表输出',stepType:'TableOutput',partitioningDaily:false,partitioningMonthly:false},
	splitdialog:false,//拆分
	splitItem:{name:'列拆分为多行'},
 	redialog:false,//替换null
 	reItem:{name:'替换NULL值',fields:[]},
 	uniquedialog:false,//去重
 	uniqueItem:{name:'去除重复记录'},
 	mergedialog:false,//合并
 	mergeItem:{name:'合并记录'},
 	sequdialog:false,
 	sequItem:{},
 	constdialog:false,
 	constItem:{},
 	ftocdialog:false,
 	ftocItem:{},
 	restrdialog:false,
 	restrItem:{},
 	mejoindialog:false,
 	mejoinItem:{},
 	csvdialog:false,
 	csvItem:{},
 	
 	exceldialog:false,
 	excelItem:{},
 	fileItem:{},//excel组件里面的文件组件
 	workItem:{},//excel组件里面的工作表组件
 	contentItem:{},//excel组件里面的内容组件
 	errorItem:{},//excel组件里面的错误组件
 	fieldItem:{excelInputFields:[]},//excel组件里面的字段组件
 	tableData:[],//excel组件的文件组件里面的表格数据
 	workFile:[],//excel组件里面的工作表组件的表格数据
 	syncdialog:false,
 	syncItem:{},
	truncateTable:true,
	zdb:true,
	useBatchUpdate:true,
	commitSize:100,
	
 	
}
const getters ={
	
}
const actions ={
		//组装表单数据
	csvAdd({ commit, state },item){
		let arry = state.csvItem.baseInputFields
		arry.push({})
		commit('csvPropty',arry)
	},
		//excel组件 字段 数据封装
	fileDataFormate({ commit, state },item){
		let fileName = [],excludeFileMask = [],fileRequired= [],includeSubFolders= []
				state.tableData.forEach(item=>{
					fileName.push(item.fileName?item.fileName:'')
					excludeFileMask.push(item.excludeFileMask?item.excludeFileMask:'')
					fileRequired.push(item.fileRequired?item.fileRequired:'')
					includeSubFolders.push(item.includeSubFolders?item.includeSubFolders:'')
				})
				var o = {
					fileName,excludeFileMask,fileRequired,includeSubFolders
				}
		commit('excelCombine',o)
	},
	//excel组件 字段 数据回显
	fileDataTransFormate({ commit, state },item){
		let fileData = [] 
		let fileName = item.fileName,excludeFileMask = item.excludeFileMask,fileRequired= item.fileRequired,includeSubFolders= item.includeSubFolders
				
				for(let f = 0;f<fileName.length;f++){
					fileData[f].fileName = fileName[f]
				}
				for(let e = 0;e<excludeFileMask.length;e++){
					fileData[e].excludeFileMask = excludeFileMask[e]
				}
				for(let r = 0;r<fileRequired.length;r++){
					fileData[r].fileRequired = fileRequired[r]
				}
				for(let i = 0;i<includeSubFolders.length;i++){
					fileData[i].includeSubFolders = includeSubFolders[i]
				}
				
				
		commit('setFileData',fileData)
	},
		//excel组件 工作表 数据封装
	workDataFormate({ commit, state },item){
		let sheetName = [],startRow = [],startColumn= []
			if(state.workFile.length>0){
				state.workFile.forEach(item=>{
					sheetName.push(item.sheetName?item.sheetName:'')
					startRow.push(item.startRow?item.startRow:0)
					startColumn.push(item.startColumn?item.startColumn:0)
				})
			}
				var o = {
					sheetName,startRow,startColumn
				}
		commit('excelCombine',o)
	},
		//excel组件 工作表 数据回显
	workDataTransFormate({ commit, state },item){
		let fileData = [] 
		let sheetName = item.sheetName,startRow = item.startRow,startColumn= item.startColumn
				if(sheetName.length>0){
					for(let f = 0;f<sheetName.length;f++){
						fileData[f].sheetName = sheetName[f]
					}
				}
				if(startRow.length>0){
					for(let e = 0;e<startRow.length;e++){
						fileData[e].startRow = startRow[e]
					}
				}
				if(startColumn.length>0){
					for(let r = 0;r<startColumn.length;r++){
						fileData[r].startColumn = startColumn[r]
					}
				}

		commit('setWorkData',fileData)
	},
}
const mutations = {
	//表输入
	TableInput(state,status){
		state.indialog =status
	},
	setTableInput(state,data){
		console.log(data)
		if(!data.sql){
			data.sql = ""
		}
		state.tableInputItem = data
	},
	//csv输入
	CsvInput(state,status){
		state.csvdialog = status
	},
	setCsvInput(state,data){
		state.csvItem = data
	},
	csvPropty(state,data){
		Vue.set(state.csvItem,'baseInputFields', data)
	},

	//excel输入
	ExcelInput(state,status){
		state.exceldialog = status
	},
	setExcelInput(state,data){
		state.excelItem = data
	},
	excelCombine(state,data){
		state.excelItem = Object.assign(state.excelItem,data)
	},
	setFileData(state,data){//给字段表赋值
		state.tableData = data
	},
	setWorkData(state,data){//给工作表赋值
		state.workFile = data
	},	
	tabTransFormate(state,data){//把总数据赋值给每个组件
		state.contentItem = data
		state.errorItem = data
	
	},
	//表输出
	TableOutput(state,status){
		state.outdialog = status
	},
	setTableOutput(state,data){
		state.tableOutputItem = data
	},
	//拆分
	SplitFieldToRows3(state,status){
		state.splitdialog = status
	},
	setSplitFieldToRows3(state,data){
		state.splitItem = data
	},
	//替换空值
	IfNull(state,status){
		state.redialog = status
	},
	setIfNull(state,data){
		state.reItem = data
	},
	//合并
	MergeRows(state,status){
		state.mergedialog = status
	},
	setMergeRows(state,data){
		
	    data.flagField = 'flagfield';
	    
		console.log(data)
		state.mergeItem = data
	},
	//去重
	Unique(state,status){
		state.uniquedialog = status
	},
	setUnique(state,data){
		state.uniqueItem = data
	},
	//增加序列
	AddSequence(state,status){
		
		state.sequdialog = status
	},
	setAddSequence(state,data){
//		data.useDatabase= true;
//		data.useCounter= false;
//		data.startAt = 1;
//		data.maxValue = 999999999;
//		data.incrementBy = 1;
		if(!data.startAt){
			data.startAt = 1
		}
		if(!data.maxValue){
			data.maxValue = 999999999;
		}
		if(!data.incrementBy){
			data.incrementBy = 1;
		}
		
//			data.startAt ?  data.startAt:1
//			data.maxValue ?  data.maxValue:1
//			data.incrementBy ?  data.incrementBy:1
		state.sequItem = data
	},
	//增加常量
	Constant(state,status){
		state.constdialog = status
	},
	setConstant(state,data){
		state.constItem = data
	},
	//字段to常量
	SetValueConstant(state,status){
		state.ftocdialog = status
	},
	setSetValueConstant(state,data){
		state.ftocItem = data
	},
	//字符串替换
	ReplaceString(state,status){
		state.restrdialog = status
	},
	setReplaceString(state,data){
		state.restrItem = data
	},
	//记录集连接
	MergeJoin(state,status){
		state.mejoindialog = status
	},
	setMergeJoin(state,data){
		state.mejoinItem = data
	},
	
	//数据同步
	SynchronizeAfterMerge(state,status){
		state.syncdialog = status
	},
	setSynchronizeAfterMerge(state,data){
		state.syncItem = data
	},
}
export default {
	namespaced:true,
  state,
  getters,
  actions,
  mutations
}