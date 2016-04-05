import {VideoConfiguration, ModelName} from '../angular-components/bl/bl';
import {WebCameraGrabber} from '../camera/web-camera-grabber';

export class WebglRenderer {

    private renderer: THREE.WebGLRenderer;
    private videoGrabber: WebCameraGrabber;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private objects3d: THREE.Object3D[] = [];
    private configuration: VideoConfiguration;
    private currentModel: ModelName;

    constructor(canvasId: string, videoGrabber: WebCameraGrabber, configuration: VideoConfiguration) {

        let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(canvasId);

        this.currentModel = configuration.model;
        this.configuration = configuration;
        this.videoGrabber = videoGrabber;
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 1000);
        this.camera.position.z = 5;

        this.addLight();
    }

    public add3dObjectsAndRender() {
        const manager: THREE.LoadingManager = new THREE.LoadingManager();

        this.addCarObject(manager);
        this.addBlsLogo(manager);

        manager.onLoad = () => {
            this.scene.add(this.objects3d[0]);
            this.scene.add(this.objects3d[1]);
            this.render();
        };

    }

    private render() {
        requestAnimationFrame((function(self: WebglRenderer, previousTime: number) {
            return function animate(now: number) {
                requestAnimationFrame(animate);
                let delta = now - previousTime;
                if (delta > 1000 / self.configuration.fps) {
                    previousTime = now;
                    self.renderingFn();
                }
            };
        })(this, performance.now()));
    }

    private renderingFn() {

        const marker: NyARSquare = this.videoGrabber.detectMarker();
        const object3d: THREE.Object3D = this.objects3d[this.configuration.model];
        const mesh: THREE.Mesh = <THREE.Mesh>this.objects3d[this.configuration.model].children[0];

        if (this.currentModel !== this.configuration.model) {
            this.objects3d[this.currentModel].visible = false;
            this.currentModel = this.configuration.model;
        }
        
        if (this.currentModel == ModelName.LOGO) {
            mesh.material.color = new THREE.Color(this.configuration.logoColor);
        }

        if (!_.isUndefined(marker)) {
            let coordinate: Coordinate = {};
            marker.getCenter2d(coordinate);

            let dx: number = -3.0 + (5.4 * coordinate.x / 640.0);
            let dy: number = 1.2 - (4.0 * coordinate.y / 480.0);

            let matrix: THREE.Matrix4 = new THREE.Matrix4();
            matrix.fromArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, dx, dy, 0, 1]);
            object3d.matrixAutoUpdate = false;

            let diagonal: number = Math.sqrt(
                Math.pow(marker.sqvertex[0].x - marker.sqvertex[3].x, 2) +
                Math.pow(marker.sqvertex[0].y - marker.sqvertex[3].y, 2)
                );
            let scale: number = 0.001 + diagonal / 4000;
            mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;

            let a = {
                x: marker.sqvertex[0].x,
                y: marker.sqvertex[0].y
            }, b = {
                x: coordinate.x,
                y: coordinate.y
            };

            let m1 = new THREE.Matrix4();
            let m2 = new THREE.Matrix4();
            let m3 = new THREE.Matrix4();

            m1.makeRotationY(this.findYAngle(a, b));
            m2.makeRotationX(Math.PI / 20);
            m3.makeRotationZ(0);
            object3d.matrix.multiplyMatrices(m1, m2);
            object3d.matrix.multiply(m3);
            object3d.matrix.copyPosition(matrix);
            object3d.visible = true;
            
            this.renderer.render(this.scene, this.camera);
        }
        
    }

    private findYAngle(a, b) {
        let dy = b.y - a.y;
        let dx = b.x - a.x;

        return Math.atan2(dy, dx) + Math.PI - 3.2;
    }

    private addCarObject(manager: THREE.LoadingManager) {
        new THREE.JSONLoader().load(
            '/img/logo.json', (function(objects3d: THREE.Object3D[]) {
                return function(geometry: THREE.Geometry, materials: THREE.Material[]) {

                    let loader: THREE.TextureLoader = new THREE.TextureLoader();
                    loader.load(
                        '/img/textures/gtare.jpg',
                        function(texture: THREE.Texture) {
                            let material: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({
                                map: texture
                            }), mesh: THREE.Mesh, object: THREE.Object3D;

                            mesh = new THREE.Mesh(
                                geometry,
                                material
                                );
                            mesh.rotation.y = -Math.PI / 5;

                            object = new THREE.Object3D();
                            object.add(mesh);
                            object.visible = false;
                            objects3d[objects3d.length] = object;
                        });
                };
            })(this.objects3d));
    }

    private addBlsLogo(manager: THREE.LoadingManager) {
        new THREE.ObjectLoader(manager).load('/img/LOGO_HIPOLY.json', (function(objects3d: THREE.Object3D[]) {
            return function(object: THREE.Object3D) {
                object.visible = false;
                objects3d[objects3d.length] = object;
            };
        })(this.objects3d));
    }

    private addLight() {
        let light: any = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 100, 60);
        light.castShadow = true;
        light.shadow.camera.left = -60;
        light.shadow.camera.top = -60;
        light.shadow.camera.right = 60;
        light.shadow.camera.bottom = 60;
        light.shadow.camera.near = 1;
        light.shadow.camera.far = 1000;
        light.shadow.bias = -.0001;
        light.shadow.mapSize.width = light.shadow.mapSize.height = 1024;
        this.scene.add(light);
    }

}

