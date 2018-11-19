<template>
	<div>
		<div v-if="show">
			<el-upload
			  class="upload-demo"
			  drag
			  action="/api/suppliment/upload"
			  :data="fileForm1"
			  :limit=1
			  :on-change="change">
			  <i class="el-icon-upload"></i>
			  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</div>
		<div v-else>
			<img :src="imgPath1" width="350px" height="200px">
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				fileForm1: {
					fileName: '1111',
					isFront: 1
				},
				show: true,
				imgPath1: null
			}
		},
		methods:{
			change(file, fileList){
				this.show = false
				this.imgPath1 = 'http://127.0.0.1:7070/api/suppliment/printIC?payeeId=' + '11111' + '&payeeName=' + 'yang' + '&isFront=1'
				console.log("hello")
			}
		}
	}
</script>

<style scoped>
	
</style>