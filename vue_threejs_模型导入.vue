<template>
 <div>
 <div id="container"></div>
 </div>
</template>

<script>
 import * as THREE from 'three'
   import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
   import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
 
//导入dat.gui
import * as dat from "dat.gui";


 export default {
 name: 'THREETest',
 data () {
  return {
  camera: null,
  scene: null,
  renderer: null,
  mesh: null,
  controls:null,
  axesHelper:null,
  fullScreenElement:null
  }
 },
 methods: {
  init() {
  const container = document.getElementById('container')

  //场景
  this.scene = new THREE.Scene()
  //相机
  this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 1000)
  this.camera.position.set(5,5,5)
  
 //环境光
    const ambient = new THREE.AmbientLight(0xF8F8FF);
    this.scene.add(ambient);

  const point = new THREE.PointLight(0xFFE4E1);
      point.position.set(10, 10, 10); //点光源位置 xyz
      this.scene.add(point); //点光源添加到场景中

  //初始化渲染器
  this.renderer = new THREE.WebGLRenderer({
      //抗锯齿
      antialias: true})
  //设置渲染尺寸大小
  this.renderer.setSize(container.clientWidth, container.clientHeight)
  this.renderer.setClearColor(0x5F9EA0, 1); //设置背景颜色

  //将webgl渲染的canvas添加到container
  container.appendChild(this.renderer.domElement)

  //创建控制器
   this.controls = new OrbitControls(this.camera,this.renderer.domElement);//创建控件对象
   //设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
   this.controls.enenableDamping = true

    const gui = new dat.GUI()

  //创建轨道控制器(坐标轴)
  this.axesHelper = new THREE.AxesHelper(10)
  this.scene.add(this.axesHelper)
  
  //监听画面变化,更新渲染画面  ===>  使用窗口大小
  window.addEventListener('resize',()=>{
      console.log('画面变化了')
      //更新摄像头 
      this.camera.aspect = window.innerWidth/window.innerHeight
      //更新摄像机的投影矩阵
      this.camera.updateProjectionMatrix()
      //更新渲染器
      this.renderer.setSize(window.innerWidth,window.innerHeight)
      //设置渲染器的像素比
      this.renderer.setPixelRatio(window.devicePixelRatio)
  })

 //全屏事件
 window.addEventListener('dblclick',()=>{
     this.fullScreenElement = document.fullscreenElement
     console.log(this.fullScreenElement,'全屏') 
     if(!this.fullScreenElement){
         //双击控制屏幕进入全屏,退出全屏
         this.renderer.domElement.requestFullscreen()
     }else{
         //退出全屏
         document.exitFullscreen()
         console.log(this.fullScreenElement,'全屏xxx') 
     }
 })


  },

 
  loadGltf() {
	// const this = this;
	const loader = new GLTFLoader();
	//load一个测试模型路径：public/model/hz.glb
	loader.load("/model/hz.glb", (gltf)=> {
		// this.isLoading = false;//关闭载入中效果
		this.mesh = gltf.scene;
		this.mesh.scale.set(100, 100, 100);//设置大小比例
		this.mesh.position.set(0, 0, 0);//设置位置
		this.scene.add(this.mesh); // 将模型引入three、
		this.animate();
    console.log(gltf,'我是模型') 
		});
	},




  //使用渲染器，通过相机将场景渲染
  animate() {
    if(this.mesh){
    requestAnimationFrame(this.animate)
    //启动阻尼
    this.controls.update(0.25)
   this.mesh.rotation.y += 0.01;
  //  this.mesh.rotation.x += 0.001;
    this.renderer.render(this.scene, this.camera)

    }

  }
 },
 mounted () {
 //页面出现挂载函数
  this.init()
  this.animate()
  this.loadGltf()
 }
 }
</script>
<style scoped>
 #container {
 height: 900px
 }
</style>
