<template>
 <div>
 <div id="container"></div>
 </div>
</template>

<script>
 import * as THREE from 'three'
   import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//导入dat.gui
import * as dat from "dat.gui";
import {color} from "dat.gui";

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
  this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000)
  this.camera.position.set(10,10,10)
  
  //创建几何体
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshNormalMaterial()
  //根据几何体和材质创建物体
  this.mesh = new THREE.Mesh(geometry, material)
  //几何体添加到场景
  this.scene.add(this.mesh)
  
  const gui = new dat.GUI()
  gui.add(this.mesh.position,'x').min(0).max(5).step(0.01).name('移动x轴')  
  .onChange((value) => {
    console.log("值被修改：", value);
  })
  .onFinishChange((value) => {
    console.log("完全停下来:", value);
  });
  //设置选项框
  gui.add(this.mesh,'visible').name('是否显示')
  const folder = gui.addFolder('设置立方体')
  folder.add(this.mesh.material,'wireframe')


  //初始化渲染器
  this.renderer = new THREE.WebGLRenderer({
      //抗锯齿
      antialias: true})
  //设置渲染尺寸大小
  this.renderer.setSize(container.clientWidth, container.clientHeight)
  this.renderer.setClearColor(0x99cccc, 1); //设置背景颜色

  //将webgl渲染的canvas添加到container
  container.appendChild(this.renderer.domElement)

  //创建控制器
   this.controls = new OrbitControls(this.camera,this.renderer.domElement);//创建控件对象
   //设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
   this.controls.enenableDamping = true


  //创建轨道控制器(坐标轴)
  this.axesHelper = new THREE.AxesHelper(8)
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



  //使用渲染器，通过相机将场景渲染
  animate() {
  requestAnimationFrame(this.animate)
  //启动阻尼
  this.controls.update()
  //绕x、y、z轴自旋
  this.mesh.rotation.x += 0.01
  this.mesh.rotation.y += 0.02
  this.mesh.rotation.z += 0.02
  this.renderer.render(this.scene, this.camera)
  }
 },
 mounted () {
     //页面出现挂载函数
  this.init()
  this.animate()
 }
 }
</script>
<style scoped>
 #container {
 height: 900px
 }
</style>
