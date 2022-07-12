<template>
 <div>
 <div id="container"></div>
 <div class="test">哇咔咔</div>
 </div>
</template>

<script>
 import * as THREE from 'three'
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

 export default {
 name: 'THREETest',
 data () {
  return {
  camera: null,
  scene: null,
  renderer: null,
  mesh: null,
  controls:null,
  }
 },
 methods: {
  init () {
      /* 初始化场景 */
      this.scene = new THREE.Scene();

      /* 创建相机对象 */
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
      //设置相机位置
      this.camera.position.set(200, 300, 200); 
      //设置相机方向(指向的场景对象)
      this.camera.lookAt(this.scene.position); 

      
      /* 创建网格模型 */
      const geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象 可以根据需要替换
      // const geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
      const material = new THREE.MeshLambertMaterial({ color: "#ffffff", }); //材质对象Material
      this.mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      this.scene.add(this.mesh); //网格模型添加到场景中

      /* 光源设置 */
      //点光源
      const point = new THREE.PointLight("red");
      point.position.set(100, 100, 100); //点光源位置 xyz
      this.scene.add(point); //点光源添加到场景中
      //环境光
      const ambient = new THREE.AmbientLight("black");
      this.scene.add(ambient);
      // console.log(scene)
      // console.log(scene.children)
      /**
       * 相机设置
       */
      const container = document.getElementById("container");

      // 创建渲染器对象

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight); //设置渲染区域尺寸
      this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
      container.appendChild(this.renderer.domElement);
      
      const animloop=()=> {
        render();
        // window.requestAnimationFrame(animloop);
        this.controls = new OrbitControls(this.camera,this.renderer.domElement);//创建控件对象
        this.controls.addEventListener('change', render);//监听鼠标、键盘事件
      }
      const render=()=> {
        this.renderer.render(this.scene, this.camera); //执行渲染操作
        
        // this.mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
      }
      animloop();
      // this.renderer.render(this.scene, this.camera);
      // requestAnimationFrame(()=>{
      //         this.renderer.render(this.scene, this.camera); //执行渲染操作
      //         this.mesh.rotateY(0.01);
      //       }, 20);
    },
      render() {
  requestAnimationFrame(this.render)
  this.mesh.rotation.x += 0.01
  this.mesh.rotation.y += 0.02
  this.renderer.render(this.scene, this.camera)
  },

  },

 
 mounted () {
  this.init()
  this.render()
 }
 }

</script>
<style scoped>
 #container {
 height: 400px;
 }

 .test{
        top: 20px;
        left: 20px;
        margin: 20px;
        padding: 5px;
        border: 1px;
        font-family: 'Courier New', Courier, monospace;
        color: aqua;
        z-index: 100;
 }
</style>
