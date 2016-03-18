import {VideoConfiguration} from '../angular-components/bl.component';
import {WebCameraGrabber} from '../camera/web-camera-grabber';

export class WebglRenderer {

    private renderer: THREE.WebGLRenderer;
    private videoGrabber: WebCameraGrabber;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private objects3d: THREE.Object3D[] = [];
    private object3d: THREE.Object3D;
    private configuration: VideoConfiguration;
    private mesh: THREE.Mesh;

    constructor(canvasId: string, videoGrabber: WebCameraGrabber, configuration: VideoConfiguration) {

        let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(canvasId);

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
            const i = 0;
            this.scene.add(this.objects3d[0]);
            this.scene.add(this.objects3d[1]);
            this.object3d = this.objects3d[i];
            this.mesh = <THREE.Mesh>this.objects3d[i].children[0];
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

        if (!_.isUndefined(marker)) {
            let coordinate: Coordinate = {};
            marker.getCenter2d(coordinate);

            let dx: number = -2.25 + (10.8 * coordinate.x / 640.0);
            let dy: number = 1.8 - (8.0 * coordinate.y / 480.0);
            dx = -3.0 + (5.4 * coordinate.x / 640.0);
            dy = 1.2 - (4.0 * coordinate.y / 480.0);

            let matrix: THREE.Matrix4 = new THREE.Matrix4();
            matrix.fromArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, dx, dy, 0, 1]);
            this.object3d.matrixAutoUpdate = false;

            let diagonal: number = Math.sqrt(
                Math.pow(marker.sqvertex[0].x - marker.sqvertex[3].x, 2) +
                Math.pow(marker.sqvertex[0].y - marker.sqvertex[3].y, 2)
                );
            let scale: number = 0.001 + diagonal / 4000;
            this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = scale;

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
            this.object3d.matrix.multiplyMatrices(m1, m2);
            this.object3d.matrix.multiply(m3);
            this.object3d.matrix.copyPosition(matrix);
            this.object3d.visible = true;
        }

        this.renderer.render(this.scene, this.camera);
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
                object.position.y = 0;
                object.visible = false;
                object.scale.x = object.scale.y = object.scale.z = 0.01;
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

